"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/Button";
import { ProductApiError, productRequest } from "@/lib/businessBuilder/client";
import styles from "./page.module.css";

type Props = { nextPath: string; configured: boolean; testMode: boolean };

export function LoginForm({ nextPath, configured, testMode }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [proof, setProof] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const begin = (intent: "login" | "signup") => router.push(`/api/auth/start?intent=${intent}&next=${encodeURIComponent(nextPath)}`);

  const testLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setMessage(null);
    try {
      await productRequest("session", { method: "POST", body: JSON.stringify({ email, proof }) });
      router.replace(nextPath);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof ProductApiError ? error.message : "Authentication could not be completed.");
    } finally {
      setPending(false);
    }
  };

  if (configured) return <div className={styles.form} aria-label="Account access">
    <p className={styles.note}>Email verification and recovery are handled by the configured identity provider. Business Builder derives organization, company, and role after authentication.</p>
    {message ? <p className={styles.error} role="alert">{message}</p> : null}
    <Button size="lg" onClick={() => begin("login")}>Log in securely</Button>
    <Button size="lg" variant="secondary" onClick={() => begin("signup")}>Create founder account</Button>
    <a className={styles.recovery} href={`/recover?next=${encodeURIComponent(nextPath)}`}>Forgot your password or need account recovery?</a>
  </div>;

  if (!testMode) return <p className={styles.error} role="alert">Founder authentication is not configured. Access is closed until an approved production identity provider is configured.</p>;

  return <form className={styles.form} onSubmit={testLogin} noValidate>
    <p className={styles.testBadge}>Non-production test adapter</p>
    <div className={styles.field}><label htmlFor="login-email" className={styles.label}>Email</label><input id="login-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required className={styles.input} /></div>
    <div className={styles.field}><label htmlFor="login-proof" className={styles.label}>Test session proof</label><input id="login-proof" value={proof} onChange={(event) => setProof(event.target.value)} type="password" autoComplete="current-password" required className={styles.input} /></div>
    {message ? <p className={styles.error} role="alert">{message}</p> : null}
    <Button type="submit" size="lg" disabled={pending}>{pending ? "Checking session…" : "Open test session"}</Button>
    <p className={styles.note}>This adapter cannot run when NODE_ENV is production. No tenant, company, or role is accepted from this form.</p>
  </form>;
}
