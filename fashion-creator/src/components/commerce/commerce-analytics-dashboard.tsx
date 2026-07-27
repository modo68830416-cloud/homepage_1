"use client";

import { useState } from "react";
import { DollarSign, MousePointerClick, Percent, ShoppingCart, Wallet } from "lucide-react";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MetricCard } from "@/components/ui/MetricCard";
import { useCommerceMetrics } from "@/lib/commerce-events";
import { cn, formatCompactNumber, formatKRW } from "@/lib/utils";

const PERIODS = [
  { key: "7d", label: "7일" },
  { key: "30d", label: "30일" },
  { key: "all", label: "전체" },
] as const;

type PeriodKey = (typeof PERIODS)[number]["key"];

const PERIOD_MULTIPLIER: Record<PeriodKey, number> = { "7d": 0.18, "30d": 0.62, all: 1 };

// Deterministic relative heights for the DEMO trend chart — fixed so the
// chart doesn't shift on every render/hydration.
const CHART_BARS = [38, 52, 44, 61, 58, 70, 65, 80, 74, 90, 85, 96];

const AVG_ORDER_VALUE = 138000;
const CREATOR_COMMISSION = 0.15;

export function CommerceAnalyticsDashboard() {
  const [period, setPeriod] = useState<PeriodKey>("30d");
  const metrics = useCommerceMetrics();
  const factor = PERIOD_MULTIPLIER[period];

  const clicks = Math.round(metrics.product_clicked * factor);
  const carts = Math.round(metrics.add_to_cart * factor);
  const purchases = Math.round(metrics.purchase_started * factor);
  const opens = Math.max(1, Math.round(metrics.look_opened * factor));
  const conversionRate = ((purchases / opens) * 100).toFixed(1);
  const estimatedRevenue = purchases * AVG_ORDER_VALUE;
  const creatorRevenue = Math.round(estimatedRevenue * CREATOR_COMMISSION);

  const productPerformance = products
    .slice()
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 5)
    .map((product) => ({
      product,
      clicks: Math.round((product.trendScore / 100) * clicks * 0.4),
      sales: Math.round((product.trendScore / 100) * purchases * 0.4),
    }));

  return (
    <div className="mt-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">Commerce Analytics</h2>
          <Badge tone="mock">DEMO</Badge>
        </div>
        <div className="flex gap-2" role="group" aria-label="기간 필터">
          {PERIODS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setPeriod(item.key)}
              aria-pressed={period === item.key}
              className={cn(
                "min-h-9 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                period === item.key
                  ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                  : "border-border text-foreground-muted hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <MetricCard icon={MousePointerClick} label="클릭수" value={formatCompactNumber(clicks)} trend="+6.2%" />
        <MetricCard icon={ShoppingCart} label="장바구니" value={formatCompactNumber(carts)} trend="+4.8%" />
        <MetricCard icon={DollarSign} label="구매" value={formatCompactNumber(purchases)} trend="+3.1%" />
        <MetricCard icon={Percent} label="전환율" value={`${conversionRate}%`} trend="+0.4%p" />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-6">
        <MetricCard icon={Wallet} label="예상 수익" value={formatKRW(estimatedRevenue)} trend="+9.4%" />
        <MetricCard icon={Wallet} label="Creator 수익 (15%)" value={formatKRW(creatorRevenue)} trend="+9.4%" />
      </div>

      <GlassPanel className="mt-6 rounded-xl p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
          기간별 구매 추이
        </p>
        <div className="flex h-32 items-end gap-1.5" role="img" aria-label="기간별 구매 추이 데모 차트">
          {CHART_BARS.map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-lime/40 to-accent-lime"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </GlassPanel>

      <GlassPanel className="mt-6 rounded-xl p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
          상품별 성과
        </p>
        <div className="flex flex-col divide-y divide-border">
          {productPerformance.map(({ product, clicks: productClicks, sales }) => (
            <div key={product.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span className="truncate text-foreground-muted">{product.name}</span>
              <div className="flex shrink-0 gap-4 text-xs text-foreground-subtle">
                <span>클릭 {formatCompactNumber(productClicks)}</span>
                <span>판매 {formatCompactNumber(sales)}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
