export type TrustItem = {
  id: string;
  title: string;
  text: string;
};

export const trustItems: TrustItem[] = [
  {
    id: "approval",
    title: "Approval before anything is built",
    text: "You see the research and the recommendation first. If the idea is weak, we say so. Nothing is assembled until you approve the direction.",
  },
  {
    id: "verification",
    title: "Verified, with evidence",
    text: "Every connected system is executed, tested and checked. You get the log. We say what is verified and what is not.",
  },
  {
    id: "ownership",
    title: "Yours to keep",
    text: "Your website, domain, email, customer data, brand assets and history stay with you. If Build & Run stops, the workers stop. The company does not.",
  },
  {
    id: "limits",
    title: "Limits on every AI worker",
    text: "Permissions, budgets and approvals are explicit. Workers ask before anything irreversible, customer-facing or costly.",
  },
  {
    id: "boundary",
    title: "Clear lines about who does what",
    text: "Every task belongs to us, to you, or to an external provider. Where the law requires you personally, we prepare everything around it and say so plainly rather than implying we can do it.",
  },
  {
    id: "human",
    title: "A person you can reach",
    text: "Workers escalate what they cannot resolve. You can talk to a human about your build at any stage.",
  },
];

export const honestScope = [
  "We prepare, guide and coordinate legal, tax and financial steps. We are not a law firm, an accountant, an insurer, a bank, a registered agent or a filing authority.",
  "We verify systems we connect. We do not promise revenue, rankings or customers.",
  "AI workers operate inside the limits you set. They are not autonomous employees.",
];
