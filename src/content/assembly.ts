/**
 * The Company, Assembled.
 *
 * The parts of a service business and, more importantly, the joins between them.
 * A generator can hand over the parts. The company only exists once the joins
 * carry real traffic, which is what verification proves.
 *
 * One join is deliberately left open: payouts wait on the founder's identity
 * check. That is true of every real build, and it is the same dependency the
 * evidence receipt explains.
 */

export type PartKind = "system" | "yours" | "customer" | "founder";
export type JoinState = "verified" | "waiting";

export type Part = {
  id: string;
  label: string;
  kind: PartKind;
};

export type Join = {
  /** What actually travels along this connection. */
  label: string;
  state: JoinState;
};

export type Lane = {
  id: string;
  label: string;
  goal: string;
  parts: Part[];
  /** Always one shorter than `parts`: the connection between each pair. */
  joins: Join[];
};

export const lanes: Lane[] = [
  {
    id: "found",
    label: "Found",
    goal: "A stranger can find you",
    parts: [
      { id: "domain", label: "Domain", kind: "system" },
      { id: "website", label: "Website", kind: "system" },
      { id: "listing", label: "Search listing", kind: "system" },
    ],
    joins: [
      { label: "DNS resolves, certificate valid", state: "verified" },
      { label: "Pages readable, listing claimed", state: "verified" },
    ],
  },
  {
    id: "booked",
    label: "Booked",
    goal: "They can hire you without calling",
    parts: [
      { id: "enquiry", label: "Enquiry form", kind: "customer" },
      { id: "crm", label: "CRM", kind: "system" },
      { id: "scheduling", label: "Scheduling", kind: "system" },
      { id: "calendar", label: "Your calendar", kind: "yours" },
    ],
    joins: [
      { label: "Creates a lead with the job details", state: "verified" },
      { label: "Offers only slots you can work", state: "verified" },
      { label: "Writes the event with your buffer", state: "verified" },
    ],
  },
  {
    id: "paid",
    label: "Paid",
    goal: "The money reaches your account",
    parts: [
      { id: "checkout", label: "Checkout", kind: "customer" },
      { id: "payments", label: "Payments", kind: "system" },
      { id: "identity", label: "Identity", kind: "founder" },
      { id: "bank", label: "Your bank", kind: "yours" },
    ],
    joins: [
      { label: "Charges the card, sends the receipt", state: "verified" },
      { label: "Verifies the account owner", state: "waiting" },
      { label: "Releases the payout", state: "waiting" },
    ],
  },
];

/** Business email sits under the last two lanes and carries both confirmations. */
export const spanningPart = {
  label: "Business email",
  note: "On your domain. Carries every booking confirmation and every receipt.",
  ties: ["booked", "paid"],
  state: "verified" as JoinState,
};

export const partKindLabels: Record<PartKind, string> = {
  system: "We build and connect it",
  yours: "Already yours",
  customer: "Where a customer arrives",
  founder: "Only you can complete it",
};

export const assemblyCopy = {
  eyebrow: "The company, assembled",
  title: "A company is not its parts. It is the joins.",
  lead: "Ten tools in ten tabs is not a business. This is the whole thing in one view: every part wired to the next, and every connection tested the way a customer would use it. Handing over the parts is the easy half.",
  closing:
    "One join is still open here, and it is marked. Payouts wait on an identity check only the founder can complete. We never paint over that.",
};
