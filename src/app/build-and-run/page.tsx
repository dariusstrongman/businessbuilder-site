import type { Metadata } from "next";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";
import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Split } from "@/components/primitives/Split";
import { PermissionsCard } from "@/components/product/PermissionsCard";
import { WorkerDay } from "@/components/diagrams/WorkerDay";
import { ActivationSplit } from "@/components/diagrams/ActivationSplit";
import { activation, runStandalone } from "@/content/founding";
import { CtaBand } from "@/components/sections/CtaBand";
import { workerLimits, workers } from "@/content/workers";
import { routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Build & run my business",
  description:
    "Everything in Build my business, plus AI workers that handle inbound inquiries, quote drafting, inbox triage and review follow-up, inside permissions, budgets and approvals you set.",
};

const stopping = [
  { step: "When you stop", text: "The workers stop at the end of the period. Nothing they were handling is left mid-way without telling you." },
  { step: "What you keep", text: "Everything. The company, the systems, the data, and the record of what the workers did." },
  { step: "If you come back", text: "The workers resume with the same context and the same limits. Nothing is rebuilt." },
];

export default function BuildAndRunPage() {
  return (
    <>
      <PageHero
        eyebrow="Build & run my business"
        title="AI workers for the recurring work, inside limits you set."
        lead="For an existing business, onboarding starts from $1,495 after an audit and exact quote, then $299 a month. With a new Build my business project, the separate fixed bundle is $1,995 upfront plus $299 a month. A small operating team keeps working inside limits you set: answering, drafting, sorting, following up."
        actions={
          <>
            <Button href={`${routes.start}?package=run`} arrow>
              Build and run my business
            </Button>
            <Button href={routes.trust} variant="ghost" arrow>
              Read the trust page
            </Button>
          </>
        }
      />

      <Section aria-labelledby="activation-title" tone="paper-2">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="Two fees, two jobs"
            id="activation-title"
            title={activation.title}
            lead={activation.lead}
          />
          <ActivationSplit />
          <p className={styles.bundle}>
            <span className={styles.bundleMark} aria-hidden />
            A new-business build and Run package is {runStandalone.bundleActivation} upfront plus {runStandalone.monthly} a month.
            Existing-business onboarding is a {runStandalone.activation} after the audit, starting from $1,495; the starting figure is not a chargeable fixed price.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="roster-title">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="The roster"
            id="roster-title"
            title="Four workers. Each one has a permissions card."
            lead="A worker is a job with a boundary. What it can do, what it must ask you about, and what it cannot do are written down before it starts."
          />
          <div className={styles.cards}>
            {workers.map((w) => (
              <PermissionsCard key={w.id} worker={w} />
            ))}
          </div>
          <p className={styles.future}>
            Further operational roles are added as they are proven in real companies. We do not announce them ahead of
            that.
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="limits-title" tone="ink">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="The limits"
            id="limits-title"
            title="Autonomy is a dial, not a switch."
            lead="You set where it sits for each worker, and you can turn it down at any time. Anything customer-facing, irreversible or costly waits for your approval."
          />
          <dl className={styles.limits}>
            {workerLimits.map((l, i) => (
              <div key={l.label} className={styles.limit}>
                <dt className={styles.limitLabel}>
                  <span className={styles.limitIndex}>{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </dt>
                <dd className={styles.limitText}>{l.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Split
        index="04"
        eyebrow="A working day"
        id="day-title"
        title="What they handle. Where they stop."
        aside={<WorkerDay />}
        sticky
      >
        <p>
          The point of Build & Run is not that you do nothing. It is that the work you do is the work only you can do.
        </p>
        <p>
          This is one representative day in a detailing company running with Build & Run. Two moments in it are yours.
          Both are marked.
        </p>
      </Split>

      <Section aria-labelledby="stop-title" tone="paper-2">
        <Container>
          <SectionHeader
            index="05"
            eyebrow="Stopping"
            id="stop-title"
            title="Stop any time. The company stays yours."
            lead="Build & Run is a monthly service on top of a company you already own. Ending it ends the service, not the company."
          />
          <ol className={styles.stopping}>
            {stopping.map((s, i) => (
              <li key={s.step} className={styles.stop}>
                <span className={styles.stopIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.stopTitle}>{s.step}</h3>
                <p className={styles.stopText}>{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand packageId="run" />
    </>
  );
}
