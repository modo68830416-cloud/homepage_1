export type ArticleCategory =
  | "symptoms"
  | "conditions"
  | "lifestyle"
  | "checkup"
  | "audience"
  | "seasonal"
  | "latest";

export interface ArticleCategoryMeta {
  key: ArticleCategory;
  label: string;
  description: string;
}

export interface TocEntry {
  id: string;
  label: string;
}

export interface ArticleSection {
  heading: string;
  id: string;
  body: string;
}

export interface ArticleSource {
  label: string;
  url: string;
}

/** TASK-008 §3 콘텐츠 상태. Only PUBLISHED content is visible on public routes (TASK-009 §6 승인 없이 공개되지 않음). */
export type ContentStatus =
  | "DRAFT"
  | "REVIEW_REQUESTED"
  | "IN_REVIEW"
  | "CHANGES_REQUESTED"
  | "APPROVED"
  | "SCHEDULED"
  | "PUBLISHED"
  | "UNPUBLISHED"
  | "ARCHIVED";

export interface Article {
  slug: string;
  category: ArticleCategory;
  status: ContentStatus;
  title: string;
  summary: string;
  /** When true, the EmergencyBanner renders above everything else — see docs/design/component-principles.md §3. */
  isEmergencyRelevant: boolean;
  emergencyNote?: string;
  author: string;
  reviewer: string;
  publishedAt: string;
  updatedAt: string;
  toc: TocEntry[];
  sections: ArticleSection[];
  keyTakeaways: string[];
  sources: ArticleSource[];
  relatedArticleSlugs: string[];
}
