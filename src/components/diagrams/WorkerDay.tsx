import { dayLegend, workerDay } from "@/content/workerDay";
import { cn } from "@/lib/cn";
import styles from "./WorkerDay.module.css";

/** One day, in order. Shows both what the workers handle and where they stop. */
export function WorkerDay() {
  return (
    <div className={styles.day}>
      <ol className={styles.list}>
        {workerDay.map((e, i) => (
          <li key={`${e.time}-${i}`} className={cn(styles.event, styles[e.actor])}>
            <span className={styles.time}>{e.time}</span>
            <span className={styles.marker} aria-hidden />
            <span className={styles.body}>
              <span className={styles.who}>{e.who}</span>
              <span className={styles.what}>{e.what}</span>
              {e.gate ? (
                <span className={styles.gate}>
                  <span className={styles.gateMark} aria-hidden />
                  {e.gate}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
      <dl className={styles.legend}>
        {dayLegend.map((l) => (
          <div key={l.actor} className={styles[l.actor]}>
            <dt>
              <span className={styles.legendMarker} aria-hidden />
            </dt>
            <dd>{l.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
