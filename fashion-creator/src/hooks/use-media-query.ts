"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  function subscribe(callback: () => void) {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  }

  function getSnapshot() {
    return window.matchMedia(query).matches;
  }

  function getServerSnapshot() {
    return false;
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px) and (pointer: fine)");
}

export function useIsTouchDevice() {
  return useMediaQuery("(pointer: coarse)");
}
