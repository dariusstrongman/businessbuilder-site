import type { Worker } from "@/content/workers";
import { CheckIcon, CloseIcon } from "@/components/primitives/Icons";
import { cn } from "@/lib/cn";
import styles from "./PermissionsCard.module.css";

type Props = {
  worker: Worker;
  className?: string;
};

/** A worker's permissions card: can, must ask, cannot. Deliberately unglamorous. */
export function PermissionsCard({ worker, className }: Props) {
  return (
    <article className={cn(styles.card, className)} aria-label={`Permissions for ${worker.name}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>AI worker · Permissions</span>
        <h3 className={styles.title}>{worker.name}</h3>
        <p className={styles.job}>{worker.job}</p>
      </header>
      <div className={styles.columns}>
        <div className={styles.col}>
          <h4 className={cn(styles.colTitle, styles.can)}>Can</h4>
          <ul className={styles.list}>
            {worker.can.map((c) => (
              <li key={c}>
                <span className={cn(styles.mark, styles.markCan)} aria-hidden>
                  <CheckIcon />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <h4 className={cn(styles.colTitle, styles.ask)}>Must ask you</h4>
          <ul className={styles.list}>
            {worker.mustAsk.map((c) => (
              <li key={c}>
                <span className={cn(styles.mark, styles.markAsk)} aria-hidden>
                  ?
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <h4 className={cn(styles.colTitle, styles.cannot)}>Cannot</h4>
          <ul className={styles.list}>
            {worker.cannot.map((c) => (
              <li key={c}>
                <span className={cn(styles.mark, styles.markCannot)} aria-hidden>
                  <CloseIcon />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className={styles.foot}>
        <dl className={styles.meta}>
          <div>
            <dt>Monthly budget</dt>
            <dd>Cap set by you</dd>
          </div>
          <div>
            <dt>Approval threshold</dt>
            <dd>Set by you</dd>
          </div>
          <div>
            <dt>Context</dt>
            <dd>Your services, price book, service area, tone</dd>
          </div>
          <div>
            <dt>Escalation</dt>
            <dd>To you, then to a person at Business Builder</dd>
          </div>
        </dl>
      </footer>
    </article>
  );
}
