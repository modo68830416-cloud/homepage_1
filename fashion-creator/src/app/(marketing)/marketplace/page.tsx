import type { Metadata } from "next";
import { marketplaceCampaigns, marketplaceContent, marketplaceCreators } from "@/data/marketplace";
import { MarketplaceHero } from "@/components/marketplace/marketplace-hero";
import { MarketplaceCreatorCard } from "@/components/marketplace/marketplace-creator-card";
import { MarketplaceContentCard } from "@/components/marketplace/marketplace-content-card";
import { MarketplaceCampaignCard } from "@/components/marketplace/marketplace-campaign-card";
import { HowItWorks } from "@/components/marketplace/how-it-works";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "크리에이터, 콘텐츠, 브랜드 캠페인을 탐색하고 거래하는 Fashion Creator 마켓플레이스.",
};

export default function MarketplacePage() {
  const featuredCreators = marketplaceCreators.slice(0, 4);
  const trendingContent = marketplaceContent.slice(0, 4);
  const openCampaigns = marketplaceCampaigns.filter((campaign) => campaign.status === "open");

  return (
    <>
      <MarketplaceHero />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Featured Creators"
          title="지금 주목받는 크리에이터"
          linkHref="/marketplace/creators"
          linkLabel="크리에이터 전체 보기"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {featuredCreators.map((creator, index) => (
            <Reveal key={creator.id} delay={index * 0.05}>
              <MarketplaceCreatorCard creator={creator} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Trending Content"
          title="지금 인기 있는 마켓플레이스 콘텐츠"
          linkHref="/marketplace/content"
          linkLabel="콘텐츠 전체 보기"
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {trendingContent.map((content, index) => (
            <Reveal key={content.id} delay={index * 0.05}>
              <MarketplaceContentCard
                content={content}
                creator={marketplaceCreators.find((creator) => creator.id === content.creatorId)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Open Brand Campaigns"
          title="지금 지원 가능한 브랜드 캠페인"
          linkHref="/marketplace/campaigns"
          linkLabel="캠페인 전체 보기"
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {openCampaigns.map((campaign, index) => (
            <Reveal key={campaign.id} delay={index * 0.06}>
              <MarketplaceCampaignCard campaign={campaign} />
            </Reveal>
          ))}
        </div>
      </section>

      <HowItWorks />
    </>
  );
}
