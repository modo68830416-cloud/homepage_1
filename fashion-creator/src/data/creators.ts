import type { BrandCampaign, Creator, Look } from "@/types";

export const creators: Creator[] = [
  {
    id: "c-01",
    handle: "@juno.styles",
    displayName: "Juno",
    avatar: "creator-juno",
    specialty: "Streetwear Editorial",
    totalViews: 4200000,
    attributedSales: 182000000,
    isVerified: true,
    isDemo: true,
  },
  {
    id: "c-02",
    handle: "@haeun.look",
    displayName: "Haeun",
    avatar: "creator-haeun",
    specialty: "Minimal Office Fit",
    totalViews: 2800000,
    attributedSales: 96000000,
    isVerified: true,
    isDemo: true,
  },
  {
    id: "c-03",
    handle: "@ray.motion",
    displayName: "Ray",
    avatar: "creator-ray",
    specialty: "Genderless Avant-garde",
    totalViews: 1650000,
    attributedSales: 54000000,
    isVerified: false,
    isDemo: true,
  },
  {
    id: "c-04",
    handle: "@mina.daily",
    displayName: "Mina",
    avatar: "creator-mina",
    specialty: "Everyday Luxury",
    totalViews: 3100000,
    attributedSales: 121000000,
    isVerified: true,
    isDemo: true,
  },
];

export const brandCampaigns: BrandCampaign[] = [
  {
    id: "camp-01",
    brand: "NOIR STUDIO",
    title: "2026 F/W 아우터 룩 캠페인",
    reward: "정산 15% + 캠페인 보너스",
    category: "Outerwear",
    isDemo: true,
  },
  {
    id: "camp-02",
    brand: "PULSE WEAR",
    title: "트랙 재킷 쇼츠 챌린지",
    reward: "건당 고정 보상 + 판매 정산",
    category: "Activewear",
    isDemo: true,
  },
  {
    id: "camp-03",
    brand: "LUMEN",
    title: "시즌 크롭탑 룩북 제작",
    reward: "정산 12%",
    category: "Tops",
    isDemo: true,
  },
];

export const looks: Look[] = [
  {
    slug: "demo-look",
    title: "Night Aurora Look",
    creatorHandle: "@juno.styles",
    coverImage: "look-demo",
    totalPrice: 388000,
    productIds: ["p-01", "p-02", "p-03"],
    views: 128400,
    isDemo: true,
  },
];
