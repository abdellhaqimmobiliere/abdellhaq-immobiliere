import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getSecret() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return null;
  return new TextEncoder().encode(jwtSecret);
}

export async function requireAdmin() {
  const secret = getSecret();
  if (!secret) {
    return {
      error: NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      ),
    };
  }

  const token = cookies().get("admin_token")?.value;
  if (!token) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  try {
    await jwtVerify(token, secret);
    return { error: null };
  } catch {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
}

export function getJwtSecret() {
  return getSecret();
}
