"use client";

// Generic localStorage-backed store read via useSyncExternalStore, following
// the same pattern as realty-platform's use-local-list.ts: no backend yet,
// so persistence lives in the browser and stays reactive across components.
export function createLocalStore<T>(key: string, fallback: T) {
  let cache: T = fallback;
  let cachedRaw: string | null = null;

  function readRaw(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  }

  function getSnapshot(): T {
    const raw = readRaw();
    if (raw === cachedRaw) return cache;
    cachedRaw = raw;
    if (raw === null) {
      cache = fallback;
      return cache;
    }
    try {
      cache = JSON.parse(raw) as T;
    } catch {
      cache = fallback;
    }
    return cache;
  }

  function getServerSnapshot(): T {
    return fallback;
  }

  function subscribe(callback: () => void) {
    function handleStorage(event: StorageEvent) {
      if (event.key === key) callback();
    }
    function handleLocal() {
      callback();
    }
    window.addEventListener("storage", handleStorage);
    window.addEventListener(`local-store:${key}`, handleLocal);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(`local-store:${key}`, handleLocal);
    };
  }

  function set(value: T) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(`local-store:${key}`));
  }

  function clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
    window.dispatchEvent(new Event(`local-store:${key}`));
  }

  return { getSnapshot, getServerSnapshot, subscribe, set, clear };
}
