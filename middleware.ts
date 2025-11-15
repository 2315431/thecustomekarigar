import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow REAL login route
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect ALL admin pages
  if (pathname.startsWith("/admin")) {
    // Check for Supabase auth cookie (Supabase SSR uses sb-<project-id>-auth-token)
    // Also check for our custom sb-access-token for backward compatibility
    const authToken = request.cookies.get("sb-access-token") || 
                      Array.from(request.cookies.getAll())
                        .find(c => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));

    // Debug log in development

    if (!authToken) {
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
