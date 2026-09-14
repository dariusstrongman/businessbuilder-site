/** Stage-by-stage detail for the How it works page. Keyed by stage id from journey.ts. */
export type StageDetail = {
  happens: string;
  youDo: string;
  youGet: string;
};

export const stageDetails: Record<string, StageDetail> = {
  idea: {
    happens: "You write a sentence or two about the company you want. A service, a place, a way you want to work. It does not need to be polished.",
    youDo: "Describe the idea. Answer a few follow-up questions if we have them.",
    youGet: "A build opened in your name, with the idea recorded exactly as you wrote it.",
  },
  understand: {
    happens: "We build a picture of you: your skills, your hours, your service area, your equipment, what you want the company to be in a year, and what you refuse to do.",
    youDo: "A short conversation. Ten minutes, on your phone if you like.",
    youGet: "A founder profile you can read and correct. It steers every decision after this.",
  },
  research: {
    happens: "We study your local market: who already does this, how they price, how they get customers, what they do badly, and how much demand there appears to be.",
    youDo: "Nothing. You can watch the research land in the Build Room.",
    youGet: "A research brief with sources, competitors, price ranges, and the honest gaps.",
  },
  recommend: {
    happens: "We propose the strongest version of your company: positioning, offer, service structure, brand direction and scope. If the idea is weak as stated, we say so and show alternatives.",
    youDo: "Read it. Push back. Ask for a different angle.",
    youGet: "A recommendation you can approve, change, or reject. Nothing is built from it yet.",
  },
  approve: {
    happens: "This is the gate. The recommendation becomes the plan only when you approve it, and the plan is what the Build Room assembles.",
    youDo: "Approve the direction, or send it back with notes.",
    youGet: "An approved plan, with scope and Founder Actions listed before any work starts.",
  },
  build: {
    happens: "The company is assembled: brand system, website, domain, business email, CRM, scheduling, payments, and the setup steps prepared as Founder Actions.",
    youDo: "Watch the Build Room. Answer questions when a module needs a decision only you can make.",
    youGet: "Every module moving from Proposed to Executed, with its status visible at all times.",
  },
  "founder-actions": {
    happens: "Anything only you can legally or practically do is prepared as far as it can be, explained in plain language, and tracked beside the build.",
    youDo: "Verify your identity with the payment processor. Connect your bank. Confirm the legal name and address. Each one is a few minutes.",
    youGet: "A short, dated list of what is yours to do, and what we already prepared for each.",
  },
  verify: {
    happens: "We use each system the way a customer or you would: a test booking, a test message, a test checkout. Then we check the result against what you should see.",
    youDo: "Nothing, unless a check fails and needs a decision from you.",
    youGet: "An evidence log: every check, its result, and a timestamp. Verified means the log says so.",
  },
  ready: {
    happens: "The customer-facing systems are verified. Someone can find you, reach you, book you and pay you.",
    youDo: "Start taking customers if you want to. Some founders do, while the remaining Founder Actions finish.",
    youGet: "A company that works for a customer today, with a clear list of what is still open behind it.",
  },
  "fully-set": {
    happens: "Every Founder Action is complete and every connected system is verified. Setup and admin steps are recorded.",
    youDo: "Finish the last Founder Actions. We keep the build moving around them.",
    youGet: "A company with nothing left open, and an ownership record that lists everything in it.",
  },
  handoff: {
    happens: "We hand you the keys: every login, every asset, the evidence log, the ownership record, and an export you can take anywhere.",
    youDo: "Choose: take the keys, or keep parts of the company running with Build & Run.",
    youGet: "A company that is registered to you, hosted for you, and does not depend on us.",
  },
  run: {
    happens: "If you choose Build & Run, AI workers take on the recurring jobs you assign, inside permissions, budgets and approval rules you set.",
    youDo: "Set the limits. Approve what needs approving. Stop any time.",
    youGet: "A company that keeps working while you do the work, and stays yours if you stop.",
  },
};
