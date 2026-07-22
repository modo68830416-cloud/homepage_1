"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/commerce/cart";
import { createOrder } from "@/lib/commerce/orders";
import { MagneticButton } from "@/components/motion/MagneticButton";

/** Effect budget 5 (docs/design/visual-concept.md §2) — deliberately plain, no motion beyond the CTA. */
export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <p>장바구니가 비어있어 결제할 수 없습니다.</p>
      </div>
    );
  }

  async function handlePay() {
    setBusy(true);
    const order = await createOrder(lines);
    clearCart();
    setBusy(false);
    router.push(`/shop/order-confirmation/${order.id}`);
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-14">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-8">결제</h1>

      <div className="space-y-2 mb-6 text-sm">
        {lines.map((line) => (
          <div key={line.productId} className="flex justify-between">
            <span>
              {line.title} × {line.quantity}
            </span>
            <span style={{ fontFamily: "var(--font-mono)" }}>{(line.price * line.quantity).toLocaleString("ko-KR")}원</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-semibold border-t border-[var(--border-default)] pt-4 mb-8">
        <span>총 결제금액</span>
        <span style={{ fontFamily: "var(--font-mono)" }}>{subtotal.toLocaleString("ko-KR")}원</span>
      </div>

      <p className="text-xs text-[var(--text-secondary)] mb-4">
        이 결제는 목업 결제 어댑터로 처리되며 실제 카드 정보를 요청하지 않습니다.
      </p>

      <MagneticButton
        className="w-full rounded-full bg-[var(--color-brand-600)] text-white px-6 py-3 font-semibold disabled:opacity-60"
        onClick={handlePay}
      >
        {busy ? "결제 처리 중..." : `${subtotal.toLocaleString("ko-KR")}원 결제하기`}
      </MagneticButton>
    </div>
  );
}
