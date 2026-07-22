import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/content/ArticleCard";
import { Reveal } from "@/components/motion/Reveal";
import { categories } from "@/lib/content/data";
import { getPublicArticlesByCategory } from "@/lib/content/public";
import type { ArticleCategory } from "@/lib/content/types";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.key }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = categories.find((entry) => entry.key === category);
  if (!meta) return {};
  return { title: meta.label, description: meta.description };
}

export default async function HealthCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const meta = categories.find((entry) => entry.key === category);
  if (!meta) notFound();

  const categoryArticles = getPublicArticlesByCategory(category as ArticleCategory);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="text-sm text-[var(--text-secondary)] mb-2">
        <Link href="/health">건강정보</Link> {'>'} {meta.label}
      </p>
      <h1 className="text-[length:var(--font-size-display-2)] font-bold mb-2">{meta.label}</h1>
      <p className="text-[var(--text-secondary)] mb-10">{meta.description}</p>

      <Reveal>
        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--text-secondary)]">이 카테고리의 콘텐츠를 준비 중입니다.</p>
        )}
      </Reveal>
    </div>
  );
}
