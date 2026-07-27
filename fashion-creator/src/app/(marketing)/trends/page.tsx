import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/ui/ProductCard";
import { PageIntro } from "@/components/home/PageIntro";
import { Reveal } from "@/components/motion/Reveal";
import { DemoLoader } from "@/components/feedback/demo-loader";
import { ProductCardSkeleton } from "@/components/feedback/skeletons";

export const metadata: Metadata = {
  title: "Trend Radar",
  description: "실시간 트렌드 점수로 정렬된 인기 패션 아이템을 확인하세요.",
};

export default function TrendsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Trend Radar"
        title="지금 가장 뜨는 패션 아이템"
        description="트렌드 점수, 판매량, 크리에이터 픽을 기준으로 정렬된 인기 상품입니다."
      />
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal className="mb-8 flex items-center gap-2 text-sm text-foreground-subtle">
          <TrendingUp className="h-4 w-4" aria-hidden="true" />
          매일 갱신되는 트렌드 스코어 기반 랭킹
          <Badge tone="mock" className="ml-2">
            MOCK DATA
          </Badge>
        </Reveal>
        <DemoLoader
          skeleton={
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCardSkeleton key={product.id} />
              ))}
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {products
              .slice()
              .sort((a, b) => b.trendScore - a.trendScore)
              .map((product, index) => (
                <Reveal key={product.id} delay={index * 0.04}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
          </div>
        </DemoLoader>
      </section>
    </>
  );
}
