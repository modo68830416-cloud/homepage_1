"use client";

import { useSyncExternalStore } from "react";
import { createLocalStore } from "@/lib/local-store";
import type { CommerceEventType, CommerceMetrics } from "@/types/commerce";

// Seeded baseline so the DEMO dashboard doesn't start at zero — these are
// clearly marked DEMO everywhere they're displayed, never presented as real.
const BASELINE: CommerceMetrics = {
  look_opened: 18420,
  product_clicked: 6840,
  add_to_cart: 2310,
  purchase_started: 940,
  qr_scanned: 512,
};

const metricsStore = createLocalStore<CommerceMetrics>("fashion-creator:commerce-metrics", BASELINE);

export function trackCommerceEvent(type: CommerceEventType) {
  const current = metricsStore.getSnapshot();
  metricsStore.set({ ...current, [type]: current[type] + 1 });
}

export function useCommerceMetrics() {
  return useSyncExternalStore(
    metricsStore.subscribe,
    metricsStore.getSnapshot,
    metricsStore.getServerSnapshot,
  );
}
