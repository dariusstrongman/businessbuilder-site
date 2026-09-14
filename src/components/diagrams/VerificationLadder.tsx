"use client";

import { useEffect, useState } from "react";
import { StatusChip } from "@/components/product/StatusChip";
import { verificationLadder } from "@/content/buildRoom";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import styles from "./VerificationLadder.module.css";

/*
 * One system walking the four states, so the ladder demonstrates rather than
 * describes. Tick 0 Proposed · 1 Executed · 2-4 Tested · 5 Verified · 6-7 hold
 * · 8 reset.
 */
const TICK_MS = 800;
const LAST_TICK = 8;

const subject = {
  id: "CHK-0387",
  module: "Scheduling",
  name: "A customer books a slot and it reaches your calendar",
};

function stateFor(t: number) {
  if (t >= 5) return 3;
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

  return (
    <div ref={ref} className={styles.wrap}>
      <div className={styles.subject}>
        <span className={styles.subjectId}>
          {subject.module} · {subject.id}
        </span>
        <p className={styles.subjectName}>{subject.name}</p>
        <StatusChip status={verificationLadder[state].id} className={styles.subjectChip} />
      </div>

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
    </div>
  );
}
