import { Sparkles, UserRound } from "lucide-react";
import type { CreatorProfile } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { TIER_LABEL } from "@/lib/creator-tier";

export function CreatorWelcome({ profile }: { profile: CreatorProfile }) {
  return (
    <GlassPanel className="flex flex-col gap-5 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border-strong">
          <PlaceholderArt seed={profile.id} icon={UserRound} label={profile.displayName} />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">{profile.displayName}님, 안녕하세요</h1>
            <Badge tone="ai">{TIER_LABEL[profile.tier]}</Badge>
          </div>
          <p className="mt-1 text-sm text-foreground-subtle">
            {profile.subscriptionPlan} 플랜 · 생성 크레딧 {profile.creditsRemaining}개 남음
          </p>
        </div>
      </div>
      <Button href="/create/new" variant="primary">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        새 콘텐츠 만들기
      </Button>
    </GlassPanel>
  );
}
