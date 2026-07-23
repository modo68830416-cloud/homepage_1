import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "지도검색",
  description: "지도 기반 매물 검색 페이지는 준비 중입니다.",
};

export default function MapPage() {
  return (
    <ComingSoon
      title="지도검색"
      description="지도에서 원하는 지역과 반경으로 매물을 찾는 기능을 준비하고 있습니다."
    />
  );
}
