"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { ArrowIcon, CheckIcon } from "@/components/primitives/Icons";
import { AuditMatrix } from "@/components/product/AuditMatrix";
import { startingPoints, type StartingPointId } from "@/content/startingPoints";
import { auditCopy } from "@/content/audit";
import { routes } from "@/config/brand";
import { cn } from "@/lib/cn";
import styles from "./StartingPointPicker.module.css";

type Props = {
  /** "full" shows the audit tally inside the panel. */
  variant?: "full" | "compact";
  initial?: StartingPointId;
};

/**
 * The branch. Everything after this question changes, so the site asks it
 * before it tells anyone what the product does to them.
 */
export function StartingPointPicker({ variant = "full", initial = "existing" }: Props) {
  const id = useId();
  const [active, setActive] = useState<StartingPointId>(initial);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const point = startingPoints.find((p) => p.id === active) ?? startingPoints[0];

  const move = (delta: number) => {
    const i = startingPoints.findIndex((p) => p.id === active);
    const next = startingPoints[(i + delta + startingPoints.length) % startingPoints.length];
    setActive(next.id);
    tabs.current[startingPoints.indexOf(next)]?.focus();
  };

  return (
    <div className={styles.picker}>
      <div className={styles.options} role="tablist" aria-label="Where are you starting from?">
        {startingPoints.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-${p.id}-tab`}
            aria-selected={active === p.id}
            aria-controls={`${id}-panel`}
            tabIndex={active === p.id ? 0 : -1}
            className={cn(styles.option, active === p.id && styles.optionActive)}
            onClick={() => setActive(p.id)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                move(1);
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                move(-1);
              }
            }}
          >
            <span className={styles.optionIndex}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.optionLabel}>{p.label}</span>
            <span className={styles.optionMark} aria-hidden />
          </button>
        ))}
      </div>

      <div
        key={point.id}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${point.id}-tab`}
        className={styles.panel}
        tabIndex={0}
      >
        <p className={styles.voice}>“{point.voice}”</p>

        <div className={styles.first}>
          <h3 className={styles.firstLabel}>What happens first</h3>
          <p className={styles.firstText}>{point.firstMove}</p>
        </div>

        <div className={styles.changes}>
          <h3 className={styles.changesLabel}>What changes for you</h3>
          <ul className={styles.changesList}>
            {point.changes.map((c) => (
              <li key={c}>
                <span className={styles.check} aria-hidden>
                  <CheckIcon />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {point.audits && variant === "full" ? (
          <div className={styles.audit}>
            <h3 className={styles.auditLabel}>
              <span className={styles.auditMark} aria-hidden />
              Your build starts with an audit
            </h3>
            <p className={styles.auditText}>{auditCopy.reassurance}</p>
            <AuditMatrix variant="summary" />
            <a href={`${routes.product}#audit`} className={styles.auditLink}>
              See a full audit
              <ArrowIcon />
            </a>
          </div>
        ) : null}

        <div className={styles.actions}>
          <Button href={`${routes.start}?from=${point.id}&package=${point.suggests}`} arrow>
            Start here
          </Button>
        </div>
      </div>
    </div>
  );
}
