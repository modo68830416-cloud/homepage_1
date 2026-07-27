"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { MarketplaceCreator } from "@/types/marketplace";
import { MarketplaceCreatorCard } from "@/components/marketplace/marketplace-creator-card";
import { Stagger } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

export function CreatorsBrowser({ creators }: { creators: MarketplaceCreator[] }) {
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState<"all" | MarketplaceCreator["availability"]>("all");

  const specialties = Array.from(new Set(creators.flatMap((creator) => creator.specialties)));
  const [specialty, setSpecialty] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return creators.filter((creator) => {
      if (availability !== "all" && creator.availability !== availability) return false;
      if (specialty && !creator.specialties.includes(specialty)) return false;
      if (!lower) return true;
      return creator.displayName.toLowerCase().includes(lower) || creator.specialties.some((s) => s.toLowerCase().includes(lower));
    });
  }, [creators, query, availability, specialty]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="크리에이터 이름 또는 전문 분야 검색"
            aria-label="크리에이터 검색"
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="전문 분야 필터">
          <button
            type="button"
            onClick={() => setSpecialty(null)}
            aria-pressed={specialty === null}
            className={cn(
              "min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium",
              specialty === null ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
            )}
          >
            전체 분야
          </button>
          {specialties.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSpecialty((current) => (current === item ? null : item))}
              aria-pressed={specialty === item}
              className={cn(
                "min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium",
                specialty === item ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="작업 가능 상태 필터">
          {(["all", "available", "limited", "unavailable"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setAvailability(item)}
              aria-pressed={availability === item}
              className={cn(
                "min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium",
                availability === item ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
              )}
            >
              {item === "all" ? "작업 가능 여부: 전체" : item === "available" ? "작업 가능" : item === "limited" ? "제한적 가능" : "작업 불가"}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-foreground-subtle">조건에 맞는 크리에이터가 없습니다.</p>
      ) : (
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" step={0.04} maxDelay={0.6}>
          {filtered.map((creator) => (
            <MarketplaceCreatorCard key={creator.id} creator={creator} />
          ))}
        </Stagger>
      )}
    </div>
  );
}
