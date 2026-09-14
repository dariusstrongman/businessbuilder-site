import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Split } from "@/components/primitives/Split";
import { Ledger } from "@/components/primitives/Ledger";
import { JourneyRail } from "@/components/diagrams/JourneyRail";
import { StageLedger } from "@/components/diagrams/StageLedger";
import { CtaBand } from "@/components/sections/CtaBand";
import { cta, routes } from "@/config/brand";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Twelve stages, four phases, and a founder decision at every gate. From a sentence to a company that is Ready, Fully Set, and yours.",
};

const gates = [
  { key: "approve", label: "Approve", value: "Nothing is built until you approve the research and the recommendation." },
  { key: "founder", label: "Founder Actions", value: "Anything only you can do waits for you, prepared and explained. The build moves around it." },
  { key: "handoff", label: "Handoff", value: "You choose to take the keys or keep parts of the company running. Both leave it yours." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From a sentence to a company that runs."
        lead="Twelve stages in four phases. At three of them, nothing moves without you. This page walks through every stage: what happens, what you do, and what you have at the end of it."
        actions={
          <>
            <Button href={routes.start} arrow>
              {cta.primary}
            </Button>
            <Button href={routes.product} variant="ghost" arrow>
              See the Build Room
            </Button>
          </>
        }
      />

      <Section tone="ink" aria-labelledby="rail-title">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="The journey"
            id="rail-title"
            title="The whole path, on one line."
            lead="Solid markers are stages we run. Hollow markers are yours. Diamonds are milestones the evidence has to earn."
          />
          <JourneyRail />
        </Container>
      </Section>

      <Split
        index="02"
        eyebrow="Your gates"
        id="gates-title"
        title="Three moments where nothing moves without you."
        aside={<Ledger rows={gates} ariaLabel="Founder gates" numbered />}
      >
        <p>
          Most of the build runs without you. That is the point. But there are three places where the system stops and
          waits, because the decision is yours by right or by law.
        </p>
        <p>They are not interruptions. They are the reason you can trust what comes out the other side.</p>
      </Split>

      <Section aria-labelledby="stages-title" tone="paper-2">
        <Container>
          <SectionHeader
            index="03"
            eyebrow="Stage by stage"
            id="stages-title"
            title="What happens, what you do, what you get."
            lead="Every stage, in order. The right-hand column is what you can hold us to at the end of each one."
          />
          <StageLedger />
        </Container>
      </Section>

      <Split
        index="04"
        eyebrow="How long it takes"
        id="time-title"
        title="As fast as your decisions, and not faster."
        aside={
          <Ledger
            rows={[
              { key: "research", label: "Understand and research", value: "Runs in the background once you have described the idea and answered a few questions." },
              { key: "approve", label: "Recommend and approve", value: "Waits for you. Read it in an evening or take a week. Nothing is built in the meantime." },
              { key: "build", label: "Build and verify", value: "Moves module by module. Verification runs as each connection is made, not at the end." },
              { key: "founder", label: "Founder Actions", value: "Usually the long pole. A few minutes each, but they depend on banks and processors, not on us." },
              { key: "handoff", label: "Handoff", value: "Immediate once Ready or Fully Set is reached. The keys are already yours." },
            ]}
            ariaLabel="Where time goes"
          />
        }
      >
        <p>
          We do not quote a number of days, because the honest answer depends on two things we do not control: how
          quickly you decide, and how quickly third parties verify you.
        </p>
        <p>What we do control is that nothing waits on us for long, and that you can always see what is waiting on whom.</p>
      </Split>

      <CtaBand />
    </>
  );
}
