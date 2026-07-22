"use client";

import { useSyncExternalStore } from "react";
import { createLocalStorageStore } from "@/lib/utils/local-store";

const wishlistStore = createLocalStorageStore<string[]>("health-platform.wishlist.v1", []);

export function useWishlist() {
  const productIds = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot,
  );

  function isWishlisted(productId: string): boolean {
    return productIds.includes(productId);
  }

  function toggleWishlist(productId: string): void {
    const current = wishlistStore.read();
    wishlistStore.set(
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  }

  return { productIds, isWishlisted, toggleWishlist };
}
