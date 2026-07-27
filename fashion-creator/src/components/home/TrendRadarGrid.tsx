"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product, TrendTag } from "@/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/feedback/skeletons";
import { DemoLoader } from "@/components/feedback/demo-loader";
import { Stagger } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

const FILTER_TAGS: TrendTag[] = [
  "여성",
  "남성",
  "신발",
  "가방",
  "액세서리",
  "스트리트",
  "럭셔리",
  "스포츠",
];

export function TrendRadarGrid({ products }: { products: Product[] }) {
  const [activeTag, setActiveTag] = useState<TrendTag | null>(null);
  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return products
      .filter((product) => product.name.toLowerCase().includes(lower) || product.brand.toLowerCase().includes(lower))
      .slice(0, 5);
  }, [products, query]);

  const filtered = useMemo(() => {
    return products
      .filter((product) => (activeTag ? product.tags.includes(activeTag) : true))
      .filter((product) => {
        if (!query.trim()) return true;
        const lower = query.toLowerCase();
        return product.name.toLowerCase().includes(lower) || product.brand.toLowerCase().includes(lower);
      })
      .sort((a, b) => b.trendScore - a.trendScore);
  }, [products, activeTag, query]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="브랜드 또는 상품명 검색"
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
            aria-label="상품 검색"
          />
          {suggestions.length > 0 && query.trim() && (
            <ul className="glass-panel absolute z-20 mt-2 w-full overflow-hidden rounded-xl py-1">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => setQuery(product.name)}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-foreground-muted hover:bg-surface-strong hover:text-foreground"
                  >
                    <span>{product.name}</span>
                    <span className="text-xs text-foreground-subtle">{product.brand}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="카테고리 필터">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              activeTag === null
                ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground",
            )}
            aria-pressed={activeTag === null}
          >
            전체
          </button>
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeTag === tag
                  ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                  : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground",
              )}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-foreground-subtle">
          조건에 맞는 상품이 없습니다. 다른 필터를 선택해보세요.
        </p>
      ) : (
        <DemoLoader
          skeleton={
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCardSkeleton key={product.id} />
              ))}
            </div>
          }
        >
          <Stagger className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3" step={0.04} maxDelay={0.6}>
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} showTrendDetails />
            ))}
          </Stagger>
        </DemoLoader>
      )}
    </div>
  );
}
