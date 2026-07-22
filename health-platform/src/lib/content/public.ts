import "server-only";
import { articles, getArticleBySlug, getArticlesByCategory } from "./data";
import type { Article } from "./types";
import { getEffectiveArticleStatus } from "@/lib/admin/content-overrides";

/**
 * Server-only accessors that apply the admin's in-memory status override
 * (TASK-008 content workflow) and require PUBLISHED. Kept out of
 * `content/data.ts` so that module can stay importable from Client
 * Components (e.g. the mobile nav's category list) without dragging in
 * "server-only" — see docs/admin/content-workflow.md.
 */
export function getPublishedArticles(): Article[] {
  return articles.filter((article) => getEffectiveArticleStatus(article) === "PUBLISHED");
}

export function getPublicArticlesByCategory(category: string): Article[] {
  return getArticlesByCategory(category).filter(
    (article) => getEffectiveArticleStatus(article) === "PUBLISHED",
  );
}

export function getPublicArticleBySlug(slug: string): Article | undefined {
  const article = getArticleBySlug(slug);
  if (!article || getEffectiveArticleStatus(article) !== "PUBLISHED") return undefined;
  return article;
}
