import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // 1. ADMIN PROTECTION
  // Only allows users with 'admin_session' cookie
  if (pathname.startsWith("/admin")) {
    const adminSession = req.cookies.get("admin_session");
    if (!adminSession) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // 2. STUDENT DASHBOARD PROTECTION
  // Only allows users with valid 'session_token' JWT
  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("session_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Verify the signature
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch (error) {
      // Token invalid or expired
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};