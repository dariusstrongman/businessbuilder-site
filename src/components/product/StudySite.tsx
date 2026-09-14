import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowIcon } from "@/components/primitives/Icons";
import type { Study } from "@/content/studies";
import { cn } from "@/lib/cn";
import styles from "./StudySite.module.css";

type Props = {
  study: Study;
  /** Load eagerly when the study is the first thing on the page. */
  priority?: boolean;
  className?: string;
};

/**
 * A study rendered as a website rather than shown as a picture.
 *
 * Everything here is real markup: navigation, a headline split between the sans
 * and the serif italic, supporting lines, a call to action, small print, and a
 * band beneath the hero. The photograph is the image inside the design, not the
 * design itself.
 *
 * The whole mock is exposed as a single image to assistive technology. Its text
 * is illustrative, and letting a screen reader walk through a fake site's
 * navigation inside a real page would be worse than describing it once.
 */
export function StudySite({ study, priority = false, className }: Props) {
  const { site, palette, layout } = study;
  const paletteVars = {
    "--st-ink": palette.ink,
    "--st-paper": palette.paper,
    "--st-accent": palette.accent,
    "--st-band": palette.band,
    "--st-band-ink": palette.bandInk,
    "--st-band-accent": palette.bandAccent,
  } as CSSProperties;

  const label = `A design study for ${study.name}, a fictional ${study.discipline.toLowerCase()} brand. The page reads: ${site.eyebrow}. ${site.headPlain} ${site.headItalic} ${site.sub.join(" ")}`;

  return (
    <div
      className={cn(styles.site, styles[layout], className)}
      style={paletteVars}
      role="img"
      aria-label={label}
    >
      <div className={styles.hero}>
        <div className={styles.media}>
          <Image
            src={study.image}
            alt=""
            width={study.width}
            height={study.height}
            sizes="(min-width: 64rem) 48vw, 100vw"
            className={styles.photo}
            priority={priority}
            aria-hidden
          />
        </div>

        <div className={styles.chrome} aria-hidden>
          <div className={styles.bar}>
            <span className={styles.wordmark}>
              {site.wordmark}
              <span className={styles.tagline}>{site.tagline}</span>
            </span>
            <span className={styles.nav}>
              {site.nav.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </div>

          <div className={styles.copy}>
            <span className={styles.eyebrow}>{site.eyebrow}</span>
            <span className={styles.headline}>
              {site.headPlain} <em className={styles.italic}>{site.headItalic}</em>
            </span>
            <span className={styles.sub}>
              {site.sub.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </span>
            <span className={styles.cta}>
              {site.cta}
              <ArrowIcon className={styles.ctaArrow} />
            </span>
          </div>

          <div className={styles.smallprint}>
            <span>{site.footLeft}</span>
            <span>{site.footRight}</span>
          </div>
        </div>
      </div>

      <div className={styles.band} aria-hidden>
        <span className={styles.bandHead}>{site.bandHead}</span>
        <span className={styles.bandBody}>{site.bandBody}</span>
        <span className={styles.bandCta}>
          {site.bandCta}
          <ArrowIcon className={styles.ctaArrow} />
        </span>
      </div>
    </div>
  );
}
