import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "최근본매물",
  description: "최근본매물 페이지는 준비 중입니다.",
};

export default function HistoryPage() {
  return (
    <ComingSoon
      title="최근본매물"
      description="최근에 확인한 매물을 모아볼 수 있는 페이지를 준비하고 있습니다."
    />
  );
}
