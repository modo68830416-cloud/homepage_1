import { Award } from "lucide-react";
import type { CreatorTier } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { TIER_LABEL, TIER_ORDER, describeTierCriteria } from "@/lib/creator-tier";
import { cn } from "@/lib/utils";

export function CreatorTierCard({ tier, credits }: { tier: CreatorTier; credits: number }) {
  return (
    <GlassPanel className="flex flex-col gap-3 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-accent-lime" aria-hidden="true" />
          <p className="text-sm font-semibold text-foreground">크리에이터 등급</p>
        </div>
        <Badge tone="mock">DEMO 규칙</Badge>
      </div>

      <div className="flex items-center gap-1.5" aria-hidden="true">
        {TIER_ORDER.map((item) => (
          <span
            key={item}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              TIER_ORDER.indexOf(item) <= TIER_ORDER.indexOf(tier) ? "bg-accent-lime" : "bg-surface-strong",
            )}
          />
        ))}
      </div>

      <p className="text-lg font-bold text-foreground">{TIER_LABEL[tier]}</p>
      <p className="text-xs text-foreground-subtle">{describeTierCriteria(tier)}</p>
      <p className="text-xs text-foreground-subtle">생성 크레딧 {credits}개 보유</p>
    </GlassPanel>
  );
}
