"use client";

import { useEffect, useState } from "react";
import { StatusChip } from "@/components/product/StatusChip";
import { CheckIcon } from "@/components/primitives/Icons";
import { exampleCheck, verificationLadder } from "@/content/buildRoom";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import styles from "./VerificationLadder.module.css";

/*
 * One system walking the four states, so the ladder is a demonstration and not a diagram.
 * Tick 0 Proposed · 1 Executed · 2–5 Tested, with the check running a step at a time ·
 * 6 Verified · 7–8 hold · 9 reset.
 */
const TICK_MS = 750;
const LAST_TICK = 9;

function stateFor(t: number) {
  if (t >= 6) return 3;
  if (t >= 2) return 2;
  if (t >= 1) return 1;
  return 0;
}

export function VerificationLadder() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.3, rootMargin: "0px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setTick((t) => (t >= LAST_TICK ? 0 : t + 1)), TICK_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView]);

  const settled = reduced || !inView;
  const state = settled ? 3 : stateFor(tick);
  const stepsLit = settled ? exampleCheck.steps.length : state >= 3 ? exampleCheck.steps.length : Math.max(0, Math.min(tick - 1, exampleCheck.steps.length));
  const verified = state === 3;

  return (
    <div ref={ref} className={styles.wrap}>
      <ol className={styles.ladder} aria-label="The four verification states">
        {verificationLadder.map((step, i) => (
          <li
            key={step.id}
            className={cn(styles.rung, i <= state && styles.reached, i === state && styles.current)}
            data-state={step.id}
          >
            <span className={styles.rungTop}>
              <span className={styles.rungIndex}>{String(i + 1).padStart(2, "0")}</span>
              <StatusChip status={step.id} />
            </span>
            <h3 className={styles.rungTitle}>{step.label}</h3>
            <p className={styles.rungText}>{step.text}</p>
          </li>
        ))}
      </ol>

      <div className={styles.example}>
        <div className={styles.exampleHead}>
          <span className={styles.exampleLabel}>Example check · {exampleCheck.name}</span>
          <span className={cn(styles.exampleState, verified && styles.exampleStateDone)} aria-live="polite">
            {verificationLadder[state].label}
          </span>
        </div>
        <ol className={styles.flow}>
          {exampleCheck.steps.map((s, i) => (
            <li key={s.actor} className={cn(styles.flowStep, i < stepsLit && styles.flowStepLit)}>
              <span className={styles.flowMark} aria-hidden>
                {i < stepsLit ? <CheckIcon /> : null}
              </span>
              <span className={styles.flowActor}>{s.actor}</span>
              <span className={styles.flowText}>{s.text}</span>
            </li>
          ))}
        </ol>
        <p className={cn(styles.result, verified && styles.resultDone)}>
          <span className={styles.resultMark} aria-hidden>
            {verified ? <CheckIcon /> : null}
          </span>
          {verified
            ? "Verified. All four happened, in order, within the expected time. Written to your evidence log."
            : "Verified only when all four happen, in order, within the expected time."}
        </p>
      </div>
    </div>
  );
}
