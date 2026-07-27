export type CreatorAvailability = "available" | "limited" | "unavailable";

export type MarketplaceCreator = {
  id: string;
  handle: string;
  displayName: string;
  avatar: string;
  bio: string;
  specialties: string[];
  contentFormats: string[];
  tier: string;
  rating: number;
  completedProjects: number;
  attributedRevenue: number;
  responseTimeLabel: string;
  availability: CreatorAvailability;
  isVerified: boolean;
  isDemo: boolean;
};

export type MarketplaceContent = {
  id: string;
  slug: string;
  creatorId: string;
  title: string;
  thumbnailSeed: string;
  type: string;
  licensePriceFrom: number;
  productIds: string[];
  views: number;
  attributedRevenue: number;
  tags: string[];
  isPhotoAvatar: boolean;
  commercialConsent: boolean;
  isDemo: boolean;
};

export type LicenseType = "personal" | "social-commercial" | "advertising" | "exclusive";

export const LICENSE_LABEL: Record<LicenseType, string> = {
  personal: "Personal",
  "social-commercial": "Social Commercial",
  advertising: "Advertising",
  exclusive: "Exclusive",
};

export const LICENSE_DESCRIPTION: Record<LicenseType, string[]> = {
  personal: ["개인 참고", "비상업적 사용", "재판매 불가"],
  "social-commercial": ["브랜드 SNS", "온라인 게시", "편집 제한", "기간 제한"],
  advertising: ["온라인 광고", "상품 상세 페이지", "캠페인 활용", "기간·채널 지정"],
  exclusive: ["특정 기간 독점", "사용 국가 지정", "사용 채널 지정", "경쟁 브랜드 제한 (DEMO)"],
};

export type ContentLicenseSelection = {
  licenseType: LicenseType;
  channels: string[];
  durationMonths: number;
  territories: string[];
  editable: boolean;
  exclusive: boolean;
  sourceFileIncluded: boolean;
};

export type CampaignCompensationType = "fixed" | "performance" | "hybrid";
export type CampaignStatus = "draft" | "open" | "reviewing" | "active" | "completed" | "cancelled";

export type MarketplaceCampaign = {
  id: string;
  slug: string;
  brandName: string;
  title: string;
  description: string;
  productIds: string[];
  contentFormats: string[];
  targetAudience: string;
  deliverables: string[];
  requiredCopy: string[];
  prohibitedCopy: string[];
  postChannels: string[];
  postDurationDays: number;
  license: LicenseType;
  dueAt: string;
  fixedFee?: number;
  performanceRate?: number;
  bonusMax?: number;
  compensationType: CampaignCompensationType;
  status: CampaignStatus;
  applicantCount: number;
  isDemo: boolean;
};

export type CampaignApplicationStatus =
  | "submitted"
  | "reviewing"
  | "shortlisted"
  | "selected"
  | "rejected"
  | "withdrawn";

export const APPLICATION_STATUS_LABEL: Record<CampaignApplicationStatus, string> = {
  submitted: "지원 완료",
  reviewing: "검토 중",
  shortlisted: "1차 통과",
  selected: "선정됨",
  rejected: "선정 안 됨",
  withdrawn: "지원 철회",
};

export type CampaignApplication = {
  id: string;
  campaignId: string;
  message: string;
  concept: string;
  estimatedDays: number;
  revisionsAgreed: boolean;
  licenseAgreed: boolean;
  status: CampaignApplicationStatus;
  submittedAt: string;
  isDemo: boolean;
};

export type CustomRequestCompensationType = CampaignCompensationType;

export type CustomProductionRequest = {
  id: string;
  title: string;
  targetCreatorHandle: string;
  productIds: string[];
  contentType: string;
  aspectRatio: string;
  duration: number | null;
  style: string;
  background: string;
  mustHave: string;
  mustAvoid: string;
  dueAt: string;
  revisionLimit: number;
  license: LicenseType;
  budget: number;
  submittedAt: string;
  isDemo: boolean;
};

export type MarketplaceOrderStatus =
  | "proposal"
  | "awaiting-payment"
  | "funded"
  | "in-progress"
  | "submitted"
  | "revision-requested"
  | "approved"
  | "completed"
  | "disputed"
  | "cancelled"
  | "refunded";

export const ORDER_STATUS_LABEL: Record<MarketplaceOrderStatus, string> = {
  proposal: "제안",
  "awaiting-payment": "결제 대기",
  funded: "에스크로 보관 (DEMO)",
  "in-progress": "제작 중",
  submitted: "제출됨",
  "revision-requested": "수정 요청",
  approved: "승인됨",
  completed: "거래 완료",
  disputed: "분쟁 중",
  cancelled: "취소됨",
  refunded: "환불됨",
};

export type OrderAuditEvent = {
  id: string;
  type: string;
  message: string;
  occurredAt: string;
};

export type OrderReview = {
  quality: number;
  communication: number;
  delivery: number;
  compliance: number;
  overall: number;
  comment: string;
};

export type DisputeReason =
  | "missed-deadline"
  | "requirement-mismatch"
  | "file-issue"
  | "license-dispute"
  | "unauthorized-use"
  | "cancellation"
  | "inappropriate-content";

export const DISPUTE_REASON_LABEL: Record<DisputeReason, string> = {
  "missed-deadline": "납기 미준수",
  "requirement-mismatch": "요청 조건 불일치",
  "file-issue": "파일 문제",
  "license-dispute": "사용권 분쟁",
  "unauthorized-use": "무단 사용",
  cancellation: "취소·환불",
  "inappropriate-content": "부적절한 콘텐츠",
};

export type DisputeStage = "filed" | "evidence-review" | "platform-review" | "resolution" | "closed";

export type MarketplaceOrder = {
  id: string;
  campaignId?: string;
  requestId?: string;
  creatorHandle: string;
  brandName: string;
  title: string;
  status: MarketplaceOrderStatus;
  baseFee: number;
  optionFee: number;
  platformFeeRate: number;
  bonusMax: number;
  revisionLimit: number;
  revisionsUsed: number;
  license: LicenseType;
  dueAt: string;
  createdAt: string;
  auditLog: OrderAuditEvent[];
  review?: OrderReview;
  disputeReason?: DisputeReason;
  disputeStage?: DisputeStage;
  isDemo: true;
};
