import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecret } from "@/lib/requireAdmin";
import { getSupabaseAdmin } from "@/lib/supabase";
import { logAudit, getClientIp } from "@/lib/audit";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function POST(req) {
  const secret = getJwtSecret();
  if (!secret) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") || "unknown";
  const { password } = await req.json();
  const admin = getSupabaseAdmin();

  if (admin) {
    const { data: attempt } = await admin
      .from("login_attempts")
      .select("*")
      .eq("ip", ip)
      .maybeSingle();

    if (attempt?.locked_until && new Date(attempt.locked_until) > new Date()) {
      const minutesLeft = Math.ceil(
        (new Date(attempt.locked_until) - new Date()) / 60000
      );
      await logAudit("login_blocked", ip, ua, { reason: "rate_limited" });
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${minutesLeft} min.` },
        { status: 429 }
      );
    }

    const isValid = password === process.env.ADMIN_PASSWORD;

    if (!isValid) {
      const newCount = (attempt?.attempts || 0) + 1;
      const lockedUntil =
        newCount >= MAX_ATTEMPTS
          ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString()
          : null;

      await admin.from("login_attempts").upsert({
        ip,
        attempts: newCount,
        locked_until: lockedUntil,
        updated_at: new Date().toISOString(),
      });

      await logAudit("login_failed", ip, ua, { attempts: newCount });
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));

      const msg =
        newCount >= MAX_ATTEMPTS
          ? `Compte bloqué ${LOCKOUT_MINUTES} minutes pour sécurité.`
          : `Mot de passe incorrect. ${MAX_ATTEMPTS - newCount} tentative(s) restante(s).`;

      return NextResponse.json({ error: msg }, { status: 401 });
    }

    await admin.from("login_attempts").upsert({
      ip,
      attempts: 0,
      locked_until: null,
      updated_at: new Date().toISOString(),
    });

    await logAudit("login_success", ip, ua, {});
  } else if (password !== process.env.ADMIN_PASSWORD) {
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const token = await new SignJWT({ role: "admin", ip })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);

  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/admin",
  });

  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  return res;
}
