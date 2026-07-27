import type { Metadata } from "next";
import { marketplaceCampaigns } from "@/data/marketplace";
import { PageIntro } from "@/components/home/PageIntro";
import { CampaignsBrowser } from "@/components/marketplace/campaigns-browser";

export const metadata: Metadata = {
  title: "Brand Campaigns",
  description: "고정형, 성과형, 혼합형 보상의 브랜드 캠페인에 지원하세요.",
};

export default function MarketplaceCampaignsPage() {
  return (
    <>
      <PageIntro eyebrow="Marketplace" title="브랜드 캠페인" description="보상 방식별로 캠페인을 필터링하고 지원해보세요." />
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <CampaignsBrowser campaigns={marketplaceCampaigns} />
      </section>
    </>
  );
}
