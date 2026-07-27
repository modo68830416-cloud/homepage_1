"use client";

import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/local-store";
import type { CartItem } from "@/types/commerce";
import { trackCommerceEvent } from "@/lib/commerce-events";

const cartStore = createLocalStore<CartItem[]>("fashion-creator:cart", []);

export function useCart() {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);

  function addItem(productId: string) {
    const current = cartStore.getSnapshot();
    const existing = current.find((item) => item.productId === productId);
    if (existing) {
      cartStore.set(
        current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      cartStore.set([...current, { productId, quantity: 1, addedAt: new Date().toISOString() }]);
    }
    trackCommerceEvent("add_to_cart");
  }

  function removeItem(productId: string) {
    cartStore.set(cartStore.getSnapshot().filter((item) => item.productId !== productId));
  }

  function setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    cartStore.set(
      cartStore.getSnapshot().map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }

  function clearCart() {
    cartStore.clear();
  }

  return { items, addItem, removeItem, setQuantity, clearCart };
}
