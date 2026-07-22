import Link from "next/link";
import type { ProductSummary } from "@/lib/products/types";
import { SaleTypeBadge } from "./SaleTypeBadge";
import { WishlistButton } from "./WishlistButton";

const AD_DISCLOSED_TYPES = new Set(["AFFILIATE", "MARKETPLACE"]);

/**
 * Standard list-card presentation for product grids (docs/design/component-principles.md §2).
 * Product detail pages use the stage-style presentation instead (TASK-007).
 */
export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <div className="group relative rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--color-surface-0)] p-4 transition-shadow hover:shadow-[var(--shadow-md)]">
      {/* Sibling to the Link, not nested inside it — <button> inside <a> is invalid HTML. */}
      <WishlistButton productId={product.id} />
      <Link href={`/shop/products/${product.slug}`} className="block">
        <div className="aspect-square rounded-[var(--radius-sm)] bg-[var(--color-surface-100)] mb-3 flex items-center justify-center text-xs text-[var(--text-secondary)]">
          {product.brand}
        </div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <SaleTypeBadge saleType={product.saleType} />
          {AD_DISCLOSED_TYPES.has(product.saleType) && (
            <span className="text-[11px] text-[var(--text-secondary)]">광고/제휴 포함</span>
          )}
        </div>
        <h3 className="font-semibold text-sm leading-snug group-hover:underline">{product.title}</h3>
        <p className="mt-1 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
          {product.price.toLocaleString("ko-KR")}원
          {product.compareAtPrice && (
            <span className="ml-2 text-[var(--text-secondary)] line-through">
              {product.compareAtPrice.toLocaleString("ko-KR")}원
            </span>
          )}
        </p>
      </Link>
    </div>
  );
}
