export type TrendLabel = "best-seller" | "rising" | "creator-pick";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  image: string;
  trendScore: number;
  trendLabel: TrendLabel;
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
