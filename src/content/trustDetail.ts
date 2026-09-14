export type Concern = {
  id: string;
  question: string;
  answer: string;
  detail: string[];
};

/** The Trust page: every concern a careful founder has, answered without guarantees we cannot support. */
export const concerns: Concern[] = [
  {
    id: "quality",
    question: "Is this just AI output with a nicer label?",
    answer: "No. AI does a lot of the work, and none of it is delivered on trust.",
    detail: [
      "Research and the recommendation are reviewed by you before anything is built.",
      "Every connected system is executed, tested and verified, and the evidence is yours.",
      "If something cannot be verified, it is marked as not verified. We do not round up.",
    ],
  },
  {
    id: "ownership",
    question: "Do I own what you build?",
    answer: "Yes. Everything is registered to you, and you can take it anywhere.",
    detail: [
      "Website and full export, domain where applicable, business email, customer data, brand assets, documents, company history and verification evidence.",
      "Hosting is provided for you, not required of you.",
      "If Build & Run stops, the workers stop. The company does not.",
    ],
  },
  {
    id: "verification",
    question: "What does Verified actually mean?",
    answer: "That we used the system the way you or a customer would, and the result matched what you should see.",
    detail: [
      "Proposed: in the approved plan. Executed: set up and connected. Tested: used end to end. Verified: result checked, evidence logged.",
      "Ready means the customer-facing systems are verified. Fully Set means everything is, including your Founder Actions.",
      "The evidence log is timestamped and handed over with the company.",
    ],
  },
  {
    id: "permissions",
    question: "What can the AI workers do on their own?",
    answer: "Only what their permissions card says. Everything else waits for you.",
    detail: [
      "Each worker has an explicit list: can, must ask you, cannot.",
      "Customer-facing, irreversible or costly actions require your approval.",
      "You can narrow permissions at any time, or pause a worker entirely.",
    ],
  },
  {
    id: "spending",
    question: "Can this spend my money without me knowing?",
    answer: "No. Anything that costs money has a cap you set, and workers stop at it.",
    detail: [
      "Domain purchases, subscriptions and any spend inside the build are approvals, not actions.",
      "Build & Run workers operate inside a monthly budget you set. When it is reached, they stop and tell you.",
      "We never hold your money. Payouts go to an account in your name.",
    ],
  },
  {
    id: "data",
    question: "What happens to my customers' data?",
    answer: "It stays yours. It lives in systems registered to you.",
    detail: [
      "Customer records live in your CRM, your email and your scheduling tool, not in ours.",
      "Export is available on request and at handoff.",
      "We use your company context to operate your company, not to build someone else's.",
    ],
  },
  {
    id: "reversibility",
    question: "What if I want to stop, or change my mind?",
    answer: "Stop at any stage. Nothing is built before approval, and nothing built is locked to us.",
    detail: [
      "Before approval, you have research and a recommendation and owe nothing further.",
      "After handoff, stopping Build & Run stops the workers and leaves the company intact.",
      "Decisions during the build can be revisited; the Build Room records what changed and why.",
    ],
  },
  {
    id: "human",
    question: "Can I talk to a person?",
    answer: "Yes. Workers escalate what they cannot resolve, and you can escalate anything.",
    detail: [
      "A person reviews the recommendation before it reaches you, and is reachable during the build.",
      "Build & Run workers hand off to you first, then to a person at Business Builder.",
      "We would rather answer a question than let a worker guess.",
    ],
  },
  {
    id: "boundary",
    question: "Do you form the company and file things for me?",
    answer: "No. We prepare, guide, coordinate and verify. The filing, the signature and the account opening are yours or a provider's.",
    detail: [
      "Business Builder is not a law firm, an accountant, an insurer, a bank, a registered agent or a filing authority.",
      "For entity formation, EIN, licences, insurance and banking we assemble the information, explain the choice, open the official flow, capture the result and verify it took effect.",
      "Where a provider allows prefilling, we prefill. Where the law requires you personally, it stays a Founder Action and we say so.",
    ],
  },
  {
    id: "existing",
    question: "I already have a website. Will you make me replace it?",
    answer: "No. The build starts with an audit, and anything working is kept.",
    detail: [
      "Every important system is classified Keep, Improve, Replace or Missing, with a reason you can argue with.",
      "Customer data, reviews and search ranking you have earned are carried across, never reset.",
      "You approve each call before anything changes, and work is staged so you keep trading throughout.",
    ],
  },
  {
    id: "claims",
    question: "What do you not promise?",
    answer: "Anything we cannot verify.",
    detail: [
      "We prepare, guide and coordinate legal, tax and financial steps. We do not give legal or tax advice, and we do not file on your behalf where the law requires you.",
      "We verify systems we connect. We do not promise revenue, rankings or customers.",
      "AI workers operate inside limits you set. They are not autonomous employees, and we do not describe them as such.",
    ],
  },
];

export const comparison = [
  {
    kind: "AI website and brand generators",
    they: "Produce assets quickly: a site, a logo, a plan.",
    we: "Assemble and verify systems, on your domain, with evidence. The assets are a part, not the product.",
  },
  {
    kind: "Company formation services",
    they: "File paperwork and create the legal shell.",
    we: "Build what goes inside the shell, and guide the paperwork as Founder Actions you complete yourself.",
  },
  {
    kind: "AI cofounder and advice tools",
    they: "Advise, plan and answer questions.",
    we: "Execute the plan, verify the result, and hand over a company you own.",
  },
  {
    kind: "Agencies and freelancers",
    they: "Build one piece well, usually the website, over weeks.",
    we: "Build the whole company in one build, verify each part, and stay out of the way afterwards.",
  },
];
