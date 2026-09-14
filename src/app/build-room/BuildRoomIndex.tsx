"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Eyebrow } from "@/components/primitives/Layout";
import { ProductApiError, productRequest } from "@/lib/businessBuilder/client";
import styles from "./journey.module.css";

type Company = { company_id: string; display_name: string; archetype: string; lifecycle: string };

export function BuildRoomIndex() {
  const [state, setState] = useState<"loading" | "ready" | "unauthenticated" | "error">("loading");
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    productRequest<{ companies: Company[] }>("companies")
      .then((result) => {
        setCompanies(result.companies.filter((item) => item.archetype === "residential_cleaning"));
        setState("ready");
      })
      .catch((error) => setState(error instanceof ProductApiError && error.status === 401 ? "unauthenticated" : "error"));
  }, []);

  return (
    <div className={styles.shell}>
      <Container>
        <Eyebrow>Build Room</Eyebrow>
        <h1 className={styles.pageTitle}>Your companies.</h1>
        {state === "loading" ? <p role="status" className={styles.notice}>Loading persisted company state…</p> : null}
        {state === "unauthenticated" ? <p className={styles.notice}>Your session is required. <Link href="/login?next=/build-room" className={styles.textLink}>Log in</Link>.</p> : null}
        {state === "error" ? <p role="alert" className={styles.notice}>The Build Room could not be loaded. Retrying is safe.</p> : null}
        {state === "ready" && !companies.length ? <p className={styles.notice}>No residential-cleaning build exists yet. <Link href="/start" className={styles.textLink}>Start the pilot</Link>.</p> : null}
        <ul className={styles.companyList}>
          {companies.map((company) => (
            <li key={company.company_id}>
              <Link href={`/build-room/${company.company_id}`} className={styles.companyCard}>
                <span>{company.display_name}</span>
                <small>{company.lifecycle} · Open Build Room</small>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
