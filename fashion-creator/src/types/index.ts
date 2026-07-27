export type TrendLabel = "best-seller" | "rising" | "creator-pick";

export type TrendTag =
  | "여성"
  | "남성"
  | "신발"
  | "가방"
  | "액세서리"
  | "스트리트"
  | "럭셔리"
  | "스포츠";

export type TrendSignals = {
  searchScore: number;
  contentScore: number;
  salesScore: number;
  growthScore: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  image: string;
  // Real product photo (Shopify), when this product came from a real store
  // instead of the DEMO fixture — see src/services/shopify. `image` stays
  // the PlaceholderArt seed either way, so existing call sites that never
  // learned about real photos keep rendering exactly as before.
  imageUrl?: string;
  trendScore: number;
  trendLabel: TrendLabel;
  growthRate: number;
  tags: TrendTag[];
  aiSummary: string;
  signals: TrendSignals;
  isDemo: boolean;
};

export type FashionModel = {
  id: string;
  name: string;
  image: string;
  style: string;
  bodyType: string;
  genderPresentation: string;
  isFeatured: boolean;
};

export type Creator = {
  id: string;
  handle: string;
  displayName: string;
  avatar: string;
  specialty: string;
  totalViews: number;
  attributedSales: number;
  isVerified: boolean;
  isDemo: boolean;
};

export type BrandCampaign = {
  id: string;
  brand: string;
  title: string;
  reward: string;
  category: string;
  isDemo: boolean;
};

export type Look = {
  slug: string;
  title: string;
  creatorHandle: string;
  coverImage: string;
  totalPrice: number;
  productIds: string[];
  views: number;
  isDemo: boolean;
};

export type NavLink = {
  label: string;
  href: string;
};
