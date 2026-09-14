import { CheckIcon } from "@/components/primitives/Icons";
import styles from "./SiteFrame.module.css";

type Props = {
  /** The business type the mock site is for. */
  archetype?: string;
  headline?: string;
  services?: string[];
  domain?: string;
};

/**
 * A UI-native stand-in for a built website: browser chrome, the page structure we build,
 * and the verification stamp. Not a screenshot of a real customer site.
 */
export function SiteFrame({
  archetype = "Mobile detailing",
  headline = "Detailing that comes to your driveway.",
  services = ["Interior refresh", "Exterior detail", "Full detail", "Ceramic coating"],
  domain = "yourcompany.com",
}: Props) {
  return (
    <div className={styles.frame} role="img" aria-label={`Mock of a ${archetype.toLowerCase()} website built by Business Builder, verified live on ${domain}`}>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>
          <span className={styles.lock} aria-hidden />
          {domain}
        </span>
        <span className={styles.stamp}>
          <CheckIcon /> Verified live
        </span>
      </div>
      <div className={styles.page}>
        <div className={styles.nav}>
          <span className={styles.wordmark}>Your company</span>
          <span className={styles.navLinks}>
            <i>Services</i>
            <i>Pricing</i>
            <i>Areas</i>
            <i>About</i>
          </span>
          <span className={styles.navCta}>Get a quote</span>
        </div>
        <div className={styles.hero}>
          <span className={styles.kicker}>{archetype} · Your city</span>
          <span className={styles.headline}>{headline}</span>
          <span className={styles.sub}>
            <i />
            <i />
          </span>
          <span className={styles.heroActions}>
            <span className={styles.btnPrimary}>Book online</span>
            <span className={styles.btnSecondary}>See pricing</span>
          </span>
        </div>
        <div className={styles.services}>
          {services.map((s) => (
            <span key={s} className={styles.service}>
              <span className={styles.serviceName}>{s}</span>
              <span className={styles.serviceLine} />
            </span>
          ))}
        </div>
        <div className={styles.form}>
          <span className={styles.formTitle}>Get a quote</span>
          <span className={styles.formRow}>
            <i />
            <i />
          </span>
          <span className={styles.formRow}>
            <i />
          </span>
          <span className={styles.formSubmit}>Send</span>
        </div>
      </div>
    </div>
  );
}
