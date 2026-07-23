import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "관심매물",
  description: "관심매물 페이지는 준비 중입니다.",
};

export default function FavoritesPage() {
  return (
    <ComingSoon
      title="관심매물"
      description="로그인 후 관심 매물을 모아볼 수 있는 페이지를 준비하고 있습니다."
    />
  );
}
