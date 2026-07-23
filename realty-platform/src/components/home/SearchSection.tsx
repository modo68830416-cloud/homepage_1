"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchKeywords } from "@/lib/properties/mock-data";
import type { DealType } from "@/types/property";

const DEAL_TYPES: DealType[] = ["매매", "전세", "월세"];
const PROPERTY_TYPES = ["아파트", "주택", "오피스텔", "상가", "사무실", "토지"];

export function SearchSection() {
  const router = useRouter();
  const [dealType, setDealType] = useState<DealType>("매매");
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [keyword, setKeyword] = useState("");
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    if (!keyword.trim()) return searchKeywords.slice(0, 5);
    return searchKeywords.filter((item) => item.includes(keyword.trim()));
  }, [keyword]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams({
      dealType,
      propertyType,
      ...(keyword.trim() ? { q: keyword.trim() } : {}),
    });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-[var(--radius-2xl)] border border-white/20 bg-white/10 p-4 shadow-[var(--shadow-glass)] backdrop-blur-md sm:p-6"
    >
      <div className="flex flex-wrap gap-2">
        {DEAL_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setDealType(type)}
            className={`rounded-full px-4 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
              dealType === type
                ? "bg-[var(--color-accent-gold)] text-[var(--color-hero-bg-start)]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <select
          value={propertyType}
          onChange={(event) => setPropertyType(event.target.value)}
          aria-label="건물유형"
          className="rounded-full border border-white/20 bg-white/10 px-4 py-3 text-white outline-none [&>option]:text-[var(--color-neutral-900)]"
        >
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div className="relative flex-1">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            type="search"
            placeholder="예: 강남 10억 이하 아파트"
            aria-label="통합 검색"
            className="w-full rounded-full bg-white px-5 py-3 text-[var(--color-neutral-900)] outline-none"
          />
          {focused && suggestions.length > 0 && (
            <ul className="absolute inset-x-0 top-[calc(100%+8px)] z-[var(--z-overlay)] overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-lg)]">
              {suggestions.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onMouseDown={() => setKeyword(item)}
                    className="block w-full px-5 py-2.5 text-left text-[length:var(--font-size-body-sm)] text-[var(--color-neutral-900)] hover:bg-[var(--bg-surface)]"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent-gold)] px-6 py-3 font-semibold text-[var(--color-hero-bg-start)] transition hover:opacity-90"
        >
          <Search size={18} />
          검색
        </button>
      </div>
    </form>
  );
}
