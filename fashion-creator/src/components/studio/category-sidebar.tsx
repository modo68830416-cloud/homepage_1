"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/types";
import { STUDIO_CATEGORIES, CATEGORY_TO_STUDIO, type StudioCategory } from "@/types/studio";
import { StudioProductCard } from "@/components/studio/studio-product-card";
import { cn } from "@/lib/utils";

type CategorySidebarProps = {
  products: Product[];
  wornProductIds: string[];
  recentlyViewedIds: string[];
  onToggleProduct: (productId: string) => void;
};

export function CategorySidebar({
  products,
  wornProductIds,
  recentlyViewedIds,
  onToggleProduct,
}: CategorySidebarProps) {
  const [activeCategory, setActiveCategory] = useState<StudioCategory | "전체">("전체");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return products.filter((product) => {
      const studioCategory = CATEGORY_TO_STUDIO[product.category] ?? product.category;
      if (activeCategory !== "전체" && studioCategory !== activeCategory) return false;
      if (!lower) return true;
      return product.name.toLowerCase().includes(lower) || product.brand.toLowerCase().includes(lower);
    });
  }, [products, activeCategory, query]);

  const popular = useMemo(
    () => products.slice().sort((a, b) => b.trendScore - a.trendScore).slice(0, 4),
    [products],
  );

  const recentlyViewed = recentlyViewedIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="상품 검색"
          className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
          aria-label="상품 검색"
        />
      </div>

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="카테고리">
        <button
          type="button"
          onClick={() => setActiveCategory("전체")}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
            activeCategory === "전체"
              ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
              : "border-border text-foreground-muted hover:text-foreground",
          )}
          aria-pressed={activeCategory === "전체"}
        >
          전체
        </button>
        {STUDIO_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
              activeCategory === category
                ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                : "border-border text-foreground-muted hover:text-foreground",
            )}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      {!query && activeCategory === "전체" && (
        <>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              인기 상품
            </p>
            <div className="flex flex-col gap-2">
              {popular.map((product) => (
                <StudioProductCard
                  key={product.id}
                  product={product}
                  worn={wornProductIds.includes(product.id)}
                  onToggle={() => onToggleProduct(product.id)}
                />
              ))}
            </div>
          </div>

          {recentlyViewed.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
                최근 본 상품
              </p>
              <div className="flex flex-col gap-2">
                {recentlyViewed.map((product) => (
                  <StudioProductCard
                    key={product.id}
                    product={product}
                    worn={wornProductIds.includes(product.id)}
                    onToggle={() => onToggleProduct(product.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex-1">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
          {activeCategory === "전체" ? "전체 상품" : activeCategory}
        </p>
        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-xs text-foreground-subtle">상품이 없습니다.</p>
          ) : (
            filtered.map((product) => (
              <StudioProductCard
                key={product.id}
                product={product}
                worn={wornProductIds.includes(product.id)}
                onToggle={() => onToggleProduct(product.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
