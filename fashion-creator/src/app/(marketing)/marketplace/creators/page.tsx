import type { Metadata } from "next";
import { marketplaceCreators } from "@/data/marketplace";
import { PageIntro } from "@/components/home/PageIntro";
import { CreatorsBrowser } from "@/components/marketplace/creators-browser";

export const metadata: Metadata = {
  title: "Creators",
  description: "전문 분야와 작업 가능 상태로 Fashion Creator 크리에이터를 찾아보세요.",
};

export default function MarketplaceCreatorsPage() {
  return (
    <>
      <PageIntro eyebrow="Marketplace" title="크리에이터 찾기" description="전문 분야, 콘텐츠 형식, 작업 가능 상태로 크리에이터를 검색하세요." />
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <CreatorsBrowser creators={marketplaceCreators} />
      </section>
    </>
  );
}
