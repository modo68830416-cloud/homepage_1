import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { formatCompactNumber } from "@/lib/utils";

type FunnelStep = { label: string; value: number };

export function AnalyticsFunnel({ steps }: { steps: FunnelStep[] }) {
  return (
    <GlassPanel className="rounded-xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">전환 Funnel</p>
        <Badge tone="mock">DEMO</Badge>
      </div>
      <div className="flex flex-col gap-3">
        {steps.map((step, index) => {
          const prev = index > 0 ? steps[index - 1].value : step.value;
          const conversionRate = prev > 0 ? ((step.value / prev) * 100).toFixed(1) : "100.0";
          const dropRate = prev > 0 ? (100 - Number(conversionRate)).toFixed(1) : "0.0";
          const widthPct = (step.value / steps[0].value) * 100;
          return (
            <div key={step.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-foreground">{step.label}</span>
                <span className="text-foreground-subtle">
                  {formatCompactNumber(step.value)}
                  {index > 0 && <span className="ml-2">전환 {conversionRate}% · 이탈 {dropRate}%</span>}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-strong">
                <div className="h-full rounded-full bg-accent-lime" style={{ width: `${Math.max(4, widthPct)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
