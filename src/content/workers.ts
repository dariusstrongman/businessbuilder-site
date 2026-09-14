export type Worker = {
  id: string;
  name: string;
  job: string;
  can: string[];
  mustAsk: string[];
  cannot: string[];
};

export const workers: Worker[] = [
  {
    id: "intake",
    name: "Intake Assistant",
    job: "Answers new inquiries, collects job details, and books estimates into your calendar.",
    can: ["Reply to new inquiries within your hours", "Collect address, scope and photos", "Offer estimate slots from your calendar"],
    mustAsk: ["Requests outside your service area", "Jobs outside your listed services"],
    cannot: ["Quote a price", "Promise a completion date"],
  },
  {
    id: "quote",
    name: "Quote Drafting Assistant",
    job: "Drafts quotes from your price rules and sends them only after you approve.",
    can: ["Draft quotes using your price book", "Apply your travel and minimum-job rules", "Prepare the follow-up sequence"],
    mustAsk: ["Any quote above your approval threshold", "Any discount", "Any job with unclear scope"],
    cannot: ["Send a quote without approval", "Change your prices"],
  },
  {
    id: "inbox",
    name: "Inbox Assistant",
    job: "Sorts your business inbox, drafts routine replies, and flags what needs you.",
    can: ["Label and prioritise incoming email", "Draft replies to routine questions", "Surface anything time-sensitive"],
    mustAsk: ["Complaints", "Refund requests", "Anything legal or financial"],
    cannot: ["Delete mail", "Reply on your behalf to flagged threads"],
  },
  {
    id: "reviews",
    name: "Review Follow-up Assistant",
    job: "Asks satisfied customers for a review at the right moment, and stops when asked.",
    can: ["Send a review request after a completed job", "Send one reminder", "Thank customers who leave a review"],
    mustAsk: ["Any customer who reported a problem"],
    cannot: ["Offer incentives for reviews", "Contact a customer who opted out"],
  },
];

export const workerLimits = [
  {
    label: "Permissions",
    text: "Each worker has an explicit list of what it can do, what it must ask about, and what it cannot do.",
  },
  {
    label: "Budgets",
    text: "Anything that costs money has a cap you set. Workers stop at the cap and tell you.",
  },
  {
    label: "Approvals",
    text: "Irreversible or customer-facing decisions wait for you. Approve from your phone.",
  },
  {
    label: "Company context",
    text: "Workers use your services, pricing, service area and tone. Nothing generic.",
  },
];
