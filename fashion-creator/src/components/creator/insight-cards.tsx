import { AlertTriangle, Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import type { CreatorInsight } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";

const ICON_BY_TYPE = {
  growth: TrendingUp,
  warning: AlertTriangle,
  opportunity: Lightbulb,
  recommendation: Sparkles,
} as const;

export function InsightCards({ insights }: { insights: CreatorInsight[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">AI Insight</p>
        <Badge tone="ai">AI DEMO INSIGHT</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight) => {
          const Icon = ICON_BY_TYPE[insight.type];
          return (
            <GlassPanel key={insight.id} className="flex flex-col gap-2 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-accent-violet" aria-hidden="true" />
                <p className="text-sm font-semibold text-foreground">{insight.title}</p>
              </div>
              <p className="text-xs text-foreground-muted">{insight.description}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[10px] uppercase text-foreground-subtle">신뢰도: {insight.confidence}</span>
                {insight.actionLabel && insight.actionHref && (
                  <Button href={insight.actionHref} variant="outline" className="min-h-8 px-2.5 text-[11px]">
                    {insight.actionLabel}
                  </Button>
                )}
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
}
