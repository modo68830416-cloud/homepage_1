"use client";

import { products } from "@/lib/products/data";
import { paymentAdapter } from "@/lib/payments/adapter";
import { createLocalStorageStore } from "@/lib/utils/local-store";
import type { CartLine } from "./cart";
import { issueEntitlement, type DigitalEntitlement } from "./digital-entitlements";

export type OrderStatus = "PAID" | "FAILED";

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  lines: CartLine[];
  subtotal: number;
  transactionId?: string;
  digitalEntitlements: DigitalEntitlement[];
  /** SUBSCRIPTION lines get one synthetic subscription record per line, tracked separately. */
  subscriptions: { productId: string; nextBillingDate: string; status: "ACTIVE" | "PAUSED" | "CANCELLED" }[];
}

export const ordersStore = createLocalStorageStore<Order[]>("health-platform.orders.v1", []);

export function getOrders(): Order[] {
  return ordersStore.read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getOrderById(orderId: string): Order | undefined {
  return ordersStore.read().find((order) => order.id === orderId);
}

/**
 * Mock checkout: charges via the payment adapter, issues digital
 * entitlements, and opens subscription records — everything TASK-007 §4
 * requires for DIRECT/DIGITAL/SUBSCRIPTION, without a real backend
 * (docs/strategy/scope-and-non-goals.md §2 — no real PG/DB in this scope).
 */
export async function createOrder(lines: CartLine[]): Promise<Order> {
  const id = `order_${Date.now()}`;
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);

  const result = await paymentAdapter.charge({
    amountKrw: subtotal,
    orderId: id,
    description: lines.map((line) => line.title).join(", "),
  });

  const digitalEntitlements: DigitalEntitlement[] = [];
  const subscriptions: Order["subscriptions"] = [];

  for (const line of lines) {
    const fullProduct = products.find((product) => product.id === line.productId);
    if (fullProduct?.saleType === "DIGITAL" && result.success) {
      digitalEntitlements.push(issueEntitlement(fullProduct));
    }
    if (fullProduct?.saleType === "SUBSCRIPTION" && result.success) {
      const nextBillingDate = new Date(
        Date.now() + fullProduct.subscription.intervalDays * 24 * 60 * 60 * 1000,
      ).toISOString();
      subscriptions.push({ productId: fullProduct.id, nextBillingDate, status: "ACTIVE" });
    }
  }

  const order: Order = {
    id,
    createdAt: new Date().toISOString(),
    status: result.success ? "PAID" : "FAILED",
    lines,
    subtotal,
    transactionId: result.transactionId,
    digitalEntitlements,
    subscriptions,
  };

  ordersStore.set([...ordersStore.read(), order]);
  return order;
}

export function updateSubscriptionStatus(
  orderId: string,
  productId: string,
  status: "ACTIVE" | "PAUSED" | "CANCELLED",
) {
  const updated = ordersStore.read().map((order) =>
    order.id === orderId
      ? {
          ...order,
          subscriptions: order.subscriptions.map((sub) =>
            sub.productId === productId ? { ...sub, status } : sub,
          ),
        }
      : order,
  );
  ordersStore.set(updated);
}
