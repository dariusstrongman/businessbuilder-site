import Image from "next/image";
import Link from "next/link";
import { studies, studiesCopy, type Study } from "@/content/studies";
import { ArrowIcon } from "@/components/primitives/Icons";
import { routes } from "@/config/brand";
import { cn } from "@/lib/cn";
import styles from "./StudyGrid.module.css";

type Props = {
  /** "strip" is the homepage cut; "full" adds the craft notes. */
  variant?: "strip" | "full";
  /** Only the first n studies. */
  limit?: number;
};

function StudyCard({ study, index, full, priority }: { study: Study; index: number; full: boolean; priority: boolean }) {
  return (
    <figure className={cn(styles.card, styles[study.scale])} data-tone={study.tone}>
      <div className={styles.frame}>
        <Image
          src={study.image}
          alt={`${study.name}, a ${study.discipline.toLowerCase()} design study`}
          width={study.width}
          height={study.height}
          sizes="(min-width: 64rem) 48vw, 100vw"
          className={styles.image}
          priority={priority}
        />
        <span className={styles.stamp}>Study</span>
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <h3 className={styles.name}>{study.name}</h3>
        <p className={styles.discipline}>{study.discipline}</p>
        <p className={styles.line}>{study.line}</p>
        {full ? (
          <>
            <p className={styles.premise}>{study.premise}</p>
            <div className={styles.notes}>
              <h4 className={styles.notesTitle}>What it demonstrates</h4>
              <ul className={styles.notesList}>
                {study.demonstrates.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            <p className={styles.transfer}>
              <span className={styles.transferLabel}>Where it transfers</span>
              {study.transfer}
            </p>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function StudyGrid({ variant = "full", limit }: Props) {
  const full = variant === "full";
  const list = limit ? studies.slice(0, limit) : studies;

  return (
    <div className={cn(styles.grid, styles[variant])}>
      {list.map((s, i) => (
        <StudyCard key={s.slug} study={s} index={i} full={full} priority={i === 0 && full} />
      ))}
      <p className={styles.disclosure}>
        <span className={styles.disclosureMark} aria-hidden />
        {studiesCopy.disclosure}
        {!full ? (
          <Link href={routes.work} className={styles.disclosureLink}>
            See all five studies
            <ArrowIcon />
          </Link>
        ) : null}
      </p>
    </div>
  );
}
