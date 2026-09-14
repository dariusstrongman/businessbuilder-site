"use client";
import { useState } from "react";
import { Arrow, Check, Eyebrow } from "./ui";
import { BuildButton } from "./intake";
export function Ownership() {
  const [run, setRun] = useState(false);
  return (
    <section
      className="ownership-section container section"
      id="ownership"
      aria-labelledby="ownership-title"
    >
      <div className="ownership-intro">
        <Eyebrow number="05">THE HANDOFF IS YOUR CALL</Eyebrow>
        <h2 id="ownership-title">
          Your business.
          <br />
          Your keys.
          <br />
          <span className="muted">Your next move.</span>
        </h2>
        <p>Keep what you built. Choose how much help comes with you.</p>
        <div
          className="ownership-choice"
          role="group"
          aria-label="Choose how you would operate"
        >
          <button
            className={!run ? "active" : ""}
            aria-pressed={!run}
            onClick={() => setRun(false)}
          >
            Take the keys
            <Arrow diagonal />
          </button>
          <button
            className={run ? "active" : ""}
            aria-pressed={run}
            onClick={() => setRun(true)}
          >
            Run it for me
            <Arrow diagonal />
          </button>
        </div>
      </div>
      <div className={`handoff-panel ${run ? "run-panel" : ""}`}>
        <div className="handoff-panel-top">
          <span className="mono">
            {run
              ? "OPTIONAL / MANAGED OPERATIONS"
              : "YOUR COMPANY / HANDOFF INVENTORY"}
          </span>
          <span className="handoff-marker" aria-hidden="true">
            ↗
          </span>
        </div>
        <div aria-live="polite" key={String(run)} className="handoff-content">
          <h3>
            {run
              ? "A small team.\nClear boundaries."
              : "Everything you need\nto make it yours."}
          </h3>
          {run ? (
            <>
              <p>
                Delegate selected work to AI workers with your company context.
                You set the permissions, spending limits, and approval rules.
              </p>
              <ul className="operations-list">
                <li>
                  <span>Intake Assistant</span>
                  <span>Collect & route enquiries</span>
                </li>
                <li>
                  <span>Quote Drafting Assistant</span>
                  <span>Prepare drafts for approval</span>
                </li>
                <li>
                  <span>Inbox Assistant</span>
                  <span>Sort & draft replies</span>
                </li>
                <li>
                  <span>Review Follow-up Assistant</span>
                  <span>Request reviews after service</span>
                </li>
              </ul>
              <p className="handoff-boundary">
                Availability depends on scope and connected services. Exceptions
                need review; sensitive actions need your approval.
              </p>
              <BuildButton scope="run" className="text-link">
                Explore build & run
              </BuildButton>
            </>
          ) : (
            <>
              <p>
                Your customer-owned assets remain yours if you stop ongoing
                service. The handoff records what you own, where it lives, and
                how to access it.
              </p>
              <ul className="asset-list">
                {[
                  "Website & agreed export",
                  "Brand assets & business documents",
                  "Customer data & company history",
                  "Verification evidence",
                  "Domain & account ownership record",
                ].map((item) => (
                  <li key={item}>
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="handoff-boundary">
                Third-party subscriptions and license terms still apply.
                Transfer and export options are agreed before the build.
              </p>
              <a className="text-link" href="#pricing">
                Choose your build
                <Arrow />
              </a>
            </>
          )}
        </div>
        <div className="handoff-bottom">
          <Check />
          <span>The company stays yours. In either case.</span>
        </div>
      </div>
    </section>
  );
}
