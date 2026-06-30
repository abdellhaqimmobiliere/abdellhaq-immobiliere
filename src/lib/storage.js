import { getSupabaseAdmin } from "@/lib/supabase";

const BUCKET = "property-images";
const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp", "avif"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function uploadPropertyImageBuffer(buffer, filename, contentType) {
  const admin = getSupabaseAdmin();
  if (!admin) throw new Error("Storage non configuré");

  const { error } = await admin.storage.from(BUCKET).upload(filename, buffer, {
    contentType,
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = admin.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

export function validateImageFile(file) {
  if (!ALLOWED_EXT.includes(file.name.split(".").pop()?.toLowerCase() || "")) {
    throw new Error("Format non supporté. Utilisez JPG, PNG ou WebP.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Image trop lourde (max 5 MB).");
  }
}

export function buildStorageFilename(propertyId, originalName) {
  const ext = originalName.split(".").pop()?.toLowerCase() || "jpg";
  return `${propertyId || "new"}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
}

export async function deletePropertyImage(publicUrl) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
  const admin = getSupabaseAdmin();
  if (!base || !admin || !publicUrl.startsWith(base)) return;

  const path = publicUrl.replace(`${base}/`, "");
  await admin.storage.from(BUCKET).remove([path]);
}
