"use client";

import { useCallback, useSyncExternalStore } from "react";

const COMPARE_KEY = "realty-platform:compare";
const MAX_COMPARE = 4;
const EMPTY: string[] = [];
const snapshotCache = new Map<string, { raw: string | null; parsed: string[] }>();

function readCompare(): string[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(COMPARE_KEY);
  const cached = snapshotCache.get(COMPARE_KEY);
  if (cached && cached.raw === raw) return cached.parsed;

  let parsed: string[];
  try {
    parsed = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    parsed = EMPTY;
  }
  snapshotCache.set(COMPARE_KEY, { raw, parsed });
  return parsed;
}

function writeCompare(ids: string[]) {
  window.localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("compare-change"));
}

function subscribe(onChange: () => void) {
  window.addEventListener("compare-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("compare-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useCompare() {
  const compareIds = useSyncExternalStore(subscribe, readCompare, () => EMPTY);

  const isComparing = useCallback((propertyId: string) => compareIds.includes(propertyId), [compareIds]);

  const toggle = useCallback((propertyId: string) => {
    const current = readCompare();
    const next = current.includes(propertyId)
      ? current.filter((id) => id !== propertyId)
      : current.length < MAX_COMPARE
        ? [...current, propertyId]
        : current;
    writeCompare(next);
  }, []);

  const remove = useCallback((propertyId: string) => {
    writeCompare(readCompare().filter((id) => id !== propertyId));
  }, []);

  const clear = useCallback(() => {
    writeCompare([]);
  }, []);

  return { compareIds, isComparing, toggle, remove, clear, maxCompare: MAX_COMPARE };
}
