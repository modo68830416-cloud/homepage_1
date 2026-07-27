import type { Metadata } from "next";
import { marketplaceContent, marketplaceCreators } from "@/data/marketplace";
import { PageIntro } from "@/components/home/PageIntro";
import { ContentBrowser } from "@/components/marketplace/content-browser";

export const metadata: Metadata = {
  title: "Marketplace Content",
  description: "라이선스로 구매할 수 있는 크리에이터 콘텐츠를 둘러보세요.",
};

export default function MarketplaceContentPage() {
  return (
    <>
      <PageIntro eyebrow="Marketplace" title="콘텐츠 둘러보기" description="사용권을 구매할 수 있는 이미지, 쇼츠, 릴스, 블로그 콘텐츠입니다." />
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <ContentBrowser content={marketplaceContent} creators={marketplaceCreators} />
      </section>
    </>
  );
}
