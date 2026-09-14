import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { routes } from "@/config/brand";
import { LoginForm } from "./LoginForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Log in",
  description: "Open your Build Room.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const requested = (await searchParams).next ?? "/build-room";
  const nextPath = requested.startsWith("/") && !requested.startsWith("//") ? requested : "/build-room";
  return (
    <section className={styles.page} aria-labelledby="login-title">
      <Container>
        <div className={styles.card}>
          <Eyebrow>Log in</Eyebrow>
          <h1 id="login-title" className={styles.title}>Open your Build Room.</h1>
          <LoginForm nextPath={nextPath} />
          <p className={styles.alt}>
            No build yet? <Link href={routes.start} className={styles.altLink}>Describe the company you want</Link>.
          </p>
        </div>
      </Container>
    </section>
  );
}
