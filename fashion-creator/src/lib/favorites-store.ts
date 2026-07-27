"use client";

import { useSyncExternalStore } from "react";
import { useUser } from "@clerk/nextjs";
import { favoriteCreatorsRepository, favoriteProductsRepository } from "@/repositories/favorites-repository";
import { useCloudSync } from "@/lib/cloud-sync";
import {
  getFavoriteCreatorsRemote,
  getFavoriteProductsRemote,
  replaceFavoriteCreatorsRemote,
  replaceFavoriteProductsRemote,
} from "@/db/actions/favorites";

export function useFavoriteProducts() {
  const { isSignedIn } = useUser();
  const favoriteIds = useSyncExternalStore(
    favoriteProductsRepository.subscribe.bind(favoriteProductsRepository),
    favoriteProductsRepository.get.bind(favoriteProductsRepository),
    favoriteProductsRepository.getServerSnapshot.bind(favoriteProductsRepository),
  );

  useCloudSync<string[]>({
    isSignedIn,
    local: favoriteIds,
    setLocal: (value) => favoriteProductsRepository.set(value),
    isEmpty: (value) => value.length === 0,
    load: getFavoriteProductsRemote,
    save: replaceFavoriteProductsRemote,
  });

  function toggleFavorite(productId: string) {
    const current = favoriteProductsRepository.get();
    favoriteProductsRepository.set(
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  }

  function isFavorite(productId: string) {
    return favoriteIds.includes(productId);
  }

  return { favoriteIds, toggleFavorite, isFavorite };
}

export function useFavoriteCreators() {
  const { isSignedIn } = useUser();
  const favoriteIds = useSyncExternalStore(
    favoriteCreatorsRepository.subscribe.bind(favoriteCreatorsRepository),
    favoriteCreatorsRepository.get.bind(favoriteCreatorsRepository),
    favoriteCreatorsRepository.getServerSnapshot.bind(favoriteCreatorsRepository),
  );

  useCloudSync<string[]>({
    isSignedIn,
    local: favoriteIds,
    setLocal: (value) => favoriteCreatorsRepository.set(value),
    isEmpty: (value) => value.length === 0,
    load: getFavoriteCreatorsRemote,
    save: replaceFavoriteCreatorsRemote,
  });

  function toggleFavorite(creatorId: string) {
    const current = favoriteCreatorsRepository.get();
    favoriteCreatorsRepository.set(
      current.includes(creatorId) ? current.filter((id) => id !== creatorId) : [...current, creatorId],
    );
  }

  function isFavorite(creatorId: string) {
    return favoriteIds.includes(creatorId);
  }

  return { favoriteIds, toggleFavorite, isFavorite };
}
