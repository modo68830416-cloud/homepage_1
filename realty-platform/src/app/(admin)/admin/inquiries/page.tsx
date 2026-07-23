import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "문의관리 — 관리자",
};

export default function AdminInquiriesPage() {
  return (
    <ComingSoon
      title="문의관리"
      description="상담 문의 목록, 처리 상태, 담당자 배정 기능을 준비하고 있습니다."
      backHref="/admin"
      backLabel="대시보드로 돌아가기"
    />
  );
}
