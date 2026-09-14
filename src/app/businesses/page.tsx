import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { ArchetypeExplorer } from "@/components/diagrams/ArchetypeExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { archetypes } from "@/content/archetypes";
import { cta, routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Supported businesses",
  description:
    "Ten kinds of service business, each with its own quote logic, scheduling shape, Founder Actions and verifications: cleaning, detailing, pressure washing, lawn care, window cleaning, junk removal, carpet cleaning, painting, pet services, photography and videography.",
};

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="Supported businesses"
        title="Ten kinds of service business, built specifically."
        lead="Each type has its own quote logic, scheduling shape, Founder Actions and verifications. Pick one to see what changes in the build. If your business is close to one of these, it is supported."
        actions={
          <Button href={routes.start} arrow>
            {cta.primary}
          </Button>
        }
      />

      <Section aria-labelledby="explorer-title" flushTop>
        <Container>
          <h2 id="explorer-title" className="sr-only">
            Explore the supported business types
          </h2>
          <ArchetypeExplorer />
        </Container>
      </Section>

      <Section aria-labelledby="all-title" tone="paper-2">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="Every type"
            id="all-title"
            title="Not on the list?"
            lead="These ten are what the system understands in depth today. Depth is the point: a build that guesses at your business is worse than no build. If yours is adjacent to one of these, describe it and we will tell you honestly whether we can do it well."
          />
          <ul className={styles.all}>
            {archetypes.map((a, i) => (
              <li key={a.slug} className={styles.allItem}>
                <Link href={`${routes.businesses}/${a.slug}`} className={styles.allLink}>
                  <span className={styles.allIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.allName}>{a.name}</span>
                  <span className={styles.allOps}>{a.operations}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
