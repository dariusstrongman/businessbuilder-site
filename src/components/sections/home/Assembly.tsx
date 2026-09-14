import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { CompanyAssembly } from "@/components/diagrams/CompanyAssembly";
import { TurnkeyLanes } from "@/components/diagrams/TurnkeyLanes";
import { ArrowIcon } from "@/components/primitives/Icons";
import { assemblyCopy } from "@/content/assembly";
import { turnkeyLanes } from "@/content/turnkey";
import { routes } from "@/config/brand";
import styles from "./Assembly.module.css";

export function Assembly({ index = "03" }: { index?: string }) {
  const total = turnkeyLanes.reduce((n, l) => n + l.items.length, 0);

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

        <div className={styles.scope}>
          <div className={styles.scopeHead}>
            <h3 className={styles.scopeTitle}>That is one lane of six.</h3>
            <p className={styles.scopeLead}>
              The customer path above is the part a stranger walks. Behind it sit the company itself, how it is
              recognised, how it runs, how it is found locally, and the proof that all of it is yours. {total} items in
              an agreed build, each with a named owner.
            </p>
            <Link href={routes.buildMyBusiness} className={styles.scopeLink}>
              See the full scope
              <ArrowIcon />
            </Link>
          </div>
          <TurnkeyLanes variant="index" />
        </div>
      </Container>
    </Section>
  );
}
