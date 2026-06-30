import { getSupabaseAdmin } from "@/lib/supabase";

export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function logAudit(event, ip, userAgent, details = {}) {
  const admin = getSupabaseAdmin();
  if (!admin) return;

  try {
    await admin.from("admin_audit_log").insert({
      event,
      ip,
      user_agent: userAgent,
      details,
    });
  } catch {
    // Audit failure must not block auth or CRUD
  }
}
