"use client";

import { useMemo, useState } from "react";
import { creatorAnalyticsSeries, creatorInsights } from "@/data/creator-business";
import { Badge } from "@/components/ui/Badge";
import { RevenueTrendChart } from "@/components/creator/revenue-trend-chart";
import { AnalyticsFunnel } from "@/components/creator/analytics-funnel";
import { ChannelPerformance } from "@/components/creator/channel-performance";
import { InsightCards } from "@/components/creator/insight-cards";
import { OpportunityRadar } from "@/components/creator/opportunity-radar";
import { cn } from "@/lib/utils";

const PERIODS = [
  { key: "today", label: "오늘", days: 1 },
  { key: "7d", label: "최근 7일", days: 7 },
  { key: "30d", label: "최근 30일", days: 14 },
  { key: "month", label: "이번 달", days: 14 },
  { key: "last-month", label: "지난달", days: 14 },
  { key: "custom", label: "사용자 지정 (DEMO)", days: 14 },
] as const;

export function CreatorAnalyticsView() {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]["key"]>("30d");
  const activePeriod = PERIODS.find((item) => item.key === period) ?? PERIODS[2];

  const series = useMemo(
    () => creatorAnalyticsSeries.slice(-activePeriod.days),
    [activePeriod.days],
  );

  const totals = series.reduce(
    (acc, point) => ({
      views: acc.views + point.views,
      clicks: acc.clicks + point.clicks,
      addToCarts: acc.addToCarts + point.addToCarts,
      orders: acc.orders + point.orders,
    }),
    { views: 0, clicks: 0, addToCarts: 0, orders: 0 },
  );

  const purchaseStarted = Math.round(totals.addToCarts * 0.55);

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <Badge tone="mock">DEMO DATA</Badge>
      </div>
      <p className="mb-6 max-w-2xl text-sm text-foreground-subtle">
        현재 분석은 DEMO 데이터 기반입니다. 실제 서비스에서는 확정 주문, 취소·반품, 채널 추적 정책을
        반영합니다. 조회수와 판매의 인과관계는 참고용으로만 확인해주세요.
      </p>

      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="기간 필터">
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

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueTrendChart series={series} />
        <AnalyticsFunnel
          steps={[
            { label: "콘텐츠 조회", value: totals.views },
            { label: "링크 클릭", value: totals.clicks },
            { label: "장바구니", value: totals.addToCarts },
            { label: "결제 시작", value: purchaseStarted },
            { label: "인정 주문", value: totals.orders },
          ]}
        />
      </div>

      <div className="mt-6">
        <ChannelPerformance />
      </div>

      <div className="mt-8">
        <InsightCards insights={creatorInsights} />
      </div>

      <div className="mt-8">
        <OpportunityRadar />
      </div>
    </div>
  );
}
