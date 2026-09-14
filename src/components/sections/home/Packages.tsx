import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { PackageMatrix } from "@/components/diagrams/PackageMatrix";
import { priceSummary } from "@/content/founding";
import { routes } from "@/config/brand";
import styles from "./Packages.module.css";

export function Packages() {
  return (
    <Section tone="paper-2" aria-labelledby="packages-title" className={styles.section}>
      <Container>
        <SectionHeader
          index="13"
          eyebrow="Founding customer pricing"
          id="packages-title"
          title="Build it once. Run it when you want."
          lead="Founding customer pricing during the early launch period, set lower on purpose while the product proves itself. Each package contains the one before it, so starting small never means rebuilding later."
        />
        {/*
         * The figures sit here rather than in the headline. A headline that tries
         * to carry the whole model has to compress it, and the compression drops
         * activation, which makes Build & Run read as $299 a month and nothing else.
         */}
        <dl className={styles.summary}>
          {priceSummary.map((p) => (
            <div key={p.label} className={styles.summaryItem}>
              <dt className={styles.summaryLabel}>{p.label}</dt>
              <dd className={styles.summaryFigure}>{p.figure}</dd>
            </div>
          ))}
        </dl>
        <PackageMatrix compact />
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Government, provider and third-party fees are separate where they apply, and each is approved by you
            before it is bought. No revenue share, no percentage of sales, no equity.
          </p>
          <Button href={routes.pricing} variant="ghost" arrow>
            See pricing and full inclusions
          </Button>
        </div>
      </Container>
    </Section>
  );
}
