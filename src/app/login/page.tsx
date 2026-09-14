import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { routes } from "@/config/brand";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Log in",
  description: "Open your Build Room.",
};

export default function LoginPage() {
  return (
    <section className={styles.page} aria-labelledby="login-title">
      <Container>
        <div className={styles.card}>
          <Eyebrow>Log in</Eyebrow>
          <h1 id="login-title" className={styles.title}>
            Open your Build Room.
          </h1>
          {/* Wire to the product's authentication when the product shell is available. */}
          <form className={styles.form} method="post" action={routes.login}>
            <div className={styles.field}>
              <label htmlFor="login-email" className={styles.label}>
                Email
              </label>
              <input id="login-email" name="email" type="email" autoComplete="email" required className={styles.input} />
            </div>
            <div className={styles.field}>
              <label htmlFor="login-password" className={styles.label}>
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={styles.input}
              />
            </div>
            <Button type="submit" size="lg">
              Log in
            </Button>
          </form>
          <p className={styles.alt}>
            No build yet?{" "}
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
