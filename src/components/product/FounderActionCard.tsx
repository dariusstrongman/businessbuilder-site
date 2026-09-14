import { founderActionFlow, founderActionStatusLabels, type FounderAction } from "@/content/buildRoom";
import { CheckIcon } from "@/components/primitives/Icons";
import { cn } from "@/lib/cn";
import styles from "./FounderActionCard.module.css";

type Props = {
  action: FounderAction;
  index: number;
  total: number;
  className?: string;
};

/** The single step the founder performs is step four. This card shows the other five. */
const FOUNDER_STEP = 3;

export function FounderActionCard({ action, index, total, className }: Props) {
  return (
    <article className={cn(styles.card, styles[action.status], className)} aria-label={`Founder Action: ${action.title}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>
          Founder Action · {String(index).padStart(2, "0")} of {String(total).padStart(2, "0")}
        </span>
        <span className={styles.status}>
          <span className={styles.statusDot} aria-hidden />
          {founderActionStatusLabels[action.status]}
        </span>
      </header>
      <h3 className={styles.title}>{action.title}</h3>

      {/* Five of the six states are ours. The founder only performs the fourth. */}
      <ol className={styles.flow} aria-label="How this action is handled">
        {founderActionFlow.map((f, i) => (
          <li key={f.id} className={cn(styles.flowStep, i === FOUNDER_STEP && styles.flowYours)}>
            <span className={styles.flowMark} aria-hidden>
              {i === FOUNDER_STEP ? null : <CheckIcon />}
            </span>
            <span className={styles.flowLabel}>{f.label}</span>
            <span className={styles.flowNote}>{f.note}</span>
          </li>
        ))}
      </ol>

      <div className={styles.block}>
        <h4 className={styles.blockTitle}>Why it has to be you</h4>
        <p className={styles.why}>{action.why}</p>
        <p className={styles.provider}>
          <span className={styles.providerLabel}>Completed with</span>
          {action.provider}
        </p>
      </div>

      <div className={styles.block}>
        <h4 className={styles.blockTitle}>What we prepared</h4>
        <ul className={styles.prepared}>
          {action.prepared.map((p) => (
            <li key={p}>
              <span className={styles.preparedCheck} aria-hidden>
                <CheckIcon />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <h4 className={styles.blockTitle}>Your steps</h4>
        <ol className={styles.steps}>
          {action.steps.map((s, i) => (
            <li key={s}>
              <span className={styles.stepIndex}>{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <p className={styles.captured}>
          <span className={styles.capturedLabel}>Then we</span>
          {action.captured}
        </p>
      </div>

      <footer className={styles.foot}>
        <span className={styles.time}>About {action.minutes} minutes</span>
        <span className={styles.unblocks}>
          <span className={styles.unblocksLabel}>Unblocks</span>
          {action.unblocks}
        </span>
      </footer>
    </article>
  );
}
