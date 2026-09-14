import type { Owner } from "./turnkey";

/**
 * Implementation state. Answers "how far through the build is this?".
 *
 * Not to be confused with the audit verdicts in audit.ts, which answer
 * "what do we do with the thing you already have?". A module can carry both:
 * Improve, and Tested.
 */
export type Status = "proposed" | "executed" | "tested" | "verified";

export const statusOrder: Status[] = ["proposed", "executed", "tested", "verified"];

export const statusLabels: Record<Status, string> = {
  proposed: "Proposed",
  executed: "Executed",
  tested: "Tested",
  verified: "Verified",
};

/** The Build Room's lanes, shared with the turnkey scope so nothing drifts. */
export type Lane = "foundation" | "identity" | "customer" | "operations" | "launch" | "proof";

export const laneLabels: Record<Lane, string> = {
  foundation: "Foundation",
  identity: "Identity",
  customer: "Customer experience",
  operations: "Operations",
  launch: "Launch",
  proof: "Verification",
};

export type Module = {
  id: string;
  name: string;
  lane: Lane;
  detail: string;
  evidence: string;
  owner: Owner;
  /** True for modules that gate Ready, because a customer depends on them. */
  customerFacing: boolean;
};

export const modules: Module[] = [
  {
    id: "entity",
    name: "Entity and tax ID",
    lane: "foundation",
    detail: "Structure chosen, formation and EIN steps prepared",
    evidence: "Filing and EIN recorded with dates",
    owner: "founder",
    customerFacing: false,
  },
  {
    id: "banking",
    name: "Banking and insurance",
    lane: "foundation",
    detail: "Documents prepared, requirements identified",
    evidence: "Account and policy numbers recorded",
    owner: "external",
    customerFacing: false,
  },
  {
    id: "identity",
    name: "Company identity",
    lane: "identity",
    detail: "Name direction, positioning, voice, visual system",
    evidence: "Brand direction approved by founder",
    owner: "builder",
    customerFacing: true,
  },
  {
    id: "domain",
    name: "Domain and email",
    lane: "identity",
    detail: "Registered, DNS configured, mailboxes live",
    evidence: "DNS resolves, test message delivered",
    owner: "builder",
    customerFacing: true,
  },
  {
    id: "website",
    name: "Website",
    lane: "customer",
    detail: "Service, quote and booking pages",
    evidence: "Live on your domain over HTTPS",
    owner: "builder",
    customerFacing: true,
  },
  {
    id: "crm",
    name: "CRM and scheduling",
    lane: "customer",
    detail: "Pipeline, booking rules, calendar sync",
    evidence: "Test booking reached your calendar and CRM",
    owner: "builder",
    customerFacing: true,
  },
  {
    id: "payments",
    name: "Payments",
    lane: "customer",
    detail: "Checkout, deposits, payout account",
    evidence: "Test checkout completed",
    owner: "founder",
    customerFacing: true,
  },
  {
    id: "operations",
    name: "Workflows and terms",
    lane: "operations",
    detail: "Policies, quote terms, templates, documents",
    evidence: "Attached where customers see them",
    owner: "builder",
    customerFacing: false,
  },
  {
    id: "listings",
    name: "Profile and listings",
    lane: "launch",
    detail: "Google Business Profile, listings, analytics",
    evidence: "Profile verified, listings consistent",
    owner: "founder",
    customerFacing: true,
  },
  {
    id: "evidence",
    name: "Evidence and ownership",
    lane: "proof",
    detail: "Verification log, ownership record, export",
    evidence: "Handover pack prepared",
    owner: "builder",
    customerFacing: false,
  },
];

export type FounderActionStatus = "done" | "waiting" | "upcoming";

export const founderActionStatusLabels: Record<FounderActionStatus, string> = {
  done: "Done",
  waiting: "Waiting on you",
  upcoming: "Up next",
};

/**
 * The six states a Founder Action moves through. The point is that the founder
 * only ever performs step four. Everything around it is done for them.
 */
export const founderActionFlow = [
  { id: "prepared", label: "Prepared", note: "We assemble every detail the provider will ask for." },
  { id: "explained", label: "Explained", note: "Why it must be you, in plain language, with the time it takes." },
  { id: "linked", label: "Linked", note: "The official flow opens with your information already to hand." },
  { id: "completed", label: "You complete it", note: "The signature, identity check or acceptance only you can give." },
  { id: "captured", label: "Captured", note: "The result is recorded against your company, so it is never asked for twice." },
  { id: "verified", label: "Verified", note: "We confirm it took effect and unblock whatever was waiting on it." },
] as const;

export type FounderAction = {
  id: string;
  title: string;
  lane: Lane;
  why: string;
  /** Who performs the final step, when it is not us. */
  provider: string;
  prepared: string[];
  steps: string[];
  /** What we do once it is done. */
  captured: string;
  minutes: number;
  status: FounderActionStatus;
  /** What this unblocks, so the parallel build is legible. */
  unblocks: string;
};

export const founderActions: FounderAction[] = [
  {
    id: "legal-name",
    title: "Choose your legal business name",
    lane: "foundation",
    why: "The name on your entity, your bank account and your payment processor has to be chosen by you.",
    provider: "You, with the state filing that follows",
    prepared: ["Three directions checked for conflicts", "Matching domain availability", "The exact spelling each provider will need"],
    steps: ["Pick a direction", "Confirm the exact legal spelling"],
    captured: "Recorded once and reused by every later form.",
    minutes: 5,
    status: "done",
    unblocks: "Domain, entity filing and the processor account",
  },
  {
    id: "ein",
    title: "Submit your EIN application",
    lane: "foundation",
    why: "A tax ID is issued to the responsible party personally. The authority requires you to apply, not an agent acting as you.",
    provider: "The tax authority",
    prepared: [
      "Every field the application asks for, assembled from what you already told us",
      "Your entity details, address and responsible party on one page",
      "A checklist of what the confirmation will look like",
    ],
    steps: ["Open the official application", "Check the prepared details", "Submit and save the confirmation"],
    captured: "Upload or forward the confirmation and we file it against your company.",
    minutes: 12,
    status: "done",
    unblocks: "Bank account and payments payout",
  },
  {
    id: "processor-identity",
    title: "Verify your identity with the payment processor",
    lane: "customer",
    why: "Payment processors are legally required to verify the account owner. We cannot do this for you, and you should not want anyone who could.",
    provider: "Your payment processor",
    prepared: [
      "Processor account created and configured for your services",
      "Business details filled in from your approved direction",
      "Payout schedule set to weekly",
    ],
    steps: ["Open the verification link we sent", "Upload a photo of your ID", "Confirm your bank account"],
    captured: "The processor tells us when it clears, and we re-run the checkout check.",
    minutes: 10,
    status: "waiting",
    unblocks: "Payouts, and Fully Set",
  },
  {
    id: "gbp",
    title: "Confirm ownership of your Google Business Profile",
    lane: "launch",
    why: "Google verifies the owner directly, usually by post or a short video. Only the owner can complete it.",
    provider: "Google",
    prepared: [
      "The full profile written: categories, service area, hours, services",
      "Photos selected and sized",
      "The exact name, address and phone used everywhere else",
    ],
    steps: ["Start verification in your profile", "Complete the postcard or video step", "Tell us when it clears"],
    captured: "We publish the prepared profile the moment verification lands.",
    minutes: 8,
    status: "upcoming",
    unblocks: "Maps presence and listing consistency",
  },
];

export const verificationLadder: { id: Status; label: string; text: string }[] = [
  { id: "proposed", label: "Proposed", text: "The system is part of the approved scope. Nothing exists yet." },
  { id: "executed", label: "Executed", text: "It has been set up and connected. This is where most services stop." },
  { id: "tested", label: "Tested", text: "We used it the way a customer or you would. A booking, a message, a checkout." },
  { id: "verified", label: "Verified", text: "The result matched what you should see. The evidence is in your log." },
];

/**
 * Ready is about the customer's path working end to end. An account existing is
 * not Ready. A customer getting all the way through is.
 */
export const readiness = {
  ready: {
    label: "Ready",
    definition: "A real customer can move through your whole path, start to finish.",
    checks: [
      "They can find you and reach you",
      "An enquiry arrives where you will see it",
      "A quote or response goes back out",
      "A booking lands in your calendar",
      "A payment or deposit clears where it applies",
      "Both of you get the confirmation",
    ],
  },
  fullySet: {
    label: "Fully Set",
    definition: "Every agreed customer-facing, operational, ownership and administrative item is complete and verified.",
    checks: [
      "Entity, tax ID, banking and insurance steps complete where they apply",
      "Licences and permits recorded, with renewal dates",
      "Bookkeeping and document organisation in place",
      "Every Founder Action captured and verified",
      "Accounts in your name, ownership record written",
    ],
  },
  note: "Not every business needs every item. The scope you approved decides which ones count.",
};

export const exampleCheck = {
  name: "Booking flow",
  steps: [
    { actor: "Customer", text: "books a slot on your website" },
    { actor: "Calendar", text: "shows the event with the right buffer" },
    { actor: "CRM", text: "creates the customer record" },
    { actor: "Email", text: "delivers the confirmation to both of you" },
  ],
};

export const generatedVsBuilt = {
  generated: [
    "A website file, on someone else's subdomain",
    "A logo image",
    "A business plan document",
    "A list of tools and agencies to go and deal with",
    "A to-do list that is now your problem",
  ],
  built: [
    { item: "A live website on your domain", evidence: "Loads over HTTPS on your domain" },
    { item: "Email and a business number that reach you", evidence: "Test message and call delivered" },
    { item: "An enquiry that becomes a booking", evidence: "Appeared in your calendar and CRM" },
    { item: "A checkout that completes", evidence: "Test payment processed" },
    { item: "Foundation steps prepared and tracked", evidence: "Each one dated, with the provider named" },
    { item: "An evidence log and an ownership record", evidence: "Every check, timestamped, yours" },
  ],
};

/** The handoff moment itself: what changes hands on the day. */
export const handoverItems = [
  { item: "Every account and login", note: "Domain, email, phone, CRM, scheduling, payments, hosting, analytics" },
  { item: "Website and full export", note: "Source, content and brand assets you can take anywhere" },
  { item: "Business documents", note: "Filings, certificates, policies, terms and templates" },
  { item: "The evidence log", note: "Every check, its result and its timestamp" },
  { item: "The Founder Action record", note: "What you completed, when, and what it unlocked" },
  { item: "Remaining obligations", note: "Renewals, filings and dates you need to keep, written down" },
];

export const ownership = [
  { asset: "Website and full export", note: "Hosted for you, exportable any time" },
  { asset: "Domain", note: "Registered in your name where applicable" },
  { asset: "Business email and phone", note: "Your mailboxes, your number, your data" },
  { asset: "Customer data", note: "Contacts, bookings, history" },
  { asset: "Brand assets", note: "Logo files, colours, type, voice" },
  { asset: "Business documents", note: "Everything prepared for your Founder Actions" },
  { asset: "Company history", note: "Research, audit, recommendation, decisions" },
  { asset: "Verification evidence", note: "The full log of every check" },
];

export const fragmentation: { job: string; who: string; punchline?: boolean }[] = [
  { job: "Entity, tax ID and bank", who: "Three providers, three logins" },
  { job: "Licences, permits and insurance", who: "You, and a lot of searching" },
  { job: "Positioning and brand", who: "A consultant, or a guess" },
  { job: "Website and domain", who: "An agency, a freelancer, or a weekend" },
  { job: "Business email and phone", who: "A friend who knows computers" },
  { job: "CRM and scheduling", who: "Two subscriptions you never configure" },
  { job: "Payments", who: "A processor, and an identity check" },
  { job: "Google profile and listings", who: "Postponed, then forgotten" },
  { job: "Bookkeeping and terms", who: "A shoebox and an optimistic attitude" },
  { job: "Checking that it all works together", who: "Nobody", punchline: true },
];
