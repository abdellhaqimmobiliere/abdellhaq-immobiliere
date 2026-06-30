"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/lib/adminFetch";

import { adminLoginUrl } from "@/lib/adminConfig";

export default function AdminSessionGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    adminFetch("/api/admin/verify")
      .then((res) => {
        if (!res.ok) router.replace(`${adminLoginUrl()}?reason=session`);
      })
      .catch(() => router.replace(`${adminLoginUrl()}?reason=session`));
  }, [router]);

  return children;
}
