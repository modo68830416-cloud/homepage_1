import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function TrendPreview() {
  return (
    <section
      id="trend-radar"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8"
      style={{
        backgroundImage:
          "radial-gradient(700px circle at 85% 0%, rgba(255,120,200,0.06), transparent 60%), radial-gradient(600px circle at 0% 100%, rgba(255,139,93,0.05), transparent 60%)",
      }}
    >
      <SectionHeading
        eyebrow="Trend Radar"
        title="지금 가장 뜨는 패션 아이템"
        description="실시간 트렌드 점수로 정렬된 인기 상품을 AI 모델에게 바로 입혀보세요."
        linkHref="/trends"
        linkLabel="View all trends"
      />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {products
          .slice()
          .sort((a, b) => b.trendScore - a.trendScore)
          .slice(0, 6)
          .map((product, index) => (
            <Reveal key={product.id} delay={index * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
      </div>
    </section>
  );
}
