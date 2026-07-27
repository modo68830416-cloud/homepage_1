import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { brandCampaigns, creators } from "@/data/creators";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreatorCard } from "@/components/ui/CreatorCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { PageIntro } from "@/components/home/PageIntro";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "인기 크리에이터와 브랜드 캠페인을 둘러보고 참여하세요.",
};

export default function MarketplacePage() {
  return (
    <>
      <PageIntro
        eyebrow="Marketplace"
        title="크리에이터 마켓플레이스"
        description="검증된 크리에이터의 콘텐츠와 브랜드 캠페인을 한곳에서 만나보세요."
      />

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">인기 크리에이터</h2>
          <Button href="/creator" variant="outline" className="text-xs">
            크리에이터로 등록하기
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {creators.map((creator, index) => (
            <Reveal key={creator.id} delay={index * 0.05}>
              <CreatorCard creator={creator} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <h2 className="mb-8 text-xl font-semibold text-foreground">브랜드 캠페인</h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {brandCampaigns.map((campaign, index) => (
            <Reveal key={campaign.id} delay={index * 0.06}>
              <GlassPanel className="flex flex-col gap-3 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 overflow-hidden rounded-lg">
                    <PlaceholderArt seed={campaign.id} icon={Megaphone} label={campaign.brand} />
                  </div>
                  {campaign.isDemo && <Badge tone="mock">DEMO</Badge>}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-foreground-subtle">
                    {campaign.brand}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-foreground">{campaign.title}</h3>
                </div>
                <p className="text-sm text-foreground-muted">{campaign.reward}</p>
                <Button variant="outline" className="mt-1 text-xs" disabled>
                  참여 신청 (준비 중)
                </Button>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
