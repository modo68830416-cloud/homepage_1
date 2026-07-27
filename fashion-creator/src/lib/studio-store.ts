"use client";

import { useSyncExternalStore } from "react";
import { useUser } from "@clerk/nextjs";
import { lookRepository } from "@/repositories/look-repository";
import { recentlyViewedRepository, wornProductsRepository } from "@/repositories/studio-repository";
import { useCloudSync } from "@/lib/cloud-sync";
import { getSavedLooksRemote, replaceSavedLooksRemote } from "@/db/actions/looks";
import type { Look } from "@/types/studio";

export function useStudioSession() {
  const wornProductIds = useSyncExternalStore(
    wornProductsRepository.subscribe.bind(wornProductsRepository),
    wornProductsRepository.get.bind(wornProductsRepository),
    wornProductsRepository.getServerSnapshot.bind(wornProductsRepository),
  );

  function toggleProduct(productId: string) {
    const current = wornProductsRepository.get();
    if (current.includes(productId)) {
      wornProductsRepository.set(current.filter((id) => id !== productId));
    } else {
      wornProductsRepository.set([...current, productId]);
    }
  }

  function clearSession() {
    wornProductsRepository.clear();
  }

  return { wornProductIds, toggleProduct, clearSession };
}

export function useRecentlyViewed() {
  const recentlyViewedIds = useSyncExternalStore(
    recentlyViewedRepository.subscribe.bind(recentlyViewedRepository),
    recentlyViewedRepository.get.bind(recentlyViewedRepository),
    recentlyViewedRepository.getServerSnapshot.bind(recentlyViewedRepository),
  );

  function markViewed(productId: string) {
    const current = recentlyViewedRepository.get().filter((id) => id !== productId);
    recentlyViewedRepository.set([productId, ...current].slice(0, 8));
  }

  return { recentlyViewedIds, markViewed };
}

export function useSavedLooks() {
  const { isSignedIn } = useUser();
  const savedLooks = useSyncExternalStore(
    lookRepository.subscribe.bind(lookRepository),
    lookRepository.getAll.bind(lookRepository),
    lookRepository.getServerSnapshot.bind(lookRepository),
  );

  useCloudSync<Look[]>({
    isSignedIn,
    local: savedLooks,
    setLocal: (value) => lookRepository.set(value),
    isEmpty: (value) => value.length === 0,
    load: getSavedLooksRemote,
    save: replaceSavedLooksRemote,
  });

  function saveLook(look: Look) {
    lookRepository.upsert(look, "end");
  }

  function removeLook(id: string) {
    lookRepository.remove(id);
  }

  return { savedLooks, saveLook, removeLook };
}
