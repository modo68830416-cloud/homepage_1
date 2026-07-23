import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "회원관리 — 관리자",
};

export default function AdminMembersPage() {
  return (
    <ComingSoon
      title="회원관리"
      description="회원 검색, 권한 변경, 활동 이력 관리 기능을 준비하고 있습니다."
      backHref="/admin"
      backLabel="대시보드로 돌아가기"
    />
  );
}
