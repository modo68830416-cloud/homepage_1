import type { Metadata } from "next";
import { getClerkMembers } from "@/lib/clerk-members";
import { MemberManager } from "@/components/admin/MemberManager";

export const metadata: Metadata = {
  title: "회원관리 — 관리자",
};

export default async function AdminMembersPage() {
  const initialRows = await getClerkMembers();
  return <MemberManager initialRows={initialRows} />;
}
