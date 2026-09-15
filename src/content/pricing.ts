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
    q: "Why is this called founding customer pricing?",
    a: "Because that is what it is. Business Builder is early and does not yet have a wall of case studies, so the first customers are taking a chance on us. These prices are set lower on purpose while the product proves itself with real businesses. Founding customer pricing is available during the early launch period. There is no countdown and no seat limit, and when it ends we will say so rather than invent a deadline.",
  },
  {
    q: "Why does Build & Run have an activation fee as well as a monthly plan?",
    a: "They pay for two different things. Activation covers connecting and configuring the operating system for your company: systems joined up, permissions set per worker, company context built, budgets and approval thresholds agreed, escalation routes defined, everything tested before it can reach a customer. That configuration is durable and stays yours even if you stop the monthly plan. The monthly plan covers the operating layer itself, running the recurring work you have approved.",
  },
  {
    q: "How does the new-business bundle differ from existing-business onboarding?",
    a: "Build my business is $1,495 one time. Build my business + Run is a separate fixed offer at $1,995 upfront plus $299 a month. An existing business needs an audit and an exact onboarding quote, starting from $1,495, before its $299 monthly operating plan can be considered. The starting figure is not a fixed charge.",
  },
  {
    q: "Why is existing-business onboarding a starting price?",
    a: "Because the work genuinely varies. An Existing Business Audit might find a tidy setup that needs connecting, or four years of accumulated tools that need reconciling, migrating and cleaning up before anything can be operated safely. Onboarding starts at $1,495, and you see the actual figure after the audit and before you commit to it.",
  },
  {
    q: "What is not included?",
    a: "Government, provider and third-party fees are separate where they apply: filing fees, registered-agent fees, domains, software subscriptions, insurance, advertising spend, payment-processing fees and professional fees. Every one of them is an approval before it is bought, and every one is registered to you rather than to us.",
  },
  {
    q: "Do you take a percentage of my revenue?",
    a: "No. A build fee, and an optional monthly plan. No revenue share, no transaction fee, no equity. What your business earns is yours.",
  },
  {
    q: "Is $299 a month unlimited?",
    a: "No, and we would rather say so than let you find out later. Workers operate inside the permissions, approval thresholds and budgets you set. A fair-use policy covering operating volume will be published before it could ever matter to you. Unusually high external costs, such as heavy advertising spend or provider charges, sit outside the plan and are always approved by you first.",
  },
  {
    q: "What happens if I stop Build & Run?",
    a: "The workers stop at the end of the period. Your company, customer data, brand, domain, accounts and everything we agreed to deliver stay yours, including the configuration activation paid for. What stays ours is the platform underneath: the builder systems, orchestration, reusable agents and verification infrastructure we use for every customer.",
  },
  {
    q: "Can I start with the website and upgrade later?",
    a: "Yes. The website build is the front of the company, so nothing is thrown away. If you later want the full build, the work continues from where it stopped rather than starting again.",
  },
];
