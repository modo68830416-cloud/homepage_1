import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_ROLE_COOKIE, type AdminRole } from "@/lib/admin/roles";

const VALID_ROLES: AdminRole[] = [
  "SUPER_ADMIN",
  "OPS_ADMIN",
  "CONTENT_WRITER",
  "CONTENT_REVIEWER",
  "PRODUCT_MANAGER",
  "ORDER_MANAGER",
  "SUPPORT",
  "SELLER",
  "ANALYST",
];

/**
 * Gates every /admin route behind a role cookie (TASK-008 §4 역할 기반 권한).
 * Per-section permission checks (which role may see which admin screen)
 * happen in each admin page/layout — proxy only establishes "is someone
 * logged in as an admin at all" per the Next.js Data Security guidance to
 * not rely on proxy alone for authorization.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const role = request.cookies.get(ADMIN_ROLE_COOKIE)?.value as AdminRole | undefined;
  if (!role || !VALID_ROLES.includes(role)) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
