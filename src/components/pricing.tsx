import { BuildButton } from "./intake";
import { Eyebrow } from "./ui";
const packages = [
  {
    number: "01",
    scope: "website" as const,
    name: "Build my\nprofessional website",
    intro: "A better front door for the business you’re building.",
    features: [
      "Premium website & service content",
      "Mobile experience & enquiry flow",
      "Agreed checks & website handoff",
    ],
    model: "Website project",
    action: "Build my website",
  },
  {
    number: "02",
    scope: "business" as const,
    name: "Build my\nbusiness",
    intro: "The company-building experience, from direction to handoff.",
    features: [
      "Research, positioning & brand direction",
      "Website & agreed business systems",
      "Founder Actions, verification & handoff",
    ],
    model: "Company build",
    action: "Build my business",
  },
  {
    number: "03",
    scope: "run" as const,
    name: "Build & run\nmy business",
    intro: "Your company built, with selected operations handled after launch.",
    features: [
      "Everything in your agreed business build",
      "Selected AI workers & connected workflows",
      "Ongoing monitoring & approval controls",
    ],
    model: "Company build + ongoing service",
    action: "Build & run my business",
  },
];
export function Pricing() {
  return (
    <section
      className="pricing-section section"
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow number="06">THREE WAYS TO BUILD</Eyebrow>
            <h2 id="pricing-title">
              Start with what you need.
              <br />
              <span className="muted">Leave room for what’s next.</span>
            </h2>
          </div>
          <p>
            One website, a whole business, or help running it. Choose the scope
            that fits your next chapter.
          </p>
        </div>
        <div className="package-list">
          {packages.map((pkg) => (
            <article
              key={pkg.scope}
              className={`package-row ${pkg.scope === "business" ? "featured" : ""}`}
            >
              <div className="package-name">
                <span className="mono">{pkg.number}</span>
                <h3>
                  {pkg.name.split("\n").map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>
              </div>
              <div className="package-scope">
                <p>{pkg.intro}</p>
                <ul>
                  {pkg.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="package-action">
                <span className="mono">{pkg.model}</span>
                <BuildButton
                  scope={pkg.scope}
                  className={`button ${pkg.scope === "business" ? "button-primary" : "button-outline"}`}
                >
                  {pkg.action}
                </BuildButton>
              </div>
            </article>
          ))}
        </div>
        <div className="pricing-note">
          <p>
            Pricing is being finalized. Scope, price, and any third-party costs
            will be clear before you commit.
          </p>
          <p>Start with a website. Expand the scope when you need more.</p>
        </div>
      </div>
    </section>
  );
}
