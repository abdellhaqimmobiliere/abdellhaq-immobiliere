import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  buildStorageFilename,
  uploadPropertyImageBuffer,
} from "@/lib/storage";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(req) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  try {
    const form = await req.formData();
    const file = form.get("file");
    const propertyId = form.get("propertyId") || "new";

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: "Format non supporté (JPG, PNG, WebP)" },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Fichier trop lourd (max 5 MB)" },
        { status: 400 }
      );
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Storage non configuré" }, { status: 500 });
    }

    const filename = buildStorageFilename(propertyId, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadPropertyImageBuffer(buffer, filename, file.type);

    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json(
      { error: e.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
