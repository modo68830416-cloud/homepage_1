"use client";

import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/local-store";
import type { Look } from "@/types/studio";

const wornProductsStore = createLocalStore<string[]>("fashion-creator:studio-worn-products", []);
const recentlyViewedStore = createLocalStore<string[]>("fashion-creator:studio-recently-viewed", []);
const savedLooksStore = createLocalStore<Look[]>("fashion-creator:saved-looks", []);

export function useStudioSession() {
  const wornProductIds = useSyncExternalStore(
    wornProductsStore.subscribe,
    wornProductsStore.getSnapshot,
    wornProductsStore.getServerSnapshot,
  );

  function toggleProduct(productId: string) {
    const current = wornProductsStore.getSnapshot();
    if (current.includes(productId)) {
      wornProductsStore.set(current.filter((id) => id !== productId));
    } else {
      wornProductsStore.set([...current, productId]);
    }
  }

  function clearSession() {
    wornProductsStore.clear();
  }

  return { wornProductIds, toggleProduct, clearSession };
}

export function useRecentlyViewed() {
  const recentlyViewedIds = useSyncExternalStore(
    recentlyViewedStore.subscribe,
    recentlyViewedStore.getSnapshot,
    recentlyViewedStore.getServerSnapshot,
  );

  function markViewed(productId: string) {
    const current = recentlyViewedStore.getSnapshot().filter((id) => id !== productId);
    recentlyViewedStore.set([productId, ...current].slice(0, 8));
  }

  return { recentlyViewedIds, markViewed };
}

export function useSavedLooks() {
  const savedLooks = useSyncExternalStore(
    savedLooksStore.subscribe,
    savedLooksStore.getSnapshot,
    savedLooksStore.getServerSnapshot,
  );

  function saveLook(look: Look) {
    savedLooksStore.set([...savedLooksStore.getSnapshot(), look]);
  }

  function removeLook(id: string) {
    savedLooksStore.set(savedLooksStore.getSnapshot().filter((look) => look.id !== id));
  }

  return { savedLooks, saveLook, removeLook };
}
