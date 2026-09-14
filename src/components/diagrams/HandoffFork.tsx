"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { CheckIcon, KeyIcon } from "@/components/primitives/Icons";
import { handoverItems } from "@/content/buildRoom";
import { workers } from "@/content/workers";
import { cta, routes } from "@/config/brand";
import { cn } from "@/lib/cn";
import styles from "./HandoffFork.module.css";

type Choice = "keys" | "run";

const options = [
  {
    id: "keys" as const,
    label: "Take the keys",
    consequence: "We hand over and step back. You own it and you run it.",
    after: "No ongoing fee",
  },
  {
    id: "run" as const,
    label: "Run it for me",
    consequence: "We keep operating the recurring work, inside limits you set.",
    after: "Monthly, stop any time",
  },
];

/**
 * The fork: one company, two futures. The branch is drawn rather than implied,
 * because this is the decision the whole page has been building towards.
 */
export function HandoffFork() {
  const [choice, setChoice] = useState<Choice>("keys");
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (delta: number) => {
    const next = options[(options.findIndex((o) => o.id === choice) + delta + options.length) % options.length];
    setChoice(next.id);
    tabs.current[options.findIndex((o) => o.id === next.id)]?.focus();
  };

  return (
    <div className={styles.fork} data-choice={choice}>
      <div className={styles.branch} aria-hidden>
        <span className={styles.trunk} />
        <span className={cn(styles.bar, styles.barLeft)} />
        <span className={cn(styles.bar, styles.barRight)} />
        <span className={cn(styles.leg, styles.legLeft)} />
        <span className={cn(styles.leg, styles.legRight)} />
      </div>

      <div className={styles.choices} role="tablist" aria-label="After the build">
        {options.map((o, i) => (
          <button
            key={o.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-${o.id}-tab`}
            aria-selected={choice === o.id}
            aria-controls={`${id}-${o.id}`}
            tabIndex={choice === o.id ? 0 : -1}
            className={cn(styles.choice, choice === o.id && styles.choiceActive)}
            onClick={() => setChoice(o.id)}
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
            <span className={styles.choiceTop}>
              {o.id === "keys" ? <KeyIcon className={styles.choiceIcon} /> : <span className={styles.choiceDot} aria-hidden />}
              <span className={styles.choiceLabel}>{o.label}</span>
              <span className={styles.choiceState} aria-hidden />
            </span>
            <span className={styles.choiceConsequence}>{o.consequence}</span>
            <span className={styles.choiceAfter}>{o.after}</span>
          </button>
        ))}
      </div>

      <div
        id={`${id}-keys`}
        role="tabpanel"
        aria-labelledby={`${id}-keys-tab`}
        hidden={choice !== "keys"}
        className={styles.panel}
      >
        <div className={styles.panelCopy}>
          <h3 className={styles.panelTitle}>Four things change hands.</h3>
          <p className={styles.panelText}>
            Handoff is a moment, not a process. The company is registered to you and hosted for you, and we are done.
          </p>
          <p className={styles.panelText}>You can come back for Build &amp; Run later. Nothing about the build assumes you will.</p>
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
          <h3 className={styles.panelTitle}>The company keeps working.</h3>
          <p className={styles.panelText}>
            AI workers take on the recurring jobs you choose: answering enquiries, drafting quotes, sorting the inbox,
            asking for reviews. Each has permissions, a budget and approval rules you set.
          </p>
          <p className={styles.panelText}>Stop any time. The workers stop. The company stays yours.</p>
          <div className={styles.panelActions}>
            <Button href={routes.buildAndRun} arrow>
              See Build &amp; Run
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
