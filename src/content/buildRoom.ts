export type Status = "proposed" | "executed" | "tested" | "verified";

export const statusOrder: Status[] = ["proposed", "executed", "tested", "verified"];

export const statusLabels: Record<Status, string> = {
  proposed: "Proposed",
  executed: "Executed",
  tested: "Tested",
  verified: "Verified",
};

export type Module = {
  id: string;
  name: string;
  detail: string;
  evidence: string;
  /** True for modules that gate Ready (customer-facing). */
  customerFacing: boolean;
};

export const modules: Module[] = [
  {
    id: "identity",
    name: "Company identity",
    detail: "Name direction, positioning, voice, visual system",
    evidence: "Brand direction approved by founder",
    customerFacing: true,
  },
  {
    id: "website",
    name: "Website",
    detail: "Service, quote and booking pages",
    evidence: "Live on your domain over HTTPS",
    customerFacing: true,
  },
  {
    id: "domain",
    name: "Domain",
    detail: "Registered or connected, DNS configured",
    evidence: "DNS resolves, certificate valid",
    customerFacing: true,
  },
  {
    id: "email",
    name: "Business email",
    detail: "Mailboxes on your domain, forwarding, signature",
    evidence: "Test message delivered to your inbox",
    customerFacing: false,
  },
  {
    id: "crm",
    name: "CRM",
    detail: "Pipeline, customer records, form routing",
    evidence: "Test lead appeared in your pipeline",
    customerFacing: true,
  },
  {
    id: "scheduling",
    name: "Scheduling",
    detail: "Booking rules, buffers, calendar sync",
    evidence: "Test booking landed in your calendar",
    customerFacing: true,
  },
  {
    id: "payments",
    name: "Payments",
    detail: "Checkout, deposits, payout account",
    evidence: "Test checkout completed",
    customerFacing: true,
  },
  {
    id: "setup",
    name: "Setup & admin",
    detail: "Entity, tax ID, bank and insurance steps, guided",
    evidence: "Founder Actions recorded with dates",
    customerFacing: false,
  },
];

export type FounderActionStatus = "done" | "waiting" | "upcoming";

export type FounderAction = {
  id: string;
  title: string;
  why: string;
  prepared: string[];
  steps: string[];
  minutes: number;
  status: FounderActionStatus;
};

export const founderActionStatusLabels: Record<FounderActionStatus, string> = {
  done: "Done",
  waiting: "Waiting on you",
  upcoming: "Up next",
};

export const founderActions: FounderAction[] = [
  {
    id: "legal-name",
    title: "Choose your legal business name",
    why: "The name on your entity, bank account and payment processor has to be chosen by you.",
    prepared: ["Three name directions checked for conflicts", "Availability of matching domains"],
    steps: ["Pick a direction", "Confirm the exact legal spelling"],
    minutes: 5,
    status: "done",
  },
  {
    id: "processor-identity",
    title: "Verify your identity with the payment processor",
    why: "Payment processors are legally required to verify the account owner. We cannot do this for you, and you should not want anyone who could.",
    prepared: [
      "Processor account created and configured for your services",
      "Business details filled in from your approved direction",
      "Payout schedule set to weekly",
    ],
    steps: ["Open the verification link we sent", "Upload a photo of your ID", "Confirm your bank account"],
    minutes: 10,
    status: "waiting",
  },
  {
    id: "address",
    title: "Confirm your business address",
    why: "The address appears on invoices, your listing and your entity filing. Only you can confirm it.",
    prepared: ["Address pulled from your intake", "Listing draft ready to publish"],
    steps: ["Confirm or correct the address", "Choose whether it is shown publicly"],
    minutes: 2,
    status: "upcoming",
  },
  {
    id: "bank",
    title: "Connect your bank account",
    why: "Payouts go to an account in your name. We never hold your money.",
    prepared: ["Payout account placeholder in the processor", "Instructions for your bank"],
    steps: ["Open the payout settings", "Connect your account", "Confirm the test deposit"],
    minutes: 8,
    status: "upcoming",
  },
];

export const verificationLadder: { id: Status; label: string; text: string }[] = [
  {
    id: "proposed",
    label: "Proposed",
    text: "The system is part of the approved plan. Nothing exists yet.",
  },
  {
    id: "executed",
    label: "Executed",
    text: "It has been set up and connected. This is where most services stop.",
  },
  {
    id: "tested",
    label: "Tested",
    text: "We used it the way a customer or you would. A booking, a message, a checkout.",
  },
  {
    id: "verified",
    label: "Verified",
    text: "The result matched what you should see. The evidence is in your log.",
  },
];

export const exampleCheck = {
  name: "Booking flow",
  steps: [
    { actor: "Customer", text: "books a slot on your website" },
    { actor: "Calendar", text: "shows the event with the right buffer" },
    { actor: "CRM", text: "creates the customer record" },
    { actor: "Email", text: "delivers the confirmation to both of you" },
  ],
};

export const readiness = {
  ready: {
    label: "Ready",
    definition: "Customers can find you, reach you, book you and pay you.",
    checks: [
      "Website live on your domain",
      "Contact form reaches you",
      "Booking lands in your calendar and CRM",
      "Payment clears at checkout",
    ],
  },
  fullySet: {
    label: "Fully Set",
    definition: "Everything in Ready, and everything behind it.",
    checks: [
      "Every Founder Action complete",
      "Email, CRM, scheduling and payments connected and verified",
      "Setup and admin steps recorded",
      "Ownership record and export prepared",
    ],
  },
};

export const generatedVsBuilt = {
  generated: [
    "A website file, on someone else's subdomain",
    "A logo image",
    "A business plan document",
    "A list of tools to sign up for",
    "A to-do list that is now your problem",
  ],
  built: [
    { item: "A live website on your domain", evidence: "Loads over HTTPS on your domain" },
    { item: "Email that receives", evidence: "Test message delivered to your inbox" },
    { item: "A booking that lands", evidence: "Appeared in your calendar and CRM" },
    { item: "A checkout that completes", evidence: "Test payment processed" },
    { item: "Founder Actions, done or tracked", evidence: "Each one dated and recorded" },
    { item: "An evidence log", evidence: "Every check, timestamped, yours" },
  ],
};

/** The handoff moment itself: what changes hands on the day. Distinct from the ownership manifest. */
export const handoverItems = [
  { item: "Every login", note: "Domain, email, CRM, scheduling, payments, hosting" },
  { item: "The evidence log", note: "Every check, its result and its timestamp" },
  { item: "The ownership record", note: "What you own, where it lives, how to move it" },
  { item: "A full export", note: "Site, content, brand files and customer data" },
];

export const ownership = [
  { asset: "Website and full export", note: "Hosted for you, exportable any time" },
  { asset: "Domain", note: "Registered in your name where applicable" },
  { asset: "Business email", note: "Your mailboxes, your data" },
  { asset: "Customer data", note: "Contacts, bookings, history" },
  { asset: "Brand assets", note: "Logo files, colours, type, voice" },
  { asset: "Business documents", note: "Everything prepared for your Founder Actions" },
  { asset: "Company history", note: "Research, recommendation, decisions" },
  { asset: "Verification evidence", note: "The full log of every check" },
];

export const fragmentation: { job: string; who: string; punchline?: boolean }[] = [
  { job: "Positioning and offer", who: "A consultant, or a guess" },
  { job: "Brand direction", who: "A designer, or a template" },
  { job: "Website", who: "An agency, a freelancer, or a weekend" },
  { job: "Domain and DNS", who: "You, at midnight" },
  { job: "Business email", who: "A friend who knows computers" },
  { job: "CRM", who: "A subscription you never configure" },
  { job: "Scheduling", who: "Another subscription" },
  { job: "Payments", who: "A processor, and an identity check" },
  { job: "Setup and admin", who: "A formation service and a search engine" },
  { job: "Checking that it all works", who: "Nobody", punchline: true },
];
