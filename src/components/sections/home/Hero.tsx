import { Container, Eyebrow } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { IntakeField } from "@/components/product/IntakeField";
import { BuildRoom } from "@/components/product/BuildRoom";
import { cta, routes } from "@/config/brand";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow>An idea, or a business you already run</Eyebrow>
            <h1 id="hero-title" className={styles.title}>
              Describe the company you want.
              <span className={styles.promise}>We build it, verify it, and hand you the keys.</span>
            </h1>
            <p className={styles.lead}>
              Start with an idea, a half-finished setup, or a business that already trades. We research it, keep what
              already works, assemble the rest, verify every part and hand over a company you own. Built for service
              businesses: cleaning, detailing, lawn care, painting, photography and more.
            </p>
            <IntakeField size="lg" />
            <div className={styles.secondary}>
              <Button href={routes.howItWorks} variant="ghost" arrow>
                {cta.secondary}
              </Button>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.plan} aria-hidden />
            <BuildRoom variant="compact" className={styles.room} />
            <p className={styles.caption}>
              <span className={styles.captionMark} aria-hidden />
              The Build Room. You watch each system move from Proposed to Verified while the company is assembled.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
