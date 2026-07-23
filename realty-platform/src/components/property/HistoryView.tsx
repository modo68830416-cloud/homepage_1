"use client";

import Link from "next/link";
import { Clock, Trash2 } from "lucide-react";
import { properties } from "@/lib/properties/mock-data";
import { PropertyCard } from "@/components/home/PropertyCard";
import { useRecentlyViewed } from "@/lib/use-local-list";

export function HistoryView() {
  const { historyIds, clear } = useRecentlyViewed();
  const history = historyIds
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is NonNullable<typeof property> => Boolean(property));

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
            최근본매물
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            최근 확인한 순서대로 최대 100건까지 보관됩니다 · 총 {history.length}건
          </p>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] px-4 py-2 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
          >
            <Trash2 size={16} />
            전체 삭제
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {history.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center text-[var(--text-secondary)]">
          <Clock size={32} className="text-[var(--border-default)]" />
          <p className="font-semibold text-[var(--text-primary)]">아직 확인한 매물이 없습니다</p>
          <p className="text-[length:var(--font-size-body-sm)]">
            매물 상세 페이지를 둘러보면 이곳에 자동으로 기록됩니다.
          </p>
          <Link
            href="/search"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-600)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            매물 둘러보기
          </Link>
        </div>
      )}
    </div>
  );
}
