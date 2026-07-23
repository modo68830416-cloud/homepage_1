import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "통계 — 관리자",
};

export default function AdminStatisticsPage() {
  return (
    <ComingSoon
      title="통계"
      description="방문자, 인기 지역·매물, 검색 키워드, 전환율 차트를 준비하고 있습니다."
      backHref="/admin"
      backLabel="대시보드로 돌아가기"
    />
  );
}
