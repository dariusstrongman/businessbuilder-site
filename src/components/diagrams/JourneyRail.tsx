"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { actorLabels, parallelBand, phases, stages, type Stage } from "@/content/journey";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import styles from "./JourneyRail.module.css";

const STEP_MS = 150;

/** A column is either one stage, or the band where three run at once. */
type Column = { kind: "single"; stage: Stage; index: number } | { kind: "parallel"; tracks: { stage: Stage; index: number }[] };

function buildColumns(): Column[] {
  const columns: Column[] = [];
  let band: { stage: Stage; index: number }[] = [];
  stages.forEach((stage, index) => {
    if (stage.track) {
      band.push({ stage, index });
      return;
    }
    if (band.length) {
      columns.push({ kind: "parallel", tracks: band });
      band = [];
    }
    columns.push({ kind: "single", stage, index });
  });
  if (band.length) columns.push({ kind: "parallel", tracks: band });
  return columns;
}

const columns = buildColumns();
/** Grid units: the parallel band is wider, because three things happen in it. */
const UNITS = columns.reduce((n, c) => n + (c.kind === "parallel" ? 3 : 1), 0);

export function JourneyRail() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [activeCount, setActiveCount] = useState(0);
  const [selected, setSelected] = useState(4);
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
    // userSelected is intentionally excluded: a click must not restart the sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced]);

  const shown = reduced && inView ? stages.length : activeCount;
  const stage = stages[selected];

  const node = (s: Stage, index: number) => (
    <li
      key={s.id}
      className={cn(styles.stage, index < shown && styles.active, index === selected && styles.selected)}
      data-actor={s.actor}
    >
      <button
        type="button"
        className={styles.node}
        aria-pressed={index === selected}
        aria-label={`${String(index + 1).padStart(2, "0")} ${s.label}, ${actorLabels[s.actor]}`}
        onClick={() => {
          setSelected(index);
          setUserSelected(true);
        }}
        onFocus={() => {
          setSelected(index);
          setUserSelected(true);
        }}
      >
        <span className={styles.marker} />
      </button>
      <span className={styles.stageLabel}>
        <span className={styles.stageIndex}>{String(index + 1).padStart(2, "0")}</span>
        {s.short ?? s.label}
      </span>
      <span className={styles.stageDescription}>{s.description}</span>
    </li>
  );

  return (
    <div ref={ref} className={styles.rail}>
      <ol className={styles.phases} aria-label="Phases">
        {phases.map((p) => (
          <li key={p.id} className={styles.phase} data-phase={p.id}>
            <span className={styles.phaseLabel}>{p.label}</span>
            <span className={styles.phaseSummary}>{p.summary}</span>
          </li>
        ))}
      </ol>

      <ol
        className={styles.columns}
        aria-label="Stages"
        style={{ "--units": UNITS, "--fill": shown === 0 ? 0 : (shown - 0.5) / stages.length } as CSSProperties}
      >
        {columns.map((col) =>
          col.kind === "single" ? (
            <li key={col.stage.id} className={styles.column}>
              <ol className={styles.track}>{node(col.stage, col.index)}</ol>
            </li>
          ) : (
            <li key="parallel" className={cn(styles.column, styles.bandColumn)}>
              <span className={styles.bandLabel}>{parallelBand.label}</span>
              <ol className={cn(styles.track, styles.bandTrack)}>{col.tracks.map((t) => node(t.stage, t.index))}</ol>
            </li>
          ),
        )}
      </ol>

      <div className={styles.detail} aria-live="polite">
        <span className={styles.detailIndex}>{String(selected + 1).padStart(2, "0")}</span>
        <span className={styles.detailLabel}>{stage.label}</span>
        <span className={cn(styles.detailActor, styles[`actor_${stage.actor}`])}>{actorLabels[stage.actor]}</span>
        <span className={styles.detailText}>{stage.description}</span>
      </div>

      <p className={styles.bandNote}>
        <span className={styles.bandNoteMark} aria-hidden />
        {parallelBand.note}
      </p>
    </div>
  );
}
