import type { Article } from "@/lib/content/types";
import { ArticleCard } from "./ArticleCard";

export function RelatedContent({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section aria-labelledby="related-content-heading" className="mt-10">
      <h2 id="related-content-heading" className="text-[length:var(--font-size-heading-2)] font-semibold mb-4">
        관련 건강정보
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
