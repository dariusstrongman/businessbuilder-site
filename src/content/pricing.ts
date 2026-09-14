import type { PackageId } from "./packages";

export type CompareCell = boolean | string;

export type CompareRow = {
  label: string;
  cells: Record<PackageId, CompareCell>;
};

export type CompareGroup = {
  label: string;
  rows: CompareRow[];
};

export const compareGroups: CompareGroup[] = [
  {
    label: "Understand and decide",
    rows: [
      { label: "Founder profile", cells: { website: "Site brief", business: true, run: true } },
      { label: "Market and competitor research", cells: { website: false, business: true, run: true } },
      { label: "Recommendation, including weak points", cells: { website: false, business: true, run: true } },
      { label: "Approval gate before build", cells: { website: true, business: true, run: true } },
    ],
  },
  {
    label: "Build",
    rows: [
      { label: "Brand direction", cells: { website: "For the site", business: "Full system", run: "Full system" } },
      { label: "Website for your business type", cells: { website: true, business: true, run: true } },
      { label: "Domain connected, HTTPS", cells: { website: true, business: true, run: true } },
      { label: "Quote and booking forms", cells: { website: true, business: true, run: true } },
      { label: "Business email on your domain", cells: { website: false, business: true, run: true } },
      { label: "CRM configured", cells: { website: false, business: true, run: true } },
      { label: "Scheduling connected", cells: { website: false, business: true, run: true } },
      { label: "Payments configured", cells: { website: false, business: true, run: true } },
      { label: "Setup and admin guidance", cells: { website: false, business: true, run: true } },
      { label: "Founder Actions prepared and tracked", cells: { website: "Domain only", business: true, run: true } },
    ],
  },
  {
    label: "Verify and own",
    rows: [
      { label: "Verification with evidence log", cells: { website: "Site checks", business: "Every system", run: "Every system" } },
      { label: "Ready and Fully Set milestones", cells: { website: false, business: true, run: true } },
      { label: "Handoff with ownership record", cells: { website: true, business: true, run: true } },
      { label: "Full export, any time", cells: { website: true, business: true, run: true } },
    ],
  },
  {
    label: "Run",
    rows: [
      { label: "AI workers with permissions cards", cells: { website: false, business: false, run: true } },
      { label: "Budgets and approval rules", cells: { website: false, business: false, run: true } },
      { label: "Recurring monitoring of connected systems", cells: { website: false, business: false, run: true } },
      { label: "Human escalation", cells: { website: "During build", business: "During build", run: "Ongoing" } },
    ],
  },
];

export const pricingFaq = [
  {
    q: "Where are the prices?",
    a: "They will be published on this page. The structure is fixed now: Website and Business are one-time builds; Build & Run adds a monthly fee for operations. There will be no crossed-out prices, countdowns or limited-time discounts.",
  },
  {
    q: "What do I pay for separately?",
    a: "Third-party costs are yours, at cost: domain registration, business email, payment processing fees and any software subscriptions your company uses. Every one is an approval before it is bought, and every one is registered to you.",
  },
  {
    q: "Do you take a percentage of my payments?",
    a: "No. Payments go through a processor account in your name, to a bank account in your name. We never hold your money.",
  },
  {
    q: "Can I start with the website and upgrade later?",
    a: "Yes. Every package contains the one before it. The build continues from where it stopped and nothing is rebuilt.",
  },
  {
    q: "What if the research says my idea is weak?",
    a: "We tell you, with reasons and alternatives, before anything is built. You decide what to do with that. Nothing further is owed if you stop at that point.",
  },
  {
    q: "What happens if I stop Build & Run?",
    a: "The workers stop at the end of the period. The company, its systems, its data and its history stay with you. If you come back, the workers resume with the same context and limits.",
  },
];
