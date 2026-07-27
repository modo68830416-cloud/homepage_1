"use client";

import { useSyncExternalStore } from "react";
import { commerceMetricsRepository } from "@/repositories/commerce-metrics-repository";
import type { CommerceEventType } from "@/types/commerce";

export function trackCommerceEvent(type: CommerceEventType) {
  const current = commerceMetricsRepository.get();
  commerceMetricsRepository.set({ ...current, [type]: current[type] + 1 });
}

export function useCommerceMetrics() {
  return useSyncExternalStore(
    commerceMetricsRepository.subscribe.bind(commerceMetricsRepository),
    commerceMetricsRepository.get.bind(commerceMetricsRepository),
    commerceMetricsRepository.getServerSnapshot.bind(commerceMetricsRepository),
  );
}
