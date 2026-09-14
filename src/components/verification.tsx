"use client";
import { useState } from "react";
import { Arrow, Check, Eyebrow } from "./ui";
const steps = [
  {
    name: "Proposed",
    title: "Define what should work.",
    detail:
      "A visitor submits an enquiry. Their details should reach your inbox and create a customer record.",
    label: "ACCEPTANCE CRITERIA",
    result: "Expected outcome documented",
    rows: [
      "Required enquiry fields defined",
      "Destination inbox agreed",
      "Customer record requirements set",
    ],
  },
  {
    name: "Executed",
    title: "Build the actual connection.",
    detail:
      "The form, inbox routing, and customer record connection have been configured. Testing still needs to happen.",
    label: "EXECUTION RECORD",
    result: "Configured · not yet verified",
    rows: [
      "Enquiry form configured",
      "Inbox routing connected",
      "Customer record mapping set",
    ],
  },
  {
    name: "Tested",
    title: "Follow the customer’s path.",
    detail:
      "A test enquiry is submitted. Delivery and record details are inspected, including the error and retry behavior.",
    label: "TEST RECORD",
    result: "Test results ready for review",
    rows: [
      "Test enquiry submitted",
      "Inbox receipt inspected",
      "Customer details compared",
    ],
  },
  {
    name: "Verified",
    title: "Attach the evidence.",
    detail:
      "Results match the agreed criteria. The evidence is recorded so you can see exactly what passed—and what was checked.",
    label: "VERIFICATION RECEIPT",
    result: "Enquiry flow verified",
    rows: [
      "Website form → submitted",
      "Business inbox → received",
      "Customer record → matched",
    ],
  },
];
export function Verification() {
  const [active, setActive] = useState(3);
  const state = steps[active];
  return (
    <section
      className="verification-section section"
      id="verification"
      aria-labelledby="verification-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow number="04" light>
              THE DIFFERENCE IS IN THE CHECKING
            </Eyebrow>
            <h2 id="verification-title">
              “Done” should
              <br />
              come with evidence.
            </h2>
          </div>
          <p>
            A generated page is a start. A working customer journey is the
            standard. Important systems move through four explicit states.
          </p>
        </div>
        <div className="verification-workbench">
          <div className="verification-explainer">
            <div
              className="verification-states"
              role="group"
              aria-label="Explore verification states"
            >
              {steps.map((step, i) => (
                <button
                  key={step.name}
                  className={i === active ? "active" : ""}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span className="mono">0{i + 1}</span>
                  {step.name}
                  {i < 3 && <Arrow />}
                </button>
              ))}
            </div>
            <div className="verification-copy" aria-live="polite" key={active}>
              <h3>{state.title}</h3>
              <p>{state.detail}</p>
            </div>
            <p className="verification-principle">
              <span aria-hidden="true">↳</span> A failed check stays open. A
              purchase alone never marks a task complete.
            </p>
          </div>
          <div className="receipt" aria-live="polite">
            <div className="receipt-head">
              <span className="mono">{state.label}</span>
              <span className="mono">EXAMPLE / 001</span>
            </div>
            <div className="receipt-title">
              <span
                className={`receipt-icon ${active === 3 ? "complete" : ""}`}
              >
                {active === 3 ? <Check /> : String(active + 1).padStart(2, "0")}
              </span>
              <h3>{state.result}</h3>
            </div>
            <ul>
              {state.rows.map((row) => (
                <li key={row}>
                  <span>{row}</span>
                  {active === 3 ? (
                    <Check />
                  ) : (
                    <span className="mono">0{active + 1}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="receipt-foot">
              <span className="mono">SCOPE</span>
              <p>Website → inbox → customer record</p>
              <span className="mono">EVIDENCE</span>
              <p>
                {active === 3
                  ? "Test submission, delivery record, and matched field values."
                  : "Evidence is attached as the work is executed and checked."}
              </p>
            </div>
            <div className="receipt-bottom">
              <span>Illustrative evidence record</span>
              <span aria-hidden="true">BB—V01</span>
            </div>
          </div>
        </div>
        <div className="readiness">
          <div>
            <span className="readiness-symbol ready" aria-hidden="true">
              <Check />
            </span>
            <div>
              <h3>Ready</h3>
              <p>
                The agreed customer-facing essentials work. Required launch
                checks pass. Any remaining setup work is visible.
              </p>
            </div>
          </div>
          <span className="readiness-connector" aria-hidden="true">
            →
          </span>
          <div>
            <span className="readiness-symbol" aria-hidden="true">
              <Check />
            </span>
            <div>
              <h3>Fully Set</h3>
              <p>
                The remaining agreed setup requirements and Founder Actions are
                complete, with evidence recorded.
              </p>
            </div>
          </div>
        </div>
        <p className="readiness-note">
          Readiness follows your approved scope. It is not a guarantee of
          revenue or a substitute for required licenses, insurance, or
          professional advice.
        </p>
      </div>
    </section>
  );
}
