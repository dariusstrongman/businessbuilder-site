"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { archetypes } from "@/content/archetypes";
import { SiteFrame } from "@/components/product/SiteFrame";
import { ArrowIcon } from "@/components/primitives/Icons";
import { routes } from "@/config/brand";
import { cn } from "@/lib/cn";
import styles from "./ArchetypeExplorer.module.css";

/**
 * Ten business types as a single explorable panel: pick a type, see what changes in the build.
 * Roving-tabindex tablist, arrow-key navigable, one panel rendered at a time.
 */
export function ArchetypeExplorer() {
  const id = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const a = archetypes[active];

  const move = (delta: number) => {
    const next = (active + delta + archetypes.length) % archetypes.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className={styles.explorer}>
      <div className={styles.tabs} role="tablist" aria-label="Business types" aria-orientation="vertical">
        {archetypes.map((item, i) => (
          <button
            key={item.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${item.slug}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={cn(styles.tab, i === active && styles.tabActive)}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                move(1);
              } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                move(-1);
              } else if (e.key === "Home") {
                e.preventDefault();
                setActive(0);
                tabs.current[0]?.focus();
              } else if (e.key === "End") {
                e.preventDefault();
                setActive(archetypes.length - 1);
                tabs.current[archetypes.length - 1]?.focus();
              }
            }}
          >
            <span className={styles.tabIndex}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.tabName}>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Keyed so switching type replays the entrance; focus stays on the tab, never inside. */}
      <div
        key={a.slug}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${a.slug}`}
        className={styles.panel}
        tabIndex={0}
      >
        <header className={styles.head}>
          <div className={styles.headText}>
            <h3 className={styles.title}>{a.name}</h3>
            <p className={styles.ops}>{a.operations}</p>
            {a.variants ? (
              <p className={styles.variants}>
                {a.variants.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </p>
            ) : null}
          </div>
          <Link href={`${routes.businesses}/${a.slug}`} className={styles.deep}>
            What we build
            <ArrowIcon />
          </Link>
        </header>

        <div className={styles.site}>
          <SiteFrame archetype={a.name} headline={a.siteHeadline} services={a.siteServices} />
        </div>

        <div className={styles.cols}>
          <section className={styles.col} aria-label={`What we configure for ${a.name}`}>
            <h4 className={styles.colTitle}>What we configure</h4>
            <ul className={styles.list}>
              {a.specifics.map((s, i) => (
                <li key={s}>
                  <span className={styles.itemText}>{s}</span>
                  {a.specificsWhy?.[i] ? <span className={styles.itemWhy}>{a.specificsWhy[i]}</span> : null}
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.col} aria-label={`Founder Actions for ${a.name}`}>
            <h4 className={cn(styles.colTitle, styles.colFounder)}>Your Founder Actions</h4>
            <ul className={cn(styles.list, styles.listFounder)}>
              {a.founderActions.map((s) => (
                <li key={s}>
                  <span className={styles.itemText}>{s}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.col} aria-label={`What we verify for ${a.name}`}>
            <h4 className={cn(styles.colTitle, styles.colVerify)}>What we verify</h4>
            <ul className={cn(styles.list, styles.listVerify)}>
              {a.verifications.map((s) => (
                <li key={s}>
                  <span className={styles.itemText}>{s}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
