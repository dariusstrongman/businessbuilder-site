import { Container, Eyebrow, Heading, Section } from "@/components/primitives/Layout";
import { FounderActionCard } from "@/components/product/FounderActionCard";
import { founderActions } from "@/content/buildRoom";
import styles from "./FounderActions.module.css";

export function FounderActions({ index = "07" }: { index?: string }) {
  const featured = founderActions.find((a) => a.id === "processor-identity") ?? founderActions[0];
  const featuredIndex = founderActions.indexOf(featured) + 1;
  const others = founderActions.filter((a) => a.id !== featured.id);

  return (
    <Section aria-labelledby="founder-title" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow index={index}>Founder Actions</Eyebrow>
            <Heading id="founder-title" level={2}>
              Some things only you can do. We make them small.
            </Heading>
            <p className={styles.text}>
              A payment processor has to verify the account owner. A bank account has to be in your name. A legal name
              has to be chosen by you. We cannot do these for you, and you should not want a service that could.
            </p>
            <p className={styles.text}>
              So each one becomes a Founder Action: prepared as far as it can be, explained in plain language, with the
              exact steps and the time it takes. The build keeps moving around it.
            </p>
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
