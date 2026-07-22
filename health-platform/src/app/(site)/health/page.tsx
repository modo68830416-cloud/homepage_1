import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/content/ArticleCard";
import { categories } from "@/lib/content/data";
import { getPublishedArticles } from "@/lib/content/public";

export const metadata: Metadata = {
  title: "건강정보",
  description: "증상, 질환, 생활관리, 건강검진 등 검수된 건강정보를 카테고리별로 탐색하세요.",
};

export default function HealthHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-[length:var(--font-size-display-2)] font-bold mb-2">건강정보</h1>
      <p className="text-[var(--text-secondary)] mb-10">신뢰할 수 있는 출처와 전문가 검수를 거친 건강 콘텐츠</p>

      <Reveal>
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {categories.map((category) => (
            <Link
              key={category.key}
              href={`/health/${category.key}`}
              className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-5 hover:shadow-[var(--shadow-md)] transition-shadow"
            >
              <p className="font-semibold mb-1">{category.label}</p>
              <p className="text-xs text-[var(--text-secondary)]">{category.description}</p>
            </Link>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section>
          <h2 className="text-[length:var(--font-size-heading-1)] font-semibold mb-4">최근 업데이트된 콘텐츠</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {getPublishedArticles().map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
