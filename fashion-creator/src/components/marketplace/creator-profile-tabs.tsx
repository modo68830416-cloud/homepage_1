"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { MarketplaceContent, MarketplaceCreator } from "@/types/marketplace";
import type { Look } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MarketplaceContentCard } from "@/components/marketplace/marketplace-content-card";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { formatKRW } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

const TABS = ["Portfolio", "Shoppable Looks", "Marketplace Assets", "Campaign History", "Reviews"] as const;

const DEMO_REVIEWS = [
  { id: "review-1", brand: "NOIR STUDIO", rating: 4.8, comment: "요청한 컨셉을 정확히 반영해주셨고 커뮤니케이션이 빠르셨어요." },
  { id: "review-2", brand: "PULSE WEAR", rating: 4.6, comment: "납기를 잘 지켜주셨습니다. 다음 시즌에도 함께하고 싶어요." },
];

export function CreatorProfileTabs({
  creator,
  content,
  looks,
}: {
  creator: MarketplaceCreator;
  content: MarketplaceContent[];
  looks: Look[];
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Portfolio");

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-3" role="tablist" aria-label="Creator profile tabs">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            onClick={() => setTab(item)}
            className={cn(
              "min-h-9 rounded-full border px-3.5 py-1.5 text-xs font-medium",
              tab === item ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {(tab === "Portfolio" || tab === "Marketplace Assets") && (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {content.length === 0 ? (
            <p className="col-span-full py-8 text-center text-sm text-foreground-subtle">등록된 콘텐츠가 없습니다.</p>
          ) : (
            content.map((item) => <MarketplaceContentCard key={item.id} content={item} creator={creator} />)
          )}
        </div>
      )}

      {tab === "Shoppable Looks" && (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {looks.length === 0 ? (
            <p className="col-span-full py-8 text-center text-sm text-foreground-subtle">공개된 Look이 없습니다.</p>
          ) : (
            looks.map((look) => (
              <GlassPanel key={look.slug} className="flex flex-col overflow-hidden rounded-xl">
                <div className="aspect-[4/5]">
                  <PlaceholderArt seed={look.slug} icon={ShoppingBag} label={look.title} className="rounded-none" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground">{look.title}</p>
                  <p className="text-xs text-foreground-subtle">{formatKRW(look.totalPrice)}</p>
                </div>
              </GlassPanel>
            ))
          )}
        </div>
      )}

      {tab === "Campaign History" && (
        <p className="py-8 text-center text-sm text-foreground-subtle">
          아직 공개된 캠페인 이력이 없습니다. (DEMO)
        </p>
      )}

      {tab === "Reviews" && (
        <div className="flex flex-col gap-3">
          {DEMO_REVIEWS.map((review) => (
            <GlassPanel key={review.id} className="flex flex-col gap-2 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{review.brand}</p>
                <span className="flex items-center gap-1 text-xs text-warning">
                  <Star className="h-3.5 w-3.5 fill-warning" aria-hidden="true" />
                  {review.rating}
                </span>
              </div>
              <p className="text-sm text-foreground-muted">{review.comment}</p>
              <Badge tone="mock" className="self-start">
                DEMO 후기
              </Badge>
            </GlassPanel>
          ))}
        </div>
      )}
    </div>
  );
}
