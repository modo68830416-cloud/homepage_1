"use client";

import { useSyncExternalStore } from "react";
import { ordersStore, updateSubscriptionStatus } from "@/lib/commerce/orders";
import { SaleTypeBadge } from "@/components/commerce/SaleTypeBadge";

export default function OrdersPage() {
  const orders = useSyncExternalStore(
    ordersStore.subscribe,
    ordersStore.getSnapshot,
    ordersStore.getServerSnapshot,
  );

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p>아직 주문 내역이 없습니다.</p>
      </div>
    );
  }

  const sortedOrders = [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-8">주문 내역</h1>
      <div className="space-y-6">
        {sortedOrders.map((order) => (
          <div key={order.id} className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-5">
            <div className="flex justify-between text-sm text-[var(--text-secondary)] mb-3">
              <span>{order.id}</span>
              <span>{new Date(order.createdAt).toLocaleString("ko-KR")}</span>
            </div>
            <div className="space-y-2">
              {order.lines.map((line) => (
                <div key={line.productId} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <SaleTypeBadge saleType={line.saleType} />
                    {line.title} × {line.quantity}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>
                    {(line.price * line.quantity).toLocaleString("ko-KR")}원
                  </span>
                </div>
              ))}
            </div>

            {order.digitalEntitlements.map((entitlement) => (
              <div key={entitlement.productId} className="mt-3 text-sm bg-[var(--color-surface-50)] rounded-[var(--radius-sm)] p-3">
                남은 다운로드 {entitlement.downloadsRemaining ?? "무제한"}회 ·{" "}
                {entitlement.expiresAt ? `${new Date(entitlement.expiresAt).toLocaleDateString("ko-KR")}까지 이용 가능` : "기간 제한 없음"}
                <button type="button" className="ml-3 text-[var(--color-info-500)] underline">
                  다운로드
                </button>
              </div>
            ))}

            {order.subscriptions.map((sub) => (
              <div key={sub.productId} className="mt-3 text-sm bg-[var(--color-surface-50)] rounded-[var(--radius-sm)] p-3 flex items-center justify-between">
                <span>
                  상태: {sub.status === "ACTIVE" ? "구독 중" : sub.status === "PAUSED" ? "일시정지" : "해지됨"} · 다음
                  결제일 {new Date(sub.nextBillingDate).toLocaleDateString("ko-KR")}
                </span>
                {sub.status !== "CANCELLED" && (
                  <span className="flex gap-3">
                    <button
                      type="button"
                      className="text-[var(--color-info-500)] underline"
                      onClick={() =>
                        updateSubscriptionStatus(order.id, sub.productId, sub.status === "ACTIVE" ? "PAUSED" : "ACTIVE")
                      }
                    >
                      {sub.status === "ACTIVE" ? "일시정지" : "재개"}
                    </button>
                    <button
                      type="button"
                      className="text-[var(--color-danger-500)] underline"
                      onClick={() => updateSubscriptionStatus(order.id, sub.productId, "CANCELLED")}
                    >
                      해지
                    </button>
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
