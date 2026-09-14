"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fire once and stay true (default). Set false to track continuously. */
  once?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
};

/**
 * Reports whether an element has entered the viewport.
 * Used to start diagram sequences and to pause loops when off-screen.
 */
export function useInView<T extends HTMLElement>({
  once = true,
  rootMargin = "0px 0px -15% 0px",
  threshold = 0.2,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView } as const;
}
