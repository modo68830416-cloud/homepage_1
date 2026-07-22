"use client";

import { useSyncExternalStore } from "react";

export type DeviceCapability = "checking" | "full" | "reduced" | "static";

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
}

function detectWebglSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function computeCapability(): DeviceCapability {
  const nav = navigator as NavigatorWithHints;
  const lowCoreCount = (nav.hardwareConcurrency ?? 8) < 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(nav.userAgent);

  if (!detectWebglSupport()) return "static";
  if (lowCoreCount || lowMemory || isMobile) return "reduced";
  return "full";
}

// The capability never changes after the first read within a session, so
// subscribe is a permanent no-op — there is nothing to notify listeners about.
function subscribe() {
  return () => {};
}

function getServerSnapshot(): DeviceCapability {
  return "checking";
}

/**
 * Heuristic device-capability tier for gating heavy 3D/motion work.
 * See docs/motion/performance-budget.md §3 for the rules encoded here.
 */
export function useDeviceCapability(): DeviceCapability {
  return useSyncExternalStore(subscribe, computeCapability, getServerSnapshot);
}
