/**
 * The journey branches at the first question. A founder with an existing
 * business must not be walked through a from-zero story, and someone with only
 * an idea must not be asked to audit systems they do not have.
 */

export type StartingPointId = "idea" | "started" | "existing" | "running";

export type StartingPoint = {
  id: StartingPointId;
  label: string;
  /** How a founder would say it themselves. */
  voice: string;
  /** What the build actually begins with. */
  firstMove: string;
  /** Three things that change for this starting point. */
  changes: string[];
  /** Shown when the audit applies. */
  audits: boolean;
  /** Which package this usually points at. */
  suggests: "website" | "business" | "run";
};

export const startingPoints: StartingPoint[] = [
  {
    id: "idea",
    label: "I only have an idea",
    voice: "Nothing exists yet. No name, no company, no customers.",
    firstMove:
      "We research the local market before anything is built, and come back with a direction, a scope and the honest weak points.",
    changes: [
      "Positioning and name direction come first, because everything else depends on them",
      "Company foundation steps are sequenced so nothing waits on a missing tax ID",
      "You see the full Founder Action list before you commit, not after",
    ],
    audits: false,
    suggests: "business",
  },
  {
    id: "started",
    label: "I've started setting things up",
    voice: "A domain, maybe a page, a couple of accounts. None of it joined up.",
    firstMove:
      "We inventory what you already have, keep what is working, and build only what is missing or broken.",
    changes: [
      "You are not charged to rebuild things that already work",
      "Half-finished accounts are completed rather than replaced",
      "The gaps between your existing pieces are usually the real problem, and they get fixed first",
    ],
    audits: true,
    suggests: "business",
  },
  {
    id: "existing",
    label: "I have a business and want it finished properly",
    voice: "I am trading, but the setup is patchy and it looks it.",
    firstMove:
      "An Existing Business Audit. Every important system is classified Keep, Improve, Replace or Missing, and you approve each call before anything changes.",
    changes: [
      "A good website is preserved, not thrown away to justify a rebuild",
      "Customer data, reviews and ranking you have earned are carried across, never reset",
      "Work is staged so you keep trading throughout",
    ],
    audits: true,
    suggests: "business",
  },
  {
    id: "running",
    label: "I want parts of it run for me",
    voice: "The business works. I am the bottleneck.",
    firstMove:
      "We audit what exists, fix what blocks automation, then put agreed recurring work in the hands of AI workers inside limits you set.",
    changes: [
      "The audit focuses on what has to be true before anything can be operated safely",
      "Permissions, budgets and approvals are agreed before a worker touches a customer",
      "You can stop at any time and keep everything",
    ],
    audits: true,
    suggests: "run",
  },
];

export const startingPointCopy = {
  eyebrow: "Where are you starting from?",
  title: "Four starting points. Not one story.",
  lead: "Most of what gets sold to small businesses assumes you are starting from nothing. Most owners are not. The build branches at this question, and everything after it changes.",
  question: "Where are you starting from?",
};
