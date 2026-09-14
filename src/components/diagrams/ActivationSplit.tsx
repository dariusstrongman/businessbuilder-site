import { CheckIcon } from "@/components/primitives/Icons";
import { activation, runStandalone } from "@/content/founding";
import { cn } from "@/lib/cn";
import styles from "./ActivationSplit.module.css";

/**
 * Two fees, two jobs. Activation buys durable configuration that survives
 * cancellation; the monthly plan buys the operating layer. Shown side by side
 * because the difference only lands when you can compare them.
 */
export function ActivationSplit({ className }: { className?: string }) {
  const columns = [
    { key: "setup", price: runStandalone.activation, unit: "once", ...activation.setup },
    { key: "ongoing", price: runStandalone.monthly, unit: "per month", ...activation.ongoing },
  ];

  return (
    <div className={cn(styles.split, className)}>
      {columns.map((col) => (
        <section key={col.key} className={cn(styles.column, styles[col.key])} aria-labelledby={`act-${col.key}`}>
          <header className={styles.head}>
            <h3 id={`act-${col.key}`} className={styles.label}>
              {col.label}
            </h3>
            <span className={styles.price}>
              {col.price}
              <span className={styles.unit}>{col.unit}</span>
            </span>
            <p className={styles.note}>{col.note}</p>
          </header>
          <ul className={styles.items}>
            {col.items.map((i) => (
              <li key={i}>
                <span className={styles.check} aria-hidden>
                  <CheckIcon />
                </span>
                {i}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className={styles.boundary}>
        <span className={styles.boundaryMark} aria-hidden />
        {activation.boundary}
      </p>
    </div>
  );
}
