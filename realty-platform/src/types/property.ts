export type DealType = "매매" | "전세" | "월세";

export type ListingType = "일반" | "분양" | "급매" | "경매";

export type PropertyType =
  | "아파트"
  | "주택"
  | "오피스텔"
  | "상가"
  | "사무실"
  | "토지";

export type PropertyBadge = "NEW" | "HOT" | "PREMIUM" | "SOLD";

export type PropertyOption =
  | "주차"
  | "엘리베이터"
  | "반려동물"
  | "에어컨"
  | "붙박이장"
  | "발코니"
  | "CCTV"
  | "보안";

export type NearbyCategory =
  | "지하철"
  | "버스"
  | "학교"
  | "병원"
  | "마트"
  | "공원"
  | "편의점";

export interface NearbyPlace {
  category: NearbyCategory;
  name: string;
  distanceM: number;
}

export interface PropertyDescription {
  features: string[];
  pros: string[];
  cautions: string[];
  renovated: boolean;
}

export interface Property {
  id: string;
  title: string;
  dealType: DealType;
  propertyType: PropertyType;
  listingType: ListingType;
  price: string;
  /** 정렬/필터용 숫자 값 (만원 단위 — 매매가·전세가·월세 보증금) */
  priceValue: number;
  monthlyRent?: string;
  /** 월세 금액의 숫자 값 (만원 단위) */
  monthlyRentValue?: number;
  city: string;
  district: string;
  areaM2: number;
  floor: string;
  bedroomCount: number;
  bathroomCount: number;
  badges: PropertyBadge[];
  gradient: string;

  /** 상세 페이지 전용 필드 (TASK-006) */
  address: string;
  propertyNumber: string;
  maintenanceFee: string;
  direction: string;
  builtYear: number;
  moveInDate: string;
  images: string[];
  description: PropertyDescription;
  options: PropertyOption[];
  nearby: NearbyPlace[];
}

export interface Region {
  id: string;
  name: string;
  city: string;
  listingCount: number;
  avgPricePerPyeong: string;
  gradient: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export type InquiryStatus = "접수" | "진행" | "완료" | "취소";

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  propertyTitle?: string;
  status: InquiryStatus;
  assignee?: string;
  memo?: string;
  createdAt: string;
}

export type MemberRole = "USER" | "AGENT" | "ADMIN";
export type MemberStatus = "활성" | "비활성";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  joinedAt: string;
  lastLoginAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  active: boolean;
  gradient: string;
}
