import { CheckIcon } from "@/components/primitives/Icons";
import { evidenceLog } from "@/content/evidence";
import { cn } from "@/lib/cn";
import styles from "./EvidenceLog.module.css";

/** The evidence log as it appears in the Build Room: one line per check, with result and time. */
export function EvidenceLog({ className }: { className?: string }) {
  return (
    <div className={cn(styles.log, className)} role="table" aria-label="Example evidence log">
      <div className={styles.head} role="row">
        <span role="columnheader">When</span>
        <span role="columnheader">Check</span>
        <span role="columnheader">Result</span>
      </div>
      {evidenceLog.map((entry) => (
        <div key={entry.when + entry.check} className={cn(styles.row, styles[entry.result])} role="row">
          <span className={styles.when} role="cell">
            {entry.when}
          </span>
          <span className={styles.check} role="cell">
            <span className={styles.module}>{entry.module}</span>
            {entry.check}
          </span>
          <span className={styles.result} role="cell">
            {entry.result === "pass" ? <CheckIcon /> : <span className={styles.pendingDot} aria-hidden />}
            {entry.result === "pass" ? "Verified" : entry.result === "retry" ? "Retried" : "Waiting on you"}
          </span>
        </div>
      ))}
    </div>
  );
}
