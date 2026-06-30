import { adminLoginUrl } from "@/lib/adminConfig";

export async function adminFetch(input, init = {}) {
  const headers = { ...init.headers };
  if (
    init.body &&
    !(init.body instanceof FormData) &&
    !headers["Content-Type"]
  ) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(input, {
    ...init,
    credentials: "include",
    headers,
  });

  if (res.status === 401 && typeof window !== "undefined") {
    window.location.href = `${adminLoginUrl()}?reason=session`;
  }

  return res;
}
