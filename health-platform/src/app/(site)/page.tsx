import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { Reveal } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ProductCard } from "@/components/commerce/ProductCard";
import { categories } from "@/lib/content/data";
import { getPublishedArticles } from "@/lib/content/public";
import { productSummaries } from "@/lib/products/data";

const popularTopics = ["두통", "고혈압", "불면증", "스트레스", "거북목", "건강검진"];

export default function HomePage() {
  const publishedArticles = getPublishedArticles();
  const featured = publishedArticles.slice(0, 3);
  const curated = publishedArticles.slice(3, 6);
  const showcase = productSummaries.slice(0, 4);

  return (
    <div>
      <HomeHero />

      {/* 인기 건강 주제 */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-[length:var(--font-size-heading-1)] font-bold mb-5">지금 많이 찾는 주제</h2>
          <div className="flex flex-wrap gap-2">
            {popularTopics.map((topic) => (
              <Link
                key={topic}
                href={`/search?q=${encodeURIComponent(topic)}`}
                className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm hover:bg-[var(--color-surface-50)]"
              >
                {topic}
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 증상·질환 빠른 탐색 */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-[length:var(--font-size-heading-1)] font-bold mb-5">증상·질환 빠른 탐색</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
          </div>
        </section>
      </Reveal>

      {/* 몰입형 대표 콘텐츠 */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-[length:var(--font-size-heading-1)] font-bold mb-5">지금 꼭 읽어야 할 콘텐츠</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* 오늘의 건강 큐레이션 */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-[length:var(--font-size-heading-1)] font-bold mb-5">오늘의 건강 큐레이션</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {curated.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* 관련 상품 쇼케이스 — 광고/제휴 명시 */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-[length:var(--font-size-heading-1)] font-bold">건강 관리에 도움이 되는 상품</h2>
            <span className="text-xs text-[var(--text-secondary)]">광고/제휴 상품 포함될 수 있음</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {showcase.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* 신뢰 지표 및 콘텐츠 원칙 */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-[length:var(--font-size-heading-1)] font-bold mb-5">우리가 지키는 원칙</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-6">
              <p className="font-semibold mb-2">출처가 보이는 정보</p>
              <p className="text-[var(--text-secondary)]">모든 콘텐츠는 검수자와 수정일을 표기합니다.</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-6">
              <p className="font-semibold mb-2">광고와 정보의 구분</p>
              <p className="text-[var(--text-secondary)]">상품 추천은 항상 명확한 표시와 함께 노출됩니다.</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-6">
              <p className="font-semibold mb-2">안전 최우선</p>
              <p className="text-[var(--text-secondary)]">응급 신호는 어떤 판매 정보보다 먼저 안내합니다.</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 뉴스레터·회원 CTA */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div
            className="rounded-[var(--radius-lg)] p-10 text-center text-white"
            style={{ background: "linear-gradient(135deg, var(--color-brand-800), var(--color-brand-600))" }}
          >
            <h2 className="text-[length:var(--font-size-heading-1)] font-bold mb-2">
              나에게 맞는 건강정보를 매주 받아보세요
            </h2>
            <p className="text-white/80 mb-6 text-sm">회원가입하고 관심 주제를 구독하면 맞춤 콘텐츠를 보내드립니다.</p>
            <Link
              href="/account/signup"
              className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-[var(--color-brand-800)]"
            >
              무료로 시작하기
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
