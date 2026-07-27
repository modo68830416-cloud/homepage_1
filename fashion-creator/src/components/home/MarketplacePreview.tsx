import { Megaphone } from "lucide-react";
import { brandCampaigns, creators } from "@/data/creators";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreatorCard } from "@/components/ui/CreatorCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function MarketplacePreview() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Marketplace"
        title="크리에이터와 브랜드가 만나는 곳"
        description="인기 크리에이터의 콘텐츠를 둘러보고, 브랜드 캠페인에 참여해보세요."
        linkHref="/marketplace"
        linkLabel="Explore Marketplace"
      />

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {creators.map((creator, index) => (
          <Reveal key={creator.id} delay={index * 0.05}>
            <CreatorCard creator={creator} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-3">
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
              <Button href="/marketplace" variant="outline" className="mt-1 text-xs">
                Join Campaign
              </Button>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
