import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Megaphone } from "lucide-react";
import { marketplaceCampaigns } from "@/data/marketplace";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { ProductCard } from "@/components/ui/ProductCard";
import { CampaignApplicationForm } from "@/components/marketplace/campaign-application-form";
import { LICENSE_LABEL } from "@/types/marketplace";
import { formatKRW } from "@/lib/utils";

type CampaignDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return marketplaceCampaigns.map((campaign) => ({ slug: campaign.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: CampaignDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = marketplaceCampaigns.find((item) => item.slug === slug);
  if (!campaign) return { title: "Campaign" };
  return { title: campaign.title, description: campaign.description };
}

export default async function CampaignDetailPage({ params }: CampaignDetailProps) {
  const { slug } = await params;
  const campaign = marketplaceCampaigns.find((item) => item.slug === slug);
  if (!campaign) notFound();

  const targetProducts = products.filter((product) => campaign.productIds.includes(product.id));

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-lg">
          <PlaceholderArt seed={campaign.id} icon={Megaphone} label={campaign.brandName} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-foreground-subtle">{campaign.brandName}</p>
          <h1 className="text-2xl font-bold text-foreground">{campaign.title}</h1>
        </div>
        <Badge tone="mock" className="ml-auto">
          DEMO
        </Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <p className="text-sm leading-relaxed text-foreground-muted">{campaign.description}</p>

          <GlassPanel className="rounded-xl p-5">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-foreground-subtle">타깃 고객</dt>
                <dd className="text-foreground">{campaign.targetAudience}</dd>
              </div>
              <div>
                <dt className="text-xs text-foreground-subtle">필요 콘텐츠 형식</dt>
                <dd className="text-foreground">{campaign.contentFormats.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-xs text-foreground-subtle">제출 마감</dt>
                <dd className="text-foreground">{new Date(campaign.dueAt).toLocaleDateString("ko-KR")}</dd>
              </div>
              <div>
                <dt className="text-xs text-foreground-subtle">게시 채널 · 유지 기간</dt>
                <dd className="text-foreground">{campaign.postChannels.join(", ")} · {campaign.postDurationDays}일</dd>
              </div>
              <div>
                <dt className="text-xs text-foreground-subtle">라이선스</dt>
                <dd className="text-foreground">{LICENSE_LABEL[campaign.license]}</dd>
              </div>
              <div>
                <dt className="text-xs text-foreground-subtle">지원자 수</dt>
                <dd className="text-foreground">{campaign.applicantCount}명 (DEMO)</dd>
              </div>
            </dl>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs text-foreground-subtle">필수 요소</p>
                <ul className="list-inside list-disc text-xs text-foreground-muted">
                  {campaign.requiredCopy.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-xs text-foreground-subtle">금지 표현</p>
                <ul className="list-inside list-disc text-xs text-foreground-muted">
                  {campaign.prohibitedCopy.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassPanel>

          <div className="rounded-xl border border-border bg-surface p-4 text-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">제작비 · 보상</p>
            {campaign.fixedFee && <p className="text-foreground-muted">기본 제작비 {formatKRW(campaign.fixedFee)}</p>}
            {campaign.performanceRate && <p className="text-foreground-muted">인정 매출의 {campaign.performanceRate}%</p>}
            {campaign.bonusMax && <p className="text-foreground-muted">성과 보너스 최대 {formatKRW(campaign.bonusMax)}</p>}
            <Badge tone="mock" className="mt-2">
              예시 예산
            </Badge>
          </div>

          {targetProducts.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">대상 상품</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {targetProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>

        <CampaignApplicationForm campaign={campaign} />
      </div>
    </div>
  );
}
