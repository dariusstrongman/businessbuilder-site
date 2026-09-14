/**
 * An evidence receipt: the artifact verification produces.
 *
 * Every field is something the system genuinely records. The example below is
 * a test-mode run, labelled as such, and it deliberately carries an unresolved
 * dependency because that is the honest shape of a real build.
 */

export type ReceiptLine = {
  step: string;
  result: "pass" | "blocked";
};

export const evidenceReceipt = {
  id: "CHK-0412",
  module: "Payments",
  name: "A customer can pay you, and the money reaches your bank",
  when: "Day 3 · 10:02",
  mode: "Test mode",
  checked: [
    { step: "A test customer paid for a standard detail on your site", result: "pass" },
    { step: "The charge appeared in your processor dashboard", result: "pass" },
    { step: "The receipt reached the customer's inbox", result: "pass" },
    { step: "The payout was released to your bank account", result: "blocked" },
  ] satisfies ReceiptLine[],
  evidence: [
    "checkout.session.completed · test card · status succeeded",
    "receipt delivered to the test inbox in 4s",
    "payout schedule: weekly · first payout pending",
  ],
  dependency: {
    label: "Unresolved dependency",
    title: "Payouts wait on your identity check",
    body: "Payment processors are legally required to verify the account owner before releasing money. We created the account, configured it for your services and filled in your business details. The last step is yours and takes about ten minutes.",
    owner: "Founder Action 02",
  },
  outcome: {
    ready: true,
    fullySet: false,
    line: "Counts towards Ready. Does not count towards Fully Set until the dependency clears.",
  },
};
