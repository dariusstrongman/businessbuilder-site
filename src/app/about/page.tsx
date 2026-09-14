import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Split } from "@/components/primitives/Split";
import { Ledger } from "@/components/primitives/Ledger";
import { CtaBand } from "@/components/sections/CtaBand";
import { brand, routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Why Business Builder exists, how it works, and the principles it is held to.",
};

const principles = [
  {
    label: "Approval before assembly",
    text: "Research and a recommendation come first. If the idea is weak, we say so. Nothing is built until the founder approves the direction.",
  },
  {
    label: "Verification over promises",
    text: "A system is not done because it was bought. It is done when it was used the way a customer would use it, and the result was checked.",
  },
  {
    label: "The founder owns the company",
    text: "Every asset, login, record and piece of evidence is registered to the founder. Our service can end. Their company does not.",
  },
  {
    label: "Honest limits",
    text: "We prepare and guide legal and financial steps; we do not give legal or tax advice. AI workers act inside explicit permissions. We say what is verified and what is not.",
  },
  {
    label: "Specific businesses, built specifically",
    text: "Ten kinds of service business at launch, each with its own quote logic, scheduling shape and founder actions. Depth over breadth, until the depth is proven.",
  },
];

const notList = [
  { kind: "A website generator", they: "Generating a site is the easy part.", we: "Websites are one module of eight. Verifying one live on your domain is the part that matters." },
  { kind: "A business-plan tool", they: "A plan exported as a document.", we: "Research and a recommendation that exist to be approved and then built." },
  { kind: "An agency", they: "One piece, well, over weeks, on a retainer.", we: "One build, every module, verified, with the founder watching." },
  { kind: "A formation service", they: "The legal shell, filed.", we: "What goes inside the shell. Entity, tax ID and bank steps are guided as Founder Actions." },
  { kind: "A chatbot", they: "A conversation that ends in advice.", we: "A system with states and evidence. Conversation is how it learns what you want." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="The company that builds companies."
        lead={`${brand.name} exists because starting a real service business is ten jobs, and until now the only ways to get them done were to do them all yourself or to hire ten different people. We think a founder should be able to describe the company they want and receive one that works.`}
        actions={
          <Button href={routes.howItWorks} variant="ghost" arrow>
            How it works
          </Button>
        }
      />

      <Split
        index="01"
        eyebrow="What we believe"
        id="belief-title"
        title="Output is cheap. Assembly is the work."
        ratio="6/6"
        aside={
          <div className={styles.belief}>
            <p>
              Anyone can now generate a website, a logo and a business plan in an afternoon. That has not made starting
              a business easier. It has made it easier to have a folder of assets and still not be in business.
            </p>
            <p>
              A business is systems that are connected, tested and proven to work for a real customer. Assembling those
              systems, verifying them, and handing them over with evidence is the job. It is the only job we do.
            </p>
          </div>
        }
      >
        <p>
          We are building for the capable operator who is not a technologist: the person who can do the work and wants
          to be a company, not a coordinator of vendors.
        </p>
      </Split>

      <Section aria-labelledby="principles-title" tone="paper-2">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="How we work"
            id="principles-title"
            title="Five principles, in the order we apply them."
            lead="These are not values on a wall. Each one is a rule the product enforces, and each one is visible in the Build Room."
          />
          <ol className={styles.principles}>
            {principles.map((p, i) => (
              <li key={p.label} className={styles.principle}>
                <span className={styles.numeral} aria-hidden>
                  {i + 1}
                </span>
                <h3 className={styles.principleLabel}>{p.label}</h3>
                <p className={styles.principleText}>{p.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="not-title">
        <Container>
          <SectionHeader
            index="03"
            eyebrow="What we are not"
            id="not-title"
            title="Easier to say what this is not."
            lead="Most of the things we get compared to do a real job well. Ours is a different job, and the difference is in what gets handed over."
          />
          <div className={styles.contrast} role="table" aria-label="What we are not">
            <div className={styles.contrastHead} role="row">
              <span role="columnheader">Not this</span>
              <span role="columnheader">What that gives you</span>
              <span role="columnheader">What we do instead</span>
            </div>
            {notList.map((n) => (
              <div key={n.kind} className={styles.contrastRow} role="row">
                <span className={styles.contrastKind} role="cell">
                  {n.kind}
                </span>
                <span className={styles.contrastThey} role="cell">
                  {n.they}
                </span>
                <span className={styles.contrastWe} role="cell">
                  {n.we}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Split
        index="04"
        eyebrow="Accountability"
        id="people-title"
        title="A person is responsible for your build."
        tone="ink"
        aside={
          <Ledger
            rows={[
              { key: "review", label: "Before you see a recommendation", value: "A person has reviewed it." },
              { key: "during", label: "During the build", value: "A person is reachable, and the Build Room shows what is waiting on whom." },
              { key: "after", label: "After handoff", value: "Workers escalate to you first, then to a person here." },
              {
                key: "name",
                label: "Who",
                value:
                  "The people behind the working name will be listed here as the company is announced. We will not use placeholder faces or names in the meantime.",
              },
            ]}
            ariaLabel="Accountability"
          />
        }
      >
        <p>AI does most of the work. It does none of the answering for it.</p>
      </Split>

      <CtaBand />
    </>
  );
}
