"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { actorLabels, phases, stages } from "@/content/journey";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import styles from "./JourneyRail.module.css";

const STEP_MS = 160;

/**
 * The Rail: twelve stages on one line across four phases.
 * Activates stage by stage when it enters view; nodes are buttons that select a stage for the detail line.
 */
export function JourneyRail() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const [activeCount, setActiveCount] = useState(0);
  const [selected, setSelected] = useState<number>(4); // Approve: the founder's first gate
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    if (!inView || reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setActiveCount(i);
      if (!userSelected) setSelected(Math.min(i, stages.length) - 1);
      if (i >= stages.length) {
        window.clearInterval(id);
        if (!userSelected) window.setTimeout(() => setSelected(4), 900);
      }
    }, STEP_MS);
    return () => window.clearInterval(id);
    // userSelected intentionally excluded: a click should not restart the sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced]);

  // Reduced motion: everything is active as soon as it is in view, with no sequence.
  const shown = reduced && inView ? stages.length : activeCount;
  const stage = stages[selected];
  const fill = shown === 0 ? 0 : (shown - 0.5) / stages.length;

  return (
    <div ref={ref} className={styles.rail} data-active={shown}>
      <ol className={styles.phases} aria-label="Phases">
        {phases.map((p) => (
          <li key={p.id} className={styles.phase} data-phase={p.id}>
            <span className={styles.phaseLabel}>{p.label}</span>
            <span className={styles.phaseSummary}>{p.summary}</span>
          </li>
        ))}
      </ol>

      <ol className={styles.stages} aria-label="Stages" style={{ "--fill": fill } as CSSProperties}>
        {stages.map((s, i) => {
          const phaseStart = stages.findIndex((x) => x.phase === s.phase) === i;
          const phase = phases.find((p) => p.id === s.phase)!;
          return (
            <li
              key={s.id}
              className={cn(styles.stage, i < shown && styles.active, i === selected && styles.selected)}
              data-actor={s.actor}
              data-phase-label={phaseStart ? phase.label : undefined}
            >
              <button
                type="button"
                className={styles.node}
                aria-pressed={i === selected}
                aria-label={`${String(i + 1).padStart(2, "0")} ${s.label}, ${actorLabels[s.actor]}`}
                onClick={() => {
                  setSelected(i);
                  setUserSelected(true);
                }}
                onFocus={() => {
                  setSelected(i);
                  setUserSelected(true);
                }}
              >
                <span className={styles.marker} />
              </button>
              <span className={styles.stageLabel}>
                <span className={styles.stageIndex}>{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </span>
              <span className={styles.stageDescription}>{s.description}</span>
            </li>
          );
        })}
      </ol>

      <div className={styles.detail} aria-live="polite">
        <span className={styles.detailIndex}>{String(selected + 1).padStart(2, "0")}</span>
        <span className={styles.detailLabel}>{stage.label}</span>
        <span className={cn(styles.detailActor, styles[`actor_${stage.actor}`])}>{actorLabels[stage.actor]}</span>
        <span className={styles.detailText}>{stage.description}</span>
      </div>

      <dl className={styles.legend} aria-label="Legend">
        <div>
          <dt>
            <span className={cn(styles.legendMarker, styles.legendSystem)} aria-hidden />
          </dt>
          <dd>Business Builder acts</dd>
        </div>
        <div>
          <dt>
            <span className={cn(styles.legendMarker, styles.legendFounder)} aria-hidden />
          </dt>
          <dd>You decide or act</dd>
        </div>
        <div>
          <dt>
            <span className={cn(styles.legendMarker, styles.legendState)} aria-hidden />
          </dt>
          <dd>Milestone reached</dd>
        </div>
        <div>
          <dt>
            <span className={cn(styles.legendMarker, styles.legendOptional)} aria-hidden />
          </dt>
          <dd>Optional</dd>
        </div>
      </dl>
    </div>
  );
}
