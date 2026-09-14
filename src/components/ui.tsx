import { Fragment, type ReactNode } from "react";
import { brand } from "@/lib/brand";

export function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label={`${brand.name} home`}>
      <Mark />
      <span>
        {brand.name.split(" ").map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {i > 0 && <br />}
            {word}
          </Fragment>
        ))}
      </span>
    </a>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m4.5 10 3.6 3.6 7.4-7.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="29"
      height="29"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3h10v10H3zM17 3h10v10H17zM3 17h10v10H3zM17 17h10v10H17z"
        fill="currentColor"
      />
      <path d="m20 22 2 2 4-5" stroke="var(--paper)" strokeWidth="1.6" />
    </svg>
  );
}
export function Eyebrow({
  children,
  number,
  light = false,
}: {
  children: ReactNode;
  number?: string;
  light?: boolean;
}) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      {number && <span className="section-number">{number}</span>}
      {children}
    </p>
  );
}
