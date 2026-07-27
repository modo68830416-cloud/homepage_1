"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { CategorySidebar } from "@/components/studio/category-sidebar";
import { ModelPreviewPanel } from "@/components/studio/model-preview-panel";
import { LookPanel } from "@/components/studio/look-panel";
import { useSelectedModel } from "@/lib/model-store";
import { useRecentlyViewed, useSavedLooks, useStudioSession } from "@/lib/studio-store";
import { useToast } from "@/components/feedback/toast";
import { cn } from "@/lib/utils";
import type { Look } from "@/types/studio";

const MOBILE_TABS = [
  { key: "products", label: "상품" },
  { key: "preview", label: "코디" },
  { key: "look", label: "Look" },
] as const;

type MobileTabKey = (typeof MOBILE_TABS)[number]["key"];

export function StudioWorkspace({ products }: { products: Product[] }) {
  const [mobileTab, setMobileTab] = useState<MobileTabKey>("preview");
  const { selectedModel } = useSelectedModel();
  const { wornProductIds, toggleProduct } = useStudioSession();
  const { recentlyViewedIds, markViewed } = useRecentlyViewed();
  const { saveLook } = useSavedLooks();
  const { showToast } = useToast();

  const wornProducts = wornProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  function handleToggle(productId: string) {
    toggleProduct(productId);
    markViewed(productId);
  }

  function handleRecommend() {
    const wornCategories = new Set(wornProducts.map((p) => p.category));
    const candidates = products
      .filter((p) => !wornProductIds.includes(p.id))
      .sort((a, b) => {
        const aIsNewCategory = wornCategories.has(a.category) ? 1 : 0;
        const bIsNewCategory = wornCategories.has(b.category) ? 1 : 0;
        if (aIsNewCategory !== bIsNewCategory) return aIsNewCategory - bIsNewCategory;
        return b.trendScore - a.trendScore;
      })
      .slice(0, 3);

    if (candidates.length === 0) {
      showToast("추천할 새로운 상품이 없습니다", "info");
      return;
    }
    candidates.forEach((product) => toggleProduct(product.id));
    showToast("AI가 인기·계절·색상을 고려해 코디를 추천했습니다");
  }

  function handleSave(name: string) {
    const look: Look = {
      id: `look-${Date.now()}`,
      name,
      modelId: selectedModel?.modelId ?? null,
      modelName: selectedModel?.modelName ?? null,
      productIds: wornProductIds,
      totalPrice: wornProducts.reduce((sum, p) => sum + (p.salePrice ?? p.price), 0),
      createdAt: new Date().toISOString(),
      isDemo: true,
    };
    saveLook(look);
    showToast(`${name}을(를) 저장했습니다`);
  }

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 sm:px-8">
      <div className="mb-4 flex gap-2 lg:hidden" role="tablist" aria-label="Studio 패널">
        {MOBILE_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={mobileTab === tab.key}
            onClick={() => setMobileTab(tab.key)}
            className={cn(
              "min-h-11 flex-1 rounded-full border text-sm font-medium transition-colors",
              mobileTab === tab.key
                ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                : "border-border text-foreground-muted",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr_320px] lg:items-start lg:gap-6">
        <div className={cn("lg:block", mobileTab === "products" ? "block" : "hidden")}>
          <CategorySidebar
            products={products}
            wornProductIds={wornProductIds}
            recentlyViewedIds={recentlyViewedIds}
            onToggleProduct={handleToggle}
          />
        </div>

        <div className={cn("min-h-[60vh] lg:block lg:min-h-[70vh]", mobileTab === "preview" ? "block" : "hidden")}>
          <ModelPreviewPanel selectedModel={selectedModel} wornProducts={wornProducts} />
        </div>

        <div className={cn("lg:block", mobileTab === "look" ? "block" : "hidden")}>
          <LookPanel
            wornProducts={wornProducts}
            onRemove={handleToggle}
            onSave={handleSave}
            onRecommend={handleRecommend}
            canSave={wornProducts.length > 0}
          />
        </div>
      </div>
    </div>
  );
}
