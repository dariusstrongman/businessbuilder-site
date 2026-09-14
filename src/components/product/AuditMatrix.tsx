import { auditExample, verdictLabels, verdictMeaning, type Verdict } from "@/content/audit";
import { laneLabels, type Lane } from "@/content/buildRoom";
import { cn } from "@/lib/cn";
import styles from "./AuditMatrix.module.css";

const order: Verdict[] = ["keep", "improve", "replace", "missing"];
const lanes: Lane[] = ["foundation", "identity", "customer", "operations", "launch"];

type Props = {
  /** "summary" is the tally and legend only. "full" lists every area. */
  variant?: "summary" | "full";
  className?: string;
};

/**
 * The Existing Business Audit result. Every system a trading business already
 * has, classified so the founder can see what is being kept before they see
 * what is being changed.
 */
export function AuditMatrix({ variant = "full", className }: Props) {
  const tally = order.map((v) => ({ verdict: v, count: auditExample.filter((a) => a.verdict === v).length }));
  const total = auditExample.length;

  return (
    <div className={cn(styles.audit, className)}>
      <div className={styles.tally} role="img" aria-label={tally.map((t) => `${t.count} ${verdictLabels[t.verdict]}`).join(", ") + `, of ${total} systems reviewed`}>
        {tally.map((t) => (
          <div key={t.verdict} className={styles.tallyItem} data-verdict={t.verdict}>
            <span className={styles.tallyCount}>{t.count}</span>
            <span className={styles.tallyLabel}>{verdictLabels[t.verdict]}</span>
            <span className={styles.tallyBar} style={{ "--share": `${(t.count / total) * 100}%` } as React.CSSProperties} />
            <span className={styles.tallyMeaning}>{verdictMeaning[t.verdict]}</span>
          </div>
        ))}
      </div>

      {variant === "full" ? (
        <div className={styles.areas}>
          {lanes.map((lane) => {
            const rows = auditExample.filter((a) => a.lane === lane);
            if (rows.length === 0) return null;
            return (
              <section key={lane} className={styles.lane} aria-labelledby={`audit-${lane}`}>
                <h3 id={`audit-${lane}`} className={styles.laneLabel}>
                  {laneLabels[lane]}
                </h3>
                <ul className={styles.rows}>
                  {rows.map((a) => (
                    <li key={a.id} className={styles.row} data-verdict={a.verdict}>
                      <span className={styles.verdict}>{verdictLabels[a.verdict]}</span>
                      <span className={styles.rowLabel}>{a.label}</span>
                      <span className={styles.rowNote}>{a.note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
