"use client";

import { useSyncExternalStore } from "react";
import { cartRepository } from "@/repositories/cart-repository";
import { favoriteProductsRepository } from "@/repositories/favorites-repository";
import { contentRepository } from "@/repositories/content-repository";
import { lookRepository } from "@/repositories/look-repository";
import { marketplaceOrderRepository } from "@/repositories/marketplace-repository";
import { commerceMetricsRepository } from "@/repositories/commerce-metrics-repository";
import { DemoAnalyticsService, type DashboardOverview } from "@/services/demo-analytics-service";

// Every value below comes from the useSyncExternalStore return, never a
// direct repository .get()/.getAll() call — the server snapshot (empty/zero)
// must be what both SSR and the client's first paint render, or hydration
// mismatches the same way the PointerGlow bug did.
export function useDashboardOverview(): DashboardOverview {
  const savedLooks = useSyncExternalStore(
    lookRepository.subscribe.bind(lookRepository),
    lookRepository.getAll.bind(lookRepository),
    lookRepository.getServerSnapshot.bind(lookRepository),
  );
  const contentProjects = useSyncExternalStore(
    contentRepository.subscribe.bind(contentRepository),
    contentRepository.getAll.bind(contentRepository),
    contentRepository.getServerSnapshot.bind(contentRepository),
  );
  const cartItems = useSyncExternalStore(
    cartRepository.subscribe.bind(cartRepository),
    cartRepository.get.bind(cartRepository),
    cartRepository.getServerSnapshot.bind(cartRepository),
  );
  const favoriteProducts = useSyncExternalStore(
    favoriteProductsRepository.subscribe.bind(favoriteProductsRepository),
    favoriteProductsRepository.get.bind(favoriteProductsRepository),
    favoriteProductsRepository.getServerSnapshot.bind(favoriteProductsRepository),
  );
  const orders = useSyncExternalStore(
    marketplaceOrderRepository.subscribe.bind(marketplaceOrderRepository),
    marketplaceOrderRepository.getAll.bind(marketplaceOrderRepository),
    marketplaceOrderRepository.getServerSnapshot.bind(marketplaceOrderRepository),
  );
  const commerceMetrics = useSyncExternalStore(
    commerceMetricsRepository.subscribe.bind(commerceMetricsRepository),
    commerceMetricsRepository.get.bind(commerceMetricsRepository),
    commerceMetricsRepository.getServerSnapshot.bind(commerceMetricsRepository),
  );

  return DemoAnalyticsService.computeOverview({
    savedLooksCount: savedLooks.length,
    contentProjectsCount: contentProjects.length,
    favoriteProductsCount: favoriteProducts.length,
    cartItems,
    orders,
    commerceMetrics,
  });
}
