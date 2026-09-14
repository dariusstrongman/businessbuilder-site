import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { HandoffFork } from "@/components/diagrams/HandoffFork";
import { Accent } from "@/components/primitives/Layout";
import { ownership } from "@/content/buildRoom";
import styles from "./Handoff.module.css";

export function Handoff({ index = "10" }: { index?: string }) {
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

        <div className={styles.ownership}>
          <div className={styles.ownershipHead}>
            <h3 className={styles.ownershipTitle}>
              Either way, it stays <Accent>yours</Accent>.
            </h3>
            <p className={styles.ownershipText}>
              Everything we build is registered to you, exported on request, and documented in an ownership record you
              receive at handoff. If Build &amp; Run stops, the workers stop. The company does not.
            </p>
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
