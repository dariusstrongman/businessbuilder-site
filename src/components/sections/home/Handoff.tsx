import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { HandoffFork } from "@/components/diagrams/HandoffFork";
import styles from "./Handoff.module.css";

export function Handoff({ index = "08" }: { index?: string }) {
  return (
    <Section aria-labelledby="handoff-title" className={styles.section}>
      <Container>
        <SectionHeader
          index={index}
          eyebrow="Handoff"
          id="handoff-title"
          title="Then you decide."
          lead="When the company is Ready or Fully Set, there are two ways forward. Both start from the same fact: it is your company."
          align="center"
        />
        <HandoffFork />
      </Container>
    </Section>
  );
}
