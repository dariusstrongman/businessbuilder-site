import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { PackageMatrix } from "@/components/diagrams/PackageMatrix";
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
          title="$795 or $1,495 to build. $299 a month to run it."
          lead="Founding customer pricing during the early launch period, set lower on purpose while the product proves itself. Each package contains the one before it, so starting small never means rebuilding later."
        />
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
