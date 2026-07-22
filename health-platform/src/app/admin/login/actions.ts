"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_ROLE_COOKIE, type AdminRole } from "@/lib/admin/roles";
import { logAuditEvent } from "@/lib/admin/audit";

const VALID_ROLES = new Set<AdminRole>([
  "SUPER_ADMIN",
  "OPS_ADMIN",
  "CONTENT_WRITER",
  "CONTENT_REVIEWER",
  "PRODUCT_MANAGER",
  "ORDER_MANAGER",
  "SUPPORT",
  "SELLER",
  "ANALYST",
]);

/**
 * Mock role-selection "login" — there is no real credential check here.
 * A production system replaces this with real auth (out of scope per
 * docs/strategy/scope-and-non-goals.md) while keeping the same cookie +
 * RBAC seam (src/lib/admin/roles.ts, src/proxy.ts).
 */
export async function loginAsRole(formData: FormData) {
  const role = formData.get("role");
  const next = formData.get("next");

  if (typeof role !== "string" || !VALID_ROLES.has(role as AdminRole)) {
    throw new Error("Invalid role");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_ROLE_COOKIE, role, { httpOnly: true, sameSite: "lax", path: "/" });
  logAuditEvent(role as AdminRole, "LOGIN", "admin_session");

  redirect(typeof next === "string" && next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_ROLE_COOKIE);
  redirect("/admin/login");
}
