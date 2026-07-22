"use client";

/**
 * Minimal external store over localStorage, meant to be read via
 * `useSyncExternalStore` rather than "read once in a useEffect and setState"
 * (the latter trips the `react-hooks/set-state-in-effect` lint rule and
 * causes an avoidable extra render on mount).
 */
export function createLocalStorageStore<T>(key: string, defaultValue: T) {
  const listeners = new Set<() => void>();
  let cachedRaw: string | null = null;
  let cachedValue: T = defaultValue;

  function read(): T {
    const raw = window.localStorage.getItem(key);
    if (!raw) return defaultValue;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return defaultValue;
    }
  }

  // useSyncExternalStore requires getSnapshot to return the same reference
  // when nothing changed, or React re-renders forever comparing new objects.
  function getSnapshot(): T {
    const raw = window.localStorage.getItem(key);
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    cachedValue = read();
    return cachedValue;
  }

  function getServerSnapshot(): T {
    return defaultValue;
  }

  function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    window.addEventListener("storage", listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", listener);
    };
  }

  function set(value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
    listeners.forEach((listener) => listener());
  }

  return { getSnapshot, getServerSnapshot, subscribe, set, read };
}
