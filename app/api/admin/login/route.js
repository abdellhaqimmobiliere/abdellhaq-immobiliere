import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecret } from "@/lib/requireAdmin";

export async function POST(req) {
  const secret = getJwtSecret();
  if (!secret) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    await new Promise((r) => setTimeout(r, 1000));
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8,
    path: "/admin",
  });
  return res;
}
