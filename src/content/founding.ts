/**
 * Founding customer pricing.
 *
 * These are launch prices, set deliberately low while the product proves itself
 * with real businesses. They are not a discount, a budget tier or a promotion,
 * and nothing here invents scarcity or an expiry date.
 *
 * Every figure below is approved. Do not add a price that is not.
 */

export type OfferId = "website" | "business" | "bundle" | "existing" | "run";

export type Offer = {
  id: OfferId;
  /** How a visitor would describe what they want. */
  plain: string;
  name: string;
  /** A qualifier that must not be set at figure size, e.g. "Starting at". */
  upfrontPrefix?: string;
  /** The headline figure. */
  upfront: string;
  /** Set when there is a recurring charge. */
  monthly?: string;
  /** Qualifies the upfront figure, e.g. onboarding rather than a fixed build. */
  upfrontLabel: string;
  audience: string;
  summary: string;
  includes: string[];
  /** Shown under the price where the figure needs honest explanation. */
  note?: string;
  emphasis?: boolean;
};

export const foundingCopy = {
  label: "Founding customer pricing",
  headline: "Founding customer pricing, while the product proves itself.",
  lead: "Business Builder is early. These prices are set lower on purpose, because the first customers are taking a chance on a company that does not yet have a wall of case studies. Founding customer pricing is available during the early launch period.",
  /** Deliberately no countdown, no seat count, no expiry. None of that is real. */
  honesty:
    "No countdown, no seat count, no expiry date. When founding pricing ends we will say so plainly rather than manufacture a deadline.",
};

export const offers: Offer[] = [
  {
    id: "website",
    plain: "Just the website",
    name: "Build my professional website",
    upfront: "$795",
    upfrontLabel: "One-time project price",
    audience: "For people who need a premium, working website and nothing else yet.",
    summary: "A custom website built for how your trade is found and hired, verified live on your domain.",
    includes: [
      "Creative direction made for your business, not chosen from a template",
      "Page structure and copy shaped around how your trade gets hired",
      "Quote and enquiry forms with the fields your work actually needs",
      "Designed and checked at phone, tablet and desktop widths",
      "Domain connected, HTTPS verified, analytics receiving",
      "Every path tested end to end before it is called live",
      "Full ownership, source files and export",
    ],
    note: "The website only. Company foundation, CRM, scheduling, payments and operations are not included.",
  },
  {
    id: "business",
    plain: "Build the business",
    name: "Build my business",
    upfront: "$1,495",
    upfrontLabel: "One-time build price",
    audience: "For people who want the coordinated company assembled, new or already trading.",
    summary:
      "Describe the company you want. We help assemble it, verify it, and hand you the keys.",
    includes: [
      "Starting-point intake, research and a recommendation you approve first",
      "Company foundation steps prepared, tracked and verified",
      "Identity: name direction, positioning, brand, domain, email, business phone",
      "Customer system: website, lead capture, CRM, scheduling, payments",
      "Operations: workflows, policies, quote terms, bookkeeping and document setup",
      "Local presence: Google Business Profile, listings, local search, analytics",
      "Founder Actions prepared, explained and captured",
      "Continuous verification, Ready and Fully Set, then handoff",
    ],
    note: "No monthly fee. You take the keys and run the company yourself. Build & Run can be added later at $795 activation.",
    emphasis: true,
  },
  {
    id: "bundle",
    plain: "Build it and run it",
    name: "Build my business + Build & Run",
    upfront: "$1,995",
    upfrontLabel: "Upfront, build and activation together",
    monthly: "$299",
    audience: "For people who want the company built and then operated, without doing it twice.",
    summary: "The whole journey: assembled, verified, handed over, then kept running inside limits you set.",
    includes: [
      "Everything in Build my business",
      "Build & Run activation: systems connected, permissions, budgets and escalation rules set",
      "Intake, quote drafting, inbox and review follow-up assistants configured",
      "Company context set up so workers use your prices, services and tone",
      "Ongoing operation of the recurring work you approve",
      "Stop the monthly plan any time. The company stays yours.",
    ],
    note: "Activation is $500 here instead of $795, because most of the configuration happens during the build itself.",
  },
  {
    id: "existing",
    plain: "Already have a business",
    name: "Existing business + Build & Run",
    upfrontPrefix: "Starting at",
    upfront: "$1,495",
    upfrontLabel: "Onboarding, quoted after the audit",
    monthly: "$299",
    audience: "For owners who already trade and want parts of the business operated for them.",
    summary: "An Existing Business Audit first, then the operating layer switched on over what you already have.",
    includes: [
      "Existing Business Audit: every system classified Keep, Improve, Replace or Missing",
      "Migration and cleanup of what is worth keeping",
      "Account connections, permissions and access set up correctly",
      "Existing tools reconciled rather than replaced by default",
      "Workflow integration and verification before anything is operated",
      "Ongoing operation of the recurring work you approve",
    ],
    note: "Starting at, because onboarding depends on what the audit finds. A tidy setup costs less to take on than a tangled one. You see the figure before you commit.",
  },
];

/** Build & Run on its own, for founders who already finished a build elsewhere in the journey. */
export const runStandalone = {
  name: "Build & Run",
  activation: "$795",
  monthly: "$299",
  activationLabel: "One-time activation",
  monthlyLabel: "Per month",
  bundleActivation: "$500",
  summary: "Activation configures the operating layer. The monthly plan keeps it running.",
};

/**
 * The activation fee needs explaining without sounding defensive. It buys
 * durable configuration that survives cancellation, which is the honest reason
 * it exists.
 */
export const activation = {
  title: "Why there is an activation fee",
  lead: "Activation covers connecting and configuring the operating system for your company. The monthly plan covers continued operation.",
  setup: {
    label: "Activation, once",
    note: "Durable setup. It stays yours even if you stop the monthly plan later.",
    items: [
      "Systems connected: inbox, CRM, scheduling, payments",
      "Permissions set per worker: what it can do, must ask about, and cannot do",
      "Company context built from your services, price book, service area and tone",
      "Operating rules, approval thresholds and budgets agreed",
      "Escalation routes defined, to you first and then to a person here",
      "Recurring automations configured and tested before anything reaches a customer",
    ],
  },
  ongoing: {
    label: "Monthly, while it runs",
    note: "The operating layer itself, inside the limits you set.",
    items: [
      "Inbound lead handling and first replies",
      "Quote drafting from your price rules, held for your approval",
      "Inbox triage, routine replies and flagging what needs you",
      "Follow-up and review requests at the right moment",
      "Recurring monitoring of connected systems",
      "Scheduled operational tasks and escalation when something is unclear",
    ],
  },
  boundary:
    "Build & Run is not an unlimited AI subscription. Workers operate inside the permissions, approval thresholds and budgets you set, and a fair-use policy for operating volume will be published before it could ever matter.",
};

/** Cost boundaries that belong on the pricing page without turning it into a contract. */
export const costBoundaries = [
  {
    id: "third-party",
    title: "Government, provider and third-party fees are separate",
    text: "Filing fees, registered-agent fees, domains, software subscriptions, insurance, advertising spend, payment-processing fees and professional fees are yours at cost where they apply. Each one is an approval before it is bought, and each is registered to you.",
  },
  {
    id: "revenue",
    title: "No revenue share, no percentage, no equity",
    text: "A build fee, and an optional monthly plan. We do not take a cut of your sales, a transaction fee, or a share of your company. What your business earns is yours.",
  },
  {
    id: "ownership",
    title: "Stop Build & Run when you want. Your business stays yours.",
    text: "Your company, customer data, brand, domain, accounts and everything we agreed to deliver remain yours. What stays ours is the platform underneath: the builder systems, orchestration, reusable agents and verification infrastructure we use for every customer.",
  },
  {
    id: "usage",
    title: "Reasonable operating limits",
    text: "The monthly plan covers the recurring work you approve, within agreed budgets. Unusually high external usage costs, such as heavy advertising or provider charges, sit outside it and are always approved by you first.",
  },
];

/**
 * A one-line price summary for places that introduce pricing without setting
 * out the whole model. Activation is named on the Build & Run row on purpose:
 * a headline that mentions only the monthly figure can read as though running
 * a company costs $299 and nothing else.
 */
export const priceSummary = [
  { label: "Website", figure: "$795" },
  { label: "Business", figure: "$1,495" },
  { label: "Run", figure: "from $795 activation + $299/mo" },
];

/** What the CTA can honestly promise today. */
export const checkoutTruth =
  "Nothing is charged until you have seen the research, approved the scope and confirmed the price with us directly.";
