export type DayEvent = {
  time: string;
  actor: "worker" | "founder" | "customer";
  who: string;
  what: string;
  /** Set when the event is a worker stopping to ask. */
  gate?: string;
};

/** One representative day for a detailing company running with Build & Run. */
export const workerDay: DayEvent[] = [
  {
    time: "06:42",
    actor: "customer",
    who: "New inquiry",
    what: "A form comes in for a full detail on an SUV, eleven miles out.",
  },
  {
    time: "06:43",
    actor: "worker",
    who: "Intake Assistant",
    what: "Replies, confirms the address is inside your radius, and asks for two photos.",
  },
  {
    time: "07:55",
    actor: "worker",
    who: "Quote Drafting Assistant",
    what: "Drafts the quote from your price book: SUV tier plus your travel rule for eleven miles.",
    gate: "Above your approval threshold. Held for you.",
  },
  {
    time: "08:10",
    actor: "founder",
    who: "You",
    what: "Approve the quote from your phone in one tap.",
  },
  {
    time: "08:11",
    actor: "worker",
    who: "Quote Drafting Assistant",
    what: "Sends the quote and schedules the follow-up for Thursday.",
  },
  {
    time: "09:30",
    actor: "worker",
    who: "Inbox Assistant",
    what: "Sorts nineteen emails, drafts four routine replies, flags one.",
  },
  {
    time: "09:31",
    actor: "worker",
    who: "Inbox Assistant",
    what: "A customer is unhappy with last week's interior.",
    gate: "Complaints always go to you. No reply was sent.",
  },
  {
    time: "16:20",
    actor: "worker",
    who: "Review Follow-up Assistant",
    what: "Asks this morning's completed job for a review. Skips the unhappy customer.",
  },
  {
    time: "18:00",
    actor: "worker",
    who: "Intake Assistant",
    what: "Two evening inquiries answered and booked into tomorrow's estimate slots.",
  },
];

export const dayLegend: { actor: DayEvent["actor"]; label: string }[] = [
  { actor: "worker", label: "An AI worker acted" },
  { actor: "founder", label: "You decided" },
  { actor: "customer", label: "A customer acted" },
];
