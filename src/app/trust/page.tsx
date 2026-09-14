import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { CtaBand } from "@/components/sections/CtaBand";
import { comparison, concerns } from "@/content/trustDetail";
import { honestScope } from "@/content/trust";
import { routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Trust and verification",
  description:
    "Every concern a careful founder has, answered: AI quality, ownership, verification, permissions, spending limits, approvals, customer data, reversibility, human escalation, and what we do not claim.",
};

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust and verification"
        title="What you can hold us to."
        lead="We are a new company asking you to trust us with yours. We would rather show the system than borrow credibility, so there are no testimonials or logos here. There are answers, and the limits of those answers."
        actions={
          <Button href={routes.product} variant="ghost" arrow>
            See the Build Room
          </Button>
        }
      />

      <Section aria-labelledby="concerns-title">
        <Container>
          <h2 id="concerns-title" className="sr-only">
            Concerns and answers
          </h2>
          <ol className={styles.concerns}>
            {concerns.map((c, i) => (
              <li key={c.id} id={c.id} className={styles.concern}>
                <div className={styles.question}>
                  <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.q}>{c.question}</h3>
                </div>
                <div className={styles.answer}>
                  <p className={styles.a}>{c.answer}</p>
                  <ul className={styles.detail}>
                    {c.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="compare-title" tone="ink">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="How we differ"
            id="compare-title"
            title="Broader than a generator. More complete than a filing."
            lead="This is not a scoreboard. Each of these does its job. Ours is a different job."
          />
          <div className={styles.compare} role="table" aria-label="How Business Builder differs">
            <div className={styles.compareHead} role="row">
              <span role="columnheader">Kind of service</span>
              <span role="columnheader">What they do</span>
              <span role="columnheader">What we do</span>
            </div>
            {comparison.map((row) => (
              <div key={row.kind} className={styles.compareRow} role="row">
                <span className={styles.compareKind} role="cell">
                  {row.kind}
                </span>
                <span className={styles.compareThey} role="cell">
                  {row.they}
                </span>
                <span className={styles.compareWe} role="cell">
                  {row.we}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="scope-title" tone="paper-2">
        <Container>
          <div className={styles.scopeGrid}>
            <SectionHeader index="03" eyebrow="Honest scope" id="scope-title" title="What we do not claim." />
            <ul className={styles.scope}>
              {honestScope.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li>We are a new company. The evidence log is how you check us, and it is yours from day one.</li>
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
