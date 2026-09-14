"use client";
import { useState } from "react";
import { Wordmark } from "./ui";
import { BuildButton } from "./intake";
const links = [
  ["What we build", "#build-room"],
  ["How it works", "#how-it-works"],
  ["Businesses", "#businesses"],
  ["Pricing", "#pricing"],
  ["Trust", "#trust"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([text, href]) => (
            <a href={href} key={href}>
              {text}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <BuildButton className="button button-small button-ink" />
          <button
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
          }
        }}
      >
        {links.map(([text, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {text}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
