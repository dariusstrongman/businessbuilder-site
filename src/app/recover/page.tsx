import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { authConfigured } from "@/lib/businessBuilder/auth";
import styles from "../login/page.module.css";

export const metadata: Metadata = { title: "Account recovery", description: "Recover access to your Business Builder account." };
export default async function RecoveryPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const requested = (await searchParams).next ?? "/build-room";
  const nextPath = requested.startsWith("/") && !requested.startsWith("//") ? requested : "/build-room";
  return <section className={styles.page} aria-labelledby="recovery-title"><Container><div className={styles.card}>
    <Eyebrow>Account recovery</Eyebrow><h1 id="recovery-title" className={styles.title}>Recover access securely.</h1>
    <p className={styles.note}>The identity provider handles recovery without Business Builder disclosing whether an arbitrary address has an account.</p>
    {authConfigured() ? <Button href={`/api/auth/start?intent=recovery&next=${encodeURIComponent(nextPath)}`} size="lg">Continue to secure recovery</Button> : <p className={styles.error} role="alert">Account recovery is unavailable until production authentication is configured.</p>}
    <p className={styles.alt}><Link href={`/login?next=${encodeURIComponent(nextPath)}`} className={styles.altLink}>Return to login</Link></p>
  </div></Container></section>;
}
