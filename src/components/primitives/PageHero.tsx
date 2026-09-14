import type { ReactNode } from "react";
import { Container, Eyebrow } from "./Layout";
import { cn } from "@/lib/cn";
import styles from "./PageHero.module.css";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Actions rendered beneath the lead. */
  actions?: ReactNode;
  /** Optional visual placed in the right column on desktop. */
  aside?: ReactNode;
  tone?: "paper" | "ink";
  id?: string;
};

/** Page opener for every route except the homepage. Left-weighted, with an optional visual on the right. */
export function PageHero({ eyebrow, title, lead, actions, aside, tone = "paper", id = "page-title" }: Props) {
  return (
    <section
      className={cn(styles.hero, aside ? styles.withAside : undefined)}
      data-tone={tone === "ink" ? "ink" : undefined}
      aria-labelledby={id}
    >
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id={id} className={styles.title}>
              {title}
            </h1>
            {lead ? <p className={styles.lead}>{lead}</p> : null}
            {actions ? <div className={styles.actions}>{actions}</div> : null}
          </div>
          {aside ? <div className={styles.aside}>{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
