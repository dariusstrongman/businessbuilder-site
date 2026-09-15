import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { routes } from "@/config/brand";
import { LoginForm } from "./LoginForm";
import { authConfigured } from "@/lib/businessBuilder/auth";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Log in",
  description: "Open your Build Room.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; auth_error?: string; logged_out?: string }> }) {
  const params = await searchParams;
  const requested = params.next ?? "/build-room";
  const nextPath = requested.startsWith("/") && !requested.startsWith("//") ? requested : "/build-room";
  const configured = authConfigured();
  const testMode = process.env.NODE_ENV !== "production" && process.env.BUSINESS_BUILDER_TEST_AUTH_MODE === "enabled";
  return (
    <section className={styles.page} aria-labelledby="login-title">
      <Container>
        <div className={styles.card}>
          <Eyebrow>Log in</Eyebrow>
          <h1 id="login-title" className={styles.title}>Open your Build Room.</h1>
          {params.logged_out === "1" ? <p className={styles.success} role="status">You have been logged out and the local session was cleared.</p> : null}
          {params.auth_error ? <p className={styles.error} role="alert">Authentication was not completed. Start again; no company access was granted.</p> : null}
          <LoginForm nextPath={nextPath} configured={configured} testMode={testMode} />
          <p className={styles.alt}>
            No build yet? <Link href={routes.start} className={styles.altLink}>Describe the company you want</Link>.
          </p>
        </div>
      </Container>
    </section>
  );
}
