import Link from "next/link";
import { BadgeCheck, Sparkles, Star } from "lucide-react";
import type { MarketplaceCreator } from "@/types/marketplace";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { formatCompactNumber, formatKRW } from "@/lib/utils";

const AVAILABILITY_LABEL = {
  available: "작업 가능",
  limited: "제한적 가능",
  unavailable: "작업 불가",
} as const;

const AVAILABILITY_TONE = {
  available: "text-success",
  limited: "text-warning",
  unavailable: "text-foreground-subtle",
} as const;

export function MarketplaceCreatorCard({ creator }: { creator: MarketplaceCreator }) {
  return (
    <GlassPanel className="flex flex-col gap-4 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border-strong">
          <PlaceholderArt seed={creator.id} icon={Sparkles} label={creator.displayName} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Link href={`/marketplace/creators/${creator.handle.replace("@", "")}`} className="truncate font-semibold text-foreground hover:text-accent-lime">
              {creator.displayName}
            </Link>
            {creator.isVerified && <BadgeCheck className="h-4 w-4 shrink-0 text-accent-blue" aria-label="Verified" />}
          </div>
          <p className="truncate text-xs text-foreground-subtle">{creator.handle}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-foreground-subtle">
            <Star className="h-3 w-3 fill-warning text-warning" aria-hidden="true" />
            {creator.rating.toFixed(2)} · {creator.completedProjects}건 완료
          </p>
        </div>
      </div>

      <p className="text-sm text-foreground-muted">{creator.specialties.join(", ")}</p>

      <div className="flex flex-wrap gap-1.5">
        {creator.contentFormats.map((format) => (
          <Badge key={format} tone="mock">
            {format}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs">
        <div>
          <p className="text-foreground-subtle">인정 매출 (DEMO)</p>
          <p className="font-semibold text-accent-lime">{formatCompactNumber(creator.attributedRevenue)}원</p>
        </div>
        <div>
          <p className="text-foreground-subtle">평균 응답</p>
          <p className="font-medium text-foreground">{creator.responseTimeLabel}</p>
        </div>
      </div>

      <p className={`text-xs font-medium ${AVAILABILITY_TONE[creator.availability]}`}>
        {AVAILABILITY_LABEL[creator.availability]}
      </p>

      <div className="flex gap-2">
        <Button href={`/marketplace/creators/${creator.handle.replace("@", "")}`} variant="secondary" className="flex-1 text-xs">
          프로필 보기
        </Button>
        <Button href="/marketplace/requests/new" variant="outline" className="flex-1 text-xs">
          제작 문의
        </Button>
      </div>
      <p className="text-[10px] text-foreground-subtle">
        {formatKRW(creator.attributedRevenue)} · DEMO 데이터
      </p>
    </GlassPanel>
  );
}
