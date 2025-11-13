import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the real login route
  if (pathname.startsWith("/admin/(auth)/login")) {
    return NextResponse.next();
  }

  // Protect all admin pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("sb-access-token")?.value;

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/(auth)/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
