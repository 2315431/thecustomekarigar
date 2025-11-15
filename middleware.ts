import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow REAL login route
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect ALL admin pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("sb-access-token");

    // Debug log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Middleware] ${pathname}: token present = ${!!token}`);
    }

    if (!token) {
      console.log(`[Middleware] No auth token for ${pathname}, redirecting to login`);
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
