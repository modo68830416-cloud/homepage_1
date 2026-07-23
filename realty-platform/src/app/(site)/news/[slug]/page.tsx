import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Newspaper } from "lucide-react";
import { newsArticles } from "@/lib/properties/mock-data";

function getArticle(slug: string) {
  return newsArticles.find((article) => article.id === slug);
}

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "기사를 찾을 수 없습니다" };
  return { title: article.title, description: article.excerpt };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = newsArticles.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-[760px] px-6 py-10">
      <Link
        href="/news"
        className="inline-flex items-center gap-1.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft size={14} />
        부동산뉴스 목록으로
      </Link>

      <div className="mt-4 flex items-center gap-2 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
        <Newspaper size={14} />
        <span>{article.category}</span>
        <span aria-hidden>·</span>
        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
      </div>

      <h1 className="mt-3 font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        {article.title}
      </h1>
      <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
        * 데모 사이트로, 본 기사는 실제 보도가 아닌 샘플 콘텐츠입니다.
      </p>

      <div className="mt-8 space-y-4 leading-relaxed text-[var(--text-primary)]">
        {article.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-14 border-t border-[var(--border-default)] pt-6">
          <h2 className="font-serif text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
            다른 기사
          </h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/news/${item.id}`}
                  className="block rounded-[var(--radius-md)] border border-[var(--border-default)] p-4 transition hover:bg-[var(--bg-surface)]"
                >
                  <p className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
                    {item.category} · {item.publishedAt}
                  </p>
                  <p className="mt-1 font-semibold text-[var(--text-primary)]">{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
