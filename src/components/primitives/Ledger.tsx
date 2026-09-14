import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Ledger.module.css";

type Row = {
  key: string;
  label: ReactNode;
  value: ReactNode;
  /** Optional mono line under the label. */
  meta?: ReactNode;
  emphasis?: boolean;
};

type Props = {
  rows: Row[];
  /** Column headers, in mono. */
  head?: [ReactNode, ReactNode];
  numbered?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** A hairline-ruled two-column list. Used wherever a list of real things needs to read as a manifest. */
export function Ledger({ rows, head, numbered = false, className, ariaLabel }: Props) {
  return (
    <div className={cn(styles.ledger, className)} role="table" aria-label={ariaLabel}>
      {head ? (
        <div className={cn(styles.head, numbered && styles.numberedRow)} role="row">
          <span role="columnheader">{head[0]}</span>
          <span role="columnheader">{head[1]}</span>
        </div>
      ) : null}
      {rows.map((row, i) => (
        <div key={row.key} className={cn(styles.row, numbered && styles.numberedRow, row.emphasis && styles.emphasis)} role="row">
          {numbered ? (
            <span className={styles.index} aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : null}
          <span className={styles.label} role="cell">
            {row.label}
            {row.meta ? <span className={styles.meta}>{row.meta}</span> : null}
          </span>
          <span className={styles.value} role="cell">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
