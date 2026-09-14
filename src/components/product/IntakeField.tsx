"use client";

import { useEffect, useId, useState } from "react";
import { cta, routes } from "@/config/brand";
import { archetypes } from "@/content/archetypes";
import type { PackageId } from "@/content/packages";
import { Button } from "@/components/primitives/Button";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import styles from "./IntakeField.module.css";

const prompts = archetypes.map((a) => a.examplePrompt);

type Props = {
  size?: "md" | "lg";
  /** Pre-filled text, e.g. from an archetype. */
  defaultValue?: string;
  label?: string;
  buttonLabel?: string;
  reassurance?: boolean;
  className?: string;
  /** Show the archetype pre-fill chips beneath the field. */
  chips?: boolean;
  /** Package to carry into the start flow. */
  packageId?: PackageId;
};

/**
 * The intake: the product's front door, used as the primary call to action.
 * A composer: one line for the idea, a footer with the reassurance and the button.
 * Submits to /start with the description as a query so the sign-up flow can pick it up.
 */
export function IntakeField({
  size = "lg",
  defaultValue = "",
  label = "Describe the company you want",
  buttonLabel = cta.primary,
  reassurance = true,
  className,
  chips = false,
  packageId,
}: Props) {
  const id = useId();
  const reduced = useReducedMotion();
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const paused = reduced || focused || value.length > 0;

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setFading(true);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % prompts.length);
        setFading(false);
      }, 220);
    }, 3400);
    return () => window.clearInterval(interval);
  }, [paused]);

  return (
    <form action={routes.start} method="get" className={cn(styles.form, styles[size], className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {packageId ? <input type="hidden" name="package" value={packageId} /> : null}
      <div className={styles.field}>
        <div className={styles.inputWrap}>
          <input
            id={id}
            name="idea"
            type="text"
            autoComplete="off"
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-describedby={reassurance ? `${id}-note` : undefined}
          />
          {value.length === 0 ? (
            <span className={cn(styles.placeholder, fading && styles.placeholderFading)} aria-hidden>
              {prompts[index]}
            </span>
          ) : null}
        </div>
        <div className={styles.footer}>
          {reassurance ? (
            <p id={`${id}-note`} className={styles.note}>
              {cta.reassurance}
            </p>
          ) : (
            <span />
          )}
          <Button type="submit" size="md" className={styles.submit} arrow>
            {buttonLabel}
          </Button>
        </div>
      </div>
      {chips ? (
        <ul className={styles.chips} aria-label="Start from a business type">
          {archetypes.map((a) => (
            <li key={a.slug}>
              <button type="button" className={styles.chip} onClick={() => setValue(a.examplePrompt)}>
                {a.short}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
