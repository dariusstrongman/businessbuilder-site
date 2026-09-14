/**
 * The Existing Business Audit.
 *
 * Two state systems live in this product and they answer different questions.
 * This one answers "what do we do with the thing you already have?". The
 * Proposed / Executed / Tested / Verified chain in buildRoom.ts answers "how
 * far through implementation is it?". They must never be mixed.
 */

export type Verdict = "keep" | "improve" | "replace" | "missing";

export const verdictLabels: Record<Verdict, string> = {
  keep: "Keep",
  improve: "Improve",
  replace: "Replace",
  missing: "Missing",
};

export const verdictMeaning: Record<Verdict, string> = {
  keep: "It works. We leave it alone and connect to it.",
  improve: "The foundation is sound. We fix what is weak rather than start again.",
  replace: "It is holding the business back, and rebuilding costs less than patching.",
  missing: "It does not exist yet, and the business needs it.",
};

export type AuditArea = {
  id: string;
  label: string;
  lane: "foundation" | "identity" | "customer" | "operations" | "launch";
  /** The example verdict shown in the illustrative audit. */
  verdict: Verdict;
  /** Why that call was made, in the founder's terms. */
  note: string;
};

/**
 * An illustrative audit for one pressure washing company. It is an example of
 * the output, not a claim about a real customer.
 */
export const auditExample: AuditArea[] = [
  { id: "entity", label: "Entity status", lane: "foundation", verdict: "keep", note: "LLC registered and in good standing." },
  { id: "ein", label: "EIN / tax ID", lane: "foundation", verdict: "keep", note: "Already issued and on file." },
  { id: "bank", label: "Business bank account", lane: "foundation", verdict: "missing", note: "Takings still go to a personal account." },
  { id: "insurance", label: "Insurance", lane: "foundation", verdict: "improve", note: "General liability only. Commercial work needs more." },
  { id: "licences", label: "Licences and permits", lane: "foundation", verdict: "keep", note: "County licence current. Renewal noted." },
  { id: "brand", label: "Brand assets", lane: "identity", verdict: "improve", note: "One logo file, no colour or type system." },
  { id: "domain", label: "Domain and DNS", lane: "identity", verdict: "keep", note: "Owned, four years old. Worth keeping." },
  { id: "email", label: "Business email", lane: "identity", verdict: "replace", note: "A personal address on the van and the invoices." },
  { id: "phone", label: "Business phone", lane: "identity", verdict: "improve", note: "Mobile only. No hours, no missed-call handling." },
  { id: "website", label: "Website", lane: "customer", verdict: "improve", note: "Sound structure, slow, no quote form. Worth fixing, not binning." },
  { id: "forms", label: "Quote and lead capture", lane: "customer", verdict: "missing", note: "No way to request a quote without calling." },
  { id: "crm", label: "CRM", lane: "customer", verdict: "missing", note: "Jobs tracked in a notes app." },
  { id: "scheduling", label: "Scheduling", lane: "customer", verdict: "missing", note: "Booked by text, double-booked twice this month." },
  { id: "payments", label: "Payments", lane: "customer", verdict: "improve", note: "Card reader on site, nothing online, no deposits." },
  { id: "bookkeeping", label: "Bookkeeping setup", lane: "operations", verdict: "missing", note: "Receipts in the glovebox." },
  { id: "terms", label: "Service and quote terms", lane: "operations", verdict: "missing", note: "Nothing written down when a job goes wrong." },
  { id: "documents", label: "Document organisation", lane: "operations", verdict: "improve", note: "Files across two personal drives." },
  { id: "gbp", label: "Google Business Profile", lane: "launch", verdict: "improve", note: "Claimed, thin, wrong hours." },
  { id: "listings", label: "Local listings", lane: "launch", verdict: "improve", note: "Three listings, three different phone numbers." },
  { id: "reviews", label: "Reviews and reputation", lane: "launch", verdict: "keep", note: "Genuinely good. Nothing to fix, everything to use." },
  { id: "analytics", label: "Analytics", lane: "launch", verdict: "missing", note: "No idea where enquiries come from." },
  { id: "social", label: "Social profiles", lane: "launch", verdict: "keep", note: "Active and in the owner's voice. Left alone." },
];

export const auditCopy = {
  eyebrow: "Existing Business Audit",
  title: "Having a website does not mean you need a new one.",
  lead: "If you already trade, the build starts with an inventory rather than a demolition. Every important system is classified, every call is explained, and you approve each one before anything changes. Work you have already paid for gets kept.",
  reassurance:
    "The most valuable thing an audit does is stop you buying what you already own. In the example below, six systems are kept untouched.",
};
