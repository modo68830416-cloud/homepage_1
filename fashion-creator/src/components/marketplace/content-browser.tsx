"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { MarketplaceContent, MarketplaceCreator } from "@/types/marketplace";
import { MarketplaceContentCard } from "@/components/marketplace/marketplace-content-card";
import { Stagger } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

const TYPES = ["Image", "Shorts", "Reels", "YouTube", "Blog"];

export function ContentBrowser({
  content,
  creators,
}: {
  content: MarketplaceContent[];
  creators: MarketplaceCreator[];
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return content.filter((item) => {
      if (type && item.type !== type) return false;
      if (!lower) return true;
      return item.title.toLowerCase().includes(lower) || item.tags.some((t) => t.toLowerCase().includes(lower));
    });
  }, [content, query, type]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="콘텐츠 제목 또는 태그 검색"
            aria-label="콘텐츠 검색"
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="콘텐츠 유형 필터">
          <button
            type="button"
            onClick={() => setType(null)}
            aria-pressed={type === null}
            className={cn(
              "min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium",
              type === null ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
            )}
          >
            전체 유형
          </button>
          {TYPES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setType((current) => (current === item ? null : item))}
              aria-pressed={type === item}
              className={cn(
                "min-h-9 rounded-full border px-3 py-1.5 text-xs font-medium",
                type === item ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-foreground-subtle">조건에 맞는 콘텐츠가 없습니다.</p>
      ) : (
        <Stagger className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4" step={0.04} maxDelay={0.6}>
          {filtered.map((item) => (
            <MarketplaceContentCard
              key={item.id}
              content={item}
              creator={creators.find((creator) => creator.id === item.creatorId)}
            />
          ))}
        </Stagger>
      )}
    </div>
  );
}
