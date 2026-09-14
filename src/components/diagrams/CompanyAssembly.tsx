"use client";

import type { CSSProperties, ReactNode } from "react";
import { CheckIcon } from "@/components/primitives/Icons";
import { lanes, partKindLabels, spanningPart, type Join, type Part, type PartKind } from "@/content/assembly";
import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/cn";
import styles from "./CompanyAssembly.module.css";

function PartBlock({ part }: { part: Part }) {
  return (
    <div className={styles.part} data-kind={part.kind}>
      <span className={styles.partMark} aria-hidden />
      <span className={styles.partLabel}>{part.label}</span>
    </div>
  );
}

function JoinBlock({ join, order }: { join: Join; order: number }) {
  return (
    <div className={styles.join} data-state={join.state} style={{ "--i": order } as CSSProperties}>
      <span className={styles.joinTrack} aria-hidden>
        <span className={styles.joinFill} />
      </span>
      <span className={styles.joinBadge}>
        {join.state === "verified" ? (
          <CheckIcon aria-hidden />
        ) : (
          <span className={styles.joinDot} aria-hidden />
        )}
        <span className={styles.joinLabel}>
          <span className="sr-only">{join.state === "verified" ? "Verified connection: " : "Connection waiting on you: "}</span>
          {join.label}
        </span>
      </span>
    </div>
  );
}

/**
 * The signature moment: the whole company in one schematic, with verification
 * attached to the joins rather than the boxes.
 *
 * Parts and joins are flattened onto a seven-track grid so the same part
 * position lines up across every lane. The reveal is CSS-only: entering the
 * viewport flips one attribute and each connection draws off a per-index
 * delay, so no timer runs and reduced motion collapses it to the final state.
 */
export function CompanyAssembly() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  let order = 0;

  return (
    <div ref={ref} className={styles.assembly} data-lit={inView ? "true" : "false"}>
      <ol className={styles.lanes}>
        {lanes.map((lane) => {
          const row: ReactNode[] = [];
          lane.parts.forEach((part, i) => {
            row.push(<PartBlock key={part.id} part={part} />);
            const join = lane.joins[i];
            if (join) row.push(<JoinBlock key={`${part.id}-join`} join={join} order={order++} />);
          });
          return (
            <li key={lane.id} className={styles.lane}>
              <div className={styles.laneHead}>
                <h3 className={styles.laneLabel}>{lane.label}</h3>
                <p className={styles.laneGoal}>{lane.goal}</p>
              </div>
              <div className={styles.chain}>{row}</div>
            </li>
          );
        })}
      </ol>

      <div className={styles.spanning}>
        <span className={styles.riser} aria-hidden />
        <div className={styles.spanningBody}>
          <PartBlock part={{ id: "email", label: spanningPart.label, kind: "system" }} />
          <p className={styles.spanningNote}>{spanningPart.note}</p>
          <span className={styles.spanningBadge}>
            <CheckIcon aria-hidden />
            Verified
          </span>
        </div>
      </div>

      <dl className={styles.legend}>
        {(Object.keys(partKindLabels) as PartKind[]).map((kind) => (
          <div key={kind} className={styles.legendItem}>
            <dt>
              <span className={cn(styles.partMark, styles.legendMark)} data-kind={kind} aria-hidden />
            </dt>
            <dd>{partKindLabels[kind]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
