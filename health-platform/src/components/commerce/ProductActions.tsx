"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/commerce/cart";
import { createOrder } from "@/lib/commerce/orders";
import { MagneticButton } from "@/components/motion/MagneticButton";
import type { Product } from "@/lib/products/types";

/**
 * Sale-type-specific call to action (TASK-007 §4). Rendered inside
 * ProductStage and duplicated visually as a sticky bottom bar on mobile via
 * the `sticky` prop (docs/design/component-principles.md §4 StickyBuyBar).
 */
export function ProductActions({ product, sticky = false }: { product: Product; sticky?: boolean }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [message, setMessage] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const wrapperClass = sticky
    ? "sm:hidden fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] bg-[var(--bg-page)] border-t border-[var(--border-default)] p-4 flex items-center gap-3"
    : "hidden sm:block";

  if (product.saleType === "AFFILIATE") {
    return (
      <div className={wrapperClass}>
        <MagneticButton
          className="w-full rounded-full bg-[var(--color-badge-affiliate)] text-white px-6 py-3 font-semibold"
          onClick={() => router.push(`/go/${product.slug}`)}
        >
          제휴몰에서 구매하기
        </MagneticButton>
      </div>
    );
  }

  if (product.saleType === "BOOKING") {
    return (
      <div className={sticky ? wrapperClass : "space-y-3"}>
        {!sticky && (
          <div className="flex flex-wrap gap-2">
            {product.booking.availableSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-full border px-3 py-2 text-sm ${
                  selectedSlot === slot
                    ? "border-[var(--color-info-500)] bg-[var(--color-surface-50)]"
                    : "border-[var(--border-default)]"
                }`}
              >
                {new Date(slot).toLocaleString("ko-KR", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </button>
            ))}
          </div>
        )}
        <MagneticButton
          className="w-full rounded-full bg-[var(--color-badge-booking)] text-white px-6 py-3 font-semibold"
          onClick={() => {
            if (!selectedSlot) {
              setMessage("예약 가능한 시간을 선택해주세요.");
              return;
            }
            setMessage(`${new Date(selectedSlot).toLocaleString("ko-KR")} 예약이 확정되었습니다.`);
          }}
        >
          예약 확정하기
        </MagneticButton>
        {message && <p className="text-sm text-[var(--color-info-500)]">{message}</p>}
      </div>
    );
  }

  const ctaLabel =
    product.saleType === "SUBSCRIPTION" ? "구독 시작하기" : product.saleType === "DIGITAL" ? "바로 구매하기" : "장바구니 담기";

  return (
    <div className={wrapperClass}>
      <MagneticButton
        className="w-full rounded-full bg-[var(--color-brand-600)] text-white px-6 py-3 font-semibold disabled:opacity-60"
        onClick={async () => {
          const result = addToCart(product);
          if (!result.ok) {
            setMessage(result.reason ?? "담을 수 없는 상품입니다.");
            return;
          }
          if (product.saleType === "DIGITAL" || product.saleType === "SUBSCRIPTION") {
            setBusy(true);
            const order = await createOrder([
              {
                productId: product.id,
                slug: product.slug,
                title: product.title,
                thumbnail: product.images[0] ?? "",
                price: product.price,
                saleType: product.saleType,
                quantity: 1,
                combinedShippingAllowed: true,
              },
            ]);
            setBusy(false);
            router.push(`/shop/order-confirmation/${order.id}`);
            return;
          }
          setMessage("장바구니에 담았습니다.");
        }}
      >
        {busy ? "처리 중..." : ctaLabel}
      </MagneticButton>
      {message && !sticky && <p className="text-sm text-[var(--color-info-500)] mt-2">{message}</p>}
    </div>
  );
}
