"use client";

import { useActionState, useId, useState } from "react";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { CheckIcon } from "@/components/primitives/Icons";
import { existingStart, packages, type StartPackageId } from "@/content/packages";
import { startingPoints, type StartingPointId } from "@/content/startingPoints";
import { checkoutTruth } from "@/content/founding";
import { archetypes } from "@/content/archetypes";
import { phases } from "@/content/journey";
import { cta, routes } from "@/config/brand";
import { cn } from "@/lib/cn";
import { startBuild, type StartState } from "./actions";
import styles from "./page.module.css";

type Props = {
  defaultIdea: string;
  defaultPackage: StartPackageId;
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

export function StartForm({ defaultIdea, defaultPackage, defaultFrom = "idea" }: Props) {
  const id = useId();
  const [state, action, pending] = useActionState<StartState, FormData>(startBuild, { status: "idle" });
  const [idea, setIdea] = useState(defaultIdea);
  const [pkg, setPkg] = useState<StartPackageId>(defaultPackage);
  /* The ladder, plus the existing-business route, which is priced after an audit. */
  const startOptions = [...packages.map((p) => ({ id: p.id, name: p.name, price: p.price, model: p.model })), existingStart];
  const [from, setFrom] = useState<StartingPointId>(defaultFrom);

  if (state.status === "received") {
    return (
      <section className={styles.page} aria-labelledby="received-title">
        <Container>
          <div className={styles.grid}>
            <div className={styles.copy}>
              <Eyebrow>Not sent</Eyebrow>
              <h1 id="received-title" className={styles.title}>
                Intake is not open yet.
              </h1>
              <p className={styles.lead}>
                We cannot receive this yet, so nothing has been sent and nothing has been stored. Your description is
                below. Copy it if you want to keep it.
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
                  <dd>{startOptions.find((p) => p.id === state.packageId)?.name}</dd>
                </div>
                <div>
                  <dt>Cost so far</dt>
                  <dd>Nothing. You pay after you approve a written scope.</dd>
                </div>
              </dl>
              <Button href={routes.howItWorks} variant="ghost" arrow>
                What happens at each stage
              </Button>
            </div>

            <aside className={styles.received} aria-label="What happens to this">
              <p className={styles.receivedNote}>
                Nothing has been stored and no one has been notified. We will open intake here when we can receive it
                properly.
              </p>
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
                {startOptions.map((p) => (
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
                    {/* The price belongs next to the choice. Naming only the pricing
                        model here made the visitor leave to find out what it costs. */}
                    <span className={styles.packageModel}>
                      <span className={styles.packagePrice}>{p.price}</span>
                      <span className={styles.packageSep} aria-hidden>
                        {" · "}
                      </span>
                      {p.model}
                    </span>
                  </label>
                ))}
              </div>
              <p className={styles.hint}>
                You can change this after the recommendation.
              </p>
            </fieldset>

            {/*
              No name or email field on purpose. Nothing here is persisted or sent yet,
              and collecting contact details only to discard them is worse than not
              collecting them. Both fields return with the production auth integration,
              which posts the intake to the backend behind an authenticated session.
            */}
            <p className={styles.hint}>
              We are not taking contact details yet, because intake is not open. Nothing you enter here is sent or
              stored.
            </p>

            {state.status === "error" ? (
              <p id={`${id}-error`} className={styles.error} role="alert">
                {state.message}
              </p>
            ) : null}

            <div className={styles.actions}>
              <Button type="submit" size="lg" arrow disabled={pending}>
                {pending ? "Checking…" : "Check my description"}
              </Button>
              <p className={styles.hint}>{checkoutTruth}</p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
