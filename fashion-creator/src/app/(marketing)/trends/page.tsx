import type { Metadata } from "next";
import { products as demoProducts } from "@/data/products";
import { creators } from "@/data/creators";
import { PageIntro } from "@/components/home/PageIntro";
import { RadarSummary } from "@/components/trends/RadarSummary";
import { TrendRadarGrid } from "@/components/home/TrendRadarGrid";
import { AIPicks } from "@/components/trends/AIPicks";
import { CategoryRanking } from "@/components/trends/CategoryRanking";
import { CreatorPicks } from "@/components/trends/CreatorPicks";
import { AiGateway } from "@/ai/gateway/ai-gateway";

export const metadata: Metadata = {
  title: "Trend Radar",
  description: "AI가 분석한 실시간 패션 트렌드 점수로 지금 뜨는 아이템을 확인하세요.",
};

export default async function TrendsPage() {
  // Real Shopify best-sellers when a store is connected and has products;
  // falls back to the DEMO catalog otherwise (see ShopifyTrendProvider).
  const products = await AiGateway.getTrending(demoProducts.length);

  return (
    <>
      <PageIntro
        eyebrow="Trend Radar"
        title="AI가 읽는 지금의 패션 트렌드"
        description="검색 반응, 콘텐츠 반응, 판매 반응, 성장률을 종합한 Trend Score로 정렬된 인기 아이템입니다."
      />

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <RadarSummary products={products} />
        <TrendRadarGrid products={products} />
      </section>

      <AIPicks products={products} />
      <CategoryRanking products={products} />
      <CreatorPicks products={products} creators={creators} />
    </>
  );
}
