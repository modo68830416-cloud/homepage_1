export type CreatorTier = "new" | "rising" | "pro" | "top" | "verified";

export type CreatorProfile = {
  id: string;
  displayName: string;
  handle: string;
  avatar: string;
  tier: CreatorTier;
  subscriptionPlan: string;
  creditsRemaining: number;
  joinedAt: string;
  isDemo: boolean;
};

export type DashboardPeriod = "today" | "week" | "month";

export type CreatorDashboardMetrics = {
  views: number;
  linkClicks: number;
  addToCarts: number;
  attributedOrders: number;
  attributedRevenue: number;
  estimatedEarnings: number;
  conversionRate: number;
  period: DashboardPeriod;
  isDemo: boolean;
};

export type SettlementStatus =
  | "estimated"
  | "pending"
  | "confirmed"
  | "scheduled"
  | "paid"
  | "held"
  | "cancelled";

export const SETTLEMENT_STATUS_LABEL: Record<SettlementStatus, string> = {
  estimated: "예상",
  pending: "확인 중",
  confirmed: "확정",
  scheduled: "지급 예정",
  paid: "지급 완료",
  held: "보류",
  cancelled: "취소",
};

export type RevenueTransactionType = "affiliate" | "content-sale" | "campaign" | "bonus" | "adjustment";

export const REVENUE_TYPE_LABEL: Record<RevenueTransactionType, string> = {
  affiliate: "상품 판매 추천",
  "content-sale": "콘텐츠 판매",
  campaign: "브랜드 캠페인",
  bonus: "성과 보너스",
  adjustment: "기타 조정",
};

export type RevenueTransaction = {
  id: string;
  occurredAt: string;
  type: RevenueTransactionType;
  referenceTitle: string;
  channel: string;
  grossAmount: number;
  refundAmount: number;
  feeAmount: number;
  recognizedAmount: number;
  creatorEarning: number;
  status: SettlementStatus;
  isDemo: boolean;
};

export type SettlementStatement = {
  id: string;
  periodStart: string;
  periodEnd: string;
  grossRevenue: number;
  refunds: number;
  fees: number;
  adjustments: number;
  settlementAmount: number;
  status: SettlementStatus;
  scheduledAt?: string;
  paidAt?: string;
  isDemo: boolean;
};

export type CreatorAnalyticsPoint = {
  date: string;
  views: number;
  clicks: number;
  addToCarts: number;
  orders: number;
  revenue: number;
  earnings: number;
};

export type InsightType = "growth" | "warning" | "opportunity" | "recommendation";

export type CreatorInsight = {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  confidence: "low" | "medium" | "high";
  isDemo: boolean;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  monthlyPrice?: number;
  credits: number;
  features: string[];
  isRecommended?: boolean;
  isDemo: boolean;
};

export type CreditOperation = "image" | "video" | "copy" | "thumbnail";

export type CreditUsage = {
  id: string;
  usedAt: string;
  contentTitle: string;
  operation: CreditOperation;
  creditsUsed: number;
  balanceAfter: number;
  isDemo: boolean;
};

export type TeamRole = "owner" | "admin" | "editor" | "viewer";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  isDemo: boolean;
};
