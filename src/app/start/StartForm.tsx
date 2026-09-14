"use client";

import { useActionState, useId, useState } from "react";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { CheckIcon } from "@/components/primitives/Icons";
import { packages, type PackageId } from "@/content/packages";
import { websiteTiers } from "@/content/websiteTiers";
import { startingPoints, type StartingPointId } from "@/content/startingPoints";
import { archetypes } from "@/content/archetypes";
import { phases } from "@/content/journey";
import { cta, routes } from "@/config/brand";
import { cn } from "@/lib/cn";
import { startBuild, type StartState } from "./actions";
import styles from "./page.module.css";

type Props = {
  defaultIdea: string;
  defaultPackage: PackageId;
  /** Set when the visitor picked a specific website tier. */
  defaultTier?: string;
  /** Set when the visitor arrived from a starting point. */
  defaultFrom?: StartingPointId;
};

/** The four phases, with one marked as where the founder currently is. */
function NextSteps({ current }: { current: number }) {
  return (
    <ol className={styles.next}>
      {phases.map((p, i) => (
        <li key={p.id} className={cn(styles.nextItem, i === current && styles.nextCurrent, i < current && styles.nextDone)}>
          <span className={styles.nextIndex}>{i < current ? <CheckIcon /> : `0${i + 1}`}</span>
          <span className={styles.nextLabel}>{p.label}</span>
          <span className={styles.nextText}>{p.summary}</span>
        </li>
      ))}
    </ol>
  );
}

export function StartForm({ defaultIdea, defaultPackage, defaultTier, defaultFrom = "idea" }: Props) {
  const id = useId();
  const [state, action, pending] = useActionState<StartState, FormData>(startBuild, { status: "idle" });
  const [idea, setIdea] = useState(defaultIdea);
  const [pkg, setPkg] = useState<PackageId>(defaultPackage);
  const [from, setFrom] = useState<StartingPointId>(defaultFrom);

  if (state.status === "received") {
    return (
      <section className={styles.page} aria-labelledby="received-title">
        <Container>
          <div className={styles.grid}>
            <div className={styles.copy}>
              <Eyebrow>Received</Eyebrow>
              <h1 id="received-title" className={styles.title}>
                Your build is opened.
              </h1>
              <p className={styles.lead}>
                We will come back by email with a few questions, then research and a recommendation. Nothing is built
                until you approve the direction.
              </p>
              <dl className={styles.summary}>
                <div>
                  <dt>The company</dt>
                  <dd>{state.idea}</dd>
                </div>
                {state.from ? (
                  <div>
                    <dt>Starting from</dt>
                    <dd>{startingPoints.find((p) => p.id === state.from)?.label}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Starting package</dt>
                  <dd>{packages.find((p) => p.id === state.packageId)?.name}</dd>
                </div>
                {state.tier ? (
                  <div>
                    <dt>Website tier</dt>
                    <dd>{websiteTiers.find((t) => t.id === state.tier)?.name}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Cost so far</dt>
                  <dd>Nothing. You pay when you approve the direction.</dd>
                </div>
              </dl>
              <Button href={routes.howItWorks} variant="ghost" arrow>
                What happens at each stage
              </Button>
            </div>

            <aside className={styles.received} aria-label="Where your build is">
              <span className={styles.receivedMark} aria-hidden>
                <CheckIcon />
              </span>
              <p className={styles.receivedNote}>
                Your build sits at the first phase. You will see the Build Room as soon as the direction is approved.
              </p>
              <NextSteps current={0} />
            </aside>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.page} aria-labelledby="start-title">
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow>Start a build</Eyebrow>
            <h1 id="start-title" className={styles.title}>
              Describe the company you want.
            </h1>
            <p className={styles.lead}>
              A sentence is enough. We will ask a few questions, research the market, and come back with a
              recommendation you can approve or change. {cta.reassurance}
            </p>
            <NextSteps current={0} />
          </div>

          {/* Validation runs in the server action so the error is designed and announced, not a browser tooltip. */}
          <form
            action={action}
            noValidate
            className={styles.form}
            aria-describedby={state.status === "error" ? `${id}-error` : undefined}
          >
            {defaultTier ? <input type="hidden" name="tier" value={defaultTier} /> : null}

            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>Where are you starting from?</legend>
              <div className={styles.packages}>
                {startingPoints.map((p) => (
                  <label key={p.id} className={cn(styles.package, from === p.id && styles.packageActive)}>
                    <input
                      type="radio"
                      name="from"
                      value={p.id}
                      checked={from === p.id}
                      onChange={() => setFrom(p.id)}
                      className={styles.radio}
                    />
                    <span className={styles.packageName}>{p.label}</span>
                    <span className={styles.packageModel}>{p.audits ? "Starts with an audit" : "Starts with research"}</span>
                  </label>
                ))}
              </div>
              <p className={styles.hint}>
                This changes what happens next. If you already trade, we inventory what you have before we change
                anything.
              </p>
            </fieldset>

            <div className={styles.field}>
              <label htmlFor={`${id}-idea`} className={styles.label}>
                The company, in your words
              </label>
              <textarea
                id={`${id}-idea`}
                name="idea"
                rows={3}
                className={styles.textarea}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder={archetypes[1].examplePrompt}
              />
              <ul className={styles.chips} aria-label="Start from a business type">
                {archetypes.map((a) => (
                  <li key={a.slug}>
                    <button type="button" className={styles.chip} onClick={() => setIdea(a.examplePrompt)}>
                      {a.short}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>Start from</legend>
              <div className={styles.packages}>
                {packages.map((p) => (
                  <label key={p.id} className={cn(styles.package, pkg === p.id && styles.packageActive)}>
                    <input
                      type="radio"
                      name="package"
                      value={p.id}
                      checked={pkg === p.id}
                      onChange={() => setPkg(p.id)}
                      className={styles.radio}
                    />
                    <span className={styles.packageName}>{p.name}</span>
                    <span className={styles.packageModel}>{p.model}</span>
                  </label>
                ))}
              </div>
              <p className={styles.hint}>
                You can change this after the recommendation. Every package contains the one before it.
              </p>
            </fieldset>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={`${id}-name`} className={styles.label}>
                  Your name
                </label>
                {/* React resets uncontrolled fields after an action, so re-seed from the echoed state. */}
                <input
                  key={`name-${state.status}`}
                  id={`${id}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  defaultValue={state.name ?? ""}
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor={`${id}-email`} className={styles.label}>
                  Email
                </label>
                <input
                  key={`email-${state.status}`}
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={state.email ?? ""}
                  className={styles.input}
                />
              </div>
            </div>

            {state.status === "error" ? (
              <p id={`${id}-error`} className={styles.error} role="alert">
                {state.message}
              </p>
            ) : null}

            <div className={styles.actions}>
              <Button type="submit" size="lg" arrow disabled={pending}>
                {pending ? "Opening your build…" : "Open my build"}
              </Button>
              <p className={styles.hint}>No payment now. You pay when you approve the direction.</p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
