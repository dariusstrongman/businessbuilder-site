export type Actor = "founder" | "system" | "state" | "optional";

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
};

export const phases: Phase[] = [
  {
    id: "understand",
    label: "Understand",
    summary: "We learn what you want and what the market will support.",
  },
  {
    id: "decide",
    label: "Decide",
    summary: "We propose the strongest version. You approve it.",
  },
  {
    id: "build",
    label: "Build",
    summary: "We assemble the company and prove each part works.",
  },
  {
    id: "own",
    label: "Own",
    summary: "You take the keys, or we keep parts of it running.",
  },
];

export const stages: Stage[] = [
  {
    id: "idea",
    label: "Idea",
    phase: "understand",
    actor: "founder",
    description: "You describe the company you want, in your own words.",
  },
  {
    id: "understand",
    label: "Understand",
    phase: "understand",
    actor: "system",
    description: "We learn your goals, constraints, service area and how you want to work.",
  },
  {
    id: "research",
    label: "Research",
    phase: "understand",
    actor: "system",
    description: "We study the local market, competitors, pricing norms and demand.",
  },
  {
    id: "recommend",
    label: "Recommend",
    phase: "decide",
    actor: "system",
    description: "We propose positioning, offer, brand direction and scope. We say where the idea is weak.",
  },
  {
    id: "approve",
    label: "Approve",
    phase: "decide",
    actor: "founder",
    description: "Nothing is built until you approve the direction.",
  },
  {
    id: "build",
    label: "Build",
    phase: "build",
    actor: "system",
    description: "Brand, website, domain, email, CRM, scheduling, payments and setup are assembled.",
  },
  {
    id: "founder-actions",
    label: "Founder Actions",
    phase: "build",
    actor: "founder",
    description: "Anything only you can do is prepared for you, explained, and tracked.",
  },
  {
    id: "verify",
    label: "Verify",
    phase: "build",
    actor: "system",
    description: "Each system is executed, tested, and checked against what you should see.",
  },
  {
    id: "ready",
    label: "Ready",
    phase: "own",
    actor: "state",
    description: "Customers can find you, reach you, book you and pay you.",
  },
  {
    id: "fully-set",
    label: "Fully Set",
    phase: "own",
    actor: "state",
    description: "Every founder action complete. Every connected system verified.",
  },
  {
    id: "handoff",
    label: "Handoff",
    phase: "own",
    actor: "founder",
    description: "You take the keys and every asset, with the evidence.",
  },
  {
    id: "run",
    label: "Run",
    phase: "own",
    actor: "optional",
    description: "Or we keep operating parts of the company, inside limits you set.",
  },
];

export const actorLabels: Record<Actor, string> = {
  founder: "You",
  system: "Business Builder",
  state: "Milestone",
  optional: "Optional",
};
