"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import type { DealType, PropertyType } from "@/types/property";

const DEAL_TYPES: DealType[] = ["매매", "전세", "월세"];
const PROPERTY_TYPES: PropertyType[] = ["아파트", "주택", "오피스텔", "상가", "사무실", "토지"];
const CITIES = ["서울", "부산", "경기", "인천"];
const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "price-asc", label: "가격 낮은순" },
  { value: "price-desc", label: "가격 높은순" },
] as const;

export interface SearchFilterValues {
  dealType: DealType | "all";
  propertyType: PropertyType | "all";
  city: string;
  q: string;
  sort: string;
}

export function SearchFilterPanel({ initial }: { initial: SearchFilterValues }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);

  function update<K extends keyof SearchFilterValues>(key: K, value: SearchFilterValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);

    const params = new URLSearchParams();
    if (next.dealType !== "all") params.set("dealType", next.dealType);
    if (next.propertyType !== "all") params.set("propertyType", next.propertyType);
    if (next.city !== "all") params.set("city", next.city);
    if (next.q.trim()) params.set("q", next.q.trim());
    if (next.sort !== "latest") params.set("sort", next.sort);

    router.push(`/search?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-4 shadow-[var(--shadow-sm)] sm:p-5">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          update("q", values.q);
        }}
        className="flex gap-2"
      >
        <input
          value={values.q}
          onChange={(event) => setValues((v) => ({ ...v, q: event.target.value }))}
          type="search"
          placeholder="지역, 매물명으로 검색"
          aria-label="키워드 검색"
          className="flex-1 rounded-full border border-[var(--border-default)] px-4 py-2.5 text-[var(--text-primary)] outline-none focus:border-[var(--color-primary-600)]"
        />
        <button
          type="submit"
          aria-label="검색"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary-600)] px-5 py-2.5 text-white transition hover:opacity-90"
        >
          <Search size={18} />
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => update("dealType", "all")}
          className={`rounded-full px-3.5 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
            values.dealType === "all"
              ? "bg-[var(--color-primary-900)] text-white"
              : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          전체
        </button>
        {DEAL_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => update("dealType", type)}
            className={`rounded-full px-3.5 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
              values.dealType === type
                ? "bg-[var(--color-primary-900)] text-white"
                : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <select
          value={values.propertyType}
          onChange={(event) => update("propertyType", event.target.value as SearchFilterValues["propertyType"])}
          aria-label="건물유형"
          className="rounded-full border border-[var(--border-default)] px-3 py-2 text-[length:var(--font-size-body-sm)] text-[var(--text-primary)]"
        >
          <option value="all">건물유형 전체</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={values.city}
          onChange={(event) => update("city", event.target.value)}
          aria-label="지역"
          className="rounded-full border border-[var(--border-default)] px-3 py-2 text-[length:var(--font-size-body-sm)] text-[var(--text-primary)]"
        >
          <option value="all">지역 전체</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={values.sort}
          onChange={(event) => update("sort", event.target.value)}
          aria-label="정렬"
          className="col-span-2 rounded-full border border-[var(--border-default)] px-3 py-2 text-[length:var(--font-size-body-sm)] text-[var(--text-primary)] sm:col-span-2"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
