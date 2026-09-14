import { CheckIcon, MinusIcon } from "@/components/primitives/Icons";
import { evidenceReceipt } from "@/content/receipt";
import { cn } from "@/lib/cn";
import styles from "./EvidenceReceipt.module.css";

/**
 * What verification actually produces: a receipt naming what was checked, what
 * the result was, the evidence behind it, and anything still unresolved.
 *
 * The unresolved dependency is the point. A check that is blocked says so here
 * rather than being rounded up into a pass.
 */
export function EvidenceReceipt({ className }: { className?: string }) {
  const r = evidenceReceipt;
  return (
    <article className={cn(styles.receipt, className)} aria-labelledby="receipt-title">
      <header className={styles.head}>
        <span className={styles.kicker}>
          Evidence receipt · {r.id}
          <span className={styles.mode}>{r.mode}</span>
        </span>
        <h3 id="receipt-title" className={styles.title}>
          {r.name}
        </h3>
        <dl className={styles.meta}>
          <div>
            <dt>Module</dt>
            <dd>{r.module}</dd>
          </div>
          <div>
            <dt>Run</dt>
            <dd>{r.when}</dd>
          </div>
        </dl>
      </header>

      <section className={styles.block} aria-label="What was checked">
        <h4 className={styles.blockTitle}>What was checked</h4>
        <ol className={styles.checks}>
          {r.checked.map((line) => (
            <li key={line.step} className={styles[line.result]}>
              <span className={styles.mark} aria-hidden>
                {line.result === "pass" ? <CheckIcon /> : <MinusIcon />}
              </span>
              <span className={styles.step}>{line.step}</span>
              <span className={styles.verdict}>{line.result === "pass" ? "Pass" : "Blocked"}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.block} aria-label="Evidence">
        <h4 className={styles.blockTitle}>Evidence</h4>
        <ul className={styles.evidence}>
          {r.evidence.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className={styles.dependency} aria-label={r.dependency.label}>
        <span className={styles.depLabel}>
          <span className={styles.depDot} aria-hidden />
          {r.dependency.label} · {r.dependency.owner}
        </span>
        <h4 className={styles.depTitle}>{r.dependency.title}</h4>
        <p className={styles.depBody}>{r.dependency.body}</p>
      </section>

      <footer className={styles.foot}>
        <span className={styles.outcome}>
          <span className={cn(styles.pill, styles.pillOn)}>Counts towards Ready</span>
          <span className={styles.pill}>Not yet Fully Set</span>
        </span>
        <p className={styles.footNote}>{r.outcome.line}</p>
      </footer>
    </article>
  );
}
