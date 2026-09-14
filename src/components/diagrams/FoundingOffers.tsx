import { Button } from "@/components/primitives/Button";
import { CheckIcon } from "@/components/primitives/Icons";
import { checkoutTruth, offers, type Offer } from "@/content/founding";
import { routes } from "@/config/brand";
import { cn } from "@/lib/cn";
import styles from "./FoundingOffers.module.css";

const startHref: Record<Offer["id"], string> = {
  website: `${routes.start}?package=website`,
  business: `${routes.start}?package=business`,
  bundle: `${routes.start}?package=run`,
  existing: `${routes.start}?package=run&from=existing`,
  run: `${routes.start}?package=run`,
};

type Props = {
  /** "headline" shows the three main offers; "all" adds the existing-business route. */
  variant?: "headline" | "all";
};

/**
 * Four ways in, priced. The upfront figure and the monthly figure sit in one
 * block so the relationship between them is never split across a scroll.
 */
export function FoundingOffers({ variant = "all" }: Props) {
  const list = variant === "headline" ? offers.filter((o) => o.id !== "existing") : offers;

  return (
    <div className={styles.wrap}>
      {/* Below the grid breakpoint the offers are a carousel. The peeking card is
          an affordance, but it is not a label, and a visitor who misses it never
          sees three of the four prices. */}
      <p className={styles.swipe} aria-hidden>
        Scroll for all {list.length}
      </p>
      <div className={styles.offers} role="group" aria-label="Founding customer pricing" tabIndex={0}>
        {list.map((offer) => (
          <article key={offer.id} className={cn(styles.offer, offer.emphasis && styles.emphasis)} aria-labelledby={`offer-${offer.id}`}>
            <header className={styles.head}>
              <span className={styles.plain}>{offer.plain}</span>
              <h3 id={`offer-${offer.id}`} className={styles.name}>
                {offer.name}
              </h3>
            </header>

            <div className={styles.price}>
              <span className={styles.figures}>
                {offer.upfrontPrefix ? <span className={styles.prefix}>{offer.upfrontPrefix}</span> : null}
                <span className={styles.upfront}>{offer.upfront}</span>
                {offer.monthly ? (
                  <span className={styles.monthly}>
                    <span className={styles.plus} aria-hidden>
                      +
                    </span>
                    {offer.monthly}
                    <span className={styles.per}>/month</span>
                  </span>
                ) : null}
              </span>
              <span className={styles.priceLabel}>
                {offer.upfrontLabel}
                {offer.monthly ? ", then monthly while it runs" : ""}
              </span>
              {offer.note ? <p className={styles.note}>{offer.note}</p> : null}
            </div>

            <p className={styles.audience}>{offer.audience}</p>
            <p className={styles.summary}>{offer.summary}</p>

            <ul className={styles.list}>
              {offer.includes.map((i) => (
                <li key={i}>
                  <span className={styles.check} aria-hidden>
                    <CheckIcon />
                  </span>
                  {i}
                </li>
              ))}
            </ul>

            <Button href={startHref[offer.id]} variant={offer.emphasis ? "primary" : "secondary"} className={styles.cta} arrow>
              Start a build
            </Button>
          </article>
        ))}
      </div>

      <p className={styles.truth}>
        <span className={styles.truthMark} aria-hidden />
        {checkoutTruth}
      </p>
    </div>
  );
}
