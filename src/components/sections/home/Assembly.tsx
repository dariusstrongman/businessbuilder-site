import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { CompanyAssembly } from "@/components/diagrams/CompanyAssembly";
import { assemblyCopy } from "@/content/assembly";
import styles from "./Assembly.module.css";

export function Assembly({ index = "02" }: { index?: string }) {
  return (
    <Section aria-labelledby="assembly-title" className={styles.section}>
      <Container>
        <SectionHeader
          index={index}
          eyebrow={assemblyCopy.eyebrow}
          id="assembly-title"
          title={assemblyCopy.title}
          lead={assemblyCopy.lead}
        />
        <CompanyAssembly />
        <p className={styles.closing}>
          <span className={styles.closingMark} aria-hidden />
          {assemblyCopy.closing}
        </p>
      </Container>
    </Section>
  );
}
