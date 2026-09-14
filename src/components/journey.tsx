"use client";
import { useState } from "react";
import { stages } from "@/lib/content";
import { Arrow, Eyebrow } from "./ui";
export function Journey() {
  const [active, setActive] = useState(5);
  const stage = stages[active];
  return (
    <section
      className="journey-section container section"
      id="how-it-works"
      aria-labelledby="journey-title"
    >
      <div className="section-heading">
        <div>
          <Eyebrow number="01">FROM INTENTION TO OPERATION</Eyebrow>
          <h2 id="journey-title">
            A clear path.
            <br />
            <span className="muted">All the way through.</span>
          </h2>
        </div>
        <p>
          You make the important decisions.
          <br />
          We connect the work between them.
        </p>
      </div>
      <div className="journey">
        <div className="journey-chapters" aria-hidden="true">
          <span>01 — DIRECTION</span>
          <span>02 — ASSEMBLY</span>
          <span>03 — READINESS</span>
          <span>04 — OWNERSHIP</span>
        </div>
        <div
          className="journey-stages"
          role="group"
          aria-label="Explore the twelve build stages"
        >
          {stages.map((s, i) => (
            <button
              className={`journey-stage ${i === active ? "active" : ""} ${i < active ? "past" : ""}`}
              aria-pressed={active === i}
              key={s.label}
              onClick={() => setActive(i)}
            >
              <span className="stage-node" aria-hidden="true">
                {i === active ? <span /> : ""}
              </span>
              <span className="stage-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
        <div className="journey-detail" aria-live="polite">
          <div className="journey-detail-marker">
            <span className="mono">{stage.chapter}</span>
            <span className="journey-big-number">
              {String(active + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="journey-detail-copy" key={active}>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
          </div>
          <div className="journey-output">
            <span className="mono">WHAT COMES OUT OF IT</span>
            <p>{stage.output}</p>
            <small>{stage.responsibility}</small>
            <button
              className="next-stage"
              onClick={() => setActive((active + 1) % stages.length)}
              aria-label={
                active === 11
                  ? "Return to Idea stage"
                  : `Explore next stage: ${stages[active + 1].label}`
              }
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
