import type {
  CreatorAnalyticsPoint,
  CreatorInsight,
  CreatorProfile,
  CreditUsage,
  RevenueTransaction,
  SettlementStatement,
  SubscriptionPlan,
  TeamMember,
} from "@/types/creator-business";

export const creatorProfile: CreatorProfile = {
  id: "creator-self",
  displayName: "Juno",
  handle: "@juno.styles",
  avatar: "creator-juno",
  tier: "pro",
  subscriptionPlan: "Creator Pro",
  creditsRemaining: 186,
  joinedAt: "2025-11-02T00:00:00.000Z",
  isDemo: true,
};

export const revenueTransactions: RevenueTransaction[] = [
  {
    id: "txn-01",
    occurredAt: "2026-07-24T10:20:00.000Z",
    type: "affiliate",
    referenceTitle: "Night Aurora Look",
    channel: "YouTube Shorts",
    grossAmount: 388000,
    refundAmount: 0,
    feeAmount: 38800,
    recognizedAmount: 349200,
    creatorEarning: 52380,
    status: "confirmed",
    isDemo: true,
  },
  {
    id: "txn-02",
    occurredAt: "2026-07-22T15:40:00.000Z",
    type: "affiliate",
    referenceTitle: "Office Minimal Fit",
    channel: "Instagram",
    grossAmount: 149000,
    refundAmount: 149000,
    feeAmount: 0,
    recognizedAmount: 0,
    creatorEarning: 0,
    status: "cancelled",
    isDemo: true,
  },
  {
    id: "txn-03",
    occurredAt: "2026-07-19T09:05:00.000Z",
    type: "campaign",
    referenceTitle: "NOIR STUDIO 2026 F/W 캠페인",
    channel: "Direct",
    grossAmount: 500000,
    refundAmount: 0,
    feeAmount: 0,
    recognizedAmount: 500000,
    creatorEarning: 500000,
    status: "scheduled",
    isDemo: true,
  },
  {
    id: "txn-04",
    occurredAt: "2026-07-15T18:12:00.000Z",
    type: "content-sale",
    referenceTitle: "Genderless Layering Reel 템플릿",
    channel: "Marketplace",
    grossAmount: 45000,
    refundAmount: 0,
    feeAmount: 9000,
    recognizedAmount: 36000,
    creatorEarning: 27000,
    status: "paid",
    isDemo: true,
  },
  {
    id: "txn-05",
    occurredAt: "2026-07-10T12:00:00.000Z",
    type: "bonus",
    referenceTitle: "7월 트래픽 성과 보너스",
    channel: "Platform",
    grossAmount: 80000,
    refundAmount: 0,
    feeAmount: 0,
    recognizedAmount: 80000,
    creatorEarning: 80000,
    status: "paid",
    isDemo: true,
  },
];

export const settlementStatements: SettlementStatement[] = [
  {
    id: "stmt-2026-06",
    periodStart: "2026-06-01T00:00:00.000Z",
    periodEnd: "2026-06-30T00:00:00.000Z",
    grossRevenue: 9800000,
    refunds: -620000,
    fees: -918000,
    adjustments: 0,
    settlementAmount: 826000,
    status: "paid",
    scheduledAt: "2026-07-15T00:00:00.000Z",
    paidAt: "2026-07-15T00:00:00.000Z",
    isDemo: true,
  },
  {
    id: "stmt-2026-07",
    periodStart: "2026-07-01T00:00:00.000Z",
    periodEnd: "2026-07-31T00:00:00.000Z",
    grossRevenue: 14200000,
    refunds: -1120000,
    fees: -1308000,
    adjustments: 80000,
    settlementAmount: 1308000,
    status: "scheduled",
    scheduledAt: "2026-08-15T00:00:00.000Z",
    isDemo: true,
  },
];

function buildAnalyticsSeries(days: number): CreatorAnalyticsPoint[] {
  return Array.from({ length: days }, (_, index) => {
    const wave = Math.sin(index / 2.4) * 0.28 + 1;
    const views = Math.round(3200 * wave + index * 42);
    const clicks = Math.round(views * 0.18);
    const addToCarts = Math.round(clicks * 0.34);
    const orders = Math.round(addToCarts * 0.28);
    const revenue = orders * 118000;
    return {
      date: new Date(Date.now() - (days - index) * 86400000).toISOString().slice(0, 10),
      views,
      clicks,
      addToCarts,
      orders,
      revenue,
      earnings: Math.round(revenue * 0.1),
    };
  });
}

export const creatorAnalyticsSeries: CreatorAnalyticsPoint[] = buildAnalyticsSeries(14);

export const creatorInsights: CreatorInsight[] = [
  {
    id: "insight-01",
    type: "growth",
    title: "9:16 쇼츠의 구매 전환율이 가장 높았습니다",
    description: "이번 주 콘텐츠 중 9:16 비율 쇼츠가 평균보다 전환율이 높게 나타났습니다.",
    confidence: "medium",
    isDemo: true,
  },
  {
    id: "insight-02",
    type: "opportunity",
    title: "가방이 포함된 Look의 클릭률이 24% 높습니다",
    description: "가방 아이템을 포함한 룩이 다른 룩보다 평균 클릭률이 높게 집계되었습니다.",
    actionLabel: "가방으로 Look 만들기",
    actionHref: "/studio",
    confidence: "medium",
    isDemo: true,
  },
  {
    id: "insight-03",
    type: "growth",
    title: "30대 출근룩 콘텐츠 판매 성과가 상승 중입니다",
    description: "최근 2주간 오피스룩 카테고리 콘텐츠의 인정 매출이 꾸준히 증가했습니다.",
    confidence: "low",
    isDemo: true,
  },
  {
    id: "insight-04",
    type: "warning",
    title: "조회수 대비 구매 전환이 낮은 콘텐츠가 있습니다",
    description: "조회수는 높지만 구매로 이어지지 않는 콘텐츠 3건을 다시 확인해보세요.",
    actionLabel: "내 콘텐츠 보기",
    actionHref: "/create",
    confidence: "high",
    isDemo: true,
  },
  {
    id: "insight-05",
    type: "recommendation",
    title: "다음 콘텐츠 추천: 여름 미니멀 출근룩 쇼츠",
    description: "최근 트렌드와 팔로워 관심사를 고려했을 때 다음 콘텐츠로 적합합니다.",
    actionLabel: "쇼츠 만들기",
    actionHref: "/create/new",
    confidence: "medium",
    isDemo: true,
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    credits: 20,
    features: ["기본 AI 모델", "제한된 Look 저장", "워터마크 포함", "월 소량 생성 크레딧", "구매 링크 체험"],
    isDemo: true,
  },
  {
    id: "creator",
    name: "Creator",
    monthlyPrice: 29000,
    credits: 150,
    features: ["고화질 이미지", "쇼츠·릴스 생성", "워터마크 제거", "구매 링크 발급", "성과 분석", "마켓플레이스 등록"],
    isDemo: true,
  },
  {
    id: "creator-pro",
    name: "Creator Pro",
    monthlyPrice: 79000,
    credits: 400,
    features: ["더 많은 생성 크레딧", "긴 영상 지원", "고급 템플릿", "AI Insight", "우선 처리 (DEMO)", "고급 분석"],
    isRecommended: true,
    isDemo: true,
  },
  {
    id: "business",
    name: "Business",
    credits: 1000,
    features: ["상품 대량 관리", "브랜드 캠페인", "팀 계정", "브랜드 전용 모델", "API 연동 준비", "고급 리포트"],
    isDemo: true,
  },
];

export const creditUsageHistory: CreditUsage[] = [
  { id: "credit-01", usedAt: "2026-07-24T09:00:00.000Z", contentTitle: "Night Aurora Look", operation: "video", creditsUsed: 12, balanceAfter: 186, isDemo: true },
  { id: "credit-02", usedAt: "2026-07-22T14:20:00.000Z", contentTitle: "Office Minimal Fit", operation: "image", creditsUsed: 1, balanceAfter: 198, isDemo: true },
  { id: "credit-03", usedAt: "2026-07-20T11:10:00.000Z", contentTitle: "Genderless Layering", operation: "copy", creditsUsed: 2, balanceAfter: 199, isDemo: true },
  { id: "credit-04", usedAt: "2026-07-18T16:45:00.000Z", contentTitle: "Summer Minimal Commute", operation: "thumbnail", creditsUsed: 1, balanceAfter: 201, isDemo: true },
];

export const teamMembers: TeamMember[] = [
  { id: "member-01", name: "Juno", email: "juno@fashioncreator.demo", role: "owner", isDemo: true },
  { id: "member-02", name: "Haeun", email: "haeun@fashioncreator.demo", role: "editor", isDemo: true },
];
