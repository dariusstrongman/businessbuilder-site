import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section } from "@/components/primitives/Layout";
import { Split } from "@/components/primitives/Split";
import { Ledger } from "@/components/primitives/Ledger";
import { StudyGrid } from "@/components/diagrams/StudyGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { studiesCopy } from "@/content/studies";
import { routes } from "@/config/brand";

export const metadata: Metadata = {
  title: "Design studies",
  description:
    "Five original design studies from the studio. Not clients and not companies we have built, but the level of craft a Business Builder build gets.",
};

const honesty = [
  {
    key: "what",
    label: "What these are",
    value: "Original studies made by this studio to test ideas about type, colour, photography and composition.",
  },
  {
    key: "not",
    label: "What they are not",
    value: "Clients, case studies, or companies we have built. No real business is represented on this page.",
  },
  {
    key: "why",
    label: "Why they are here",
    value: "You are about to pay for design. Seeing whether we can do it should not require a sales call.",
  },
  {
    key: "yours",
    label: "What yours will look like",
    value:
      "Not these. Your build is shaped around how your kind of business actually gets found and hired, at this level of care.",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow={studiesCopy.eyebrow}
        title="Proof that we can design, before you pay us to."
        lead={studiesCopy.lead}
        actions={
          <>
            <Button href={routes.start} arrow>
              Start a build
            </Button>
            <Button href={routes.website} variant="ghost" arrow>
              What a website build includes
            </Button>
          </>
        }
      />

      <Section aria-labelledby="studies-list-title" flushTop>
        <Container>
          <h2 id="studies-list-title" className="sr-only">
            The studies
          </h2>
          <StudyGrid variant="full" />
        </Container>
      </Section>

      <Split
        index="02"
        eyebrow="Being straight about it"
        id="honesty-title"
        title="Fictional brands, real craft."
        tone="paper-2"
        aside={<Ledger rows={honesty} ariaLabel="What these studies are and are not" />}
      >
        <p>
          Plenty of new studios borrow credibility with logos they have never worked with and testimonials nobody said.
          We would rather show you work we actually made and tell you exactly what it is.
        </p>
      </Split>

      <CtaBand />
    </>
  );
}
