import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Split } from "@/components/primitives/Split";
import { Ledger } from "@/components/primitives/Ledger";
import { SiteFrame } from "@/components/product/SiteFrame";
import { CtaBand } from "@/components/sections/CtaBand";
import { archetypeBySlug, archetypes } from "@/content/archetypes";
import { routes } from "@/config/brand";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return archetypes.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = archetypeBySlug(slug);
  if (!a) return {};
  return {
    title: `${a.name} businesses`,
    description: `What Business Builder builds for a ${a.name.toLowerCase()} company: ${a.operations.toLowerCase()} Founder Actions, verifications and the website structure.`,
  };
}

export default async function ArchetypePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = archetypeBySlug(slug);
  if (!a) notFound();

  return (
    <>
      <PageHero
        eyebrow="Supported business"
        title={`What we build for a ${a.name.toLowerCase()} company.`}
        lead={`${a.operations} The build starts from what this kind of business actually needs to quote, schedule and get paid, and the verifications check those exact things.`}
        actions={
          <>
            <Button href={`${routes.start}?idea=${encodeURIComponent(a.examplePrompt)}`} arrow>
              Start a {a.short.toLowerCase()} build
            </Button>
            <Button href={routes.businesses} variant="ghost" arrow>
              All supported businesses
            </Button>
          </>
        }
        aside={<SiteFrame archetype={a.name} headline={a.siteHeadline} services={a.siteServices} />}
      />

      <Split
        index="01"
        eyebrow="What we configure"
        id="configure-title"
        title="Built around how this business works."
        aside={<Ledger rows={a.specifics.map((s, i) => ({ key: String(i), label: s, value: a.specificsWhy?.[i] ?? "" }))} ariaLabel="What we configure" numbered />}
        sticky
      >
        <p>These are not options on a template. They are decisions the system makes because it knows this kind of business, and you approve them before they are built.</p>
      </Split>

      <Split
        index="02"
        eyebrow="Your Founder Actions"
        id="founder-title"
        title="What only you can decide."
        tone="paper-2"
        aside={<Ledger rows={a.founderActions.map((s, i) => ({ key: String(i), label: s, value: "Prepared and explained in the Build Room. A few minutes each." }))} ariaLabel="Founder Actions" numbered />}
      >
        <p>Alongside the usual Founder Actions such as identity verification and bank connection, this business type has a few of its own.</p>
      </Split>

      <Split
        index="03"
        eyebrow="What we verify"
        id="verify-title"
        title="Checked the way a customer would use it."
        tone="ink"
        aside={<Ledger rows={a.verifications.map((s, i) => ({ key: String(i), label: s, value: "Executed, tested and verified, with the result in your evidence log." }))} ariaLabel="Verifications" numbered />}
      >
        <p>Verification is specific to the business. A recurring cleaning plan is checked by creating one. A same-day junk request is checked by sending one at the wrong hour.</p>
      </Split>

      {a.variants ? (
        <Split
          index="04"
          eyebrow="Variants"
          id="variants-title"
          title="Choose one, or both."
          aside={<Ledger rows={a.variants.map((v) => ({ key: v, label: v, value: v === "Both" ? "One company, two service lines, one booking flow." : `Packages, portfolio structure and booking shaped for ${v.toLowerCase()}.` }))} ariaLabel="Variants" />}
        >
          <p>{a.name} builds start by asking which you offer. The site structure, packages and deposit rules follow from the answer.</p>
        </Split>
      ) : null}

      <CtaBand defaultValue={a.examplePrompt} title={`Describe your ${a.short.toLowerCase()} company.`} chips={false} />
    </>
  );
}
