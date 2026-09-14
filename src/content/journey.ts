export type Actor = "founder" | "system" | "state" | "optional" | "both";

export type Phase = {
  id: "understand" | "decide" | "build" | "own";
  label: string;
  summary: string;
};

export type Stage = {
  id: string;
  label: string;
  phase: Phase["id"];
  actor: Actor;
  description: string;
  /** Used on the rail, where a column is only a few characters wide. */
  short?: string;
  /**
   * Stages sharing a track number run alongside each other rather than after
   * each other. Build, Founder Actions and verification are not silos: each
   * starts the moment its dependencies allow.
   */
  track?: 1 | 2 | 3;
};

export const phases: Phase[] = [
  {
    id: "understand",
    label: "Understand",
    summary: "Where you are starting from, what you want, and what the market supports.",
  },
  {
    id: "decide",
    label: "Decide",
    summary: "We propose the strongest version. You approve it, then commit.",
  },
  {
    id: "build",
    label: "Build",
    summary: "Assembly, your actions and verification run together, not in sequence.",
  },
  {
    id: "own",
    label: "Own",
    summary: "Finish what is left, take the keys, or keep parts of it running.",
  },
];

export const stages: Stage[] = [
  {
    id: "starting-point",
    label: "Starting point",
    short: "Start point",
    phase: "understand",
    actor: "founder",
    description:
      "You tell us where you are starting from: an idea, a half-built setup, an existing business, or one you want operated.",
  },
  {
    id: "understand",
    label: "Understand",
    phase: "understand",
    actor: "system",
    description: "We learn your goals, constraints, service area and how you want to work. Answers are stored once.",
  },
  {
    id: "research",
    label: "Research",
    phase: "understand",
    actor: "system",
    description:
      "We study the local market and, if you already trade, audit what you have and classify every system.",
  },
  {
    id: "recommendation",
    label: "Recommendation",
    short: "Propose",
    phase: "decide",
    actor: "system",
    description:
      "A scope you can read: what to keep, improve, replace or add, what only you can do, and what it costs.",
  },
  {
    id: "approval",
    label: "Founder approval",
    short: "Approve",
    phase: "decide",
    actor: "founder",
    description: "Nothing is built and nothing is charged until you approve the direction and the scope.",
  },
  {
    id: "commit",
    label: "Purchase",
    phase: "decide",
    actor: "founder",
    description: "You commit to the agreed scope. The Build Room opens on the same day.",
  },
  {
    id: "build-room",
    label: "Build Room opens",
    short: "Build Room",
    phase: "build",
    actor: "system",
    description: "One place showing every lane, every module and who each remaining task belongs to.",
  },
  {
    id: "assembly",
    label: "Assembly",
    phase: "build",
    actor: "system",
    track: 1,
    description: "Identity, website, customer systems, operations and launch presence are configured and connected.",
  },
  {
    id: "founder-actions",
    label: "Founder Actions",
    short: "Your actions",
    phase: "build",
    actor: "founder",
    track: 2,
    description:
      "Signatures, identity checks and regulated account openings, each prepared and explained. They start immediately, not at the end.",
  },
  {
    id: "verification",
    label: "Verification",
    phase: "build",
    actor: "system",
    track: 3,
    description: "Checks run continuously as each connection is made, rather than as a final pass.",
  },
  {
    id: "ready",
    label: "Ready",
    phase: "build",
    actor: "state",
    description: "A real customer can move through your whole path: find you, ask, get a quote, book, and pay.",
  },
  {
    id: "finish-setup",
    label: "Finish setup",
    short: "Finish setup",
    phase: "own",
    actor: "both",
    description: "The remaining administrative and operational work is completed and recorded, together.",
  },
  {
    id: "fully-set",
    label: "Fully Set",
    phase: "own",
    actor: "state",
    description: "Every agreed customer-facing, operational, ownership and administrative item is complete and verified.",
  },
  {
    id: "handoff",
    label: "Handoff",
    phase: "own",
    actor: "founder",
    description: "Accounts, assets, documents, evidence and obligations transfer to you, in writing.",
  },
  {
    id: "run",
    label: "Take the keys, or run it",
    short: "Keys, or run",
    phase: "own",
    actor: "optional",
    description: "Run it yourself, or have us keep operating agreed parts inside limits you set.",
  },
];

export const actorLabels: Record<Actor, string> = {
  founder: "You",
  system: "Business Builder",
  state: "Milestone",
  optional: "Your choice",
  both: "Together",
};

/** The parallel band, named so the rail and the copy stay in step. */
export const parallelBand = {
  label: "Runs in parallel",
  note: "Assembly, your Founder Actions and verification all run at once. Each starts as soon as its dependencies allow, so waiting on a bank or a government office never stops the rest of the build.",
};
