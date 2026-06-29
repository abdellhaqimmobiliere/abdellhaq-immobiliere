import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { getSupabaseAdmin } from "@/lib/supabase";
import { mapPropertyFromDb, mapPropertyToDb } from "@/lib/siteData";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const { data, error: dbError } = await admin
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ properties: data.map(mapPropertyFromDb) });
}

export async function POST(req) {
  const { error } = await requireAdmin();
  if (error) return error;

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { data, error: dbError } = await admin
    .from("properties")
    .insert([mapPropertyToDb(body)])
    .select("*")
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ property: mapPropertyFromDb(data) });
}
