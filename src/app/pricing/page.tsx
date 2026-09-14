import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Faq } from "@/components/primitives/Faq";
import { CheckIcon } from "@/components/primitives/Icons";
import { PackageMatrix } from "@/components/diagrams/PackageMatrix";
import { CtaBand } from "@/components/sections/CtaBand";
import { packages } from "@/content/packages";
import { compareGroups, pricingFaq } from "@/content/pricing";
import { routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three packages: Build my professional website, Build my business, and Build & run my business. One-time builds, a monthly fee for operations, no invented discounts.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Three packages. Each one contains the last."
        lead="Website and Business are one-time builds. Build & Run adds monthly operations. Prices will be published here; the structure and inclusions below are fixed now."
        actions={
          <Button href={routes.howItWorks} variant="ghost" arrow>
            How a build works
          </Button>
        }
      />

      <Section aria-labelledby="matrix-title" tone="paper-2" flushTop>
        <Container>
          <h2 id="matrix-title" className="sr-only">
            Packages
          </h2>
          <PackageMatrix />
          <p className={styles.note}>
            Third-party costs such as domain registration, business email and payment processing fees are yours at cost,
            approved by you before purchase, and registered to you.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="compare-title">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="Side by side"
            id="compare-title"
            title="What changes between packages."
            lead="Every row is something you receive, or do not. Where a package includes a narrower version, the cell says so."
          />
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
            <SectionHeader index="02" eyebrow="Questions" id="faq-title" title="Straight answers." />
            <Faq items={pricingFaq} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
