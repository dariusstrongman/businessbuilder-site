"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { ProductApiError, newCommandKey, productRequest, sha256Hex } from "@/lib/businessBuilder/client";
import type {
  BuildRoomProjection,
  CommercialCheckout,
  CommercialOffer,
  CommercialOrder,
  CommercialQuote,
  EvidenceSubmission,
  FounderAction,
  ResidentialCleaningJourney,
  SessionStatus,
} from "@/lib/businessBuilder/types";
import styles from "./journey.module.css";
import { SessionActions } from "./SessionActions";

type LoadState = "loading" | "ready" | "unauthenticated" | "unauthorized" | "error";
type Notice = { tone: "info" | "error" | "success"; text: string } | null;
type PaidPilotRelease = { status: "NOT_READY" | "READY_FOR_SUPERVISED_PILOT" | "HOLD" | "APPROVED_FOR_LIVE_CHARGE"; blocking_gates_pending: string[]; live_charge_allowed: boolean };

const actionStep = ["prepared", "explained", "linked", "founder_completed", "result_captured", "verified"];
const transition: Record<string, { operation: string; label: string } | undefined> = {
  prepared: { operation: "explain", label: "I understand this action" },
  explained: { operation: "launch", label: "Open the prepared handoff" },
  linked: { operation: "complete", label: "I completed the external step" },
};

function label(value: string): string {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function money(minor: number | null | undefined): string {
  return minor == null ? "Quoted after the audit" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(minor / 100);
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
  const [commercialOrder, setCommercialOrder] = useState<CommercialOrder | null>(null);
  const [checkout, setCheckout] = useState<CommercialCheckout | null>(null);
  const [paidPilotRelease, setPaidPilotRelease] = useState<PaidPilotRelease | null>(null);
  const [quote, setQuote] = useState<CommercialQuote | null>(null);
  const [offers, setOffers] = useState<CommercialOffer[]>([]);
  const [existingSystems, setExistingSystems] = useState([
    { system: "website", assessment: "missing", issue: "", provider_reference: "" },
    { system: "inbox", assessment: "missing", issue: "", provider_reference: "" },
    { system: "crm", assessment: "missing", issue: "", provider_reference: "" },
    { system: "scheduling", assessment: "missing", issue: "", provider_reference: "" },
    { system: "payments", assessment: "missing", issue: "", provider_reference: "" },
  ]);
  const [operatorGrantId, setOperatorGrantId] = useState("");
  const [operatorFindings, setOperatorFindings] = useState<Array<{ system: string; decision: string; reason: string }>>([]);
  const [operatorCitationId, setOperatorCitationId] = useState("");
  const [quoteUpfrontDollars, setQuoteUpfrontDollars] = useState("");
  const [operatorDecisionRef, setOperatorDecisionRef] = useState("");
  const [operatorEligibility, setOperatorEligibility] = useState<"PAYMENT_DELAY_REQUIRED" | "PAY_NOW_ELIGIBLE">("PAYMENT_DELAY_REQUIRED");
  const checkoutRetryKey = useRef<string | null>(null);
  const quoteExpiry = useRef<string | null>(null);
  const releaseTimes = useRef<{ eligibility: string; eligible_at: string | null; expires_at: string } | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadState("loading");
    try {
      const [journeyResult, roomResult, sessionResult, pricingResult] = await Promise.all([
        productRequest<{ journey: ResidentialCleaningJourney }>(`companies/${companyId}/residential-cleaning-pilot`),
        productRequest<{ build_room: BuildRoomProjection }>(`companies/${companyId}/build-room`),
        productRequest<SessionStatus>("session"),
        productRequest<{ offers: CommercialOffer[] }>("pricing"),
      ]);
      const orderId = journeyResult.journey.order?.order_id;
      let order: CommercialOrder | null = null;
      let checkoutState: CommercialCheckout | null = null;
      let paidPilotReleaseState: PaidPilotRelease | null = null;
      let quoteState: CommercialQuote | null = null;
      if (orderId && !operatorMode) {
        const orderResult = await productRequest<{ order: CommercialOrder }>(`orders/${orderId}?company_id=${companyId}`);
        order = orderResult.order;
        const checkoutResult = await productRequest<{ checkout: CommercialCheckout | null }>(`orders/${orderId}/checkout?company_id=${companyId}`);
        checkoutState = checkoutResult.checkout;
        const releaseResult = await productRequest<{ paid_pilot_release: PaidPilotRelease }>(
          `orders/${orderId}/paid-pilot-release?company_id=${companyId}`,
        ).catch(() => null);
        paidPilotReleaseState = releaseResult?.paid_pilot_release ?? null;
        if (order.quote_id) {
          const quoteResult = await productRequest<{ quote: CommercialQuote }>(`orders/${orderId}/quote?company_id=${companyId}`);
          quoteState = quoteResult.quote;
        }
      }
      setJourney(journeyResult.journey);
      if (operatorMode && journeyResult.journey.existing_business_audit) {
        setOperatorFindings((current) => current.length ? current : journeyResult.journey.existing_business_audit!.data.systems.map((item) => ({ system: item.system, decision: item.assessment === "missing" ? "add" : item.assessment, reason: "" })));
        setOperatorCitationId((current) => current || journeyResult.journey.research.data.sources[0]?.source_id || "");
      }
      setRoom(roomResult.build_room);
      setSession(sessionResult);
      setCommercialOrder(order);
      setCheckout(checkoutState);
      setPaidPilotRelease(paidPilotReleaseState);
      setQuote(quoteState);
      setOffers(pricingResult.offers);
      setLoadState("ready");
    } catch (error) {
      if (error instanceof ProductApiError && error.status === 401) setLoadState("unauthenticated");
      else if (error instanceof ProductApiError && [403, 404].includes(error.status)) setLoadState("unauthorized");
      else setLoadState("error");
    }
  }, [companyId, operatorMode]);

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

  const chooseOffer = (code: string) => {
    if (!journey?.order) return;
    void mutate("offer", () => productRequest(`orders/${journey.order!.order_id}/offer?company_id=${companyId}`, {
      method: "POST", body: JSON.stringify({ offer_code: code }),
    }), "The selected offer was recorded in the Commercial ledger. No payment occurred.");
  };

  const openCheckout = () => {
    if (!commercialOrder) return;
    if (checkout?.status === "open" && checkout.redirect_url?.startsWith("https://checkout.stripe.com/")) {
      window.location.assign(checkout.redirect_url);
      return;
    }
    const key = checkout?.retry_key ?? checkoutRetryKey.current ?? newCommandKey(`checkout-${commercialOrder.order_id}`);
    checkoutRetryKey.current = key;
    void mutate("checkout", async () => {
      const response = await productRequest<{ checkout: CommercialCheckout }>(
        `orders/${commercialOrder.order_id}/checkout?company_id=${companyId}`,
        { method: "POST", body: JSON.stringify({ idempotency_key: key }) },
      );
      const redirect = response.checkout.redirect_url;
      if (!redirect || !redirect.startsWith("https://checkout.stripe.com/")) {
        throw new Error("The payment provider did not return an authorized test-mode checkout destination.");
      }
      window.location.assign(redirect);
      return response;
    }, "The provider checkout opened. Only a verified payment webhook can activate the order.");
  };

  const captureExistingAudit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void mutate("existing-audit", () => productRequest(
      `companies/${companyId}/residential-cleaning-pilot/existing-business-audit`,
      { method: "POST", body: JSON.stringify({ systems: existingSystems.map((item) => ({
        system: item.system, assessment: item.assessment, issue: item.issue,
        provider_reference: item.provider_reference || null,
      })) }) },
    ), "Your existing-system inventory was recorded in Company Brain. It is founder-supplied, not an approved quote or verification.");
  };

  const createExistingOrder = () => {
    void mutate("existing-order", () => productRequest(
      `companies/${companyId}/residential-cleaning-pilot/existing-order`,
      { method: "POST", body: JSON.stringify({}) },
    ), "An unpriced, operator-scoped order was recorded. It cannot be paid until an exact quote is approved and Commercial releases payment.");
  };

  const approveExistingQuote = () => {
    if (!commercialOrder || !quote || quote.status !== "proposed") return;
    void mutate("existing-quote", () => productRequest(
      `orders/${commercialOrder.order_id}/quote/approve?company_id=${companyId}`,
      { method: "POST", body: JSON.stringify({
        quote_id: quote.quote_id, recommendation_digest: quote.recommendation_digest,
      }) },
    ), "You approved the exact quote and current scoped recommendation digest. Payment is still pending operator admission and a verified webhook.");
  };

  const publishExistingScope = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void mutate("operator-scope", () => productRequest(
      `operator/companies/${companyId}/residential-cleaning/existing-scope`,
      { method: "POST", body: JSON.stringify({
        grant_id: operatorGrantId, findings: operatorFindings,
        citation_ids: [operatorCitationId],
      }) },
    ), "The appointed operator assessment and research citation were persisted as a proposed Company Brain scope. No quote or payment was created.");
  };

  const publishExistingQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!journey?.order) return;
    const upfront = Number(quoteUpfrontDollars);
    if (!Number.isSafeInteger(upfront * 100) || upfront < 1495) {
      setNotice({ tone: "error", text: "Enter an exact onboarding amount of at least $1,495. The marketing floor is not a charge." });
      return;
    }
    void mutate("operator-quote", () => productRequest(
      `operator/companies/${companyId}/orders/${journey.order!.order_id}/quote`,
      { method: "POST", body: JSON.stringify({
        grant_id: operatorGrantId, upfront_minor: Math.round(upfront * 100),
        expires_at: quoteExpiry.current ?? (quoteExpiry.current = new Date(Date.now() + 3 * 86_400_000).toISOString()),
      }) },
    ), "An exact audit-backed quote was recorded. Only the founder may approve it; payment remains blocked until Commercial admission.");
  };

  const releaseExistingPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!journey?.order) return;
    const delayed = operatorEligibility === "PAYMENT_DELAY_REQUIRED";
    if (!releaseTimes.current || releaseTimes.current.eligibility !== operatorEligibility) {
      const now = Date.now();
      releaseTimes.current = {
        eligibility: operatorEligibility,
        eligible_at: delayed ? new Date(now + 30 * 60_000).toISOString() : null,
        expires_at: new Date(now + 45 * 60_000).toISOString(),
      };
    }
    void mutate("operator-release", () => productRequest(
      `operator/companies/${companyId}/orders/${journey.order!.order_id}/release`,
      { method: "POST", body: JSON.stringify({
        grant_id: operatorGrantId, eligibility: operatorEligibility,
        eligible_at: releaseTimes.current!.eligible_at,
        tax_disposition: delayed ? "manual_review" : "test_mode_undetermined",
        tax_review_state: delayed ? "TAX_REVIEW_REQUIRED" : "TEST_MODE_UNDETERMINED",
        decision_ref: operatorDecisionRef,
        expires_at: releaseTimes.current!.expires_at,
      }) },
    ), delayed
      ? "The expiring operator admission recorded PAYMENT_DELAY_REQUIRED. Checkout remains blocked. No legal applicability was decided."
      : "Test-mode-only admission was recorded. The server rejects this tax boundary in production configuration; only a verified Stripe test webhook can activate entitlement.");
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
            <SessionActions />
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
          <div className={styles.sectionHeading}><div><Eyebrow>Commercial authority</Eyebrow><h2 id="order-title">Your approved scope and payment state.</h2></div><span className={styles.status}>{commercialOrder ? label(commercialOrder.status) : journey.order ? label(journey.order.status) : "Not created"}</span></div>
          {!operatorMode && journey.intake.data.starting_point !== "running" ? <div className={styles.priceCard}>
            {offers.filter((offer) => ["new_business_build_v1", "new_business_build_run_v1"].includes(offer.offer_code)).map((offer) => (
              <div key={offer.offer_code}><strong>{money(offer.upfront_minor)}{offer.monthly_minor ? ` + ${money(offer.monthly_minor)}/month` : ""}</strong><span>{offer.name} · {offer.price_kind}</span></div>
            ))}
          </div> : null}
          {journey.order ? <p className={styles.notice}>Order {journey.order.order_id} is <strong>{commercialOrder?.status ?? journey.order.status}</strong>. Active entitlements: {journey.entitlements.filter((item) => item.status === "active").length}. Browsing, selecting a package, or returning from checkout never activates entitlement.</p> : <p className={styles.notice}>{approved && journey.intake.data.starting_point === "running" ? "The approved direction is not a chargeable existing-business quote. Audit and scoped pricing must come first." : "Browsing the recommendation has not created an order. Approve the exact scope first."}</p>}
          {journey.intake.data.starting_point === "running" && approved && !journey.order ? <div className={styles.commercialControls}>
            <h3>Existing Business Audit before a quote</h3>
            <p>“From $1,495” is not a charge. We need your current systems, then a scoped operator recommendation and an exact quote you approve. Payment remains unavailable until that work is done.</p>
            {journey.existing_business_audit ? <p role="status">Founder inventory captured in Company Brain: {journey.existing_business_audit.data.systems.length} systems · {label(journey.existing_business_audit.data.state)}. This is an assertion, not Verification.</p> : !operatorMode ? <form onSubmit={captureExistingAudit} className={styles.auditForm}>
              {existingSystems.map((item, index) => <fieldset key={item.system}>
                <legend>{label(item.system)}</legend>
                <label>Current assessment<select value={item.assessment} onChange={(event) => setExistingSystems((values) => values.map((value, position) => position === index ? { ...value, assessment: event.target.value } : value))}><option value="missing">Missing</option><option value="keep">Keep</option><option value="improve">Improve</option><option value="replace">Replace</option></select></label>
                <label>What exists or needs work?<input value={item.issue} maxLength={500} minLength={3} required onChange={(event) => setExistingSystems((values) => values.map((value, position) => position === index ? { ...value, issue: event.target.value } : value))} /></label>
                <label>Opaque provider/account reference (optional)<input value={item.provider_reference} maxLength={160} onChange={(event) => setExistingSystems((values) => values.map((value, position) => position === index ? { ...value, provider_reference: event.target.value } : value))} /></label>
              </fieldset>)}
              <Button type="submit" disabled={busy !== null}>Capture existing-system inventory</Button>
            </form> : null}
            {journey.existing_business_scope ? <div role="status">
              <p><strong>Operator-scoped recommendation:</strong> {journey.existing_business_scope.data.findings.length} system decisions, citing {journey.existing_business_scope.data.citation_ids.join(", ")}. This is an assessed scope, not a fixed charge.</p>
              <ul>{journey.existing_business_scope.data.findings.map((item) => <li key={item.system}>{label(item.system)}: {label(item.decision)} — {item.reason}</li>)}</ul>
              {!operatorMode ? <Button disabled={busy !== null} onClick={createExistingOrder}>Start an unpriced scoped order</Button> : null}
            </div> : journey.existing_business_audit ? <p>Waiting for an appointed operator to publish a cited, scoped recommendation. There is no chargeable order yet.</p> : null}
            {operatorMode && canReview && journey.existing_business_audit && !journey.existing_business_scope ? <form onSubmit={publishExistingScope} className={styles.auditForm}>
              <h3>Appointed operator: publish a cited scope</h3>
              <p>SUPPORT membership alone does not authorize this. An expiring, company-scoped commercial appointment is rechecked by the backend.</p>
              <label>Commercial appointment ID<input value={operatorGrantId} required maxLength={128} onChange={(event) => setOperatorGrantId(event.target.value)} /></label>
              <label>Research citation<select value={operatorCitationId} required onChange={(event) => setOperatorCitationId(event.target.value)}>{journey.research.data.sources.map((source) => <option key={source.source_id} value={source.source_id}>{source.publisher}: {source.title}</option>)}</select></label>
              {operatorFindings.map((finding, index) => <fieldset key={finding.system}>
                <legend>{label(finding.system)}</legend>
                <label>Scoped decision<select value={finding.decision} onChange={(event) => setOperatorFindings((items) => items.map((item, position) => position === index ? { ...item, decision: event.target.value } : item))}><option value="keep">Keep</option><option value="improve">Improve</option><option value="replace">Replace</option><option value="add">Add</option></select></label>
                <label>Assessment rationale<input value={finding.reason} required minLength={12} maxLength={500} onChange={(event) => setOperatorFindings((items) => items.map((item, position) => position === index ? { ...item, reason: event.target.value } : item))} /></label>
              </fieldset>)}
              <Button type="submit" disabled={busy !== null}>Publish operator-scoped assessment</Button>
            </form> : null}
          </div> : null}
          {operatorMode && canReview && journey.intake.data.starting_point === "running" && journey.order && !journey.order.quote_id ? <form onSubmit={publishExistingQuote} className={styles.auditForm}>
            <h3>Appointed operator: issue the exact quote</h3>
            <p>The founder-supplied inventory and cited operator assessment are bound to this unpriced order. “From $1,495” is only a floor.</p>
            <label>Commercial appointment ID<input value={operatorGrantId} required maxLength={128} onChange={(event) => setOperatorGrantId(event.target.value)} /></label>
            <label>Exact onboarding price, USD<input type="number" min="1495" step="0.01" value={quoteUpfrontDollars} required onChange={(event) => setQuoteUpfrontDollars(event.target.value)} /></label>
            <Button type="submit" disabled={busy !== null}>Issue exact scoped quote</Button>
          </form> : null}
          {operatorMode && canReview && journey.intake.data.starting_point === "running" && journey.order?.quote_status === "approved" && !journey.order.admission_present ? <form onSubmit={releaseExistingPayment} className={styles.auditForm}>
            <h3>Appointed operator: commercial admission</h3>
            <p>The founder has approved the exact quote. A release is separate, expiring, audited, and bound to the current order and quote digest. No tax or disclosure law is inferred here.</p>
            <label>Commercial appointment ID<input value={operatorGrantId} required maxLength={128} onChange={(event) => setOperatorGrantId(event.target.value)} /></label>
            <label>Technical payment eligibility<select value={operatorEligibility} onChange={(event) => setOperatorEligibility(event.target.value as "PAYMENT_DELAY_REQUIRED" | "PAY_NOW_ELIGIBLE")}><option value="PAYMENT_DELAY_REQUIRED">Payment delay required</option><option value="PAY_NOW_ELIGIBLE">Test-mode pay-now only</option></select></label>
            <label>Opaque review/decision reference<input value={operatorDecisionRef} required maxLength={160} onChange={(event) => setOperatorDecisionRef(event.target.value)} /></label>
            <Button type="submit" disabled={busy !== null}>Record expiring operator decision</Button>
          </form> : null}
          {commercialOrder ? <div className={styles.commercialControls}>
            <p><strong>Selected package:</strong> {offers.find((offer) => offer.offer_code === commercialOrder.offer_code)?.name ?? "Awaiting selection"}</p>
            <p><strong>First payment due:</strong> {money(commercialOrder.total?.minor_units)}. Government, domain, insurance, provider, advertising, processing, and professional fees are separate.</p>
            <p><strong>Payment eligibility:</strong> {commercialOrder.payment_eligibility === "PAY_NOW_ELIGIBLE" ? "Eligible after supervised review" : "Payment delayed pending supervised eligibility/disclosure review"}{commercialOrder.eligible_at ? ` until ${new Date(commercialOrder.eligible_at).toLocaleString()}` : ""}.</p>
            <p><strong>Tax:</strong> {commercialOrder.tax_disposition === "manual_review" ? "Manual tax review required before payment" : label(commercialOrder.tax_disposition)}.</p>
            <p role="status"><strong>First paid pilot:</strong> {paidPilotRelease ? paidPilotRelease.status === "APPROVED_FOR_LIVE_CHARGE" ? "A scoped supervised live-charge release has been recorded; this Build Room still uses test Checkout only." : paidPilotRelease.status === "HOLD" ? "On hold. Live charging is blocked." : paidPilotRelease.status === "READY_FOR_SUPERVISED_PILOT" ? "All blocking reviews are current; a separate operator go/no-go ceremony is still required." : `Not ready. ${paidPilotRelease.blocking_gates_pending.length} blocking reviews remain.` : "Production release status unavailable. Live charging is not inferred."}</p>
            {journey.intake.data.starting_point === "running" ? quote ? <div className={styles.quoteCard} role="status">
              <p><strong>Exact existing-business quote:</strong> {money(quote.upfront.minor_units)} upfront + {money(quote.monthly.minor_units)}/month. Expires {new Date(quote.expires_at).toLocaleString()}. {label(quote.status)}.</p>
              <p>Review the operator scope above before approving. Viewing this quote does not authorize spending.</p>
              {!operatorMode && quote.status === "proposed" ? <Button disabled={busy !== null} onClick={approveExistingQuote}>Approve this exact scoped quote</Button> : null}
            </div> : <p role="status">The scoped order is unpriced. An appointed operator must issue an exact quote before founder approval.</p> : null}
            {checkout ? <p><strong>Provider checkout:</strong> {label(checkout.status)}. {checkout.status === "completed" ? "Payment is still verified separately through the signed webhook." : ""}</p> : null}
            {!operatorMode && journey.intake.data.starting_point !== "running" && commercialOrder.status === "draft" ? <div className={styles.offerChoices} aria-label="Choose an approved commercial package">
              {offers.filter((offer) => ["new_business_build_v1", "new_business_build_run_v1"].includes(offer.offer_code)).map((offer) => (
                <Button key={offer.offer_code} variant="secondary" disabled={busy !== null || commercialOrder.offer_code === offer.offer_code} onClick={() => chooseOffer(offer.offer_code)}>{commercialOrder.offer_code === offer.offer_code ? `Selected: ${offer.name}` : `Select ${offer.name}`}</Button>
              ))}
            </div> : null}
            {!operatorMode && commercialOrder.payment_eligibility === "PAY_NOW_ELIGIBLE" && commercialOrder.tax_disposition !== "manual_review" && ["draft", "payment_failed", "pending_payment"].includes(commercialOrder.status) ? <Button disabled={busy !== null} onClick={openCheckout}>{checkout?.redirect_url ? "Resume test-mode checkout" : "Open supervised test-mode checkout"}</Button> : null}
            {checkout?.redirect_url && checkout.status === "open" ? <a href={checkout.redirect_url} rel="noreferrer" className={styles.checkoutLink}>Resume the provider-hosted test checkout</a> : null}
            <p className={styles.muted}>The site cannot mark an order paid. Only an authenticated provider event may advance Commercial and Build Room state.</p>
          </div> : null}
        </section>

        <section id="build" className={styles.section} aria-labelledby="build-title">
          <div className={styles.sectionHeading}><div><Eyebrow>Real projection</Eyebrow><h2 id="build-title">Build Room.</h2></div><span className={styles.status}>{room.summary.complete}/{room.summary.total} tracked Runtime/Verification steps</span></div>
          {room.commercial?.orders.length ? <p className={styles.notice}>Commercial projection: {room.commercial.orders.map((item) => `${item.order_id} ${label(item.status)}`).join(" · ")}. Active entitlements: {room.commercial.active_entitlements}. {room.commercial.subscriptions?.length ? `Recurring service: ${room.commercial.subscriptions.map((item) => `${label(item.status)} (${label(item.renewal_state)})`).join(" · ")}. ` : ""}Payment status does not count as Verified work.</p> : null}
          <div
            className={styles.meter}
            role="progressbar"
            aria-label="Tracked Runtime and Verification work items only; Founder Actions and launch readiness are separate"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={room.summary.progress_percent}
          ><span style={{ width: `${room.summary.progress_percent}%` }} /></div>
          <p className={styles.muted}>This meter covers tracked Runtime and Verification work items, not Founder Actions or customer readiness. Only Verification decides Ready and Fully Set.</p>
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
