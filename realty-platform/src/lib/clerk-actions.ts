"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import type { MemberRole } from "@/types/property";

export async function updateMemberRole(userId: string, role: MemberRole) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, { publicMetadata: { role } });
  revalidatePath("/admin/members");
}

export async function setMemberBanned(userId: string, banned: boolean) {
  const client = await clerkClient();
  if (banned) {
    await client.users.banUser(userId);
  } else {
    await client.users.unbanUser(userId);
  }
  revalidatePath("/admin/members");
}
