import type { ReactNode } from "react";
import { Container, Eyebrow, Heading, Section } from "./Layout";
import { cn } from "@/lib/cn";
import styles from "./Split.module.css";

type Props = {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  id: string;
  /** Paragraphs under the heading. */
  children?: ReactNode;
  /** The right-hand content. */
  aside: ReactNode;
  tone?: "paper" | "paper-2" | "ink";
  /** Keep the left column pinned while the right scrolls. */
  sticky?: boolean;
  ratio?: "5/7" | "4/8" | "6/6";
};

/** Editorial two-column section: statement on the left, evidence on the right. */
export function Split({ eyebrow, index, title, id, children, aside, tone = "paper", sticky = false, ratio = "5/7" }: Props) {
  return (
    <Section tone={tone} aria-labelledby={id} className={styles.section}>
      <Container>
        <div className={cn(styles.grid, styles[`r${ratio.replace("/", "_")}`])}>
          <div className={cn(styles.copy, sticky && styles.sticky)}>
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
            <Heading id={id} level={2}>
              {title}
            </Heading>
            {children ? <div className={styles.text}>{children}</div> : null}
          </div>
          <div className={styles.aside}>{aside}</div>
        </div>
      </Container>
    </Section>
  );
}
