import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Play, ShieldCheck } from "lucide-react";
import { marketplaceContent, marketplaceCreators } from "@/data/marketplace";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { ProductCard } from "@/components/ui/ProductCard";
import { ContentLicensePanel } from "@/components/marketplace/content-license-panel";
import { MarketplaceContentCard } from "@/components/marketplace/marketplace-content-card";
import { formatKRW } from "@/lib/utils";

type ContentDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return marketplaceContent.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ContentDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const content = marketplaceContent.find((item) => item.slug === slug);
  if (!content) return { title: "Content" };
  return { title: content.title, description: `사용권 ${formatKRW(content.licensePriceFrom)}부터` };
}

export default async function MarketplaceContentDetailPage({ params }: ContentDetailProps) {
  const { slug } = await params;
  const content = marketplaceContent.find((item) => item.slug === slug);
  if (!content) notFound();

  const creator = marketplaceCreators.find((item) => item.id === content.creatorId);
  const wornProducts = products.filter((product) => content.productIds.includes(product.id));
  const similarContent = marketplaceContent.filter((item) => item.id !== content.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <GlassPanel className="overflow-hidden rounded-2xl" glow>
            <div className="relative aspect-video">
              <PlaceholderArt seed={content.thumbnailSeed} icon={Play} label={content.title} className="rounded-none" />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge tone="ai">{content.type}</Badge>
                <Badge tone="mock">DEMO</Badge>
              </div>
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-foreground">{content.title}</h1>
              {creator && <p className="mt-1 text-sm text-foreground-subtle">{creator.displayName} · {creator.handle}</p>}
              <p className="mt-3 text-sm text-foreground-muted">
                이 콘텐츠는 AI 모델과 데모 아바타를 활용해 제작된 AI 생성 콘텐츠입니다.
              </p>

              <div className="mt-5 rounded-xl border border-border bg-surface p-4 text-xs text-foreground-subtle">
                <div className="mb-2 flex items-center gap-2 text-foreground">
                  <ShieldCheck className="h-4 w-4 text-accent-lime" aria-hidden="true" />
                  권리 안내
                </div>
                <ul className="flex flex-col gap-1">
                  <li>AI 생성 콘텐츠: 예</li>
                  <li>사용된 아바타 유형: {content.isPhotoAvatar ? "사용자 정면 사진 기반 아바타" : "기본 AI 모델"}</li>
                  <li>
                    사진 기반 아바타 상업 이용 동의:{" "}
                    {content.isPhotoAvatar ? (content.commercialConsent ? "동의함" : "동의 없음") : "해당 없음"}
                  </li>
                  <li>재판매 가능 여부: 불가 (사용권 범위 내 사용만 허용)</li>
                  <li>금지된 사용: 원본 재판매, 경쟁 브랜드 도용</li>
                </ul>
              </div>

              {wornProducts.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">착용 상품</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {wornProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </GlassPanel>
        </div>

        <ContentLicensePanel content={content} />
      </div>

      {similarContent.length > 0 && (
        <div className="mt-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">비슷한 콘텐츠</p>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {similarContent.map((item) => (
              <MarketplaceContentCard
                key={item.id}
                content={item}
                creator={marketplaceCreators.find((c) => c.id === item.creatorId)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
