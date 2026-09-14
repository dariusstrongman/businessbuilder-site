import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Faq } from "@/components/primitives/Faq";
import { CheckIcon } from "@/components/primitives/Icons";
import { FoundingOffers } from "@/components/diagrams/FoundingOffers";
import { ActivationSplit } from "@/components/diagrams/ActivationSplit";
import { PackageMatrix } from "@/components/diagrams/PackageMatrix";
import { CtaBand } from "@/components/sections/CtaBand";
import { packages } from "@/content/packages";
import { compareGroups, pricingFaq } from "@/content/pricing";
import { activation, costBoundaries, foundingCopy } from "@/content/founding";
import { routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Founding customer pricing. Build my website $795. Build my business $1,495. Build it and run it $1,995 upfront plus $299 a month. Existing businesses from $1,495 plus $299 a month.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow={foundingCopy.label}
        title={foundingCopy.headline}
        lead={foundingCopy.lead}
        actions={
          <Button href={routes.howItWorks} variant="ghost" arrow>
            How a build works
          </Button>
        }
      />

      <Section aria-labelledby="offers-title" tone="paper-2" flushTop>
        <Container>
          <h2 id="offers-title" className="sr-only">
            Founding customer pricing
          </h2>
          <FoundingOffers variant="all" />
          <p className={styles.honesty}>
            <span className={styles.honestyMark} aria-hidden />
            {foundingCopy.honesty}
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="activation-title">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="Two fees, two jobs"
            id="activation-title"
            title={activation.title}
            lead={activation.lead}
          />
          <ActivationSplit />
        </Container>
      </Section>

      <Section aria-labelledby="boundaries-title" tone="paper-2">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="What the price does and does not cover"
            id="boundaries-title"
            title="The boundaries, stated up front."
            lead="A price is only honest if the edges of it are visible. These are the four that matter most, and none of them changes after you have paid."
          />
          <dl className={styles.boundaries}>
            {costBoundaries.map((b, i) => (
              <div key={b.id} className={styles.boundary}>
                <dt className={styles.boundaryTitle}>
                  <span className={styles.boundaryIndex}>{String(i + 1).padStart(2, "0")}</span>
                  {b.title}
                </dt>
                <dd className={styles.boundaryText}>{b.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section aria-labelledby="compare-title">
        <Container>
          <SectionHeader
            index="03"
            eyebrow="Side by side"
            id="compare-title"
            title="What changes between packages."
            lead="Every row is something you receive, or do not. Where a package includes a narrower version, the cell says so."
          />
          <div className={styles.matrixWrap}>
            <PackageMatrix />
          </div>
          {/* Focusable so the comparison can be scrolled by keyboard on narrow screens. */}
          <div className={styles.tableWrap} role="region" aria-label="Package comparison" tabIndex={0}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col" className={styles.thLabel} aria-label="Inclusion" />
                  {packages.map((p) => (
                    <th key={p.id} scope="col" className={styles.thPackage}>
                      <span className={styles.thIndex}>0{packages.indexOf(p) + 1}</span>
                      {p.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              {compareGroups.map((group) => (
                <tbody key={group.label}>
                  <tr className={styles.groupRow}>
                    <th scope="rowgroup" colSpan={packages.length + 1}>
                      {group.label}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className={styles.rowLabel}>
                        {row.label}
                      </th>
                      {packages.map((p) => {
                        const cell = row.cells[p.id];
                        return (
                          <td key={p.id} className={styles.cell}>
                            {cell === true ? (
                              <span className={styles.yes} role="img" aria-label="Included">
                                <CheckIcon />
                              </span>
                            ) : cell === false ? (
                              <span className={styles.no} aria-label="Not included">
                                —
                              </span>
                            ) : (
                              <span className={styles.partial}>{cell}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="faq-title" tone="paper-2">
        <Container>
          <div className={styles.faqGrid}>
            <SectionHeader index="04" eyebrow="Questions" id="faq-title" title="Straight answers." />
            <Faq items={pricingFaq} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
