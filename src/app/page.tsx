import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { BuildRoom } from "@/components/build-room";
import { Businesses } from "@/components/businesses";
import { Verification } from "@/components/verification";
import { Ownership } from "@/components/ownership";
import { Pricing } from "@/components/pricing";
import { Trust } from "@/components/trust";
import { BuildButton, IntakeProvider } from "@/components/intake";
import { Arrow, Eyebrow, Mark, Wordmark } from "@/components/ui";
import { brand } from "@/lib/brand";
export default function Home() {
  return (
    <IntakeProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Navigation />
      <main id="main">
        <Hero />
        <section
          className="connection-section"
          aria-labelledby="connection-title"
        >
          <div className="container connection-inner">
            <h2 id="connection-title">
              You have a business to build.
              <br />
              <span className="muted">Not twelve tools to figure out.</span>
            </h2>
            <div
              className="connection-flow"
              aria-label="Business Builder connects direction, website, customers, and operations"
            >
              <span>Direction</span>
              <span className="flow-plus" aria-hidden="true">
                +
              </span>
              <span>Website</span>
              <span className="flow-plus" aria-hidden="true">
                +
              </span>
              <span>Systems</span>
              <Arrow />
              <strong>One business.</strong>
            </div>
          </div>
        </section>
        <Journey />
        <BuildRoom />
        <Businesses />
        <Verification />
        <Ownership />
        <Pricing />
        <Trust />
        <section className="final-section" aria-labelledby="final-title">
          <div className="container final-inner">
            <div>
              <Eyebrow>YOUR NEXT CHAPTER</Eyebrow>
              <h2 id="final-title">
                It starts with an idea.
                <br />
                <span>Let’s hear yours.</span>
              </h2>
              <p>
                You don’t need to have it all figured out.
                <br />
                That’s what the build is for.
              </p>
            </div>
            <div className="final-action">
              <BuildButton className="button button-ink">
                Describe my business
              </BuildButton>
              <span>Explore your brief. No commitment.</span>
            </div>
          </div>
          <div className="container final-baseline">
            <span>FROM “WHAT IF” TO WHAT’S NEXT.</span>
            <Mark />
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <Wordmark />
        <p>A real business. Built around you.</p>
        <nav aria-label="Footer navigation">
          <a href="#how-it-works">The process</a>
          <a href="#verification">Verification</a>
          <a href="#ownership">Ownership</a>
          <a href="#trust">Questions</a>
        </nav>
        <div className="footer-base">
          <span>© 2026 {brand.name}</span>
          <span>
            Independent homepage preview · Services not yet available for
            purchase
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </IntakeProvider>
  );
}
