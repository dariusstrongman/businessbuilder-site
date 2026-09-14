import { Container, Eyebrow, Heading, Section } from "@/components/primitives/Layout";
import { fragmentation } from "@/content/buildRoom";
import { cn } from "@/lib/cn";
import styles from "./Fragmentation.module.css";

export function Fragmentation() {
  return (
    <Section aria-labelledby="fragmentation-title" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow index="02">The problem</Eyebrow>
            <Heading id="fragmentation-title" level={2}>
              Starting a real business is ten jobs.
            </Heading>
            <p className={styles.text}>
              A name and a position. A website that gets found. A domain, business email, a way to be booked and a way
              to be paid. A CRM you will actually use. The legal steps nobody explains.
            </p>
            <p className={styles.text}>
              Most founders end up coordinating six vendors, four subscriptions and a spreadsheet. And then nobody
              checks that the pieces work together.
            </p>
          </div>

          <div className={styles.ledger} role="table" aria-label="The jobs of starting a business and who normally does them">
            <div className={styles.ledgerHead} role="row">
              <span role="columnheader">The job</span>
              <span role="columnheader">Who normally does it</span>
            </div>
            {fragmentation.map((row, i) => (
              <div key={row.job} className={cn(styles.row, row.punchline && styles.punchline)} role="row">
                <span className={styles.index} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.job} role="cell">
                  {row.job}
                </span>
                <span className={styles.who} role="cell">
                  {row.who}
                </span>
              </div>
            ))}
            <p className={styles.resolve}>
              <span className={styles.resolveMark} aria-hidden />
              Business Builder does all ten in one build, and checks every one.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
