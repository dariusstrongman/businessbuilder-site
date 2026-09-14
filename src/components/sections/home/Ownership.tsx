import { Accent, Container, Eyebrow, Heading, Section } from "@/components/primitives/Layout";
import { ownership } from "@/content/buildRoom";
import styles from "./Ownership.module.css";

export function Ownership({ index = "10" }: { index?: string }) {
  return (
    <Section aria-labelledby="ownership-title" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow index={index}>Ownership</Eyebrow>
            <Heading id="ownership-title" level={2}>
              It stays <Accent>yours</Accent>.
            </Heading>
            <p className={styles.text}>
              Everything we build is registered to you, exported on request, and documented in an ownership record you
              receive at handoff. There is no version of this where the company depends on us.
            </p>
            <p className={styles.textStrong}>If Build & Run stops, the workers stop. The company does not.</p>
          </div>
          <dl className={styles.assets}>
            {ownership.map((o) => (
              <div key={o.asset} className={styles.asset}>
                <dt className={styles.assetName}>{o.asset}</dt>
                <dd className={styles.assetNote}>{o.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
