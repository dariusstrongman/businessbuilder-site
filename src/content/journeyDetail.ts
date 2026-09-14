/** Stage-by-stage detail for the How it works page. Keyed by stage id from journey.ts. */
export type StageDetail = {
  happens: string;
  youDo: string;
  youGet: string;
};

export const stageDetails: Record<string, StageDetail> = {
  "starting-point": {
    happens:
      "You say where you are starting from: only an idea, a half-finished setup, a business that already trades, or one you want operated for you. Everything after this branches on that answer.",
    youDo: "Pick the one that sounds like you and describe the business in a sentence.",
    youGet: "A build opened in your name, already pointed at the right path.",
  },
  understand: {
    happens:
      "We build a picture of you: skills, hours, service area, equipment, what you want in a year, and what you refuse to do. Every answer is stored once and reused everywhere it is allowed.",
    youDo: "A short conversation. Ten minutes, on your phone if you like.",
    youGet: "A founder profile you can read and correct. It steers every decision after this.",
  },
  research: {
    happens:
      "We study your local market. If you already trade, we also inventory what you have and classify every system Keep, Improve, Replace or Missing.",
    youDo: "Nothing. You can watch it land in the Build Room.",
    youGet: "A research brief with sources and competitors, and an audit of anything you already own.",
  },
  recommendation: {
    happens:
      "We propose the strongest version of your company: positioning, offer, brand direction, what to keep, what to change, and every Founder Action the build will need.",
    youDo: "Read it. Push back. Ask for a different angle.",
    youGet: "A scope with a price, including the honest weak points. Nothing is built from it yet.",
  },
  approval: {
    happens:
      "The gate. The recommendation becomes the plan only when you approve it, and the plan is what the Build Room assembles.",
    youDo: "Approve the direction and the scope, or send it back with notes.",
    youGet: "An approved scope with every Founder Action listed before any work starts.",
  },
  commit: {
    happens: "You commit to the agreed scope and the build begins. Until this point you have paid nothing.",
    youDo: "Confirm the scope and pay for the build.",
    youGet: "The Build Room opens on the same day.",
  },
  "build-room": {
    happens:
      "One place showing six lanes, every module in them, and who each remaining task belongs to: us, you, or an outside provider.",
    youDo: "Watch it, and answer when a module needs a decision only you can make.",
    youGet: "A live view of the whole company being assembled, with nothing hidden.",
  },
  assembly: {
    happens:
      "Identity, website, customer systems, operations and local presence are configured and connected. Foundation work is prepared up to the point where you or a provider must act.",
    youDo: "Nothing, unless a decision is yours.",
    youGet: "Modules moving from Proposed to Executed across every lane.",
  },
  "founder-actions": {
    happens:
      "Anything only you can legally or practically do is prepared as far as it can be, explained in plain language, and opened for you. These start on day one, not at the end.",
    youDo: "Sign, verify your identity, open the regulated account, accept the terms. A few minutes each.",
    youGet: "A short, dated list of what is yours, what we already prepared for each, and what each one unblocks.",
  },
  verification: {
    happens:
      "Checks run as each connection is made rather than as a final pass. A failed check is retried, stays in the log, and blocks whatever depends on it.",
    youDo: "Nothing, unless a check fails and needs a decision from you.",
    youGet: "An evidence log filling up in real time: every check, its result and a timestamp.",
  },
  ready: {
    happens:
      "A real customer can move through your whole path. They find you, ask, get a response, book, pay where it applies, and both of you get the confirmation.",
    youDo: "Start taking customers if you want to. Many founders do, while the remaining work finishes.",
    youGet: "A business that works for a customer today, and a clear list of what is still open behind it.",
  },
  "finish-setup": {
    happens:
      "The remaining administrative and operational work is completed together: foundation steps, bookkeeping, documents, listings and anything the scope still has open.",
    youDo: "Complete the last Founder Actions. We keep everything else moving around them.",
    youGet: "Every agreed item closed and recorded, with renewal dates noted.",
  },
  "fully-set": {
    happens:
      "Every agreed customer-facing, operational, ownership and administrative item is complete and verified. Not every business needs every item; your approved scope decides.",
    youDo: "Nothing. This one is earned by the evidence, not declared.",
    youGet: "A company with nothing left open, and an ownership record listing everything in it.",
  },
  handoff: {
    happens:
      "Accounts, assets, documents, evidence and remaining obligations transfer to you in writing, with every account already in your name.",
    youDo: "Choose: take the keys, or keep parts of the company running with Build and Run.",
    youGet: "A company registered to you, hosted for you, and not dependent on us.",
  },
  run: {
    happens:
      "If you choose Build and Run, AI workers take on the recurring jobs you assign, inside permissions, budgets and approval rules you set.",
    youDo: "Set the limits. Approve what needs approving. Stop any time.",
    youGet: "A company that keeps working while you do the work, and stays yours if you stop.",
  },
};
