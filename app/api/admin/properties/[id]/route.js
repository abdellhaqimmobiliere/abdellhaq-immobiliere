import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { getSupabaseAdmin } from "@/lib/supabase";
import { mapPropertyFromDb, mapPropertyToDb } from "@/lib/siteData";

export async function PATCH(req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const body = await req.json();
  const id = Number(params.id);

  const { data, error: dbError } = await admin
    .from("properties")
    .update({
      ...mapPropertyToDb(body),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ property: mapPropertyFromDb(data) });
}

export async function DELETE(req, { params }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const id = Number(params.id);
  const { error: dbError } = await admin.from("properties").delete().eq("id", id);

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
