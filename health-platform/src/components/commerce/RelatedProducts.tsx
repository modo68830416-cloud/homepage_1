import type { ProductSummary } from "@/lib/products/types";
import { ProductCard } from "./ProductCard";

/**
 * Related-product slot for content pages. Always labeled distinctly from
 * editorial content and never rendered as more than one slot per scroll
 * viewport, per docs/task-005 UI principles (상품 추천은 본문을 방해하지 않는다).
 */
export function RelatedProducts({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) return null;
  return (
    <section aria-labelledby="related-products-heading" className="mt-10">
      <div className="flex items-baseline justify-between mb-4">
        <h2 id="related-products-heading" className="text-[length:var(--font-size-heading-2)] font-semibold">
          관련 상품
        </h2>
        <span className="text-xs text-[var(--text-secondary)]">광고/제휴 상품 포함될 수 있음</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
