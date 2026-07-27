import type { CreatorTier } from "@/types/creator-business";

export const TIER_LABEL: Record<CreatorTier, string> = {
  new: "New Creator",
  rising: "Rising Creator",
  pro: "Pro Creator",
  top: "Top Creator",
  verified: "Verified Creator",
};

export const TIER_ORDER: CreatorTier[] = ["new", "rising", "pro", "top", "verified"];

// DEMO tier rule — kept separate from the UI so a real scoring service can
// replace this later without touching components.
export function describeTierCriteria(tier: CreatorTier): string {
  switch (tier) {
    case "new":
      return "콘텐츠 완료 수 기준 진입 등급";
    case "rising":
      return "인정 매출과 전환율이 상승 중";
    case "pro":
      return "안정적인 인정 매출과 납기 준수율";
    case "top":
      return "상위 매출과 브랜드 평가 기준 충족";
    case "verified":
      return "신고·분쟁 없음 + 플랫폼 심사 완료";
  }
}
