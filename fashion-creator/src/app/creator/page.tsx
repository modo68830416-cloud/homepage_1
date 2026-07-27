import type { Metadata } from "next";
import { DollarSign, Eye, Play, ShoppingBag } from "lucide-react";
import { creators, looks } from "@/data/creators";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MetricCard } from "@/components/ui/MetricCard";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { CommerceAnalyticsDashboard } from "@/components/commerce/commerce-analytics-dashboard";
import { formatCompactNumber, formatKRW } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Creator Dashboard",
  description: "콘텐츠 성과와 판매 수익을 확인하는 크리에이터 대시보드.",
};

export default function CreatorPage() {
  const creator = creators[0];
  const look = looks[0];

  return (
    <>
      <MinimalHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div className="mb-2 flex items-center gap-2">
          <h1 className="text-3xl font-bold text-foreground">{creator.displayName}님의 대시보드</h1>
          <Badge tone="mock">MOCK DATA</Badge>
        </div>
        <p className="mb-10 text-sm text-foreground-subtle">
          실제 로그인, 정산, 결제 연동은 이후 단계에서 제공됩니다.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <MetricCard icon={Eye} label="총 조회수" value={formatCompactNumber(creator.totalViews)} trend="+12.4%" />
          <MetricCard
            icon={DollarSign}
            label="누적 판매 기여액"
            value={formatKRW(creator.attributedSales)}
            trend="+8.1%"
          />
          <MetricCard icon={ShoppingBag} label="활성 LOOK" value="6" trend="+2" />
          <MetricCard icon={Play} label="생성된 콘텐츠" value="24" trend="+5" />
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">최근 LOOK 성과</h2>
          <GlassPanel className="flex flex-col gap-4 rounded-xl p-5 sm:flex-row sm:items-center">
            <div className="h-24 w-full shrink-0 overflow-hidden rounded-lg sm:w-32">
              <PlaceholderArt seed={look.slug} icon={Play} label={look.title} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{look.title}</p>
              <p className="text-sm text-foreground-subtle">
                {formatCompactNumber(look.views)} views · {formatKRW(look.totalPrice)}
              </p>
            </div>
            <Button href={`/look/${look.slug}`} variant="outline" className="text-xs">
              View LOOK
            </Button>
          </GlassPanel>
        </div>

        <CommerceAnalyticsDashboard />
      </main>
    </>
  );
}
