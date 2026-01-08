import { NextResponse } from "next/server";

export function middleware(request) {
  // Check if the request is for the admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip the login page itself
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for admin session cookie
    const adminSession = request.cookies.get("admin_session");

    if (!adminSession || adminSession.value !== "authenticated") {
      // Redirect to login page
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
