import { SaleTypeBadge } from "./SaleTypeBadge";
import { ProductActions } from "./ProductActions";
import type { Product } from "@/lib/products/types";

const AD_DISCLOSED_TYPES = new Set<Product["saleType"]>(["AFFILIATE", "MARKETPLACE", "DROPSHIP"]);

/**
 * Stage-style product presentation (docs/design/component-principles.md §2,
 * docs/design/visual-concept.md — 커머스 영역 효과 예산 80). Unlike ListCard,
 * this is a single-object, high-emphasis layout used only on the detail page.
 */
export function ProductStage({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="aspect-square rounded-[var(--radius-lg)] bg-[var(--color-surface-50)] flex items-center justify-center text-[var(--text-secondary)]">
        {product.brand}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <SaleTypeBadge saleType={product.saleType} />
          {AD_DISCLOSED_TYPES.has(product.saleType) && (
            <span className="text-xs text-[var(--text-secondary)]">광고/제휴 포함 — 판매자: {product.seller.name}</span>
          )}
        </div>

        <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-2">{product.title}</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-4">{product.brand}</p>

        <p className="text-[length:var(--font-size-data)] font-semibold mb-1" style={{ fontFamily: "var(--font-mono)" }}>
          {product.price.toLocaleString("ko-KR")}원
          {product.compareAtPrice && (
            <span className="ml-2 text-base text-[var(--text-secondary)] line-through">
              {product.compareAtPrice.toLocaleString("ko-KR")}원
            </span>
          )}
        </p>

        {product.saleType === "AFFILIATE" && (
          <p className="text-xs text-[var(--text-secondary)] mb-4">가격 기준: {product.priceAsOf} · 판매처: {product.merchantName}</p>
        )}

        {product.saleType === "SUBSCRIPTION" && (
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            {product.subscription.intervalDays}일마다 자동 결제 · 언제든 해지 가능
          </p>
        )}

        {product.saleType === "BOOKING" && (
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            소요시간 {product.booking.durationMinutes}분 · {product.booking.cancellationPolicy}
          </p>
        )}

        <p className="text-sm leading-relaxed mb-6">{product.description}</p>

        <div className="mb-6">
          <ProductActions product={product} />
        </div>

        <dl className="text-sm space-y-2 border-t border-[var(--border-default)] pt-4">
          {"shippingPolicy" in product && product.shippingPolicy && (
            <div className="flex justify-between">
              <dt className="text-[var(--text-secondary)]">배송</dt>
              <dd>
                {product.shippingPolicy.estimatedDeliveryDays}
                {!product.shippingPolicy.combinedShippingAllowed && " · 묶음배송 불가"}
              </dd>
            </div>
          )}
          {"refundPolicy" in product && product.refundPolicy && (
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-secondary)] shrink-0">환불</dt>
              <dd className="text-right">{product.refundPolicy.description}</dd>
            </div>
          )}
          {product.saleType === "DIGITAL" && (
            <div className="flex justify-between">
              <dt className="text-[var(--text-secondary)]">디지털 이용권한</dt>
              <dd>
                {product.digitalEntitlement.downloadLimit ?? "무제한"}회 다운로드 ·{" "}
                {product.digitalEntitlement.accessDurationDays ?? "무기한"}
                {product.digitalEntitlement.accessDurationDays ? "일 이용" : ""}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <ProductActions product={product} sticky />
    </div>
  );
}
