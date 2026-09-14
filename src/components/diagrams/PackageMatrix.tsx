import { Button } from "@/components/primitives/Button";
import { CheckIcon, PlusIcon } from "@/components/primitives/Icons";
import { packages } from "@/content/packages";
import { cn } from "@/lib/cn";
import styles from "./PackageMatrix.module.css";

type Props = {
  /** Compact for the homepage; full on the pricing page. */
  compact?: boolean;
};

export function PackageMatrix({ compact = false }: Props) {
  return (
    // Below the desktop breakpoint this is a snapping carousel, so it must be keyboard-scrollable.
    // A group rather than a region: it is not a landmark, so it cannot collide with the section's name.
    <div className={cn(styles.matrix, compact && styles.compact)} role="group" aria-label="The three packages" tabIndex={0}>
      {packages.map((p, i) => (
        <article key={p.id} className={cn(styles.package, p.emphasis && styles.emphasis)} aria-labelledby={`pkg-${p.id}`}>
          {i > 0 ? (
            <span className={styles.connector} aria-hidden>
              <PlusIcon />
            </span>
          ) : null}
          <header className={styles.head}>
            <span className={styles.kicker}>
              <span className={styles.kickerIndex}>0{i + 1}</span>
              {p.shortName}
              {p.emphasis ? <span className={styles.badge}>Most complete</span> : null}
            </span>
            <h3 id={`pkg-${p.id}`} className={styles.name}>
              {p.name}
            </h3>
            <p className={styles.audience}>{p.audience}</p>
          </header>
          <div className={styles.model}>
            <span className={styles.modelLabel}>Pricing model</span>
            <span className={styles.modelValue}>{p.model}</span>
          </div>
          <div className={styles.includes}>
            {p.includesLabel ? <span className={styles.includesLabel}>{p.includesLabel}</span> : <span className={styles.includesLabel}>Includes</span>}
            <ul className={styles.list}>
              {(compact ? p.includes.slice(0, 6) : p.includes).map((item) => (
                <li key={item}>
                  <span className={styles.check} aria-hidden>
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
              {compact && p.includes.length > 6 ? (
                <li className={styles.more}>+ {p.includes.length - 6} more</li>
              ) : null}
            </ul>
          </div>
          <footer className={styles.foot}>
            <p className={styles.outcome}>{p.outcome}</p>
            <Button href={p.href} variant={p.emphasis ? "primary" : "secondary"} arrow className={styles.cta}>
              {p.ctaLabel}
            </Button>
          </footer>
        </article>
      ))}
    </div>
  );
}
