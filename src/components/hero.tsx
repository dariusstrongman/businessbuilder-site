import { BuildButton } from "./intake";
import { Arrow, Check, Eyebrow } from "./ui";
export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <Eyebrow>
          <span className="small-cross" aria-hidden="true">
            +
          </span>{" "}
          A REAL BUSINESS. BUILT AROUND YOU.
        </Eyebrow>
        <h1 id="hero-title">
          Describe the
          <br className="desktop-break" /> business.
          <br />
          <span>
            We’ll build it
            <br className="desktop-break" /> with you.
          </span>
        </h1>
        <p className="hero-description">
          Your brand, website, and working business systems. We research the
          direction, build what you approve, verify the details, and hand you
          the keys.
        </p>
        <div className="hero-ctas">
          <BuildButton />
          <a className="text-link" href="#how-it-works">
            See how it works
            <Arrow diagonal />
          </a>
        </div>
        <p className="hero-footnote">
          For service businesses. Starting fresh or leveling up.
        </p>
      </div>
      <div
        className="assembly-visual"
        aria-label="Illustrative company assembly showing an approved identity, built website, and verified enquiry flow"
      >
        <div className="assembly-caption">
          <span className="eyebrow">YOUR COMPANY, TAKING SHAPE</span>
          <span className="example-label">Illustrative build</span>
        </div>
        <div className="assembly-track" aria-hidden="true">
          <span>01 / DIRECTION</span>
          <span>02 / ASSEMBLY</span>
          <span>03 / EVIDENCE</span>
        </div>
        <div className="identity-sheet">
          <div className="sheet-top">
            <span className="mono">BUSINESS IDENTITY</span>
            <span className="status">
              <Check /> Approved
            </span>
          </div>
          <div className="identity-content">
            <span className="sunday-brand">
              sunday<span className="brand-period">.</span>
            </span>
            <span className="identity-description">
              HOME CLEANING
              <br />A little more life.
            </span>
          </div>
          <div
            className="swatches"
            aria-label="Example brand palette: forest, cream, and citrus"
          >
            <i />
            <i />
            <i />
            <span>Warm. Thoughtful. Dependable.</span>
          </div>
        </div>
        <div className="website-sheet">
          <div className="sheet-top">
            <span className="mono">PROFESSIONAL WEBSITE</span>
            <span className="status neutral">
              <Check /> Built
            </span>
          </div>
          <div className="mini-website">
            <div className="mini-nav">
              <span>sunday.</span>
              <span>Consider it clean.</span>
            </div>
            <p>
              A little less housework.
              <br />
              <em>A little more Sunday.</em>
            </p>
            <div className="mini-website-bottom">
              <span className="mini-cta">
                Find your clean <Arrow />
              </span>
              <span>
                Recurring home cleaning.
                <br />
                Built around your life.
              </span>
            </div>
          </div>
        </div>
        <div className="hero-systems">
          <div>
            <span>CRM</span>
            <small>
              <Check /> Connected
            </small>
          </div>
          <div>
            <span>Scheduling</span>
            <small>In testing</small>
          </div>
          <div>
            <span>Payments</span>
            <small className="needs-you">Needs you</small>
          </div>
        </div>
        <div className="hero-evidence">
          <span className="evidence-seal">
            <Check />
          </span>
          <div>
            <span className="mono">ENQUIRY FLOW / VERIFIED</span>
            <p>Website → inbox → customer record.</p>
          </div>
          <Arrow diagonal />
        </div>
        <div className="assembly-bottom">
          <span className="mono">BUILT. CHECKED. YOURS.</span>
          <span className="assembly-corners" aria-hidden="true">
            ⌜ &nbsp; ⌟
          </span>
        </div>
      </div>
    </section>
  );
}
