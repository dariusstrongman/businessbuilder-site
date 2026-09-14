import { actorLabels, phases, stages } from "@/content/journey";
import { stageDetails } from "@/content/journeyDetail";
import { cn } from "@/lib/cn";
import styles from "./StageLedger.module.css";

/** Every stage, phase by phase: what happens, what you do, what you get. */
export function StageLedger() {
  return (
    <div className={styles.ledger}>
      {phases.map((phase) => {
        const phaseStages = stages.filter((s) => s.phase === phase.id);
        return (
          <section key={phase.id} className={styles.phase} aria-labelledby={`phase-${phase.id}`}>
            <header className={styles.phaseHead}>
              <h3 id={`phase-${phase.id}`} className={styles.phaseLabel}>
                {phase.label}
              </h3>
              <p className={styles.phaseSummary}>{phase.summary}</p>
            </header>
            <div className={styles.columns} aria-hidden>
              <span />
              <span>What happens</span>
              <span>What you do</span>
              <span>What you get</span>
            </div>
            <ol className={styles.stages}>
              {phaseStages.map((s) => {
                const index = stages.indexOf(s) + 1;
                const d = stageDetails[s.id];
                return (
                  <li key={s.id} className={styles.stage} data-actor={s.actor}>
                    <div className={styles.stageId}>
                      <span className={styles.stageIndex}>{String(index).padStart(2, "0")}</span>
                      <h4 className={styles.stageLabel}>{s.label}</h4>
                      <span className={cn(styles.actor, styles[`actor_${s.actor}`])}>{actorLabels[s.actor]}</span>
                    </div>
                    <div className={styles.cell}>
                      <span className={styles.cellLabel}>What happens</span>
                      <p>{d.happens}</p>
                    </div>
                    <div className={styles.cell}>
                      <span className={styles.cellLabel}>What you do</span>
                      <p>{d.youDo}</p>
                    </div>
                    <div className={styles.cell}>
                      <span className={styles.cellLabel}>What you get</span>
                      <p>{d.youGet}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
