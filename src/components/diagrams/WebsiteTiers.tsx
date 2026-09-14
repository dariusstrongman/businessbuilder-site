import { Button } from "@/components/primitives/Button";
import { CheckIcon } from "@/components/primitives/Icons";
import { tierNotes, websiteTiers } from "@/content/websiteTiers";
import { routes } from "@/config/brand";
import { cn } from "@/lib/cn";
import styles from "./WebsiteTiers.module.css";

/** The three real website project prices, carried over from the studio's published rates. */
export function WebsiteTiers({ showNotes = true }: { showNotes?: boolean }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.tiers} role="group" aria-label="Website project tiers" tabIndex={0}>
        {websiteTiers.map((t) => (
          <article key={t.id} className={cn(styles.tier, t.emphasis && styles.emphasis)} aria-labelledby={`tier-${t.id}`}>
            <header className={styles.head}>
              <h3 id={`tier-${t.id}`} className={styles.name}>
                {t.name}
              </h3>
              <p className={styles.price}>{t.price}</p>
              <p className={styles.cadence}>{t.cadence}</p>
            </header>
            <p className={styles.pages}>{t.pages}</p>
            <p className={styles.bestFor}>{t.bestFor}</p>
            <div className={styles.includes}>
              <h4 className={styles.includesLabel}>{t.includesLabel}</h4>
              <ul className={styles.list}>
                {t.includes.map((i) => (
                  <li key={i}>
                    <span className={styles.check} aria-hidden>
                      <CheckIcon />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <Button
              href={`${routes.start}?package=website&tier=${t.id}`}
              variant={t.emphasis ? "primary" : "secondary"}
              className={styles.cta}
              arrow
            >
              Start {t.name}
            </Button>
          </article>
        ))}
      </div>
      {showNotes ? (
        <ul className={styles.notes}>
          {tierNotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
