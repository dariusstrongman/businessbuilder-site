import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { JourneyRail } from "@/components/diagrams/JourneyRail";
import { Button } from "@/components/primitives/Button";
import { routes } from "@/config/brand";
import styles from "./Journey.module.css";

export function Journey() {
  return (
    <Section tone="ink" aria-labelledby="journey-title" className={styles.section}>
      <Container>
        <div className={styles.head}>
          <SectionHeader
            index="04"
            eyebrow="The journey"
            id="journey-title"
            title="Fifteen stages. Three of them at once."
            lead="The whole path, from wherever you are starting. Hollow markers are yours and nothing moves past them without you. The bracketed band is where assembly, your Founder Actions and verification all run at the same time."
          />
          <div className={styles.headAction}>
            <Button href={routes.howItWorks} variant="secondary" arrow>
              Walk through each stage
            </Button>
          </div>
        </div>
        <JourneyRail />
      </Container>
    </Section>
  );
}
