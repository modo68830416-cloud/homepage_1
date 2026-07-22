import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmergencyBanner } from "@/components/content/EmergencyBanner";
import { TrustPanel } from "@/components/content/TrustPanel";
import { TableOfContents } from "@/components/content/TableOfContents";
import { DisclaimerNote } from "@/components/content/DisclaimerNote";
import { RelatedContent } from "@/components/content/RelatedContent";
import { RelatedProducts } from "@/components/commerce/RelatedProducts";
import { categories, getRelatedArticles } from "@/lib/content/data";
import { getPublicArticleBySlug, getPublishedArticles } from "@/lib/content/public";
import { getProductsByArticleSlug } from "@/lib/products/data";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildArticleJsonLd } from "@/lib/seo/structured-data";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

// Status can change at any moment via the admin content workflow
// (docs/admin/content-workflow.md), so this route always reflects the
// current in-memory override rather than a stale prerendered result.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublicArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getPublicArticleBySlug(slug);
  if (!article) notFound();

  const categoryMeta = categories.find((category) => category.key === article.category);
  const related = getRelatedArticles(article);
  const relatedProducts = getProductsByArticleSlug(article.slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
      <JsonLd data={buildArticleJsonLd(article)} />
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <TableOfContents toc={article.toc} />
        </div>
      </aside>

      <div className="wide max-w-[68ch]">
        <p className="text-sm text-[var(--text-secondary)] mb-2">
          <Link href="/health">건강정보</Link> {'>'}{" "}
          {categoryMeta && <Link href={`/health/${categoryMeta.key}`}>{categoryMeta.label}</Link>}
        </p>

        {article.isEmergencyRelevant && article.emergencyNote && (
          <EmergencyBanner note={article.emergencyNote} />
        )}

        <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-3">{article.title}</h1>
        <p className="text-[var(--text-secondary)] mb-4">{article.summary}</p>

        <TrustPanel
          author={article.author}
          reviewer={article.reviewer}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
        />

        <div className="lg:hidden mb-6">
          <details className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-4">
            <summary className="cursor-pointer font-medium">목차 펼치기</summary>
            <div className="mt-3">
              <TableOfContents toc={article.toc} />
            </div>
          </details>
        </div>

        <article className="space-y-8 leading-[1.8]">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-[length:var(--font-size-heading-2)] font-semibold mb-2">{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>

        <div className="mt-8 rounded-[var(--radius-md)] bg-[var(--color-surface-50)] p-5">
          <p className="font-semibold mb-2">핵심 요약</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {article.keyTakeaways.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-sm">
          <p className="font-semibold mb-1">출처</p>
          <ul className="space-y-1 text-[var(--text-secondary)]">
            {article.sources.map((source) => (
              <li key={source.label}>
                <a href={source.url}>{source.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <DisclaimerNote />

        <p className="mt-4 text-sm">
          <Link href="/support/report" className="text-[var(--color-info-500)] underline">
            내용에 오류가 있나요? 신고 및 수정 요청
          </Link>
        </p>

        <RelatedContent articles={related} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
