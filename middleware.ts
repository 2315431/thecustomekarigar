import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // allow login page
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // protect admin pages
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("sb-access-token")?.value;

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
