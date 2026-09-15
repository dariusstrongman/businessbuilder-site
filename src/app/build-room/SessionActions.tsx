"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { useRouter } from "next/navigation";

export function SessionActions() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const logout = async () => {
    setPending(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin", cache: "no-store" });
      const result = await response.json() as { logout_url?: string };
      window.location.assign(result.logout_url || "/login?logged_out=1");
    } catch {
      router.replace("/login?logged_out=1");
    }
  };
  return <Button variant="secondary" onClick={() => void logout()} disabled={pending}>{pending ? "Ending session…" : "Log out"}</Button>;
}
