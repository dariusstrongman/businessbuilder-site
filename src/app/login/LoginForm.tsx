"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/Button";
import { ProductApiError, productRequest } from "@/lib/businessBuilder/client";
import styles from "./page.module.css";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [proof, setProof] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
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

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.field}>
        <label htmlFor="login-email" className={styles.label}>Email</label>
        <input id="login-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required className={styles.input} />
      </div>
      <div className={styles.field}>
        <label htmlFor="login-proof" className={styles.label}>Session proof</label>
        <input id="login-proof" value={proof} onChange={(event) => setProof(event.target.value)} type="password" autoComplete="current-password" required className={styles.input} />
      </div>
      {message ? <p className={styles.error} role="alert">{message}</p> : null}
      <Button type="submit" size="lg" disabled={pending}>{pending ? "Checking session…" : "Log in"}</Button>
      <p className={styles.note}>This pilot uses the configured test/session adapter. No tenant, company, or role is accepted from this form.</p>
    </form>
  );
}
