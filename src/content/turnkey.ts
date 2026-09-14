/**
 * Turnkey scope: everything a Build my business engagement covers.
 *
 * Every item carries an owner, because the honest answer to "is this done for
 * me?" varies by item and by law. Business Builder is not a law firm, an
 * accountant, an insurer, a bank, a registered agent or a filing authority, and
 * the wording here never implies otherwise.
 */

export type Owner = "builder" | "founder" | "external";

export const ownerLabels: Record<Owner, string> = {
  builder: "Business Builder",
  founder: "Founder Action",
  external: "External provider",
};

export const ownerMeaning: Record<Owner, string> = {
  builder: "We research, prepare, configure, connect, test or verify it.",
  founder:
    "Only you can do it: a signature, an identity check, a legal acceptance, a regulated account opening or a payment.",
  external:
    "A government agency, bank, insurer, registered agent, accountant, lawyer or payment provider performs the final step.",
};

export type TurnkeyItem = {
  label: string;
  owner: Owner;
  /** What we actually do, stated without overclaiming. */
  detail: string;
};

export type TurnkeyLane = {
  id: string;
  label: string;
  premise: string;
  items: TurnkeyItem[];
};

export const turnkeyLanes: TurnkeyLane[] = [
  {
    id: "foundation",
    label: "Company foundation",
    premise: "The parts that make you a company rather than a person doing work.",
    items: [
      { label: "Entity and structure", owner: "external", detail: "We prepare the information and walk you through the choice. The filing is made by you or a provider you choose." },
      { label: "Formation steps", owner: "founder", detail: "Prefilled where the provider allows it, then opened for you to sign and submit." },
      { label: "EIN or tax ID", owner: "founder", detail: "We assemble everything the application asks for. You submit it to the authority yourself." },
      { label: "Registered agent and filings", owner: "external", detail: "We identify what your state requires and point you at providers. We do not act as your agent." },
      { label: "Business bank account", owner: "founder", detail: "We prepare the documents banks ask for. Opening the account requires you in person or on camera." },
      { label: "Insurance", owner: "external", detail: "We set out what your trade and contracts typically require, and track the policy once it exists." },
      { label: "Licences and permits", owner: "external", detail: "We identify what applies to your trade and location, prepare what we can, and record each one." },
      { label: "Compliance reminders", owner: "builder", detail: "Renewal dates recorded in your company record and surfaced before they lapse." },
    ],
  },
  {
    id: "identity",
    label: "Identity",
    premise: "How the company is recognised, before anyone has met you.",
    items: [
      { label: "Name direction", owner: "builder", detail: "Options researched for conflicts and matching domains." },
      { label: "Positioning", owner: "builder", detail: "What you sell, to whom, and why they pick you over the van down the road." },
      { label: "Visual identity", owner: "builder", detail: "Logo direction, colour, type and the rules that keep it consistent." },
      { label: "Domain", owner: "builder", detail: "Registered or connected in your name, DNS configured, certificate verified." },
      { label: "Business email", owner: "builder", detail: "Mailboxes on your domain, forwarding and signatures, tested end to end." },
      { label: "Business phone", owner: "builder", detail: "A business number with hours and missed-call handling, separate from your mobile." },
    ],
  },
  {
    id: "customer",
    label: "Customer system",
    premise: "The path a stranger walks from finding you to paying you.",
    items: [
      { label: "Website", owner: "builder", detail: "Built for how your trade is found and hired, live on your domain." },
      { label: "Lead capture", owner: "builder", detail: "Enquiry routes that reach you rather than a form that goes nowhere." },
      { label: "Quote and request forms", owner: "builder", detail: "The fields your trade actually needs, including photos where they help." },
      { label: "CRM", owner: "builder", detail: "Pipeline and customer records shaped around your services." },
      { label: "Scheduling", owner: "builder", detail: "Booking rules, buffers and calendar sync, tested with a real booking." },
      { label: "Payments", owner: "founder", detail: "We configure checkout, deposits and payout. Identity verification with the processor is yours by law." },
      { label: "Confirmations and follow-up", owner: "builder", detail: "What the customer receives, when, and what you receive alongside it." },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    premise: "What keeps the company running once customers arrive.",
    items: [
      { label: "Workflows", owner: "builder", detail: "How an enquiry becomes a quote, a job, an invoice and a review." },
      { label: "Policies", owner: "builder", detail: "Cancellation, rescheduling, deposits and what happens when a job goes wrong." },
      { label: "Service and quote terms", owner: "builder", detail: "Drafted for your trade and attached where customers actually see them." },
      { label: "Bookkeeping setup", owner: "external", detail: "Account structure and categories prepared. The software subscription and any advice come from your accountant." },
      { label: "Document organisation", owner: "builder", detail: "One place for contracts, certificates, filings and photos, organised and yours." },
      { label: "Customer communications", owner: "builder", detail: "The templates you would otherwise rewrite from scratch every week." },
    ],
  },
  {
    id: "launch",
    label: "Local and launch presence",
    premise: "Being findable in the places your customers actually look.",
    items: [
      { label: "Google Business Profile", owner: "founder", detail: "We prepare the full profile. Google verifies ownership with you directly, usually by post or video." },
      { label: "Maps and local presence", owner: "builder", detail: "Service area, hours and categories set so you appear for the right searches." },
      { label: "Local search basics", owner: "builder", detail: "Page structure, titles and service pages that a search engine can actually read." },
      { label: "Listing consistency", owner: "builder", detail: "One name, one address, one number, everywhere. The commonest quiet ranking problem." },
      { label: "Analytics", owner: "builder", detail: "Configured and receiving, so you know which work brings enquiries." },
      { label: "Launch starter setup", owner: "builder", detail: "The first review requests, the first listings, the first thing to tell existing customers." },
    ],
  },
  {
    id: "proof",
    label: "Proof and ownership",
    premise: "Evidence that it works, and a record that it is yours.",
    items: [
      { label: "Continuous verification", owner: "builder", detail: "Each connection tested as it is made, not in a single pass at the end." },
      { label: "Founder Action record", owner: "builder", detail: "Every action you completed, when, and what it unlocked." },
      { label: "Ownership records", owner: "builder", detail: "What you own, where it lives, and how to move it elsewhere." },
      { label: "Credentials and account ownership", owner: "builder", detail: "Every account in your name, with you as the owner rather than us." },
      { label: "Evidence log", owner: "builder", detail: "Every check, its result and its timestamp, handed over with the company." },
      { label: "Export and handoff", owner: "builder", detail: "A full export you can take anywhere, prepared before you ask for it." },
    ],
  },
];

export const turnkeyCopy = {
  eyebrow: "Turnkey scope",
  title: "Six lanes. One company.",
  lead: "This is what a Build my business engagement actually covers. Every item says who completes it, because the honest answer varies. Some things we do. Some things only you can legally do. Some things belong to a bank, an insurer or a government office, and we prepare, connect and verify around them.",
  boundary:
    "Business Builder is not a law firm, an accountant, an insurer, a bank, a registered agent or a filing authority. We do not give legal or tax advice, and we do not file on your behalf where the law requires you.",
};
