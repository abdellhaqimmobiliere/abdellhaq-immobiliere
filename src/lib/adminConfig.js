/** Public admin URL segment (client + server). Set both env vars to the same value. */
export const ADMIN_PATH =
  process.env.NEXT_PUBLIC_ADMIN_PATH ||
  process.env.ADMIN_SECRET_PATH ||
  "mouad-gestion-2025";

export function getAdminPath() {
  return (
    process.env.ADMIN_SECRET_PATH ||
    process.env.NEXT_PUBLIC_ADMIN_PATH ||
    "mouad-gestion-2025"
  );
}

/** Build a public admin URL path, e.g. adminPath("dashboard") → "/mouad-gestion-2025/dashboard" */
export function adminPath(...segments) {
  const base = ADMIN_PATH.replace(/^\/|\/$/g, "");
  const rest = segments.filter(Boolean).join("/");
  return rest ? `/${base}/${rest}` : `/${base}`;
}

export function adminLoginUrl() {
  return adminPath("login");
}
