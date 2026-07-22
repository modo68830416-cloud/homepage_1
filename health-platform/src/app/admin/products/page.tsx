import { requireSection } from "@/lib/admin/require-section";
import { products } from "@/lib/products/data";
import type { Product } from "@/lib/products/types";
import { SaleTypeBadge } from "@/components/commerce/SaleTypeBadge";

/** Renders only the fields relevant to each sale type (TASK-007/§6 완료조건: 판매 유형별로 불필요한 필드는 조건부 표시). */
function saleTypeSpecificSummary(product: Product): string {
  switch (product.saleType) {
    case "DIRECT":
    case "MARKETPLACE":
      return `재고 ${product.inventoryPolicy.stock ?? "무제한"} · 배송비 ${product.shippingPolicy.feeKrw.toLocaleString("ko-KR")}원`;
    case "DROPSHIP":
      return `공급사 ${product.supplierName} · 묶음배송 ${product.shippingPolicy.combinedShippingAllowed ? "가능" : "불가"}`;
    case "AFFILIATE":
      return `외부몰 ${product.merchantName} · 가격기준 ${product.priceAsOf}`;
    case "DIGITAL":
      return `다운로드 ${product.digitalEntitlement.downloadLimit ?? "무제한"}회 · ${product.digitalEntitlement.accessDurationDays ?? "무기한"}일 이용`;
    case "SUBSCRIPTION":
      return `${product.subscription.intervalDays}일 주기`;
    case "BOOKING":
      return `${product.booking.availableSlots.length}개 예약 슬롯 · ${product.booking.durationMinutes}분`;
    default:
      return "";
  }
}

export default async function AdminProductsPage() {
  const access = await requireSection("products");
  if (!access.allowed) return <p>접근 권한이 없습니다.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">상품 관리</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        판매 유형에 따라 표시되는 필드가 달라집니다. 상품 데이터 모델 자체는 변경 없이 판매 유형을 추가할 수 있습니다 (TASK-007 §6).
      </p>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b border-[var(--border-default)]">
            <th className="py-2">상품</th>
            <th className="py-2">판매유형</th>
            <th className="py-2">판매자</th>
            <th className="py-2">가격</th>
            <th className="py-2">유형별 정보</th>
            <th className="py-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-[var(--border-default)]">
              <td className="py-2 pr-4">{product.title}</td>
              <td className="py-2 pr-4">
                <SaleTypeBadge saleType={product.saleType} />
              </td>
              <td className="py-2 pr-4">{product.seller.name}</td>
              <td className="py-2 pr-4" style={{ fontFamily: "var(--font-mono)" }}>
                {product.price.toLocaleString("ko-KR")}원
              </td>
              <td className="py-2 pr-4 text-xs text-[var(--text-secondary)]">{saleTypeSpecificSummary(product)}</td>
              <td className="py-2 text-xs">{product.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
