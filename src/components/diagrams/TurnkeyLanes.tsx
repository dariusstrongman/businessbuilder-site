"use client";

import { useState } from "react";
import { ownerLabels, ownerMeaning, turnkeyCopy, turnkeyLanes, type Owner } from "@/content/turnkey";
import { cn } from "@/lib/cn";
import styles from "./TurnkeyLanes.module.css";

const owners: Owner[] = ["builder", "founder", "external"];

type Props = {
  /** "index" is the homepage cut: lanes and counts only. "full" lists every item. */
  variant?: "index" | "full";
};

/**
 * The whole scope of a company build, in six lanes, with the owner of every
 * item on its face. Filtering by owner is the fastest way to answer the
 * question a founder actually has: what is left for me?
 */
export function TurnkeyLanes({ variant = "full" }: Props) {
  const [filter, setFilter] = useState<Owner | "all">("all");
  const full = variant === "full";

  const counts = owners.map((o) => ({
    owner: o,
    count: turnkeyLanes.reduce((n, l) => n + l.items.filter((i) => i.owner === o).length, 0),
  }));
  const total = turnkeyLanes.reduce((n, l) => n + l.items.length, 0);

  return (
    <div className={styles.turnkey}>
      {full ? (
        <div className={styles.filters}>
          <span className={styles.filterLabel}>Who completes it</span>
          <div className={styles.filterRow} role="group" aria-label="Filter scope by who completes each item">
            <button
              type="button"
              className={cn(styles.filter, filter === "all" && styles.filterOn)}
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
            >
              Everything
              <span className={styles.filterCount}>{total}</span>
            </button>
            {counts.map((c) => (
              <button
                key={c.owner}
                type="button"
                data-owner={c.owner}
                className={cn(styles.filter, filter === c.owner && styles.filterOn)}
                aria-pressed={filter === c.owner}
                onClick={() => setFilter(filter === c.owner ? "all" : c.owner)}
              >
                {ownerLabels[c.owner]}
                <span className={styles.filterCount}>{c.count}</span>
              </button>
            ))}
          </div>
          <p className={styles.filterMeaning} aria-live="polite">
            {filter === "all"
              ? "Every item in an agreed company build. Not every business needs all of them."
              : ownerMeaning[filter]}
          </p>
        </div>
      ) : null}

      <ol className={cn(styles.lanes, full && styles.lanesFull)}>
        {turnkeyLanes.map((lane, i) => {
          const items = filter === "all" ? lane.items : lane.items.filter((it) => it.owner === filter);
          return (
            <li key={lane.id} className={styles.lane}>
              <div className={styles.laneHead}>
                <span className={styles.laneIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.laneLabel}>{lane.label}</h3>
                <p className={styles.lanePremise}>{lane.premise}</p>
                <span className={styles.laneCount}>
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              {full ? (
                items.length > 0 ? (
                  <ul className={styles.items}>
                    {items.map((item) => (
                      <li key={item.label} className={styles.item} data-owner={item.owner}>
                        <span className={styles.owner}>{ownerLabels[item.owner]}</span>
                        <span className={styles.itemLabel}>{item.label}</span>
                        <span className={styles.itemDetail}>{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.empty}>Nothing in this lane is yours to do.</p>
                )
              ) : (
                <ul className={styles.chips}>
                  {lane.items.slice(0, 4).map((item) => (
                    <li key={item.label} className={styles.chip} data-owner={item.owner}>
                      {item.label}
                    </li>
                  ))}
                  {lane.items.length > 4 ? <li className={styles.chipMore}>+{lane.items.length - 4}</li> : null}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      <p className={styles.boundary}>
        <span className={styles.boundaryMark} aria-hidden />
        {turnkeyCopy.boundary}
      </p>
    </div>
  );
}
