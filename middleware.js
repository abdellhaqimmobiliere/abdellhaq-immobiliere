import { NextResponse } from "next/server";
import { getAdminPath } from "@/lib/adminConfig";
import { verifyAdminToken } from "@/lib/jwtEdge";
function getSecret() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return null;
  return new TextEncoder().encode(jwtSecret);
}

function adminHeaders(res) {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return res;
}

function loginRedirect(request, adminPath) {
  return NextResponse.redirect(new URL(`/${adminPath}/login`, request.url));
}

async function protectAdminRoute(request, pathname, adminPath) {
  const isLogin = pathname === `/${adminPath}/login` || pathname === "/admin/login";

  if (isLogin) {
    if (adminPath !== "admin" && pathname.startsWith(`/${adminPath}`)) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  const secret = getSecret();
  if (!secret) return loginRedirect(request, adminPath);

  const token = request.cookies.get("admin_token")?.value;
  if (!token) return loginRedirect(request, adminPath);

  try {
    await verifyAdminToken(token, secret);
    if (adminPath !== "admin" && pathname.startsWith(`/${adminPath}`)) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(`/${adminPath}`, "/admin");
      return adminHeaders(NextResponse.rewrite(url));
    }

    return adminHeaders(NextResponse.next());
  } catch {
    const res = loginRedirect(request, adminPath);
    res.cookies.delete("admin_token");
    return res;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const adminPath = getAdminPath();

  if (pathname.startsWith("/admin") && adminPath !== "admin") {
    return new NextResponse(null, { status: 404 });
  }

  if (pathname.startsWith(`/${adminPath}`)) {
    return protectAdminRoute(request, pathname, adminPath);
  }

  if (adminPath === "admin" && pathname.startsWith("/admin")) {
    return protectAdminRoute(request, pathname, adminPath);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/mouad-gestion-2025/:path*"],
};
