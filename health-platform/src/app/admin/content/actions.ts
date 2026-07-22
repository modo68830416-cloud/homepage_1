"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_ROLE_COOKIE, canAccessSection, type AdminRole } from "@/lib/admin/roles";
import { setStatusOverride } from "@/lib/admin/content-overrides";
import { logAuditEvent } from "@/lib/admin/audit";
import type { ContentStatus } from "@/lib/content/types";

/**
 * Changes a content item's effective status (TASK-008 §3 워크플로).
 * Approval gating means only PUBLISHED items are ever served by
 * src/lib/content/public.ts — see docs/admin/content-workflow.md.
 */
export async function updateContentStatus(formData: FormData) {
  const cookieStore = await cookies();
  const role = cookieStore.get(ADMIN_ROLE_COOKIE)?.value as AdminRole | undefined;
  if (!role || !canAccessSection(role, "content")) {
    throw new Error("Forbidden");
  }

  const slug = formData.get("slug");
  const status = formData.get("status");
  if (typeof slug !== "string" || typeof status !== "string") return;

  setStatusOverride(slug, status as ContentStatus);
  logAuditEvent(role, `CONTENT_STATUS_CHANGED:${status}`, slug);

  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
}
