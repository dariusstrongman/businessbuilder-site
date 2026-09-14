import Link from "next/link";
import { brand, routes } from "@/config/brand";
import { BrandMark } from "@/components/primitives/Icons";
import styles from "./Footer.module.css";

const columns = [
  {
    title: "Product",
    links: [
      { href: routes.howItWorks, label: "How it works" },
      { href: routes.product, label: "The Build Room" },
      { href: routes.businesses, label: "Supported businesses" },
      { href: routes.pricing, label: "Pricing" },
    ],
  },
  {
    title: "What we build",
    links: [
      { href: routes.website, label: "Build my website" },
      { href: routes.buildMyBusiness, label: "Build my business" },
      { href: routes.buildAndRun, label: "Build & run my business" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: routes.about, label: "About" },
      { href: routes.trust, label: "Trust and verification" },
      { href: routes.login, label: "Log in" },
      { href: routes.start, label: "Start a build" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Link href={routes.home} className={styles.brand} aria-label={`${brand.name} home`}>
            <BrandMark className={styles.mark} />
            <span>{brand.name}</span>
          </Link>
          <p className={styles.tagline}>{brand.tagline}</p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} className={styles.col} aria-label={col.title}>
            <h2 className={styles.colTitle}>{col.title}</h2>
            <ul className={styles.list}>
              {col.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={styles.bottom}>
        <p>
          © {brand.foundedYear} {brand.name}. We prepare and guide legal and financial steps. We do not give legal or
          tax advice.
        </p>
        <p className={styles.meta}>Built for service businesses. Verified before handoff.</p>
      </div>
    </footer>
  );
}
