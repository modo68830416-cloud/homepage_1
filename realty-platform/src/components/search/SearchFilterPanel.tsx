"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { DealType, ListingType, PropertyOption, PropertyType } from "@/types/property";

const DEAL_TYPES: DealType[] = ["매매", "전세", "월세"];
const PROPERTY_TYPES: PropertyType[] = ["아파트", "주택", "오피스텔", "상가", "사무실", "토지"];
// 대구광역시 8개 구·군 — 서비스 주력 상권 기준 "지역" 필터
const CITIES = ["수성구", "중구", "달서구", "동구", "북구", "남구", "서구", "달성군"];
const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "price-asc", label: "가격 낮은순" },
  { value: "price-desc", label: "가격 높은순" },
] as const;
const BUILT_YEAR_OPTIONS = [
  { value: "all", label: "전체 연식" },
  { value: "2020", label: "2020년 이후" },
  { value: "2015", label: "2015년 이후" },
  { value: "2010", label: "2010년 이후" },
] as const;
const BEDROOM_OPTIONS = [
  { value: "all", label: "방 개수 전체" },
  { value: "1", label: "1개 이상" },
  { value: "2", label: "2개 이상" },
  { value: "3", label: "3개 이상" },
  { value: "4", label: "4개 이상" },
] as const;
const FACILITY_OPTIONS: PropertyOption[] = ["주차", "엘리베이터", "반려동물", "에어컨", "붙박이장", "발코니", "CCTV", "보안"];

// listingType 값 ↔ 헤더 글로벌 메뉴가 쓰는 ?type= 쿼리 값 매핑 (분양/급매/경매)
const LISTING_TYPE_TO_PARAM: Record<Exclude<ListingType, "일반">, string> = {
  분양: "new-sale",
  급매: "urgent",
  경매: "auction",
};
const LISTING_TYPES: ListingType[] = ["분양", "급매", "경매"];

export interface SearchFilterValues {
  dealType: DealType | "all";
  propertyType: PropertyType | "all";
  city: string;
  q: string;
  sort: string;
  listingType: ListingType | "all";
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
  minBuiltYear: string;
  minBedroom: string;
  options: PropertyOption[];
}

export function SearchFilterPanel({ initial }: { initial: SearchFilterValues }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [showAdvanced, setShowAdvanced] = useState(
    Boolean(
      initial.minPrice || initial.maxPrice || initial.minArea || initial.maxArea ||
      initial.minBuiltYear !== "all" || initial.minBedroom !== "all" || initial.options.length > 0,
    ),
  );

  function update<K extends keyof SearchFilterValues>(key: K, value: SearchFilterValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);

    const params = new URLSearchParams();
    if (next.dealType !== "all") params.set("dealType", next.dealType);
    if (next.propertyType !== "all") params.set("propertyType", next.propertyType);
    if (next.city !== "all") params.set("city", next.city);
    if (next.q.trim()) params.set("q", next.q.trim());
    if (next.sort !== "latest") params.set("sort", next.sort);
    if (next.listingType !== "all" && next.listingType !== "일반") {
      params.set("type", LISTING_TYPE_TO_PARAM[next.listingType]);
    }
    if (next.minPrice.trim()) params.set("minPrice", next.minPrice.trim());
    if (next.maxPrice.trim()) params.set("maxPrice", next.maxPrice.trim());
    if (next.minArea.trim()) params.set("minArea", next.minArea.trim());
    if (next.maxArea.trim()) params.set("maxArea", next.maxArea.trim());
    if (next.minBuiltYear !== "all") params.set("minBuiltYear", next.minBuiltYear);
    if (next.minBedroom !== "all") params.set("minBedroom", next.minBedroom);
    if (next.options.length > 0) params.set("options", next.options.join(","));

    router.push(`/search?${params.toString()}`, { scroll: false });
  }

  function toggleOption(option: PropertyOption) {
    const next = values.options.includes(option)
      ? values.options.filter((item) => item !== option)
      : [...values.options, option];
    update("options", next);
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

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => update("listingType", "all")}
          className={`rounded-full px-3.5 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
            values.listingType === "all"
              ? "bg-[var(--color-accent-amber)] text-white"
              : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          전체 유형
        </button>
        {LISTING_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => update("listingType", type)}
            className={`rounded-full px-3.5 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
              values.listingType === type
                ? "bg-[var(--color-accent-amber)] text-white"
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

      <button
        type="button"
        onClick={() => setShowAdvanced((v) => !v)}
        className="mt-4 inline-flex items-center gap-1.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--color-primary-600)]"
      >
        <SlidersHorizontal size={14} />
        상세 필터 {showAdvanced ? "숨기기" : "펼치기"}
      </button>

      {showAdvanced && (
        <div className="mt-4 space-y-4 border-t border-[var(--border-default)] pt-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="mb-1.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">가격(만원)</p>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  value={values.minPrice}
                  onChange={(event) => setValues((v) => ({ ...v, minPrice: event.target.value }))}
                  onBlur={() => update("minPrice", values.minPrice)}
                  placeholder="최소"
                  aria-label="최소 가격(만원)"
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] px-2 py-1.5 text-[var(--text-primary)]"
                />
                <span className="text-[var(--text-secondary)]">~</span>
                <input
                  type="number"
                  min={0}
                  value={values.maxPrice}
                  onChange={(event) => setValues((v) => ({ ...v, maxPrice: event.target.value }))}
                  onBlur={() => update("maxPrice", values.maxPrice)}
                  placeholder="최대"
                  aria-label="최대 가격(만원)"
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] px-2 py-1.5 text-[var(--text-primary)]"
                />
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">면적(㎡)</p>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={0}
                  value={values.minArea}
                  onChange={(event) => setValues((v) => ({ ...v, minArea: event.target.value }))}
                  onBlur={() => update("minArea", values.minArea)}
                  placeholder="최소"
                  aria-label="최소 면적(㎡)"
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] px-2 py-1.5 text-[var(--text-primary)]"
                />
                <span className="text-[var(--text-secondary)]">~</span>
                <input
                  type="number"
                  min={0}
                  value={values.maxArea}
                  onChange={(event) => setValues((v) => ({ ...v, maxArea: event.target.value }))}
                  onBlur={() => update("maxArea", values.maxArea)}
                  placeholder="최대"
                  aria-label="최대 면적(㎡)"
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] px-2 py-1.5 text-[var(--text-primary)]"
                />
              </div>
            </div>

            <select
              value={values.minBuiltYear}
              onChange={(event) => update("minBuiltYear", event.target.value)}
              aria-label="준공연도"
              className="self-end rounded-[var(--radius-sm)] border border-[var(--border-default)] px-3 py-2 text-[length:var(--font-size-body-sm)] text-[var(--text-primary)]"
            >
              {BUILT_YEAR_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={values.minBedroom}
              onChange={(event) => update("minBedroom", event.target.value)}
              aria-label="방 개수"
              className="self-end rounded-[var(--radius-sm)] border border-[var(--border-default)] px-3 py-2 text-[length:var(--font-size-body-sm)] text-[var(--text-primary)]"
            >
              {BEDROOM_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-1.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">옵션</p>
            <div className="flex flex-wrap gap-2">
              {FACILITY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleOption(option)}
                  aria-pressed={values.options.includes(option)}
                  className={`rounded-full px-3 py-1.5 text-[length:var(--font-size-body-sm)] font-medium transition ${
                    values.options.includes(option)
                      ? "bg-[var(--color-primary-600)] text-white"
                      : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
