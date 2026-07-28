import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Sparkles, Star } from "lucide-react";
import { marketplaceContent, marketplaceCreators } from "@/data/marketplace";
import { looks } from "@/data/creators";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { CreatorProfileTabs } from "@/components/marketplace/creator-profile-tabs";
import { FollowButton } from "@/components/marketplace/follow-button";
import { formatCompactNumber } from "@/lib/utils";

type CreatorProfileProps = {
  params: Promise<{ handle: string }>;
};

function toSlug(handle: string) {
  return handle.replace("@", "");
}

export function generateStaticParams() {
  return marketplaceCreators.map((creator) => ({ handle: toSlug(creator.handle) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: CreatorProfileProps): Promise<Metadata> {
  const { handle } = await params;
  const creator = marketplaceCreators.find((item) => toSlug(item.handle) === handle);
  if (!creator) return { title: "Creator" };
  return { title: creator.displayName, description: creator.bio };
}

export default async function CreatorProfilePage({ params }: CreatorProfileProps) {
  const { handle } = await params;
  const creator = marketplaceCreators.find((item) => toSlug(item.handle) === handle);
  if (!creator) notFound();

  const creatorContent = marketplaceContent.filter((item) => item.creatorId === creator.id);
  const creatorLooks = looks.filter((look) => look.creatorHandle === creator.handle);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border-strong">
            <PlaceholderArt seed={creator.id} icon={Sparkles} label={creator.displayName} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">{creator.displayName}</h1>
              {creator.isVerified && <BadgeCheck className="h-5 w-5 text-accent-blue" aria-label="Verified" />}
            </div>
            <p className="text-sm text-foreground-subtle">{creator.handle}</p>
            <p className="mt-2 max-w-md text-sm text-foreground-muted">{creator.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {creator.specialties.map((s) => (
                <Badge key={s} tone="mock">
                  {s}
                </Badge>
              ))}
              {creator.contentFormats.map((f) => (
                <Badge key={f} tone="ai">
                  {f}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <Button href="/marketplace/requests/new" variant="primary">
            제작 의뢰하기
          </Button>
          <FollowButton creatorId={creator.id} displayName={creator.displayName} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4 text-center">
          <p className="flex items-center justify-center gap-1 text-lg font-semibold text-foreground">
            <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
            {creator.rating.toFixed(2)}
          </p>
          <p className="text-xs text-foreground-subtle">브랜드 평가 (DEMO)</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 text-center">
          <p className="text-lg font-semibold text-foreground">{creator.completedProjects}건</p>
          <p className="text-xs text-foreground-subtle">완료 프로젝트</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 text-center">
          <p className="text-lg font-semibold text-accent-lime">{formatCompactNumber(creator.attributedRevenue)}원</p>
          <p className="text-xs text-foreground-subtle">인정 매출 (DEMO)</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 text-center">
          <p className="text-lg font-semibold text-foreground">{creator.responseTimeLabel}</p>
          <p className="text-xs text-foreground-subtle">평균 응답 시간</p>
        </div>
      </div>

      <div className="mt-10">
        <CreatorProfileTabs creator={creator} content={creatorContent} looks={creatorLooks} />
      </div>
    </div>
  );
}
