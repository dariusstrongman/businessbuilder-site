import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { CheckIcon } from "@/components/primitives/Icons";
import { VerificationLadder } from "@/components/diagrams/VerificationLadder";
import { readiness } from "@/content/buildRoom";
import { cn } from "@/lib/cn";
import styles from "./Verification.module.css";

export function Verification({ index = "07" }: { index?: string }) {
  return (
    <Section tone="ink" aria-labelledby="verification-title" className={styles.section}>
      <Container>
        <SectionHeader
          index={index}
          eyebrow="Verification"
          id="verification-title"
          title="Bought is not the same as done."
          lead="Most services stop at Executed: the account exists, the form is on the page. We keep going until what you should see is what you see, and we keep the evidence."
        />

        <VerificationLadder />

        <div className={styles.readiness}>
          <div className={styles.state}>
            <span className={styles.stateKicker}>Milestone 01</span>
            <h3 className={styles.stateTitle}>{readiness.ready.label}</h3>
            <p className={styles.stateText}>{readiness.ready.definition}</p>
            <ul className={styles.checks}>
              {readiness.ready.checks.map((c) => (
                <li key={c}>
                  <span className={styles.checkBox} aria-hidden>
                    <CheckIcon />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className={cn(styles.state, styles.stateFinal)}>
            <span className={styles.stateKicker}>Milestone 02</span>
            <h3 className={styles.stateTitle}>{readiness.fullySet.label}</h3>
            <p className={styles.stateText}>{readiness.fullySet.definition}</p>
            <ul className={styles.checks}>
              {readiness.fullySet.checks.map((c) => (
                <li key={c}>
                  <span className={styles.checkBox} aria-hidden>
                    <CheckIcon />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
