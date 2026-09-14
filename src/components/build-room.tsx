"use client";
import { useState } from "react";
import { modules } from "@/lib/content";
import { Arrow, Check, Eyebrow, Mark } from "./ui";
export function BuildRoom() {
  const [active, setActive] = useState(1);
  const module = modules[active];
  const founderActionComplete =
    module.status === "Verified" || module.status === "Approved";
  return (
    <section
      className="build-section container"
      id="build-room"
      aria-labelledby="build-title"
    >
      <div className="build-intro">
        <Eyebrow number="02">THE BUILD ROOM</Eyebrow>
        <h2 id="build-title">
          You won’t have to ask
          <br />
          “Where are we?”
        </h2>
        <p>
          See what’s being built. Understand what needs you. Open the evidence
          behind what’s done.
        </p>
      </div>
      <div className="build-room">
        <div className="room-top">
          <div>
            <Mark />
            <span>
              Your company <span className="room-slash">/</span>{" "}
              <strong>Build Room</strong>
            </span>
          </div>
          <span className="example-label">Interactive product preview</span>
        </div>
        <div className="room-body">
          <div className="room-sidebar">
            <span className="mono">COMPANY SYSTEMS</span>
            <div
              className="module-list"
              role="group"
              aria-label="Explore company systems"
            >
              {modules.map((m, i) => (
                <button
                  aria-pressed={i === active}
                  className={i === active ? "active" : ""}
                  key={m.name}
                  title={m.status}
                  onClick={() => setActive(i)}
                >
                  <span className="module-symbol" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {m.name}
                  <span
                    className={`module-dot ${m.status === "Founder action" ? "amber" : m.status === "In testing" ? "blue" : ""}`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{m.status}</span>
                </button>
              ))}
            </div>
            <div className="sidebar-bottom">
              <span className="mono">SETUP & ADMIN</span>
              <p>
                Account access, founder tasks, and readiness—all in the same
                place.
              </p>
            </div>
          </div>
          <div className="room-main" aria-live="polite">
            <div className="module-header">
              <span className="mono">
                {String(active + 1).padStart(2, "0")} /{" "}
                {module.name.toUpperCase()}
              </span>
              <span
                className={`status ${module.status === "Founder action" ? "warning" : module.status === "In testing" ? "testing" : ""}`}
              >
                {module.status === "Verified" && <Check />}
                {module.status}
              </span>
            </div>
            <div className="module-content" key={active}>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <ul className="module-checklist">
                {module.rows.map((row, i) => (
                  <li key={row}>
                    <span className="mono">0{i + 1}</span>
                    {row}
                  </li>
                ))}
              </ul>
              <div className="room-evidence">
                <span className="evidence-mini" aria-hidden="true">
                  {module.status === "Verified" ||
                  module.status === "Approved" ? (
                    <Check />
                  ) : (
                    "↳"
                  )}
                </span>
                <div>
                  <span className="mono">
                    {module.status === "Verified"
                      ? "EXAMPLE VERIFICATION EVIDENCE"
                      : "EXAMPLE COMPLETION REQUIREMENT"}
                  </span>
                  <p>{module.evidence}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`founder-action ${founderActionComplete ? "action-complete" : ""}`}
        >
          <span className="action-icon" aria-hidden="true">
            {founderActionComplete ? <Check /> : "↳"}
          </span>
          <div>
            <span className="mono">
              FOUNDER ACTION
              {founderActionComplete ? " / COMPLETED" : " / NEEDS YOU"}
            </span>
            <p>{module.action}</p>
          </div>
          <span className="action-unlock">{module.unlock}</span>
        </div>
        <div className="room-footer">
          <span>
            Illustrative states. Your build follows the scope you approve.
          </span>
          <a href="#verification">
            What does verified mean? <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
