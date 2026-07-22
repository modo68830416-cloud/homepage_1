"use client";

import Link from "next/link";
import { useCart } from "@/lib/commerce/cart";
import { SaleTypeBadge } from "@/components/commerce/SaleTypeBadge";

export default function CartPage() {
  const { lines, removeFromCart, updateQuantity, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-3">장바구니가 비어있습니다</h1>
        <Link href="/shop" className="text-[var(--color-info-500)] underline">
          스토어 둘러보기
        </Link>
      </div>
    );
  }

  const combinedShippingGroup = lines.filter((line) => line.combinedShippingAllowed);
  const separateShippingGroup = lines.filter((line) => !line.combinedShippingAllowed);

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-8">장바구니</h1>

      {combinedShippingGroup.length > 0 && (
        <section className="mb-8">
          <p className="text-xs text-[var(--text-secondary)] mb-2">묶음배송 그룹</p>
          <div className="space-y-3">
            {combinedShippingGroup.map((line) => (
              <CartLineRow key={line.productId} line={line} onRemove={removeFromCart} onQuantity={updateQuantity} />
            ))}
          </div>
        </section>
      )}

      {separateShippingGroup.map((line) => (
        <section key={line.productId} className="mb-4">
          <p className="text-xs text-[var(--text-secondary)] mb-2">별도배송</p>
          <CartLineRow line={line} onRemove={removeFromCart} onQuantity={updateQuantity} />
        </section>
      ))}

      <div className="border-t border-[var(--border-default)] pt-6 mt-6 flex items-center justify-between">
        <span className="font-semibold">합계</span>
        <span className="text-[length:var(--font-size-data)] font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
          {subtotal.toLocaleString("ko-KR")}원
        </span>
      </div>

      <Link
        href="/shop/checkout"
        className="mt-6 block w-full rounded-full bg-[var(--color-brand-600)] text-white text-center px-6 py-3 font-semibold"
      >
        결제하기
      </Link>
    </div>
  );
}

function CartLineRow({
  line,
  onRemove,
  onQuantity,
}: {
  line: ReturnType<typeof useCart>["lines"][number];
  onRemove: (id: string) => void;
  onQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--border-default)] p-4">
      <div className="w-16 h-16 rounded-[var(--radius-sm)] bg-[var(--color-surface-100)] shrink-0" />
      <div className="flex-1">
        <div className="mb-1">
          <SaleTypeBadge saleType={line.saleType} />
        </div>
        <p className="font-medium text-sm">{line.title}</p>
        <p className="text-sm" style={{ fontFamily: "var(--font-mono)" }}>
          {line.price.toLocaleString("ko-KR")}원
        </p>
      </div>
      <input
        type="number"
        min={1}
        value={line.quantity}
        onChange={(event) => onQuantity(line.productId, Number(event.target.value))}
        className="w-16 rounded border border-[var(--border-default)] px-2 py-1 text-sm"
        aria-label={`${line.title} 수량`}
      />
      <button type="button" onClick={() => onRemove(line.productId)} className="text-sm text-[var(--text-secondary)]">
        삭제
      </button>
    </div>
  );
}
