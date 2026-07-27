"use client";

import { Heart, PackageCheck, ShoppingCart, Sparkles, Wallet, Shirt } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import { useDashboardOverview } from "@/lib/analytics-store";
import { formatKRW } from "@/lib/utils";

// Unlike the fixture-driven panels elsewhere on the dashboard, every number
// here is derived live from the visitor's own Look/Content/Cart/Marketplace
// Repositories via DemoAnalyticsService — it changes as they use the app.
export function MyActivitySummary() {
  const overview = useDashboardOverview();

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">내 활동</h2>
        <Badge tone="mock">DEMO · 실시간 반영</Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={Shirt} label="저장한 Look" value={String(overview.savedLooksCount)} />
        <MetricCard icon={Sparkles} label="콘텐츠 프로젝트" value={String(overview.contentProjectsCount)} />
        <MetricCard icon={ShoppingCart} label="장바구니 상품" value={String(overview.cartItemsCount)} />
        <MetricCard icon={Heart} label="즐겨찾기" value={String(overview.favoriteProductsCount)} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <MetricCard icon={PackageCheck} label="진행중인 제작 의뢰" value={String(overview.activeOrdersCount)} />
        <MetricCard icon={PackageCheck} label="완료된 제작 의뢰" value={String(overview.completedOrdersCount)} />
        <MetricCard icon={Wallet} label="누적 예상 수익 (DEMO)" value={formatKRW(overview.demoRevenueTotal)} />
      </div>
    </div>
  );
}
