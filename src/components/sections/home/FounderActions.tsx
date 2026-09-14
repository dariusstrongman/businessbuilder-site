import { Container, Eyebrow, Heading, Section } from "@/components/primitives/Layout";
import { FounderActionCard } from "@/components/product/FounderActionCard";
import { founderActions } from "@/content/buildRoom";
import { ownerLabels, ownerMeaning, type Owner } from "@/content/turnkey";
import styles from "./FounderActions.module.css";

const owners: Owner[] = ["builder", "founder", "external"];

export function FounderActions({ index = "08" }: { index?: string }) {
  const featured = founderActions.find((a) => a.id === "processor-identity") ?? founderActions[0];
  const featuredIndex = founderActions.indexOf(featured) + 1;
  const others = founderActions.filter((a) => a.id !== featured.id);

  return (
    <Section aria-labelledby="founder-title" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow index={index}>Who does what</Eyebrow>
            <Heading id="founder-title" level={2}>
              Three kinds of task. Only one is yours.
            </Heading>
            <p className={styles.text}>
              A payment processor has to verify the account owner. A bank account has to be opened by the person who
              owns it. A tax authority issues a number to you, not to an agent acting as you. We cannot do these, and
              you should not want a service that could.
            </p>

            <dl className={styles.owners}>
              {owners.map((o) => (
                <div key={o} className={styles.owner} data-owner={o}>
                  <dt className={styles.ownerLabel}>
                    <span className={styles.ownerMark} aria-hidden />
                    {ownerLabels[o]}
                  </dt>
                  <dd className={styles.ownerText}>{ownerMeaning[o]}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.others}>
              <h3 className={styles.othersTitle}>Other typical Founder Actions</h3>
              <ul className={styles.othersList}>
                {others.map((a) => (
                  <li key={a.id} className={styles.other}>
                    <span className={styles.otherTitle}>{a.title}</span>
                    <span className={styles.otherTime}>~{a.minutes} min</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.cardWrap}>
            <FounderActionCard action={featured} index={featuredIndex} total={founderActions.length} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
