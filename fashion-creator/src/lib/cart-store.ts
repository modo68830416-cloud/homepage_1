"use client";

import { useSyncExternalStore } from "react";
import { useUser } from "@clerk/nextjs";
import { cartRepository } from "@/repositories/cart-repository";
import { useCloudSync } from "@/lib/cloud-sync";
import { getCartItemsRemote, replaceCartItemsRemote } from "@/db/actions/cart";
import { trackCommerceEvent } from "@/lib/commerce-events";
import type { CartItem } from "@/types/commerce";

export function useCart() {
  const { isSignedIn } = useUser();
  const items = useSyncExternalStore(
    cartRepository.subscribe.bind(cartRepository),
    cartRepository.get.bind(cartRepository),
    cartRepository.getServerSnapshot.bind(cartRepository),
  );

  useCloudSync<CartItem[]>({
    isSignedIn,
    local: items,
    setLocal: (value) => cartRepository.set(value),
    isEmpty: (value) => value.length === 0,
    load: getCartItemsRemote,
    save: replaceCartItemsRemote,
  });

  function addItem(productId: string) {
    const current = cartRepository.get();
    const existing = current.find((item) => item.productId === productId);
    if (existing) {
      cartRepository.set(
        current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      cartRepository.set([...current, { productId, quantity: 1, addedAt: new Date().toISOString() }]);
    }
    trackCommerceEvent("add_to_cart");
  }

  function removeItem(productId: string) {
    cartRepository.set(cartRepository.get().filter((item) => item.productId !== productId));
  }

  function setQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    cartRepository.set(
      cartRepository.get().map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }

  function clearCart() {
    cartRepository.clear();
  }

  return { items, addItem, removeItem, setQuantity, clearCart };
}
