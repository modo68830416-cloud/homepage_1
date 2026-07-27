export type StudioCategory =
  | "상의"
  | "하의"
  | "원피스"
  | "아우터"
  | "신발"
  | "가방"
  | "액세서리";

export const STUDIO_CATEGORIES: StudioCategory[] = [
  "상의",
  "하의",
  "원피스",
  "아우터",
  "신발",
  "가방",
  "액세서리",
];

export const CATEGORY_TO_STUDIO: Record<string, StudioCategory> = {
  Tops: "상의",
  Bottoms: "하의",
  Dresses: "원피스",
  Outerwear: "아우터",
  Shoes: "신발",
  Bags: "가방",
  Accessories: "액세서리",
};

export type Look = {
  id: string;
  name: string;
  modelId: string | null;
  modelName: string | null;
  productIds: string[];
  totalPrice: number;
  createdAt: string;
  isDemo: true;
};
