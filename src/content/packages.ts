import { routes } from "@/config/brand";

export type PackageId = "website" | "business" | "run";

export type Package = {
  id: PackageId;
  name: string;
  shortName: string;
  audience: string;
  model: string;
  /** Headline price, or the honest reason there is not one yet. */
  price: string;
  priceNote: string;
  summary: string;
  includesLabel?: string;
  includes: string[];
  outcome: string;
  href: string;
  ctaLabel: string;
  emphasis?: boolean;
};

/**
 * Not a package in the ladder sense. Onboarding for a business that already trades is
 * quoted after an Existing Business Audit, so the figure is a floor rather than a
 * price. Stated beside the package choice in StartForm when the founder arrives from
 * the "run it for me" starting point.
 */
export const existingStart = {
  name: "Existing business + Build & Run",
  price: "From $1,495 + $299/mo",
  model: "Onboarding quoted after the audit, then monthly",
};

export const packages: Package[] = [
  {
    id: "website",
    name: "Build my professional website",
    shortName: "Website",
    audience: "For people who need a premium, working website first.",
    model: "One-time build",
    price: "$795",
    priceNote: "One-time project price. Founding customer pricing during the early launch period.",
    summary: "A website built for your business type, on your domain, verified live.",
    includes: [
      "Positioning and brand direction for the site",
      "Website designed for your business type",
      "Service, quote and booking pages",
      "Domain connected, HTTPS verified",
      "Contact and quote forms that reach you",
      "Local search basics and analytics",
      "Verified live on your domain",
      "Full ownership and export",
    ],
    outcome: "A live website you own, verified working.",
    href: routes.website,
    ctaLabel: "Build my website",
  },
  {
    id: "business",
    name: "Build my business",
    shortName: "Business",
    audience: "For people who want the whole company assembled, new or already trading.",
    model: "One-time build",
    price: "$1,495",
    priceNote: "One-time build price. Founding customer pricing during the early launch period.",
    summary: "Six lanes: company foundation, identity, customer system, operations, local presence, and the proof it is yours.",
    includesLabel: "Everything in Website, plus",
    includes: [
      "Starting-point intake, then market and competitor research",
      "Existing Business Audit if you already trade: keep, improve, replace or missing",
      "Recommendation, including where the idea is weak",
      "Brand direction: name direction, voice, visual system",
      "Business email on your domain",
      "CRM configured for your services",
      "Scheduling connected to your calendar",
      "Payments configured, checkout verified",
      "Entity, EIN, banking and insurance steps prepared, tracked and verified",
      "Licences, permits and compliance renewal dates recorded",
      "Business phone, workflows, policies and quote terms",
      "Google Business Profile, listings and local search basics",
      "Bookkeeping and document organisation set up",
      "Verification of every connected system",
      "Ready and Fully Set readiness",
      "Handoff with evidence log and ownership record",
    ],
    outcome: "A company that is Ready, then Fully Set, then yours.",
    href: routes.buildMyBusiness,
    ctaLabel: "Build my business",
    emphasis: true,
  },
  {
    id: "run",
    name: "Build & run my business",
    shortName: "Build & Run",
    audience: "For people who want parts of the company operated after handoff.",
    model: "Activation, then monthly operations",
    price: "$1,995 + $299/mo",
    priceNote: "Build and activation together, then monthly while it runs. Build & Run on its own is $795 activation plus $299 a month.",
    summary: "Everything in Build my business, plus AI workers operating inside limits you set.",
    includesLabel: "Everything in Business, plus",
    includes: [
      "Intake Assistant for new inquiries",
      "Quote Drafting Assistant using your price rules",
      "Inbox Assistant for sorting and drafts",
      "Review Follow-up Assistant",
      "Permissions, budgets and approval rules per worker",
      "Recurring monitoring of connected systems",
      "Human escalation path",
      "Stop any time. The company stays yours.",
    ],
    outcome: "A company that keeps working while you do the work.",
    href: routes.buildAndRun,
    ctaLabel: "Build and run my business",
  },
];
