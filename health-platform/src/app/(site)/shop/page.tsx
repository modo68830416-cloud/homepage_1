import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/commerce/ProductCard";
import { productSummaries, shopCategories } from "@/lib/products/data";

export const metadata: Metadata = {
  title: "스토어",
  description: "건강기능식품부터 예약형 서비스까지, 다양한 판매 방식의 상품을 한 곳에서 만나보세요.",
};

export default function ShopHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="text-[length:var(--font-size-display-2)] font-bold mb-2">스토어</h1>
      <p className="text-[var(--text-secondary)] mb-10">자체판매, 제휴, 구독, 예약까지 모두 한 곳에서</p>

      <Reveal>
        <section className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-14">
          {shopCategories.map((category) => (
            <Link
              key={category.key}
              href={`/shop/categories/${category.key}`}
              className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-4 text-center hover:shadow-[var(--shadow-md)] transition-shadow text-sm font-medium"
            >
              {category.label}
            </Link>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section>
          <h2 className="text-[length:var(--font-size-heading-1)] font-semibold mb-4">전체 상품</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {productSummaries.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
