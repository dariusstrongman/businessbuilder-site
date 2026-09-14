"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { brand, cta, routes } from "@/config/brand";
import { Button } from "@/components/primitives/Button";
import { BrandMark, ChevronIcon, CloseIcon, MenuIcon } from "@/components/primitives/Icons";
import { cn } from "@/lib/cn";
import styles from "./Header.module.css";

const packageLinks = [
  { href: routes.website, label: "Build my website", note: "A premium site, verified live on your domain." },
  { href: routes.buildMyBusiness, label: "Build my business", note: "The whole company: research to handoff." },
  { href: routes.buildAndRun, label: "Build & run my business", note: "Plus AI workers operating inside your limits." },
];

const primaryLinks = [
  { href: routes.howItWorks, label: "How it works" },
  { href: routes.businesses, label: "Businesses" },
  { href: routes.pricing, label: "Pricing" },
  { href: routes.trust, label: "Trust" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const sheetId = useId();
  const menuRef = useRef<HTMLLIElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);

  // Close everything on navigation (derived-state pattern: no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSheetOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop dropdown: close on outside click and Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Mobile sheet: lock scroll, trap focus, Escape closes, return focus.
  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const sheet = sheetRef.current;
    const toggle = sheetButtonRef.current;
    const focusables = () =>
      Array.from(
        sheet?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      );
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheetOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [sheetOpen]);

  const openMenu = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMenuOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 120);
  }, []);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));
  const packagesActive = packageLinks.some((l) => isActive(l.href));

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <Link href={routes.home} className={styles.brand} aria-label={`${brand.name} home`}>
          <BrandMark className={styles.mark} />
          <span className={styles.brandName}>{brand.name}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            <li>
              <Link href={routes.howItWorks} className={cn(styles.navLink, isActive(routes.howItWorks) && styles.active)}>
                How it works
              </Link>
            </li>
            <li className={styles.menuItem} ref={menuRef} onPointerEnter={openMenu} onPointerLeave={scheduleClose}>
              <button
                type="button"
                className={cn(styles.navLink, styles.menuButton, (menuOpen || packagesActive) && styles.active)}
                aria-expanded={menuOpen}
                aria-controls={menuId}
                onClick={() => setMenuOpen((v) => !v)}
              >
                What we build
                <ChevronIcon className={styles.chevron} />
              </button>
              <div id={menuId} className={styles.menu} hidden={!menuOpen}>
                <ul className={styles.menuList}>
                  {packageLinks.map((link, i) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.menuLink}>
                        <span className={styles.menuIndex}>0{i + 1}</span>
                        <span>
                          <span className={styles.menuLabel}>{link.label}</span>
                          <span className={styles.menuNote}>{link.note}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={routes.pricing} className={styles.menuFooter}>
                  Compare packages
                </Link>
              </div>
            </li>
            {primaryLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={cn(styles.navLink, isActive(link.href) && styles.active)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href={routes.login} className={cn(styles.navLink, styles.login)}>
            Log in
          </Link>
          <Button href={routes.start} className={styles.cta}>
            {cta.primary}
          </Button>
          <button
            ref={sheetButtonRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={sheetOpen}
            aria-controls={sheetId}
            aria-label={sheetOpen ? "Close menu" : "Open menu"}
            onClick={() => setSheetOpen((v) => !v)}
          >
            {sheetOpen ? <CloseIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />}
          </button>
        </div>
      </div>

      <div
        id={sheetId}
        ref={sheetRef}
        className={styles.sheet}
        hidden={!sheetOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <nav aria-label="Mobile" className={styles.sheetNav}>
          <ul className={styles.sheetList}>
            <li>
              <Link href={routes.howItWorks} className={styles.sheetLink}>
                How it works
              </Link>
            </li>
            <li className={styles.sheetGroup}>
              <span className={styles.sheetGroupLabel}>What we build</span>
              <ul>
                {packageLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.sheetSubLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {primaryLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.sheetLink}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={routes.about} className={styles.sheetLink}>
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.sheetActions}>
          <Button href={routes.login} variant="secondary" size="lg">
            Log in
          </Button>
          <Button href={routes.start} size="lg">
            {cta.primary}
          </Button>
        </div>
      </div>
    </header>
  );
}
