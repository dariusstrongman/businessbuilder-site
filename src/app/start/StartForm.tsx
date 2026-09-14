"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { CheckIcon } from "@/components/primitives/Icons";
import { packages, type PackageId } from "@/content/packages";
import { startingPoints, type StartingPointId } from "@/content/startingPoints";
import { checkoutTruth } from "@/content/founding";
import { phases } from "@/content/journey";
import { cta } from "@/config/brand";
import { ProductApiError, productRequest } from "@/lib/businessBuilder/client";
import type { ResidentialCleaningJourney } from "@/lib/businessBuilder/types";
import { cn } from "@/lib/cn";
import styles from "./page.module.css";

type Props = {
  defaultIdea: string;
  defaultPackage: PackageId;
  defaultFrom?: StartingPointId;
};

const pilotPackages = packages.filter((item) => item.id === "business" || item.id === "run");
const pilotPrice = {
  business: "$1,495 founding price",
  run: "$1,995 upfront + $299/month",
} as const;

function NextSteps({ current }: { current: number }) {
  return (
    <ol className={styles.next}>
      {phases.map((phase, index) => (
        <li
          key={phase.id}
          className={cn(styles.nextItem, index === current && styles.nextCurrent, index < current && styles.nextDone)}
        >
          <span className={styles.nextIndex}>{index < current ? <CheckIcon /> : `0${index + 1}`}</span>
          <span className={styles.nextLabel}>{phase.label}</span>
          <span className={styles.nextText}>{phase.summary}</span>
        </li>
      ))}
    </ol>
  );
}

export function StartForm({ defaultIdea, defaultPackage, defaultFrom = "idea" }: Props) {
  const id = useId();
  const router = useRouter();
  const [idea, setIdea] = useState(defaultIdea);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [pkg, setPkg] = useState<"business" | "run">(defaultPackage === "run" ? "run" : "business");
  const [from, setFrom] = useState<StartingPointId>(defaultFrom);
  const [radius, setRadius] = useState(12);
  const [weeklyHours, setWeeklyHours] = useState(30);
  const [budget, setBudget] = useState(2500);
  const [avoidSundays, setAvoidSundays] = useState(true);
  const [ownerOperated, setOwnerOperated] = useState(true);
  const [proof, setProof] = useState("");
  const [authRequired, setAuthRequired] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const startJourney = async () => {
    if (idea.trim().length < 12 || !name.trim() || !companyName.trim()) {
      setMessage("Add your name, a company working name, and a sentence describing the company.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Enter the email address attached to your founder session.");
      return;
    }
    setPending(true);
    setMessage(null);
    try {
      const result = await productRequest<{ journey: ResidentialCleaningJourney }>("journey/start", {
        method: "POST",
        body: JSON.stringify({
          intake: {
            starting_point: from,
            idea: idea.trim(),
            founder_display_name: name.trim(),
            organization_name: `${companyName.trim()} Organization`,
            company_name: companyName.trim(),
            country: "US",
            region: "TX",
            locality: "Denton",
            service_radius_miles: radius,
            weekly_hours: weeklyHours,
            startup_budget_minor: Math.round(budget * 100),
            working_preferences: {
              avoid_sundays: avoidSundays,
              owner_operated_at_launch: ownerOperated,
              requested_package: pkg,
            },
          },
        }),
      });
      router.push(`/build-room/${encodeURIComponent(result.journey.company.company_id)}`);
    } catch (error) {
      if (error instanceof ProductApiError && error.status === 401) {
        setAuthRequired(true);
        setMessage("Your intake is still here. Authenticate to open the persisted build.");
      } else {
        setMessage(error instanceof ProductApiError ? error.message : "The build could not be opened. Retrying is safe.");
      }
    } finally {
      setPending(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void startJourney();
  };

  const authenticate = async () => {
    setPending(true);
    setMessage(null);
    try {
      await productRequest<{ authenticated: true }>("session", {
        method: "POST",
        body: JSON.stringify({ email, proof }),
      });
      setAuthRequired(false);
      await startJourney();
    } catch (error) {
      setMessage(error instanceof ProductApiError ? error.message : "Authentication could not be completed.");
      setPending(false);
    }
  };

  return (
    <section className={styles.page} aria-labelledby="start-title">
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow>Residential cleaning pilot</Eyebrow>
            <h1 id="start-title" className={styles.title}>Describe the company you want.</h1>
            <p className={styles.lead}>
              This focused pilot supports residential cleaning in Denton, Texas. We persist your starting point,
              research the bounded market, and ask you to approve the exact recommendation. {cta.reassurance}
            </p>
            <NextSteps current={0} />
          </div>

          <form onSubmit={submit} noValidate className={styles.form} aria-describedby={message ? `${id}-status` : undefined}>
            <fieldset className={styles.fieldset} disabled={pending}>
              <legend className={styles.label}>Where are you starting from?</legend>
              <div className={styles.packages}>
                {startingPoints.map((point) => (
                  <label key={point.id} className={cn(styles.package, from === point.id && styles.packageActive)}>
                    <input type="radio" name="from" value={point.id} checked={from === point.id} onChange={() => setFrom(point.id)} className={styles.radio} />
                    <span className={styles.packageName}>{point.label}</span>
                    <span className={styles.packageModel}>{point.audits ? "Records an audit starting point" : "Starts with cited research"}</span>
                  </label>
                ))}
              </div>
              <p className={styles.hint}>This selection is saved with the Company Brain intake. It grants no authority.</p>
            </fieldset>

            <div className={styles.field}>
              <label htmlFor={`${id}-idea`} className={styles.label}>The company, in your words</label>
              <textarea id={`${id}-idea`} name="idea" rows={4} className={styles.textarea} value={idea} onChange={(event) => setIdea(event.target.value)} placeholder="A reliable residential cleaning company for busy Denton households." />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={`${id}-name`} className={styles.label}>Your name</label>
                <input id={`${id}-name`} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className={styles.input} />
              </div>
              <div className={styles.field}>
                <label htmlFor={`${id}-email`} className={styles.label}>Founder account email</label>
                <input id={`${id}-email`} value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" className={styles.input} />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${id}-company`} className={styles.label}>Working company name</label>
              <input id={`${id}-company`} value={companyName} onChange={(event) => setCompanyName(event.target.value)} className={styles.input} />
              <p className={styles.hint}>A working name, not a legal-name claim. Naming and registration checks remain Founder Actions.</p>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={`${id}-radius`} className={styles.label}>Denton service radius · miles</label>
                <input id={`${id}-radius`} type="number" min={1} max={25} value={radius} onChange={(event) => setRadius(Number(event.target.value))} className={styles.input} />
              </div>
              <div className={styles.field}>
                <label htmlFor={`${id}-hours`} className={styles.label}>Founder hours per week</label>
                <input id={`${id}-hours`} type="number" min={1} max={80} value={weeklyHours} onChange={(event) => setWeeklyHours(Number(event.target.value))} className={styles.input} />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${id}-budget`} className={styles.label}>Available startup budget · USD</label>
              <input id={`${id}-budget`} type="number" min={0} max={100000} step={50} value={budget} onChange={(event) => setBudget(Number(event.target.value))} className={styles.input} />
              <p className={styles.hint}>Planning input only. This does not authorize spending or move money.</p>
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>Working preferences</legend>
              <label className={styles.check}><input type="checkbox" checked={ownerOperated} onChange={(event) => setOwnerOperated(event.target.checked)} /> Owner-operated at launch</label>
              <label className={styles.check}><input type="checkbox" checked={avoidSundays} onChange={(event) => setAvoidSundays(event.target.checked)} /> Avoid Sunday scheduling</label>
            </fieldset>

            <fieldset className={styles.fieldset} disabled={pending}>
              <legend className={styles.label}>Starting package</legend>
              <div className={styles.packages}>
                {pilotPackages.map((item) => (
                  <label key={item.id} className={cn(styles.package, pkg === item.id && styles.packageActive)}>
                    <input type="radio" name="package" value={item.id} checked={pkg === item.id} onChange={() => setPkg(item.id as "business" | "run")} className={styles.radio} />
                    <span className={styles.packageName}>{item.name}</span>
                    <span className={styles.packageModel}>{pilotPrice[item.id as "business" | "run"]}</span>
                  </label>
                ))}
              </div>
              <p className={styles.hint}>This proof creates only the pending Build My Business order. Build & Run remains inactive until authoritative checkout.</p>
            </fieldset>

            {message ? <p id={`${id}-status`} className={styles.error} role="alert">{message}</p> : null}

            {authRequired ? (
              <div className={styles.authPanel}>
                <div>
                  <p className={styles.authTitle}>Authenticate before we persist the build</p>
                  <p className={styles.hint}>The configured provider-neutral session adapter supplies identity. Tenant, company, and role remain server-derived.</p>
                </div>
                <div className={styles.field}>
                  <label htmlFor={`${id}-proof`} className={styles.label}>Pilot access code</label>
                  <input id={`${id}-proof`} type="password" autoComplete="current-password" value={proof} onChange={(event) => setProof(event.target.value)} className={styles.input} />
                </div>
                <Button type="button" onClick={() => void authenticate()} disabled={pending}>Authenticate and open build</Button>
              </div>
            ) : (
              <div className={styles.actions}>
                <Button type="submit" size="lg" arrow disabled={pending}>{pending ? "Opening your build…" : "Open my build"}</Button>
                <p className={styles.hint}>{checkoutTruth}</p>
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
