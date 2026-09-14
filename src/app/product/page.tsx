import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Split } from "@/components/primitives/Split";
import { BuildRoomSection } from "@/components/sections/home/BuildRoomSection";
import { FounderActions } from "@/components/sections/home/FounderActions";
import { Verification } from "@/components/sections/home/Verification";
import { Handoff } from "@/components/sections/home/Handoff";
import { EvidenceLog } from "@/components/product/EvidenceLog";
import { AuditMatrix } from "@/components/product/AuditMatrix";
import { auditCopy } from "@/content/audit";
import { CtaBand } from "@/components/sections/CtaBand";
import { cta, routes } from "@/config/brand";

export const metadata: Metadata = {
  title: "The Build Room",
  description:
    "The room where your company gets assembled: every module with a status, Founder Actions kept separate, verification with evidence, and readiness computed from it.",
};

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="The Build Room"
        title="The room where your company gets assembled."
        lead="The Build Room is the product's centre. Every system in your company is a module with a status. Every task only you can do is a Founder Action beside it. Readiness is computed from the evidence, and the evidence is yours."
        actions={
          <>
            <Button href={routes.start} arrow>
              {cta.primary}
            </Button>
            <Button href={routes.howItWorks} variant="ghost" arrow>
              How the journey works
            </Button>
          </>
        }
      />

      <BuildRoomSection
        index="01"
        eyebrow="The room"
        title="Eight modules. Four states. One place to watch."
        lead="This is a live preview of the Build Room running a mobile detailing build. Statuses move as the build progresses; Ready and Fully Set switch on when the evidence says so."
      />

      <Section aria-labelledby="audit-title" id="audit" tone="paper-2">
        <Container>
          <SectionHeader
            index="02"
            eyebrow={auditCopy.eyebrow}
            id="audit-title"
            title={auditCopy.title}
            lead={auditCopy.lead}
          />
          <AuditMatrix variant="full" />
        </Container>
      </Section>

      <FounderActions index="03" />

      <Verification index="04" />

      <Split
        index="05"
        eyebrow="The evidence log"
        id="evidence-title"
        title="Every check, written down."
        aside={<EvidenceLog />}
        sticky
      >
        <p>
          Verification is only worth something if you can see it. The evidence log records each check the system runs,
          what it expected, what it found, and when.
        </p>
        <p>
          Failed checks are retried and stay in the log. Checks that need you are marked as waiting. The whole log is
          handed over with the company.
        </p>
      </Split>

      <Handoff index="06" />

      <CtaBand />
    </>
  );
}
