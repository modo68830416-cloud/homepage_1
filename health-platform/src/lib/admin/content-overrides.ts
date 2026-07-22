import "server-only";
import type { Article, ContentStatus } from "@/lib/content/types";

/**
 * In-memory per-process status override, written by the admin content
 * workflow (TASK-008) and read by public content routes (TASK-005/TASK-009
 * §6 — "승인 없이 의료정보가 공개되지 않도록 설정할 수 있다"). A real deployment
 * persists this to the CMS database instead of process memory.
 */
const overrides = new Map<string, ContentStatus>();

export function setStatusOverride(slug: string, status: ContentStatus) {
  overrides.set(slug, status);
}

export function getEffectiveArticleStatus(article: Article): ContentStatus {
  return overrides.get(article.slug) ?? article.status;
}
