import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="5.5" cy="10.5" r="3" />
      <path d="M7.75 8.25 13.5 2.5M11 5l2 2M12.5 3.5 14 5" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8h10" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 5h11M2.5 11h11" />
    </svg>
  );
}

/**
 * The working mark: a plan sheet with a cut corner, carrying the verification check.
 * Two-tone on purpose — the accent lives in the mark, so it never reads as a plain checkbox.
 */
export function BrandMark(props: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" fill="none" aria-hidden focusable={false} {...props}>
      <path d="M3 3h11.5L19 7.5V19H3V3Z" fill="currentColor" />
      <path d="M14.5 3v4.5H19" stroke="var(--bg)" strokeWidth={1.25} strokeLinejoin="round" />
      <path
        d="M6.75 12 9.5 14.75 15 9.25"
        stroke="var(--verified-300)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
