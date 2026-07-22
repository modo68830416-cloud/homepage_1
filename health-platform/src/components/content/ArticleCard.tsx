import Link from "next/link";
import type { Article } from "@/lib/content/types";

/** Standard list-card presentation for content grids (docs/design/component-principles.md §2). */
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/health/articles/${article.slug}`}
      className="group block rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--color-surface-0)] p-5 hover:shadow-[var(--shadow-md)] transition-shadow"
    >
      <p className="text-xs text-[var(--text-secondary)] mb-2">{article.updatedAt} 수정</p>
      <h3 className="font-semibold leading-snug mb-2 group-hover:underline">{article.title}</h3>
      <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{article.summary}</p>
    </Link>
  );
}
