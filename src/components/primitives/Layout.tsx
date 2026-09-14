import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Layout.module.css";

type Tone = "paper" | "paper-2" | "ink";

export function Container({ className, children, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn(styles.container, className)} {...rest}>
      {children}
    </div>
  );
}

type SectionProps = {
  tone?: Tone;
  /** Tighter vertical rhythm for supporting sections. */
  tight?: boolean;
  /** Remove bottom padding so the next section can sit flush. */
  flushBottom?: boolean;
  flushTop?: boolean;
  as?: ElementType;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "children">;

export function Section({
  tone = "paper",
  tight,
  flushBottom,
  flushTop,
  as: Tag = "section",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      data-tone={tone === "paper" ? undefined : tone}
      className={cn(
        styles.section,
        tight && styles.tight,
        flushBottom && styles.flushBottom,
        flushTop && styles.flushTop,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Renders a numbered index instead of the square marker. */
  index?: string;
  as?: "p" | "span" | "div";
};

export function Eyebrow({ children, className, index, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag className={cn(styles.eyebrow, className)}>
      {index ? <span className={styles.eyebrowIndex}>{index}</span> : <span className={styles.eyebrowMark} aria-hidden />}
      {children}
    </Tag>
  );
}

type HeadingProps = {
  level?: 1 | 2 | 3 | 4;
  size?: "display" | "h1" | "h2" | "h3" | "h4";
  className?: string;
  children: ReactNode;
  id?: string;
};

export function Heading({ level = 2, size, className, children, id }: HeadingProps) {
  const Tag = `h${level}` as const;
  const sizeClass = styles[size ?? `h${level}`];
  return (
    <Tag id={id} className={cn(styles.heading, sizeClass, className)}>
      {children}
    </Tag>
  );
}

export function Lead({ className, children, ...rest }: ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn(styles.lead, className)} {...rest}>
      {children}
    </p>
  );
}

/** Editorial serif italic accent for a single word or phrase. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className={styles.accent}>{children}</em>;
}

/** Section header block: eyebrow, heading, optional lead, laid out on the grid. */
export function SectionHeader({
  eyebrow,
  index,
  title,
  lead,
  id,
  align = "start",
  width = "wide",
  level = 2,
}: {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "start" | "center";
  width?: "wide" | "narrow";
  level?: 1 | 2;
}) {
  return (
    <header className={cn(styles.sectionHeader, styles[align], styles[width])}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <Heading level={level} id={id} size={level === 1 ? "h1" : "h2"}>
        {title}
      </Heading>
      {lead ? <Lead>{lead}</Lead> : null}
    </header>
  );
}
