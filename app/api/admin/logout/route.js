import { NextResponse } from "next/server";
import { logAudit, getClientIp } from "@/lib/audit";

const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export async function POST(req) {
  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") || "unknown";
  await logAudit("logout", ip, ua, {});

  const res = NextResponse.json({ ok: true });

  for (const path of ["/", "/admin"]) {
    res.cookies.set("admin_token", "", {
      ...cookieBase,
      maxAge: 0,
      path,
    });
  }

  return res;
}
