import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { newsArticles } from "@/lib/properties/mock-data";

export const metadata: Metadata = {
  title: "부동산뉴스",
  description: "부동산 시장 동향과 정책 소식.",
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-10">
      <h1 className="font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        부동산뉴스
      </h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        시장 동향, 정책, 지역 리포트를 전해드립니다
      </p>
      <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
        * 데모 사이트로, 아래 기사는 실제 보도가 아닌 샘플 콘텐츠입니다.
      </p>

      <div className="mt-8 space-y-4">
        {newsArticles.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.id}`}
            className="block rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-6 shadow-[var(--shadow-sm)] transition hover:bg-[var(--bg-surface)]"
          >
            <div className="flex items-center gap-2 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              <Newspaper size={14} />
              <span>{article.category}</span>
              <span aria-hidden>·</span>
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            </div>
            <h2 className="mt-2 font-serif font-bold text-[var(--text-primary)]">{article.title}</h2>
            <p className="mt-2 text-[var(--text-secondary)]">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
