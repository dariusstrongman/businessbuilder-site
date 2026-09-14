"use client";

import { useId, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { CheckIcon, KeyIcon } from "@/components/primitives/Icons";
import { handoverItems } from "@/content/buildRoom";
import { workers } from "@/content/workers";
import { cta, routes } from "@/config/brand";
import { cn } from "@/lib/cn";
import styles from "./HandoffFork.module.css";

type Choice = "keys" | "run";

/** The fork: Take the keys, or Run it for me. One control, two futures. */
export function HandoffFork() {
  const [choice, setChoice] = useState<Choice>("keys");
  const id = useId();

  return (
    <div className={styles.fork}>
      <div className={styles.control} role="tablist" aria-label="After the build">
        <button
          type="button"
          role="tab"
          id={`${id}-keys-tab`}
          aria-selected={choice === "keys"}
          aria-controls={`${id}-keys`}
          tabIndex={choice === "keys" ? 0 : -1}
          className={cn(styles.option, choice === "keys" && styles.optionActive)}
          onClick={() => setChoice("keys")}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") setChoice("run");
          }}
        >
          <KeyIcon className={styles.optionIcon} />
          Take the keys
        </button>
        <button
          type="button"
          role="tab"
          id={`${id}-run-tab`}
          aria-selected={choice === "run"}
          aria-controls={`${id}-run`}
          tabIndex={choice === "run" ? 0 : -1}
          className={cn(styles.option, choice === "run" && styles.optionActive)}
          onClick={() => setChoice("run")}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") setChoice("keys");
          }}
        >
          <span className={styles.optionDot} aria-hidden />
          Run it for me
        </button>
        <span className={cn(styles.thumb, choice === "run" && styles.thumbRun)} aria-hidden />
      </div>

      <div
        id={`${id}-keys`}
        role="tabpanel"
        aria-labelledby={`${id}-keys-tab`}
        hidden={choice !== "keys"}
        className={styles.panel}
      >
        <div className={styles.panelCopy}>
          <h3 className={styles.panelTitle}>We hand over and step back.</h3>
          <p className={styles.panelText}>
            Handoff is a moment, not a process. Four things change hands, the company is registered to you and hosted
            for you, and we are done.
          </p>
          <p className={styles.panelText}>You can come back for Build & Run later. Nothing about the build assumes you will.</p>
          <div className={styles.panelActions}>
            <Button href={routes.start} arrow>
              {cta.primary}
            </Button>
          </div>
        </div>
        <ul className={styles.list} aria-label="What changes hands at handoff">
          {handoverItems.map((o) => (
            <li key={o.item} className={styles.item}>
              <span className={styles.itemCheck} aria-hidden>
                <CheckIcon />
              </span>
              <span className={styles.itemName}>{o.item}</span>
              <span className={styles.itemNote}>{o.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div id={`${id}-run`} role="tabpanel" aria-labelledby={`${id}-run-tab`} hidden={choice !== "run"} className={styles.panel}>
        <div className={styles.panelCopy}>
          <h3 className={styles.panelTitle}>We keep parts of the company working.</h3>
          <p className={styles.panelText}>
            After handoff, AI workers take on the recurring jobs you choose: answering inquiries, drafting quotes,
            sorting the inbox, asking for reviews. Each one has permissions, a budget and approval rules you set.
          </p>
          <p className={styles.panelText}>Stop any time. The workers stop. The company stays yours.</p>
          <div className={styles.panelActions}>
            <Button href={routes.buildAndRun} arrow>
              See Build & Run
            </Button>
          </div>
        </div>
        <ul className={styles.list} aria-label="AI workers">
          {workers.map((w) => (
            <li key={w.id} className={styles.item}>
              <span className={cn(styles.itemCheck, styles.itemWorker)} aria-hidden />
              <span className={styles.itemName}>{w.name}</span>
              <span className={styles.itemNote}>{w.job}</span>
            </li>
          ))}
          <li className={cn(styles.item, styles.itemMuted)}>
            <span className={cn(styles.itemCheck, styles.itemWorker, styles.itemWorkerFuture)} aria-hidden />
            <span className={styles.itemName}>More operational roles</span>
            <span className={styles.itemNote}>Added as they are proven, never before.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
