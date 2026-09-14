import { Eyebrow } from "./ui";
const questions = [
  [
    "How do I know the work is actually done?",
    "Important systems are checked against the scope you approve. The Build Room is designed to record the result and supporting evidence, with failed checks and missing dependencies kept visible. Generated output alone does not establish completion.",
  ],
  [
    "What will I still need to do?",
    "You make the key decisions and complete tasks that require your identity or authority, such as provider identity checks, account ownership, and final approvals. Founder Actions explain each task and what it unlocks. Local licenses, insurance, and legal or tax advice may need qualified professionals.",
  ],
  [
    "What can AI workers do without asking me?",
    "Only the work included in the permissions and rules you approve. The intended controls include task scope, spending limits, approval requirements, and activity records. Out-of-scope requests and sensitive exceptions need review; the service does not promise unlimited autonomy.",
  ],
  [
    "What happens to my business if I leave?",
    "Customer-owned assets remain yours. Your agreed handoff includes an inventory of assets, access, export options, and any third-party dependencies. Hosting, external subscriptions, and licensed services may still require separate payment or migration.",
  ],
  [
    "How will my customer data and accounts be handled?",
    "Access should be limited to the services and tasks you authorize. The build scope must identify the accounts involved, required permissions, and data export options. This homepage preview does not connect to your accounts, collect customer data, or send your founder brief anywhere.",
  ],
  [
    "What if a setup fails or something needs a person?",
    "A failed or blocked task remains open. The next step may be another test, a founder decision, or escalation to a person or service provider. Irreversible changes require care; recovery and rollback options depend on the connected system. Support coverage and escalation arrangements must be agreed in your service scope.",
  ],
  [
    "Can I buy or launch a business here today?",
    "This is a preview of the Business Builder experience. Pricing, launch availability, and final service terms are still being established. You can explore the process and download a local founder brief, but this page does not take payments, create accounts, or start a build.",
  ],
];
export function Trust() {
  return (
    <section
      className="trust-section container section"
      id="trust"
      aria-labelledby="trust-title"
    >
      <div className="trust-intro">
        <Eyebrow number="07">CONFIDENCE, WITHOUT THE LEAP OF FAITH</Eyebrow>
        <h2 id="trust-title">
          Good questions.
          <br />
          Straight answers.
        </h2>
        <p>
          You should understand what you’re buying, what you own, and where the
          limits are.
        </p>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span className="faq-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
