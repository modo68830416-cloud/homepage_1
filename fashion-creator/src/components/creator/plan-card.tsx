"use client";

import { Check } from "lucide-react";
import type { SubscriptionPlan } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn, formatKRW } from "@/lib/utils";

export function PlanCard({
  plan,
  isCurrent,
  onSelect,
}: {
  plan: SubscriptionPlan;
  isCurrent: boolean;
  onSelect: () => void;
}) {
  return (
    <GlassPanel
      className={cn("flex h-full flex-col gap-4 rounded-2xl p-6", plan.isRecommended && "border-accent-lime/50")}
      glow={plan.isRecommended}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
        {plan.isRecommended && <Badge tone="bestSeller">추천</Badge>}
      </div>
      <div>
        <span className="text-2xl font-bold text-foreground">
          {plan.monthlyPrice ? formatKRW(plan.monthlyPrice) : "별도 문의"}
        </span>
        {plan.monthlyPrice !== undefined && <span className="ml-1 text-sm text-foreground-subtle">/ 월</span>}
        <Badge tone="mock" className="ml-2">
          예시 플랜
        </Badge>
      </div>
      <p className="text-xs text-foreground-subtle">월 생성 크레딧 {plan.credits}개</p>
      <ul className="flex flex-1 flex-col gap-2">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        variant={isCurrent ? "secondary" : plan.isRecommended ? "primary" : "outline"}
        className="w-full"
        disabled={isCurrent}
        onClick={onSelect}
      >
        {isCurrent ? "현재 플랜" : "플랜 변경"}
      </Button>
    </GlassPanel>
  );
}
