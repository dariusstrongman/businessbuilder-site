import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Split } from "@/components/primitives/Split";
import { Ledger } from "@/components/primitives/Ledger";
import { BuildRoom } from "@/components/product/BuildRoom";
import { WhatWeBuild } from "@/components/sections/home/WhatWeBuild";
import { TurnkeyLanes } from "@/components/diagrams/TurnkeyLanes";
import { turnkeyCopy } from "@/content/turnkey";
import { FounderActions } from "@/components/sections/home/FounderActions";
import { Verification } from "@/components/sections/home/Verification";
import { Ownership } from "@/components/sections/home/Ownership";
import { CtaBand } from "@/components/sections/CtaBand";
import { phases, stages } from "@/content/journey";
import { packages } from "@/content/packages";
import { routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Build my business",
  description:
    "The whole company, assembled and verified: research, positioning, brand, website, email, CRM, scheduling, payments, Founder Actions, verification and handoff.",
};

const business = packages.find((p) => p.id === "business")!;

export default function BuildMyBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Build my business"
        title="The whole company, assembled and verified."
        lead="$1,495, one time, at founding customer pricing. Research that challenges the idea. A direction you approve. Company foundation, brand, website and every business system built, connected and checked. Founder Actions kept small. A handoff with the evidence. This is the flagship build."
        actions={
          <>
            <Button href={`${routes.start}?package=business`} arrow>
              Build my business
            </Button>
            <Button href={routes.pricing} variant="ghost" arrow>
              Compare packages
            </Button>
          </>
        }
      />

      <Section aria-labelledby="phases-title" tone="ink">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="The shape of the build"
            id="phases-title"
            title="Four phases. Every one ends in something you can hold."
          />
          <ol className={styles.phases}>
            {phases.map((p, i) => (
              <li key={p.id} className={styles.phase}>
                <span className={styles.phaseIndex}>0{i + 1}</span>
                <h3 className={styles.phaseLabel}>{p.label}</h3>
                <p className={styles.phaseSummary}>{p.summary}</p>
                <ul className={styles.phaseStages}>
                  {stages
                    .filter((s) => s.phase === p.id)
                    .map((s) => (
                      <li key={s.id} data-actor={s.actor}>
                        {s.label}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className={styles.phasesAction}>
            <Button href={routes.howItWorks} variant="secondary" arrow>
              Walk through every stage
            </Button>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="turnkey-title">
        <Container>
          <SectionHeader
            index="02"
            eyebrow={turnkeyCopy.eyebrow}
            id="turnkey-title"
            title={turnkeyCopy.title}
            lead={turnkeyCopy.lead}
          />
          <TurnkeyLanes variant="full" />
        </Container>
      </Section>

      <WhatWeBuild index="03" />

      <Split
        index="04"
        eyebrow="The Build Room"
        id="room-title"
        title="You watch it happen."
        ratio="4/8"
        aside={<BuildRoom variant="full" />}
      >
        <p>Every module has a status. Every Founder Action is beside the build, not buried in it. Readiness switches on when the evidence says so.</p>
        <Button href={routes.product} variant="ghost" arrow>
          See the Build Room
        </Button>
      </Split>

      <FounderActions index="05" />

      <Verification index="06" />

      <Ownership index="07" />

      <Split
        index="08"
        eyebrow="The package"
        id="package-title"
        title={business.name}
        tone="paper-2"
        aside={
          <div className={styles.package}>
            <Ledger
              head={["Included", "What it means"]}
              rows={business.includes.map((item, i) => ({ key: String(i), label: item, value: businessNotes[i] ?? "" }))}
              ariaLabel="Build my business inclusions"
            />
            <p className={styles.packageOutcome}>{business.outcome}</p>
            <Button href={`${routes.start}?package=business`} arrow>
              Build my business
            </Button>
          </div>
        }
      >
        <p>{business.audience}</p>
        <p>
          <strong>Pricing model:</strong> {business.model.toLowerCase()}. Full inclusions and pricing on the pricing page.
        </p>
        <Button href={routes.pricing} variant="ghost" arrow>
          See pricing
        </Button>
      </Split>

      <CtaBand packageId="business" />
    </>
  );
}

const businessNotes: string[] = [
  "Who already does this near you, how they price, and where the gaps are.",
  "The strongest version of your idea, and the honest weak points.",
  "A name direction, a voice, and a visual system you approve.",
  "Mailboxes on your domain, forwarding and signature set up.",
  "Pipeline stages and customer records shaped for your services.",
  "Booking rules, buffers and calendar sync tested with a real booking.",
  "Checkout, deposits and payout account, with a test payment completed.",
  "Entity, tax ID, bank and insurance steps prepared as Founder Actions.",
  "Executed, tested and verified, with the evidence in your log.",
  "Ready when customers can use it. Fully Set when nothing is left open.",
  "Every login, every asset, the evidence log and the ownership record.",
];
