import type { Metadata } from "next";
import { Play } from "lucide-react";
import { looks } from "@/data/creators";
import { creatorProfile } from "@/data/creator-business";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { CommerceAnalyticsDashboard } from "@/components/commerce/commerce-analytics-dashboard";
import { CreatorWelcome } from "@/components/creator/creator-welcome";
import { CreatorTierCard } from "@/components/creator/creator-tier-card";
import { QuickActions } from "@/components/creator/quick-actions";
import { RecentContentTable } from "@/components/creator/recent-content-table";
import { formatCompactNumber, formatKRW } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Creator Dashboard",
  description: "콘텐츠 성과와 판매 수익을 확인하는 크리에이터 대시보드.",
};

export default function CreatorPage() {
  const look = looks[0];

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <CreatorWelcome profile={creatorProfile} />

      <CommerceAnalyticsDashboard />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">가장 잘 팔린 Look</h2>
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

          <h2 className="mb-4 mt-8 text-lg font-semibold text-foreground">빠른 작업</h2>
          <QuickActions />
        </div>

        <CreatorTierCard tier={creatorProfile.tier} credits={creatorProfile.creditsRemaining} />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">최근 콘텐츠</h2>
        <RecentContentTable />
      </div>
    </div>
  );
}
