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

    if (!token) {
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
