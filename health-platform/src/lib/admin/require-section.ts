import "server-only";
import { cookies } from "next/headers";
import { ADMIN_ROLE_COOKIE, canAccessSection, type AdminRole, type AdminSection } from "./roles";

/** Per-page permission check — proxy.ts only verifies "logged in as some admin role" (TASK-008 §4). */
export async function requireSection(section: AdminSection): Promise<
  { allowed: true; role: AdminRole } | { allowed: false; role: AdminRole | null }
> {
  const cookieStore = await cookies();
  const role = cookieStore.get(ADMIN_ROLE_COOKIE)?.value as AdminRole | undefined;
  if (!role) return { allowed: false, role: null };
  return { allowed: canAccessSection(role, section), role };
}
