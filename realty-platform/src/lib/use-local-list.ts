"use client";

import { useCallback, useSyncExternalStore } from "react";

const MAX_HISTORY = 100;
const EMPTY: string[] = [];

// useSyncExternalStore requires a stable reference when the underlying value
// hasn't changed, so we cache the parsed array per raw localStorage string.
const snapshotCache = new Map<string, { raw: string | null; parsed: string[] }>();

function readList(key: string): string[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(key);
  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw) return cached.parsed;

  let parsed: string[];
  try {
    parsed = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    parsed = EMPTY;
  }
  snapshotCache.set(key, { raw, parsed });
  return parsed;
}

function writeList(key: string, ids: string[]) {
  window.localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("local-list-change", { detail: { key } }));
}

function subscribe(key: string, onChange: () => void) {
  function handleChange(event: Event) {
    const detail = (event as CustomEvent<{ key: string }>).detail;
    if (!detail || detail.key === key) onChange();
  }
  window.addEventListener("local-list-change", handleChange);
  window.addEventListener("storage", handleChange);
  return () => {
    window.removeEventListener("local-list-change", handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

/** localStorage(propertyId 배열) 기반 훅 — 관심매물/최근본매물 등 로그인 없이 브라우저에 저장하는 목록에 사용 */
function useLocalList(key: string) {
  const ids = useSyncExternalStore(
    (onChange) => subscribe(key, onChange),
    () => readList(key),
    () => EMPTY,
  );

  return { ids };
}

export const FAVORITES_KEY = "realty-platform:favorites";
export const HISTORY_KEY = "realty-platform:history";

export function useFavorites() {
  const { ids } = useLocalList(FAVORITES_KEY);

  const isFavorited = useCallback((propertyId: string) => ids.includes(propertyId), [ids]);

  const toggle = useCallback((propertyId: string) => {
    const current = readList(FAVORITES_KEY);
    const next = current.includes(propertyId)
      ? current.filter((id) => id !== propertyId)
      : [propertyId, ...current];
    writeList(FAVORITES_KEY, next);
  }, []);

  return { favoriteIds: ids, isFavorited, toggle };
}

export function useRecentlyViewed() {
  const { ids } = useLocalList(HISTORY_KEY);

  const recordView = useCallback((propertyId: string) => {
    const current = readList(HISTORY_KEY);
    const next = [propertyId, ...current.filter((id) => id !== propertyId)].slice(0, MAX_HISTORY);
    writeList(HISTORY_KEY, next);
  }, []);

  const clear = useCallback(() => {
    writeList(HISTORY_KEY, []);
  }, []);

  return { historyIds: ids, recordView, clear };
}
