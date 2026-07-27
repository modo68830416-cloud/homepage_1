import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function TrendPreview() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Trend Radar"
        title="지금 가장 뜨는 패션 아이템"
        description="실시간 트렌드 점수로 정렬된 인기 상품을 AI 모델에게 바로 입혀보세요."
        linkHref="/trends"
        linkLabel="View all trends"
      />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={index * 0.05}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
