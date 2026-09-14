"use client";
import { useState } from "react";
import { businessTypes } from "@/lib/content";
import { BuildButton } from "./intake";
import { Arrow, Check, Eyebrow } from "./ui";
export function Businesses() {
  const [active, setActive] = useState(0);
  const [media, setMedia] = useState("Both");
  const business = businessTypes[active];
  return (
    <section
      className="business-section section"
      id="businesses"
      aria-labelledby="business-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow number="03">BUILT FOR YOUR KIND OF BUSINESS</Eyebrow>
            <h2 id="business-title">
              Real services.
              <br />
              Specific playbooks.
            </h2>
          </div>
          <p>
            A cleaning business and a creative studio need different things.
            Your build should know the difference.
          </p>
        </div>
        <div className="business-explorer">
          <div className="business-list">
            <p className="mono">OUR FIRST 10 BUSINESS TYPES</p>
            <label className="sr-only" htmlFor="mobile-business">
              Explore a business type
            </label>
            <select
              id="mobile-business"
              className="mobile-business-select"
              value={active}
              onChange={(e) => setActive(Number(e.target.value))}
            >
              {businessTypes.map((b, i) => (
                <option value={i} key={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <div
              role="group"
              aria-label="Supported business types"
              className="business-buttons"
            >
              {businessTypes.map((b, i) => (
                <button
                  key={b.name}
                  aria-pressed={i === active}
                  className={i === active ? "active" : ""}
                  onClick={() => setActive(i)}
                >
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {b.name}
                  <Arrow diagonal />
                </button>
              ))}
            </div>
          </div>
          <div className="business-detail" aria-live="polite">
            <div className="business-specimen">
              <div className="specimen-top">
                <span className="mono">{business.tag}</span>
                <span className="mono">
                  BB / {String(active + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 key={active}>
                {business.headline.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h3>
              <div className="specimen-bottom">
                <span>{business.offer}</span>
                <span className="specimen-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </div>
            <div className="business-operating">
              <span className="mono">
                {business.name.toUpperCase()} / EXAMPLE BUILD SCOPE
              </span>
              {active === 9 && (
                <fieldset className="media-options">
                  <legend>Your focus</legend>
                  {["Photography", "Videography", "Both"].map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name="media-focus"
                        value={option}
                        checked={media === option}
                        onChange={() => setMedia(option)}
                      />
                      {option}
                    </label>
                  ))}
                </fieldset>
              )}
              <dl>
                <div>
                  <dt>Capture the right details</dt>
                  <dd>
                    {active === 9
                      ? `${media === "Both" ? "Photo and video" : media} brief: `
                      : ""}
                    {business.enquiry}.
                  </dd>
                </div>
                <div>
                  <dt>Connect the right systems</dt>
                  <dd>{business.setup}.</dd>
                </div>
                <div className="business-check">
                  <dt>
                    <Check /> Verify the flow
                  </dt>
                  <dd>{business.check}</dd>
                </div>
              </dl>
              <BuildButton
                category={business.name}
                media={active === 9 ? media : undefined}
                className="text-link"
              >
                Build a{" "}
                {active === 9 ? "creative" : business.short.toLowerCase()}{" "}
                business
              </BuildButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
