import { Accent, Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { CheckIcon } from "@/components/primitives/Icons";
import { generatedVsBuilt } from "@/content/buildRoom";
import styles from "./BuiltNotGenerated.module.css";

export function BuiltNotGenerated() {
  return (
    <Section tone="paper-2" aria-labelledby="built-title" className={styles.section}>
      <Container>
        <SectionHeader
          index="05"
          eyebrow="The difference"
          id="built-title"
          title={
            <>
              Generated is a file. Built is a <Accent>business</Accent>.
            </>
          }
          lead="AI can produce a website, a logo and a plan in minutes. None of that is a company. A company is systems that are connected, tested and proven to work for a real customer."
        />
        <div className={styles.columns}>
          <div className={styles.col}>
            <h3 className={styles.colTitle}>What a generator hands you</h3>
            <ul className={styles.list}>
              {generatedVsBuilt.generated.map((item) => (
                <li key={item} className={styles.generatedItem}>
                  <span className={styles.hollow} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.col} ${styles.colBuilt}`}>
            <h3 className={styles.colTitle}>What Business Builder hands over</h3>
            <ul className={styles.list}>
              {generatedVsBuilt.built.map((item) => (
                <li key={item.item} className={styles.builtItem}>
                  <span className={styles.check} aria-hidden>
                    <CheckIcon />
                  </span>
                  <span className={styles.builtText}>
                    <span className={styles.builtName}>{item.item}</span>
                    <span className={styles.evidence}>
                      <span className={styles.evidenceLabel}>Verified</span>
                      {item.evidence}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
