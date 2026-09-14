export type EvidenceEntry = {
  /** Relative to the start of the build; never a real date. */
  when: string;
  module: string;
  check: string;
  result: "pass" | "retry" | "waiting";
};

/** An example evidence log for the mobile detailing build shown across the site. */
export const evidenceLog: EvidenceEntry[] = [
  { when: "Day 2 · 09:14", module: "Domain", check: "DNS resolves to the site and the certificate is valid", result: "pass" },
  { when: "Day 2 · 09:16", module: "Website", check: "Home and service pages load over HTTPS on your domain", result: "pass" },
  { when: "Day 2 · 09:31", module: "Email", check: "Test message delivered to your business inbox", result: "pass" },
  { when: "Day 2 · 11:05", module: "CRM", check: "Quote form submission created a lead in your pipeline", result: "retry" },
  { when: "Day 2 · 11:12", module: "CRM", check: "Quote form submission created a lead in your pipeline", result: "pass" },
  { when: "Day 3 · 08:40", module: "Scheduling", check: "Test booking appeared in your calendar with a 30-minute buffer", result: "pass" },
  { when: "Day 3 · 08:41", module: "Email", check: "Booking confirmation delivered to you and the test customer", result: "pass" },
  { when: "Day 3 · 10:02", module: "Payments", check: "Test checkout completed and appeared in your processor dashboard", result: "waiting" },
];
