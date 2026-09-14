"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { ProductApiError, newCommandKey, productRequest, sha256Hex } from "@/lib/businessBuilder/client";
import type {
  BuildRoomProjection,
  EvidenceSubmission,
  FounderAction,
  ResidentialCleaningJourney,
  SessionStatus,
} from "@/lib/businessBuilder/types";
import styles from "./journey.module.css";

type LoadState = "loading" | "ready" | "unauthenticated" | "unauthorized" | "error";
type Notice = { tone: "info" | "error" | "success"; text: string } | null;

const actionStep = ["prepared", "explained", "linked", "founder_completed", "result_captured", "verified"];
const transition: Record<string, { operation: string; label: string } | undefined> = {
  prepared: { operation: "explain", label: "I understand this action" },
  explained: { operation: "launch", label: "Open the prepared handoff" },
  linked: { operation: "complete", label: "I completed the external step" },
};

function label(value: string): string {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function readFile(file: File): Promise<{ content: ArrayBuffer; encoded: string }> {
  return file.arrayBuffer().then((content) => {
    const bytes = new Uint8Array(content);
    let binary = "";
    for (let index = 0; index < bytes.length; index += 8192) {
      binary += String.fromCharCode(...bytes.subarray(index, index + 8192));
    }
    return { content, encoded: btoa(binary) };
  });
}

export function JourneyWorkspace({ companyId, operatorMode = false }: { companyId: string; operatorMode?: boolean }) {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [journey, setJourney] = useState<ResidentialCleaningJourney | null>(null);
  const [room, setRoom] = useState<BuildRoomProjection | null>(null);
  const [session, setSession] = useState<SessionStatus | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadState("loading");
    try {
      const [journeyResult, roomResult, sessionResult] = await Promise.all([
        productRequest<{ journey: ResidentialCleaningJourney }>(`companies/${companyId}/residential-cleaning-pilot`),
        productRequest<{ build_room: BuildRoomProjection }>(`companies/${companyId}/build-room`),
        productRequest<SessionStatus>("session"),
      ]);
      setJourney(journeyResult.journey);
      setRoom(roomResult.build_room);
      setSession(sessionResult);
      setLoadState("ready");
    } catch (error) {
      if (error instanceof ProductApiError && error.status === 401) setLoadState("unauthenticated");
      else if (error instanceof ProductApiError && [403, 404].includes(error.status)) setLoadState("unauthorized");
      else setLoadState("error");
    }
  }, [companyId]);

  useEffect(() => {
    const scheduled = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(scheduled);
  }, [load]);

  const canReview = useMemo(
    () => Boolean(session?.memberships.some((item) => item.role === "support" && item.status === "active")),
    [session],
  );

  const mutate = async (key: string, operation: () => Promise<unknown>, success: string) => {
    setBusy(key);
    setNotice(null);
    try {
      await operation();
      setNotice({ tone: "success", text: success });
      await load();
    } catch (error) {
      const api = error instanceof ProductApiError ? error : null;
      const stale = api?.code === "journey_conflict";
      setNotice({
        tone: "error",
        text: stale
          ? "The recommendation or action changed before this decision. The current persisted state has been reloaded; review it before trying again."
          : api?.message || "The command did not complete. Retrying with the same visible state is safe.",
      });
      if (stale) await load();
    } finally {
      setBusy(null);
    }
  };

  if (loadState === "loading") {
    return <div className={styles.shell}><Container><p className={styles.notice} role="status">Loading Company Brain, Runtime, Commercial, Founder Actions, and Verification…</p></Container></div>;
  }
  if (loadState === "unauthenticated") {
    return <div className={styles.shell}><Container><Eyebrow>Session required</Eyebrow><h1 className={styles.pageTitle}>Authenticate to open this Build Room.</h1><Button href={`/login?next=/build-room/${encodeURIComponent(companyId)}`}>Log in</Button></Container></div>;
  }
  if (loadState === "unauthorized") {
    return <div className={styles.shell}><Container><Eyebrow>Not available</Eyebrow><h1 className={styles.pageTitle}>This company is outside your authorized scope.</h1><p className={styles.notice}>No tenant or company details were disclosed.</p></Container></div>;
  }
  if (loadState === "error" || !journey || !room) {
    return <div className={styles.shell}><Container><Eyebrow>Build Room unavailable</Eyebrow><h1 className={styles.pageTitle}>The backend did not return a usable projection.</h1><p className={styles.notice} role="alert">No progress was inferred. Retrying is safe.</p><Button onClick={() => void load()}>Retry</Button></Container></div>;
  }

  const recommendation = journey.recommendation.data;
  const research = journey.research.data;
  const approved = journey.scope_commit.approval_state === "granted";
  const isSupport = canReview;

  return (
    <div className={styles.shell}>
      <Container>
        <header className={styles.hero}>
          <div>
            <Eyebrow>{operatorMode ? "Operator evidence review" : "Residential cleaning pilot"}</Eyebrow>
            <h1 className={styles.pageTitle}>{journey.company.display_name}</h1>
            <p className={styles.lead}>Denton, Texas · {label(String(journey.intake.data.starting_point))} starting point</p>
          </div>
          <div className={styles.authorityStack} aria-label="Authoritative state">
            <span>Company Brain · {journey.company.lifecycle}</span>
            <span>Runtime · {journey.scope_commit.job_status}</span>
            <span>Verification · {journey.verification.ready ? "Ready" : "Not Ready"}</span>
          </div>
        </header>

        {notice ? <p className={styles[notice.tone]} role={notice.tone === "error" ? "alert" : "status"}>{notice.text}</p> : null}

        <nav className={styles.sectionNav} aria-label="Build Room sections">
          <a href="#recommendation">Recommendation</a><a href="#order">Order</a><a href="#build">Build</a><a href="#actions">Founder Actions</a><a href="#verification">Verification</a>
        </nav>

        <section id="recommendation" className={styles.section} aria-labelledby="recommendation-title">
          <div className={styles.sectionHeading}>
            <div><Eyebrow>Research → recommend → approve</Eyebrow><h2 id="recommendation-title">The direction awaiting your decision.</h2></div>
            <span className={styles.status}>{approved ? "Scope approved" : "Approval required"}</span>
          </div>
          <div className={styles.recommendationGrid}>
            <article className={styles.card}><h3>Target customer</h3><p>{recommendation.target_customer.description}</p></article>
            <article className={styles.card}><h3>Service area</h3><p>{recommendation.service_area.center}, {recommendation.service_area.radius_miles} miles.</p><p className={styles.muted}>{recommendation.service_area.outside_area_behavior}</p></article>
            <article className={styles.card}><h3>Positioning</h3><p>{recommendation.positioning.statement}</p></article>
            <article className={styles.card}><h3>Starting price logic</h3><p>{recommendation.starting_price_logic.formula}</p><ul>{recommendation.starting_price_logic.rules.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
          <div className={styles.twoColumn}>
            <div><h3>Offers</h3><ul className={styles.ledger}>{recommendation.offers.map((offer) => <li key={offer.offer_id}><strong>{offer.name}</strong><span>{offer.responsibility}</span></li>)}</ul></div>
            <div><h3>Risks</h3><ul className={styles.bullets}>{recommendation.risks.map((risk) => <li key={risk}>{risk}</li>)}</ul></div>
            <div><h3>Startup and admin</h3><ul className={styles.ledger}>{recommendation.startup_admin_requirements.map((item) => <li key={item.requirement}><strong>{item.requirement}</strong><span>{item.responsibility} · {item.authority}</span></li>)}</ul></div>
            <div><h3>Recommended systems</h3><ul className={styles.ledger}>{recommendation.recommended_systems.map((item) => <li key={item.system}><strong>{item.system}</strong><span>{item.responsibility}{item.authority ? ` · ${item.authority}` : ""}</span></li>)}</ul></div>
          </div>
          <details className={styles.research}>
            <summary>Read the cited research packet</summary>
            <ul className={styles.bullets}>{research.findings.map((finding) => <li key={finding.finding_id}>{finding.statement} <small>[{finding.source_ids.join(", ")}]</small></li>)}</ul>
            <ol className={styles.sources}>{research.sources.map((source) => <li key={source.source_id}><a href={source.url} target="_blank" rel="noreferrer">{source.publisher}: {source.title}</a><span>{source.source_id}</span></li>)}</ol>
            <p className={styles.muted}>{research.limitations.join(" ")}</p>
          </details>
          {!approved && !isSupport ? (
            <div className={styles.decision}>
              <p>{recommendation.approval_effect}</p>
              <Button
                disabled={busy !== null}
                onClick={() => void mutate("approve", () => productRequest(`companies/${companyId}/residential-cleaning-pilot/approve`, { method: "POST", body: JSON.stringify({ approval_id: journey.scope_commit.approval_id }) }), "The exact recommendation digest was approved and the canonical state was reloaded.")}
              >{busy === "approve" ? "Committing exact scope…" : "Approve this exact direction"}</Button>
            </div>
          ) : null}
        </section>

        <section id="order" className={styles.section} aria-labelledby="order-title">
          <div className={styles.sectionHeading}><div><Eyebrow>Commercial</Eyebrow><h2 id="order-title">Build My Business order.</h2></div><span className={styles.status}>{journey.order ? label(journey.order.status) : "Not created"}</span></div>
          <div className={styles.priceCard}>
            <div><strong>$1,495</strong><span>Founding price · one-time Build My Business</span></div>
            <div><strong>$1,995 + $299/month</strong><span>Build My Business + Build & Run, when authoritatively purchased</span></div>
          </div>
          {journey.order ? <p className={styles.notice}>Order {journey.order.order_id} is <strong>{journey.order.status}</strong> in <strong>{label(journey.order.mode)}</strong> mode. No payment or entitlement has been fabricated. Active entitlements: {journey.entitlements.length}.</p> : <p className={styles.notice}>Browsing the recommendation has not created an order. Approve the exact scope first.</p>}
        </section>

        <section id="build" className={styles.section} aria-labelledby="build-title">
          <div className={styles.sectionHeading}><div><Eyebrow>Real projection</Eyebrow><h2 id="build-title">Build Room.</h2></div><span className={styles.status}>{room.summary.progress_percent}% verified work</span></div>
          <div
            className={styles.meter}
            role="progressbar"
            aria-label="Projected work complete"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={room.summary.progress_percent}
          ><span style={{ width: `${room.summary.progress_percent}%` }} /></div>
          <ul className={styles.workList}>{room.work_items.map((item) => <li key={item.id}><div><strong>{item.title}</strong><span>{item.owner} · {item.kind}</span></div><em data-state={item.status_group}>{label(item.status)}</em></li>)}</ul>
          {!room.work_items.length ? <p className={styles.notice}>No executable build work has been admitted. Pending payment is not shown as progress.</p> : null}
        </section>

        <section id="actions" className={styles.section} aria-labelledby="actions-title">
          <div className={styles.sectionHeading}><div><Eyebrow>Founder-controlled work</Eyebrow><h2 id="actions-title">Founder Actions.</h2></div><span className={styles.status}>{journey.founder_actions.length} tracked</span></div>
          {!approved ? <p className={styles.notice}>Founder Actions are generated only after the approved scope is committed.</p> : null}
          <div className={styles.actionsGrid}>
            {journey.founder_actions.filter((action) => action.action_key).map((action) => (
              <FounderActionPanel
                key={action.founder_action_id}
                action={action}
                companyId={companyId}
                canReview={isSupport}
                busy={busy}
                mutate={mutate}
              />
            ))}
          </div>
        </section>

        <section id="verification" className={styles.section} aria-labelledby="verification-title">
          <div className={styles.sectionHeading}><div><Eyebrow>Verification authority</Eyebrow><h2 id="verification-title">Ready and Fully Set remain false until proven.</h2></div></div>
          <div className={styles.readinessGrid}>
            <article className={styles.card}><h3>Ready</h3><strong>{journey.verification.ready ? "Verified" : "Not yet"}</strong><ul>{journey.verification.unmet_ready.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article className={styles.card}><h3>Fully Set</h3><strong>{journey.verification.fully_set ? "Verified" : "Not yet"}</strong><ul>{journey.verification.unmet_fully_set.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
          <p className={styles.muted}>Evaluated by {journey.verification.authority} at {new Date(journey.verification.evaluated_at).toLocaleString()}. The interface does not calculate or promote these states.</p>
        </section>

        {operatorMode && !isSupport ? <p className={styles.error} role="alert">This session is not an authorized scoped operator session. Review controls are hidden.</p> : null}
        <p className={styles.back}><Link href="/build-room">← All companies</Link></p>
      </Container>
    </div>
  );
}

type Mutate = (key: string, operation: () => Promise<unknown>, success: string) => Promise<void>;

function FounderActionPanel({ action, companyId, canReview, busy, mutate }: { action: FounderAction; companyId: string; canReview: boolean; busy: string | null; mutate: Mutate }) {
  const [file, setFile] = useState<File | null>(null);
  const [referenceSource, setReferenceSource] = useState<"structured_reference" | "authority_reference" | "provider_receipt">("structured_reference");
  const [referenceId, setReferenceId] = useState("");
  const [referenceKind, setReferenceKind] = useState("founder_supplied_reference");
  const [referenceHash, setReferenceHash] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [reviewDecision, setReviewDecision] = useState<"accepted" | "rejected" | "more_evidence_required">("accepted");
  const [reviewReason, setReviewReason] = useState("evidence_matches_requirement");
  const next = transition[action.state];
  const currentStep = Math.max(0, actionStep.indexOf(action.state));
  const submissions = action.evidence_review?.submissions ?? [];
  const supersededSubmission = [...submissions]
    .reverse()
    .find((item) => item.review_state === "rejected" || item.review_state === "more_evidence_required")
    ?.submission_id;

  const actionPath = `companies/${companyId}/residential-cleaning-pilot/founder-actions/${action.founder_action_id}`;
  const execute = () => {
    if (!next) return;
    const key = `flagship-${next.operation}-${action.founder_action_id}-${action.version}`.slice(0, 160);
    void mutate(action.founder_action_id, () => productRequest(`${actionPath}/${next.operation}`, { method: "POST", body: JSON.stringify({ idempotency_key: key }) }), `${action.title} advanced to the next persisted Runtime state.`);
  };

  const upload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    const { content, encoded } = await readFile(file);
    const hash = await sha256Hex(content);
    const type = file.type.startsWith("image/") ? "supporting_screenshot" : "supporting_document";
    await mutate(`upload-${action.founder_action_id}`, () => productRequest(`${actionPath}/evidence-submissions`, {
      method: "POST",
      body: JSON.stringify({
        idempotency_key: `flagship-upload-${hash}`,
        source: "file_upload",
        evidence_type: type,
        filename: file.name,
        content_type: file.type,
        content_base64: encoded,
        ...(supersededSubmission ? { supersedes_submission_id: supersededSubmission } : {}),
      }),
    }), "Evidence was stored immutably. Its scan and review state were reloaded from the backend.");
    setFile(null);
  };

  const submitReference = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let evidenceType: string;
    let reference: Record<string, string>;
    if (referenceSource === "authority_reference") {
      evidenceType = "authority_confirmation";
      reference = { artifact_id: referenceId };
    } else if (referenceSource === "provider_receipt") {
      evidenceType = "provider_receipt";
      reference = { provider_receipt_id: referenceId };
    } else {
      evidenceType = "other_supported_reference";
      reference = { reference_id: referenceId, reference_kind: referenceKind, issued_at: new Date().toISOString(), content_sha256: referenceHash };
    }
    const key = newCommandKey(`reference-${action.action_key}`);
    await mutate(`reference-${action.founder_action_id}`, () => productRequest(`${actionPath}/evidence-submissions`, {
      method: "POST",
      body: JSON.stringify({
        idempotency_key: key,
        source: referenceSource,
        evidence_type: evidenceType,
        reference,
        ...(supersededSubmission ? { supersedes_submission_id: supersededSubmission } : {}),
      }),
    }), "The scoped evidence reference was validated and persisted.");
  };

  const review = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ids = selected.length ? selected : submissions.filter((item) => item.scan_state !== "rejected").map((item) => item.submission_id);
    const key = newCommandKey(`review-${action.action_key}-${reviewDecision}`);
    await mutate(`review-${action.founder_action_id}`, () => productRequest(`${actionPath}/evidence-reviews`, {
      method: "POST",
      body: JSON.stringify({
        idempotency_key: key,
        submission_ids: ids,
        decision: reviewDecision,
        reason_code: reviewReason,
        requested_additional_evidence: reviewDecision === "more_evidence_required" ? ["Provide the required scoped authority or provider evidence."] : [],
      }),
    }), "The immutable operator decision was recorded; Runtime and Verification independently re-evaluated the action.");
  };

  return (
    <article className={styles.actionCard} data-state={action.state}>
      <header><div><span className={styles.owner}>{action.responsibility}{action.partner_authority ? ` · ${action.partner_authority}` : ""}</span><h3>{action.title}</h3></div><span className={styles.status}>{label(action.state)}</span></header>
      <p>{action.reason}</p>
      <ol className={styles.lifecycle} aria-label="Founder Action lifecycle">
        {actionStep.map((step, index) => <li key={step} data-current={index === currentStep} data-done={index < currentStep}>{label(step)}</li>)}
      </ol>
      {action.prepared_data?.checklist?.length ? <details><summary>Prepared checklist</summary><ul className={styles.bullets}>{action.prepared_data.checklist.map((item) => <li key={item}>{item}</li>)}</ul></details> : null}
      {action.destination?.label ? <p className={styles.destination}><strong>Prepared destination:</strong> {action.destination.url ? <a href={action.destination.url} target="_blank" rel="noreferrer">{action.destination.label}</a> : action.destination.label}</p> : null}
      <p className={styles.muted}>Required evidence: {action.required_evidence_kinds.map(label).join(" · ")}</p>
      {next && !canReview ? <Button onClick={execute} disabled={busy !== null} variant="secondary">{next.label}</Button> : null}

      {action.state === "founder_completed" && !canReview ? (
        <div className={styles.evidenceForms}>
          <form onSubmit={(event) => void upload(event)} className={styles.evidenceForm}>
            <label>Upload supporting evidence<input type="file" accept="application/pdf,image/png,image/jpeg" onChange={(event) => setFile(event.target.files?.[0] ?? null)} /></label>
            <Button type="submit" variant="secondary" disabled={!file || busy !== null}>Submit immutable file</Button>
            <small>PDF, PNG, or JPEG · 512 KiB maximum · private and quarantined until clean scan</small>
          </form>
          <form onSubmit={(event) => void submitReference(event)} className={styles.evidenceForm}>
            <label>Reference source<select value={referenceSource} onChange={(event) => setReferenceSource(event.target.value as typeof referenceSource)}><option value="structured_reference">Structured supporting reference</option><option value="authority_reference">Prevalidated authority artifact</option><option value="provider_receipt">Prevalidated provider receipt</option></select></label>
            <label>Opaque reference ID<input value={referenceId} onChange={(event) => setReferenceId(event.target.value)} required /></label>
            {referenceSource === "structured_reference" ? <><label>Reference kind<input value={referenceKind} onChange={(event) => setReferenceKind(event.target.value)} required /></label><label>Content SHA-256<input value={referenceHash} onChange={(event) => setReferenceHash(event.target.value)} pattern="[a-f0-9]{64}" required /></label></> : null}
            <Button type="submit" variant="secondary" disabled={busy !== null}>Validate reference</Button>
          </form>
        </div>
      ) : null}

      <EvidenceHistory submissions={submissions} />
      {canReview && submissions.length ? (
        <form onSubmit={(event) => void review(event)} className={styles.reviewForm}>
          <fieldset><legend>Evidence in this decision</legend>{submissions.map((item) => <label key={item.submission_id}><input type="checkbox" checked={selected.includes(item.submission_id)} onChange={(event) => setSelected((values) => event.target.checked ? [...values, item.submission_id] : values.filter((value) => value !== item.submission_id))} /> {item.safe_filename || item.evidence_type} · {item.scan_state}</label>)}</fieldset>
          <label>Decision<select value={reviewDecision} onChange={(event) => setReviewDecision(event.target.value as typeof reviewDecision)}><option value="accepted">Accept</option><option value="rejected">Reject</option><option value="more_evidence_required">Request more evidence</option></select></label>
          <label>Reason code<input value={reviewReason} onChange={(event) => setReviewReason(event.target.value)} required /></label>
          <Button type="submit" disabled={busy !== null}>Record immutable review</Button>
        </form>
      ) : null}
      <p className={styles.verificationLine}>Verification: {label(String(action.verification?.state ?? action.verification?.result ?? "not requested"))}</p>
    </article>
  );
}

function EvidenceHistory({ submissions }: { submissions: EvidenceSubmission[] }) {
  if (!submissions.length) return <p className={styles.muted}>No evidence submitted.</p>;
  return <ul className={styles.evidenceList}>{submissions.map((item) => <li key={item.submission_id}><div><strong>{item.safe_filename || label(item.evidence_type)}</strong><span>{label(item.source)} · SHA-256 {item.content_sha256.slice(0, 12)}…</span></div><div><em>{label(item.scan_state)}</em><em>{label(item.review_state)}</em></div>{item.review_reason ? <small>{label(item.review_reason)}</small> : null}</li>)}</ul>;
}
