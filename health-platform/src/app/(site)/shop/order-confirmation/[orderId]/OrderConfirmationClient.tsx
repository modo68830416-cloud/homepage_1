"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ordersStore } from "@/lib/commerce/orders";

export function OrderConfirmationClient({ orderId }: { orderId: string }) {
  const orders = useSyncExternalStore(
    ordersStore.subscribe,
    ordersStore.getSnapshot,
    ordersStore.getServerSnapshot,
  );
  const order = orders.find((candidate) => candidate.id === orderId);

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <p>주문 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-14 text-center">
      <p className="text-4xl mb-4">✓</p>
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-2">
        {order.status === "PAID" ? "주문이 완료되었습니다" : "결제에 실패했습니다"}
      </h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8">주문번호 {order.id}</p>

      <div className="text-left space-y-2 mb-8 text-sm border border-[var(--border-default)] rounded-[var(--radius-md)] p-4">
        {order.lines.map((line) => (
          <div key={line.productId} className="flex justify-between">
            <span>
              {line.title} × {line.quantity}
            </span>
            <span style={{ fontFamily: "var(--font-mono)" }}>{(line.price * line.quantity).toLocaleString("ko-KR")}원</span>
          </div>
        ))}
      </div>

      {order.digitalEntitlements.length > 0 && (
        <p className="text-sm text-[var(--color-info-500)] mb-4">
          디지털 상품 이용 권한이 발급되었습니다. 주문 내역에서 다운로드할 수 있습니다.
        </p>
      )}
      {order.subscriptions.length > 0 && (
        <p className="text-sm text-[var(--color-info-500)] mb-4">
          구독이 시작되었습니다. 다음 결제일은 주문 내역에서 확인할 수 있습니다.
        </p>
      )}

      <Link href="/account/orders" className="text-[var(--color-info-500)] underline">
        주문 내역 보기
      </Link>
    </div>
  );
}
