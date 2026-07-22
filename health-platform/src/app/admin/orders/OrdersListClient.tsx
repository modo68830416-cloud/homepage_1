"use client";

import { useSyncExternalStore } from "react";
import { ordersStore } from "@/lib/commerce/orders";

/**
 * Orders are stored client-side in localStorage in this scaffold
 * (docs/strategy/scope-and-non-goals.md §2 — no real backend/DB), so this
 * admin screen reads the same browser storage the checkout flow writes to.
 * A production deployment reads from a shared orders database instead.
 */
export function OrdersListClient() {
  const orders = useSyncExternalStore(
    ordersStore.subscribe,
    ordersStore.getSnapshot,
    ordersStore.getServerSnapshot,
  );

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="text-left border-b border-[var(--border-default)]">
          <th className="py-2">주문번호</th>
          <th className="py-2">상태</th>
          <th className="py-2">품목</th>
          <th className="py-2">합계</th>
          <th className="py-2">일시</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 && (
          <tr>
            <td colSpan={5} className="py-6 text-center text-[var(--text-secondary)]">
              이 브라우저에서 생성된 주문이 없습니다. 스토어에서 결제를 완료하면 여기 표시됩니다.
            </td>
          </tr>
        )}
        {orders.map((order) => (
          <tr key={order.id} className="border-b border-[var(--border-default)]">
            <td className="py-2 pr-4">{order.id}</td>
            <td className="py-2 pr-4">{order.status}</td>
            <td className="py-2 pr-4">{order.lines.map((l) => l.title).join(", ")}</td>
            <td className="py-2 pr-4" style={{ fontFamily: "var(--font-mono)" }}>
              {order.subtotal.toLocaleString("ko-KR")}원
            </td>
            <td className="py-2 text-xs text-[var(--text-secondary)]">
              {new Date(order.createdAt).toLocaleString("ko-KR")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
