import { clerkClient } from "@clerk/nextjs/server";
import type { MemberRole, MemberStatus } from "@/types/property";

export interface ClerkMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  joinedAt: string;
  lastLoginAt: string | null;
}

export async function getClerkMembers(): Promise<ClerkMember[]> {
  const client = await clerkClient();
  const { data } = await client.users.getUserList({ limit: 100, orderBy: "-created_at" });

  return data.map((user) => {
    const name =
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      user.username ||
      user.emailAddresses[0]?.emailAddress ||
      "이름 없음";

    return {
      id: user.id,
      name,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      role: (user.publicMetadata.role as MemberRole) ?? "USER",
      status: user.banned ? "비활성" : "활성",
      joinedAt: new Date(user.createdAt).toISOString().slice(0, 10),
      lastLoginAt: user.lastSignInAt ? new Date(user.lastSignInAt).toISOString() : null,
    };
  });
}
