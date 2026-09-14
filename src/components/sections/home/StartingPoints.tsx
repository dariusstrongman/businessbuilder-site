import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { StartingPointPicker } from "@/components/diagrams/StartingPointPicker";
import { startingPointCopy } from "@/content/startingPoints";
import styles from "./StartingPoints.module.css";

export function StartingPoints({ index = "01" }: { index?: string }) {
  return (
    <Section aria-labelledby="starting-title" className={styles.section}>
      <Container>
        <SectionHeader
          index={index}
          eyebrow={startingPointCopy.eyebrow}
          id="starting-title"
          title={startingPointCopy.title}
          lead={startingPointCopy.lead}
        />
        <StartingPointPicker />
      </Container>
    </Section>
  );
}
