import { Eye, MousePointerClick, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import { formatCompactNumber } from "@/lib/utils";

export function LookSalesMetrics({ views }: { views: number }) {
  const clicks = Math.round(views * 0.34);
  const conversionRate = 4.8;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">판매 지표</p>
        <Badge tone="mock">DEMO</Badge>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MetricCard icon={Eye} label="조회수" value={formatCompactNumber(views)} />
        <MetricCard icon={MousePointerClick} label="상품 클릭" value={formatCompactNumber(clicks)} />
        <MetricCard icon={TrendingUp} label="전환율" value={`${conversionRate}%`} />
      </div>
    </div>
  );
}
