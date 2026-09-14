import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Split } from "@/components/primitives/Split";
import { Ledger } from "@/components/primitives/Ledger";
import { SiteFrame } from "@/components/product/SiteFrame";
import { FoundingOffers } from "@/components/diagrams/FoundingOffers";
import { StudyGrid } from "@/components/diagrams/StudyGrid";
import { CheckIcon } from "@/components/primitives/Icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { packages } from "@/content/packages";
import { archetypes } from "@/content/archetypes";
import { routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Build my professional website",
  description:
    "A website built for your business type, on your domain, verified live. Quote and booking forms that reach you, local search basics, full ownership.",
};

const websitePackage = packages.find((p) => p.id === "website")!;

const verifiedLive = [
  { key: "https", label: "Loads on your domain over HTTPS", value: "Not a subdomain of ours. DNS and certificate checked." },
  { key: "forms", label: "Forms reach you", value: "A test quote request is sent and confirmed in your inbox." },
  { key: "booking", label: "Booking works, if included", value: "A test booking lands where you will see it." },
  { key: "search", label: "Search basics are in place", value: "Titles, descriptions, service pages and a listing-ready structure." },
  { key: "analytics", label: "Analytics receiving", value: "A test visit is recorded before we call it live." },
  { key: "mobile", label: "Works on a phone", value: "Checked at phone, tablet and desktop widths." },
];

export default function WebsitePage() {
  return (
    <>
      <PageHero
        eyebrow="Build my professional website"
        title="A website built for your business type, verified live."
        lead="For people who need the website first. $795, one time. Designed for how your kind of business gets found and booked, put on your domain, and checked working before you see the word live."
        actions={
          <>
            <Button href={`${routes.start}?package=website`} arrow>
              Build my website
            </Button>
            <Button href={routes.pricing} variant="ghost" arrow>
              Compare packages
            </Button>
          </>
        }
        aside={<SiteFrame />}
      />

      <Split
        index="01"
        eyebrow="What is included"
        id="included-title"
        title="Everything a service business website needs. Nothing it does not."
        aside={
          <Ledger
            rows={websitePackage.includes.map((item, i) => ({
              key: String(i),
              label: item,
              value: includeNotes[i] ?? "",
            }))}
            ariaLabel="Website package inclusions"
            numbered
          />
        }
        sticky
      >
        <p>
          The website package is the first two groups of the full bill of materials: brand direction and the website
          itself, with the systems it needs to be reachable.
        </p>
        <p>It is a complete website, not a starter. It is also the first step of the larger build, so nothing is thrown away if you go further.</p>
      </Split>

      <Section tone="ink" aria-labelledby="verified-title">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="Verified live"
            id="verified-title"
            title="Live means we checked."
            lead="Most builders call a site live when the files are uploaded. We call it live when a customer can use it. Each of these runs before handoff and is written into your evidence log."
          />
          <ul className={styles.checks}>
            {verifiedLive.map((c, i) => (
              <li key={c.key} className={styles.check}>
                <span className={styles.checkMark} aria-hidden>
                  <CheckIcon />
                </span>
                <span className={styles.checkIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.checkLabel}>{c.label}</h3>
                <p className={styles.checkNote}>{c.value}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="types-title">
        <Container>
          <SectionHeader
            index="03"
            eyebrow="Built for your type"
            id="types-title"
            title="Ten kinds of service business. Ten page structures."
            lead="A detailing site needs vehicle-size pricing. A photography site needs a portfolio and a deposit flow. The structure follows the business, not a template."
          />
          <ul className={styles.types}>
            {archetypes.map((a) => (
              <li key={a.slug} className={styles.type}>
                <Link href={`${routes.businesses}/${a.slug}`} className={styles.typeLink}>
                  <span className={styles.typeName}>{a.name}</span>
                  <span className={styles.typeOps}>{a.specifics[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="craft-title">
        <Container>
          <SectionHeader
            index="04"
            eyebrow="The craft"
            id="craft-title"
            title="Five sites we designed, rendered in full."
            lead="Structure is half of it. This is the other half. Every one of these is a designed page rather than a photograph, built by this studio to test an idea, so you can judge the work before you buy it rather than after."
          />
          <StudyGrid variant="strip" limit={2} />
        </Container>
      </Section>

      <Section aria-labelledby="pricing-title" tone="paper-2">
        <Container>
          <SectionHeader
            index="05"
            eyebrow="Founding customer pricing"
            id="pricing-title"
            title="$795, one time."
            lead="A published price, not a range and not a call to find out. This is founding customer pricing during the early launch period, set lower on purpose while the product proves itself."
          />
          <FoundingOffers variant="headline" />
        </Container>
      </Section>

      <Split
        index="06"
        eyebrow="When you want more"
        id="upgrade-title"
        title="The website is step one of the company."
        tone="paper-2"
        aside={
          <div className={styles.upgrade}>
            <div className={styles.upgradeStep}>
              <span className={styles.upgradeKicker}>You have</span>
              <span className={styles.upgradeName}>Build my website</span>
              <span className={styles.upgradeNote}>Brand direction, website, domain, forms, search basics, verified live.</span>
            </div>
            <span className={styles.upgradeArrow} aria-hidden />
            <div className={styles.upgradeStep}>
              <span className={styles.upgradeKicker}>Add</span>
              <span className={styles.upgradeName}>Build my business</span>
              <span className={styles.upgradeNote}>Research, email, CRM, scheduling, payments, Founder Actions, full verification, handoff.</span>
            </div>
            <p className={styles.upgradeFoot}>Nothing is rebuilt. The website becomes the front of the company.</p>
          </div>
        }
      >
        <p>Every package contains the one before it. If you start with the website and later want the whole company, the build continues from where it stopped.</p>
        <Button href={routes.buildMyBusiness} variant="ghost" arrow>
          See Build my business
        </Button>
      </Split>

      <CtaBand packageId="website" title="Describe the website you want." text="Tell us the business and where it operates. We will come back with a direction you can approve before anything is built." />
    </>
  );
}

const includeNotes: string[] = [
  "Where the business sits in its market and how it should sound.",
  "Structure, pages and copy follow how your kind of business is found and booked.",
  "Quote requests with the fields your business needs; booking where it fits.",
  "Registered or connected, DNS configured, certificate valid.",
  "Every submission is tested end to end before handoff.",
  "Titles, descriptions and service pages that search engines can read; analytics receiving.",
  "Checked on your domain, over HTTPS, on a phone.",
  "Hosted for you, exportable any time, registered to you.",
];
