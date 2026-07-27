"use client";

import { useMemo, useState } from "react";
import type { MarketplaceCampaign } from "@/types/marketplace";
import { MarketplaceCampaignCard } from "@/components/marketplace/marketplace-campaign-card";
import { Stagger } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

const COMPENSATION_LABEL = { fixed: "고정형", performance: "성과형", hybrid: "혼합형" } as const;

export function CampaignsBrowser({ campaigns }: { campaigns: MarketplaceCampaign[] }) {
  const [compensation, setCompensation] = useState<"all" | MarketplaceCampaign["compensationType"]>("all");

  const filtered = useMemo(
    () => campaigns.filter((campaign) => compensation === "all" || campaign.compensationType === compensation),
    [campaigns, compensation],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="보상 방식 필터">
        {(["all", "fixed", "performance", "hybrid"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCompensation(item)}
            aria-pressed={compensation === item}
            className={cn(
              "min-h-9 rounded-full border px-3.5 py-1.5 text-xs font-medium",
              compensation === item ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
            )}
          >
            {item === "all" ? "전체" : COMPENSATION_LABEL[item]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-foreground-subtle">조건에 맞는 캠페인이 없습니다.</p>
      ) : (
        <Stagger className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3" step={0.05} maxDelay={0.6}>
          {filtered.map((campaign) => (
            <MarketplaceCampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </Stagger>
      )}
    </div>
  );
}
