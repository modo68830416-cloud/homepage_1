import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import { search, getPopularQueries } from "@/lib/search/engine";

export const metadata: Metadata = {
  title: "검색",
  robots: { index: false, follow: false },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "", type = "all" } = await searchParams;
  const hasQuery = q.trim().length > 0;
  const response = hasQuery ? search(q) : null;

  const showArticles = type !== "product";
  const showProducts = type !== "health";

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-1">
        {hasQuery ? `"${q}" 검색 결과` : "검색"}
      </h1>
      {response?.correctedFrom && (
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          입력하신 검색어 대신 <strong>{response.query}</strong>(으)로 검색한 결과입니다.
        </p>
      )}

      <nav className="flex gap-4 border-b border-[var(--border-default)] mb-8 text-sm font-medium">
        <Link href={`/search?q=${encodeURIComponent(q)}`} className={`pb-3 ${type === "all" ? "border-b-2 border-[var(--color-info-500)]" : "text-[var(--text-secondary)]"}`}>
          전체
        </Link>
        <Link href={`/search?q=${encodeURIComponent(q)}&type=health`} className={`pb-3 ${type === "health" ? "border-b-2 border-[var(--color-info-500)]" : "text-[var(--text-secondary)]"}`}>
          건강정보
        </Link>
        <Link href={`/search?q=${encodeURIComponent(q)}&type=product`} className={`pb-3 ${type === "product" ? "border-b-2 border-[var(--color-info-500)]" : "text-[var(--text-secondary)]"}`}>
          상품
        </Link>
      </nav>

      {!hasQuery && (
        <div>
          <p className="text-sm text-[var(--text-secondary)] mb-3">인기 검색어</p>
          <div className="flex flex-wrap gap-2">
            {getPopularQueries().map((topic) => (
              <Link key={topic} href={`/search?q=${encodeURIComponent(topic)}`} className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm">
                {topic}
              </Link>
            ))}
          </div>
        </div>
      )}

      {hasQuery && response && response.results.length === 0 && (
        <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-8 text-center">
          <p className="mb-4">&quot;{q}&quot;에 대한 검색 결과가 없습니다.</p>
          <p className="text-sm text-[var(--text-secondary)] mb-4">이런 주제는 어떠세요?</p>
          <div className="flex flex-wrap justify-center gap-2">
            {getPopularQueries().map((topic) => (
              <Link key={topic} href={`/search?q=${encodeURIComponent(topic)}`} className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm">
                {topic}
              </Link>
            ))}
          </div>
        </div>
      )}

      {hasQuery && response && showArticles && response.articleResults.length > 0 && (
        <section className="mb-12">
          <h2 className="font-semibold mb-4">건강정보 ({response.articleResults.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {response.articleResults.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {hasQuery && response && showProducts && response.productResults.length > 0 && (
        <section>
          <h2 className="font-semibold mb-4">상품 ({response.productResults.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {response.productResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
