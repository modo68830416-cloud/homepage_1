"use client";

import { useCallback, useSyncExternalStore } from "react";
import { inquiries as seedInquiries } from "@/lib/properties/mock-data";
import type { Inquiry } from "@/types/property";

const INQUIRIES_KEY = "realty-platform:inquiries";

// 한 번도 저장된 적 없으면(raw === null) 목업 시드를 그대로 보여주고,
// 실제로 쓰기가 일어날 때 비로소 localStorage에 기록한다 (getSnapshot 안에서는 절대 쓰지 않음).
const snapshotCache = new Map<string, { raw: string | null; parsed: Inquiry[] }>();

function readInquiries(): Inquiry[] {
  if (typeof window === "undefined") return seedInquiries;
  const raw = window.localStorage.getItem(INQUIRIES_KEY);
  const cached = snapshotCache.get(INQUIRIES_KEY);
  if (cached && cached.raw === raw) return cached.parsed;

  let parsed: Inquiry[];
  if (raw === null) {
    parsed = seedInquiries;
  } else {
    try {
      parsed = JSON.parse(raw) as Inquiry[];
    } catch {
      parsed = seedInquiries;
    }
  }
  snapshotCache.set(INQUIRIES_KEY, { raw, parsed });
  return parsed;
}

function writeInquiries(list: Inquiry[]) {
  window.localStorage.setItem(INQUIRIES_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("inquiries-change"));
}

function mutate(update: (current: Inquiry[]) => Inquiry[]) {
  writeInquiries(update(readInquiries()));
}

function subscribe(onChange: () => void) {
  window.addEventListener("inquiries-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("inquiries-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useInquiries() {
  const list = useSyncExternalStore(subscribe, readInquiries, () => seedInquiries);

  const addInquiry = useCallback((input: { name: string; phone: string; message: string; propertyTitle?: string }) => {
    const inquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      status: "접수",
      assignee: "",
      memo: "",
      createdAt: new Date().toISOString(),
      ...input,
    };
    mutate((current) => [inquiry, ...current]);
  }, []);

  const updateInquiry = useCallback((id: string, patch: Partial<Inquiry>) => {
    mutate((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const removeInquiry = useCallback((id: string) => {
    mutate((current) => current.filter((item) => item.id !== id));
  }, []);

  return { inquiries: list, addInquiry, updateInquiry, removeInquiry };
}
