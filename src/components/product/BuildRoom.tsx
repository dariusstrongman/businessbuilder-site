"use client";

import { useEffect, useState } from "react";
import {
  founderActionStatusLabels,
  founderActions,
  modules,
  readiness,
  type FounderActionStatus,
  type Status,
} from "@/content/buildRoom";
import { phases } from "@/content/journey";
import { StatusChip } from "./StatusChip";
import { CheckIcon } from "@/components/primitives/Icons";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import styles from "./BuildRoom.module.css";

type Variant = "compact" | "full";

type Props = {
  variant?: Variant;
  /** The founder's description, shown as the build's title. */
  prompt?: string;
  className?: string;
};

/* Scripted assembly sequence. Each tick is one step; the loop resets after a hold at Fully Set. */
const TICK_MS = 750;
const SNAPSHOT = 8;
const LOOP_END = 23;

function moduleStatus(index: number, t: number): Status {
  if (t >= 8 + index) return "verified";
  if (t >= 5 + index) return "tested";
  if (t >= 2 + index) return "executed";
  return "proposed";
}

function founderStatus(id: string, t: number): FounderActionStatus {
  switch (id) {
    case "legal-name":
      return "done";
    case "processor-identity":
      return t >= 11 ? "done" : "waiting";
    case "address":
      if (t >= 13) return "done";
      return t >= 6 ? "waiting" : "upcoming";
    case "bank":
      if (t >= 16) return "done";
      return t >= 10 ? "waiting" : "upcoming";
    default:
      return "upcoming";
  }
}

type Readiness = "building" | "ready" | "fully-set";

const readinessLabel: Record<Readiness, string> = {
  building: "Building",
  ready: "Ready",
  "fully-set": "Fully Set",
};

export function BuildRoom({ variant = "full", prompt = "A mobile detailing business in Austin", className }: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.25, rootMargin: "0px" });
  const [t, setT] = useState(SNAPSHOT);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setT((v) => (v >= LOOP_END ? 0 : v + 1)), TICK_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView]);

  const statuses = modules.map((_, i) => moduleStatus(i, t));
  const actions = founderActions.map((a) => ({ ...a, status: founderStatus(a.id, t) }));
  const verifiedCount = statuses.filter((s) => s === "verified").length;
  const doneActions = actions.filter((a) => a.status === "done").length;
  const isReady = modules.every((m, i) => !m.customerFacing || statuses[i] === "verified");
  const isFullySet = verifiedCount === modules.length && doneActions === actions.length;
  const state: Readiness = isFullySet ? "fully-set" : isReady ? "ready" : "building";
  const waiting = actions.find((a) => a.status === "waiting");

  const currentPhase = isFullySet || isReady ? "own" : "build";

  return (
    <div
      ref={ref}
      className={cn(styles.frame, styles[variant], className)}
      data-state={state}
      role="img"
      aria-label={`Build Room preview for “${prompt}”. ${verifiedCount} of ${modules.length} modules verified, ${doneActions} of ${actions.length} founder actions done. Status: ${readinessLabel[state]}.`}
    >
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <span className={styles.roomLabel}>Build Room</span>
          <span className={styles.divider} aria-hidden />
          <span className={styles.prompt}>{prompt}</span>
        </div>
        <span className={cn(styles.readiness, styles[`readiness_${state}`])}>
          <span className={styles.readinessDot} aria-hidden />
          {readinessLabel[state]}
        </span>
        {variant === "compact" ? <span className={styles.promptWrap}>{prompt}</span> : null}
      </div>

      <div className={styles.body}>
        {variant === "full" ? (
          <aside className={styles.sidebar} aria-hidden>
            <div className={styles.sideGroup}>
              <span className={styles.sideLabel}>Phase</span>
              <ul className={styles.phaseList}>
                {phases.map((p) => {
                  const order = ["understand", "decide", "build", "own"];
                  const done = order.indexOf(p.id) < order.indexOf(currentPhase);
                  const current = p.id === currentPhase;
                  return (
                    <li key={p.id} className={cn(styles.phaseItem, done && styles.phaseDone, current && styles.phaseCurrent)}>
                      <span className={styles.phaseMarker}>{done ? <CheckIcon className={styles.phaseCheck} /> : null}</span>
                      {p.label}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.sideGroup}>
              <span className={styles.sideLabel}>Counts</span>
              <dl className={styles.counts}>
                <div>
                  <dt>Modules verified</dt>
                  <dd>
                    {verifiedCount}/{modules.length}
                  </dd>
                </div>
                <div>
                  <dt>Founder actions</dt>
                  <dd>
                    {doneActions}/{actions.length}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        ) : null}

        <div className={styles.main}>
          {variant === "full" ? (
            <div className={styles.tableHead} aria-hidden>
              <span>Module</span>
              <span className={styles.headEvidence}>Evidence</span>
              <span className={styles.headStatus}>Status</span>
            </div>
          ) : null}
          <ul className={styles.modules}>
            {modules.map((m, i) => {
              const status = statuses[i];
              return (
                <li key={m.id} className={styles.moduleRow} data-status={status}>
                  <span className={styles.moduleName}>{m.name}</span>
                  {variant === "full" ? (
                    <span className={cn(styles.moduleEvidence, status === "verified" && styles.moduleEvidenceVerified)}>
                      {status === "verified" ? m.evidence : m.detail}
                    </span>
                  ) : null}
                  <StatusChip status={status} size={variant === "compact" ? "sm" : "md"} className={styles.chip} />
                </li>
              );
            })}
          </ul>
        </div>

        {variant === "full" ? (
          <aside className={styles.aside} aria-hidden>
            <div className={styles.asideGroup}>
              <span className={styles.sideLabel}>Founder Actions</span>
              <ul className={styles.actionList}>
                {actions.map((a) => (
                  <li key={a.id} className={cn(styles.actionItem, styles[`action_${a.status}`])}>
                    <span className={styles.actionTitle}>{a.title}</span>
                    <span className={styles.actionStatus}>{founderActionStatusLabels[a.status]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.asideGroup}>
              <span className={styles.sideLabel}>Readiness</span>
              <ul className={styles.readinessList}>
                <li className={cn(styles.readinessItem, isReady && styles.readinessReached)}>
                  <span className={styles.readinessBox}>{isReady ? <CheckIcon className={styles.readinessCheck} /> : null}</span>
                  <span>
                    <span className={styles.readinessName}>{readiness.ready.label}</span>
                    <span className={styles.readinessText}>{readiness.ready.definition}</span>
                  </span>
                </li>
                <li className={cn(styles.readinessItem, isFullySet && styles.readinessReached)}>
                  <span className={styles.readinessBox}>{isFullySet ? <CheckIcon className={styles.readinessCheck} /> : null}</span>
                  <span>
                    <span className={styles.readinessName}>{readiness.fullySet.label}</span>
                    <span className={styles.readinessText}>{readiness.fullySet.definition}</span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        ) : null}
      </div>

      {variant === "compact" ? (
        <div className={styles.compactFooter} aria-hidden>
          <div className={styles.compactCell}>
            <span className={styles.sideLabel}>Founder Actions</span>
            <span className={styles.compactValue}>
              {doneActions}/{actions.length} done
              {waiting ? <span className={styles.compactWaiting}>Waiting on you: {waiting.title}</span> : null}
            </span>
          </div>
          <div className={styles.compactCell}>
            <span className={styles.sideLabel}>Verification</span>
            <span className={styles.compactValue}>
              {verifiedCount}/{modules.length} verified
              <span className={styles.compactMeter}>
                {modules.map((m, i) => (
                  <span key={m.id} className={styles.meterCell} data-status={statuses[i]} />
                ))}
              </span>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
