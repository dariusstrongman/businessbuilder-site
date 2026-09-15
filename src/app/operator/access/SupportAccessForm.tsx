"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/Button";
import styles from "../../login/page.module.css";

export function SupportAccessForm() {
  const router = useRouter();
  const [grantId, setGrantId] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setPending(true); setMessage(null);
    try {
      const response = await fetch("/api/auth/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ grant_id: grantId, reason }), credentials: "same-origin" });
      const result = await response.json() as { company_id?: string; message?: string };
      if (!response.ok || !result.company_id) throw new Error(result.message || "An active, scoped support grant is required.");
      router.replace(`/operator/reviews/${encodeURIComponent(result.company_id)}`); router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Operator access was denied."); setPending(false); }
  };
  return <form className={styles.form} onSubmit={submit}>
    <div className={styles.field}><label className={styles.label} htmlFor="support-grant">Scoped support grant</label><input className={styles.input} id="support-grant" value={grantId} onChange={(event) => setGrantId(event.target.value)} required pattern="[A-Za-z0-9_-]{1,128}" autoComplete="off" /></div>
    <div className={styles.field}><label className={styles.label} htmlFor="support-reason">Review reason</label><input className={styles.input} id="support-reason" value={reason} onChange={(event) => setReason(event.target.value)} required maxLength={500} /></div>
    {message ? <p className={styles.error} role="alert">{message}</p> : null}
    <Button type="submit" disabled={pending}>{pending ? "Validating grant…" : "Start scoped review session"}</Button>
    <p className={styles.note}>Logging in does not grant SUPPORT authority. The backend revalidates operator membership, grant, company scope, and expiry.</p>
  </form>;
}
