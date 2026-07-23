"use client";

import { useCallback, useSyncExternalStore } from "react";
import { banners as seedBanners } from "@/lib/properties/mock-data";
import type { Banner } from "@/types/property";

const BANNERS_KEY = "realty-platform:banners";
const snapshotCache = new Map<string, { raw: string | null; parsed: Banner[] }>();

function readBanners(): Banner[] {
  if (typeof window === "undefined") return seedBanners;
  const raw = window.localStorage.getItem(BANNERS_KEY);
  const cached = snapshotCache.get(BANNERS_KEY);
  if (cached && cached.raw === raw) return cached.parsed;

  let parsed: Banner[];
  if (raw === null) {
    parsed = seedBanners;
  } else {
    try {
      parsed = JSON.parse(raw) as Banner[];
    } catch {
      parsed = seedBanners;
    }
  }
  snapshotCache.set(BANNERS_KEY, { raw, parsed });
  return parsed;
}

function writeBanners(list: Banner[]) {
  window.localStorage.setItem(BANNERS_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("banners-change"));
}

function mutate(update: (current: Banner[]) => Banner[]) {
  writeBanners(update(readBanners()));
}

function subscribe(onChange: () => void) {
  window.addEventListener("banners-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("banners-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useBanners() {
  const banners = useSyncExternalStore(subscribe, readBanners, () => seedBanners);

  const updateBanner = useCallback((id: string, patch: Partial<Banner>) => {
    mutate((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const toggleActive = useCallback((id: string) => {
    mutate((current) =>
      current.map((item) => (item.id === id ? { ...item, active: !item.active } : item)),
    );
  }, []);

  const removeBanner = useCallback((id: string) => {
    mutate((current) => current.filter((item) => item.id !== id));
  }, []);

  const addBanner = useCallback((banner: Banner) => {
    mutate((current) => [banner, ...current]);
  }, []);

  return { banners, updateBanner, toggleActive, removeBanner, addBanner };
}
