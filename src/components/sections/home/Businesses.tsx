import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { ArrowIcon } from "@/components/primitives/Icons";
import { archetypes } from "@/content/archetypes";
import { routes } from "@/config/brand";
import styles from "./Businesses.module.css";

export function Businesses() {
  return (
    <Section aria-labelledby="businesses-title" className={styles.section}>
      <Container>
        <div className={styles.head}>
          <SectionHeader
            index="12"
            eyebrow="Supported businesses"
            id="businesses-title"
            title="Built for ten kinds of service business."
            lead="Each one has its own quote logic, scheduling shape, founder actions and verifications. The system is built to know the difference, not to guess it."
          />
          <div className={styles.headAction}>
            <Button href={routes.businesses} variant="secondary" arrow>
              See what we build for each
            </Button>
          </div>
        </div>
        <ul className={styles.grid}>
          {archetypes.map((a, i) => (
            <li key={a.slug} className={styles.cell}>
              <Link href={`${routes.businesses}/${a.slug}`} className={styles.link}>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.name}>{a.name}</span>
                <span className={styles.ops}>{a.operations}</span>
                {a.variants ? <span className={styles.variants}>{a.variants.join(" · ")}</span> : null}
                <ArrowIcon className={styles.arrow} />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
