import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logAudit, getClientIp } from "@/lib/audit";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const { data, error: dbError } = await admin.from("settings").select("*");

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  const map = {};
  data?.forEach((s) => {
    map[s.key] = s.value;
  });

  return NextResponse.json({ settings: data, map });
}

export async function PATCH(req) {
  const { error } = await requireAdmin();
  if (error) return error;

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const { updates } = await req.json();

  for (const { key, value } of updates) {
    const { error: dbError } = await admin
      .from("settings")
      .update({ value, updated_at: new Date().toISOString() })
      .eq("key", key);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }
  }

  await logAudit("settings_changed", getClientIp(req), req.headers.get("user-agent") || "unknown", {
    keys: updates.map((u) => u.key),
  });

  return NextResponse.json({ ok: true });
}
