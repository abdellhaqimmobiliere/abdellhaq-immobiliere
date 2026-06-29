import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getJwtSecret } from "@/lib/requireAdmin";

export async function GET() {
  const secret = getJwtSecret();
  if (!secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = cookies().get("admin_token")?.value;
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    await jwtVerify(token, secret);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
