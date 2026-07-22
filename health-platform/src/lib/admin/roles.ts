export type AdminRole =
  | "SUPER_ADMIN"
  | "OPS_ADMIN"
  | "CONTENT_WRITER"
  | "CONTENT_REVIEWER"
  | "PRODUCT_MANAGER"
  | "ORDER_MANAGER"
  | "SUPPORT"
  | "SELLER"
  | "ANALYST";

export const ROLE_LABELS: Record<AdminRole, string> = {
  SUPER_ADMIN: "최고 관리자",
  OPS_ADMIN: "운영 관리자",
  CONTENT_WRITER: "콘텐츠 작성자",
  CONTENT_REVIEWER: "콘텐츠 검수자",
  PRODUCT_MANAGER: "상품 관리자",
  ORDER_MANAGER: "주문 관리자",
  SUPPORT: "고객지원",
  SELLER: "판매자",
  ANALYST: "분석 조회자",
};

export type AdminSection =
  | "dashboard"
  | "content"
  | "products"
  | "orders"
  | "users"
  | "search-analytics"
  | "audit-log"
  | "files";

export const SECTION_LABELS: Record<AdminSection, string> = {
  dashboard: "대시보드",
  content: "콘텐츠",
  products: "상품",
  orders: "주문",
  users: "회원",
  "search-analytics": "검색 분석",
  "audit-log": "감사 로그",
  files: "파일 라이브러리",
};

/** TASK-008 §4/§6 — admin API/UI access is partitioned by role, separate from the public-user permission model. */
export const SECTION_PERMISSIONS: Record<AdminSection, AdminRole[]> = {
  dashboard: [
    "SUPER_ADMIN",
    "OPS_ADMIN",
    "CONTENT_WRITER",
    "CONTENT_REVIEWER",
    "PRODUCT_MANAGER",
    "ORDER_MANAGER",
    "SUPPORT",
    "SELLER",
    "ANALYST",
  ],
  content: ["SUPER_ADMIN", "OPS_ADMIN", "CONTENT_WRITER", "CONTENT_REVIEWER"],
  products: ["SUPER_ADMIN", "OPS_ADMIN", "PRODUCT_MANAGER", "SELLER"],
  orders: ["SUPER_ADMIN", "OPS_ADMIN", "ORDER_MANAGER", "SUPPORT"],
  users: ["SUPER_ADMIN", "OPS_ADMIN"],
  "search-analytics": ["SUPER_ADMIN", "OPS_ADMIN", "ANALYST"],
  "audit-log": ["SUPER_ADMIN", "OPS_ADMIN"],
  files: ["SUPER_ADMIN", "OPS_ADMIN", "CONTENT_WRITER", "PRODUCT_MANAGER"],
};

export function canAccessSection(role: AdminRole, section: AdminSection): boolean {
  return SECTION_PERMISSIONS[section].includes(role);
}

export function sectionsForRole(role: AdminRole): AdminSection[] {
  return (Object.keys(SECTION_PERMISSIONS) as AdminSection[]).filter((section) =>
    canAccessSection(role, section),
  );
}

export const ADMIN_ROLE_COOKIE = "admin_role";
