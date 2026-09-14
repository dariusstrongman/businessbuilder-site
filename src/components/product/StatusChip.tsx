import { cn } from "@/lib/cn";
import { statusLabels, type Status } from "@/content/buildRoom";
import { CheckIcon } from "@/components/primitives/Icons";
import styles from "./StatusChip.module.css";

type Props = {
  status: Status;
  className?: string;
  size?: "sm" | "md";
};

/** The four-state chip: Proposed, Executed, Tested, Verified. Appears wherever systems appear. */
export function StatusChip({ status, className, size = "md" }: Props) {
  return (
    <span className={cn(styles.chip, styles[status], styles[size], className)} data-status={status}>
      <span className={styles.dot} aria-hidden>
        {status === "verified" ? <CheckIcon className={styles.check} /> : null}
      </span>
      {statusLabels[status]}
    </span>
  );
}
