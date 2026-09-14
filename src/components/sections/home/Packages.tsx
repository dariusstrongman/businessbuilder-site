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
          eyebrow="Three ways to start"
          id="packages-title"
          title="Start with the website, the business, or the business that runs."
          lead="Each package contains the one before it. You can start small and move up without rebuilding anything."
        />
        <PackageMatrix compact />
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Pricing is published on the pricing page with full inclusions. No countdowns, no crossed-out numbers.
          </p>
          <Button href={routes.pricing} variant="ghost" arrow>
            See pricing and full inclusions
          </Button>
        </div>
      </Container>
    </Section>
  );
}
