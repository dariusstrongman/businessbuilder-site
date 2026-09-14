import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "./Icons";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type LinkProps = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;
type ButtonProps = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className">;

export type ButtonLikeProps = LinkProps | ButtonProps;

/** Strips the presentational props so the remainder can be spread onto the element. */
function elementProps<T extends BaseProps>(props: T): Omit<T, keyof BaseProps> {
  const rest: Record<string, unknown> = { ...props };
  for (const key of ["variant", "size", "arrow", "children", "className"] as const) delete rest[key];
  return rest as Omit<T, keyof BaseProps>;
}

export function Button(props: ButtonLikeProps) {
  const { variant = "primary", size = "md", arrow = false, children, className } = props;
  const classes = cn(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow ? <ArrowIcon className={styles.arrow} /> : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, ...rest } = elementProps(props);
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...rest } = elementProps(props);
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
