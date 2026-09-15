import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Log in",
  description: "Accounts are not open yet.",
};

/**
 * Placeholder. The email and password form that used to sit here posted to a route
 * with no handler, so it could never authenticate anyone.
 *
 * DO NOT build placeholder authentication here. This page is replaced wholesale by
 * the Cognito auth integration.
 */
export default function LoginPage() {
  return (
    <section className={styles.page} aria-labelledby="login-title">
      <Container>
        <div className={styles.card}>
          <Eyebrow>Log in</Eyebrow>
          <h1 id="login-title" className={styles.title}>
            Accounts are not open yet.
          </h1>
          <p className={styles.alt}>
            Your Build Room opens when your build starts.{" "}
            <Link href={routes.start} className={styles.altLink}>
              Describe the company you want
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
