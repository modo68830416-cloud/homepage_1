import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "배너관리 — 관리자",
};

export default function AdminBannersPage() {
  return (
    <ComingSoon
      title="배너관리"
      description="메인 배너, 팝업, 공지사항 콘텐츠 관리 기능을 준비하고 있습니다."
      backHref="/admin"
      backLabel="대시보드로 돌아가기"
    />
  );
}
