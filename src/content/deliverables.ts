export type DeliverableGroup = {
  id: string;
  label: string;
  note?: string;
  items: string[];
};

/** The bill of materials for a Build my business handoff. */
export const deliverables: DeliverableGroup[] = [
  {
    id: "brand",
    label: "Brand",
    items: ["Name direction", "Positioning", "Voice and copy", "Logo direction", "Colour and type system"],
  },
  {
    id: "website",
    label: "Website",
    items: [
      "Home and service pages",
      "Quote and booking forms",
      "Page structure for your business type",
      "Local search basics",
      "Analytics",
      "HTTPS on your domain",
    ],
  },
  {
    id: "systems",
    label: "Systems",
    items: ["Domain", "Business email", "CRM", "Scheduling", "Payments", "Form routing into your CRM"],
  },
  {
    id: "setup",
    label: "Setup & admin",
    note: "Guided as Founder Actions. We prepare and explain; you sign.",
    items: ["Entity steps", "Tax ID steps", "Bank account steps", "Insurance pointers", "Licence and permit pointers"],
  },
  {
    id: "evidence",
    label: "Evidence",
    items: ["Verification log", "Ownership record", "Founder Action record", "Full export"],
  },
];
