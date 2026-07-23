import type { Metadata } from "next";
import { MemberManager } from "@/components/admin/MemberManager";

export const metadata: Metadata = {
  title: "회원관리 — 관리자",
};

export default function AdminMembersPage() {
  return <MemberManager />;
}
