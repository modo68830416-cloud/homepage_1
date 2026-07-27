import type { CreatorAnalyticsPoint } from "@/types/creator-business";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { formatKRW } from "@/lib/utils";

export function RevenueTrendChart({ series }: { series: CreatorAnalyticsPoint[] }) {
  const max = Math.max(...series.map((point) => point.revenue), 1);
  const points = series
    .map((point, index) => {
      const x = (index / (series.length - 1)) * 100;
      const y = 100 - (point.revenue / max) * 90;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <GlassPanel className="rounded-xl p-5">
      <div className="mb-3 flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
          매출 추이 (최근 {series.length}일)
        </p>
        <Badge tone="mock">DEMO</Badge>
      </div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-40 w-full"
        role="img"
        aria-label={`최근 ${series.length}일간 매출 추이 데모 차트, 최고 매출 ${formatKRW(max)}`}
      >
        <polyline points={points} fill="none" stroke="var(--accent-lime)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="mt-4 max-h-32 overflow-y-auto">
        <table className="w-full text-left text-xs">
          <caption className="sr-only">일자별 매출 및 수익 데이터</caption>
          <thead>
            <tr className="text-foreground-subtle">
              <th className="py-1 pr-2 font-medium">날짜</th>
              <th className="py-1 pr-2 font-medium">조회수</th>
              <th className="py-1 pr-2 font-medium">주문</th>
              <th className="py-1 font-medium">매출</th>
            </tr>
          </thead>
          <tbody>
            {series.map((point) => (
              <tr key={point.date} className="text-foreground-muted">
                <td className="py-1 pr-2">{point.date}</td>
                <td className="py-1 pr-2">{point.views.toLocaleString("ko-KR")}</td>
                <td className="py-1 pr-2">{point.orders}</td>
                <td className="py-1">{formatKRW(point.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}
