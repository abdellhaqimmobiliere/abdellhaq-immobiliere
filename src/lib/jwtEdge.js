/**
 * Edge-safe HS256 JWT verification for middleware (no jose / Node APIs).
 */

function base64UrlToBytes(input) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function bytesToBase64Url(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function verifyAdminToken(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token");

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const signature = base64UrlToBytes(encodedSignature);
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    new TextEncoder().encode(signingInput)
  );

  if (!valid) throw new Error("Invalid signature");

  const payloadJson = new TextDecoder().decode(
    base64UrlToBytes(encodedPayload)
  );
  const payload = JSON.parse(payloadJson);

  if (payload.exp && payload.exp * 1000 < Date.now()) {
    throw new Error("Token expired");
  }

  return payload;
}

/** Used by login route if we ever need edge-compatible signing */
export async function signAdminToken(payload, secret, expiresInSec = 60 * 60 * 8) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSec };

  const encodedHeader = bytesToBase64Url(
    new TextEncoder().encode(JSON.stringify(header))
  );
  const encodedPayload = bytesToBase64Url(
    new TextEncoder().encode(JSON.stringify(body))
  );
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signingInput)
  );

  const encodedSignature = bytesToBase64Url(new Uint8Array(signature));
  return `${signingInput}.${encodedSignature}`;
}
