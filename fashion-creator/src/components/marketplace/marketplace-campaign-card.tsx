import Link from "next/link";
import { Megaphone } from "lucide-react";
import type { MarketplaceCampaign } from "@/types/marketplace";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { formatKRW } from "@/lib/utils";

const STATUS_LABEL: Record<MarketplaceCampaign["status"], string> = {
  draft: "준비 중",
  open: "모집 중",
  reviewing: "심사 중",
  active: "진행 중",
  completed: "완료",
  cancelled: "취소됨",
};

function compensationSummary(campaign: MarketplaceCampaign) {
  const parts: string[] = [];
  if (campaign.fixedFee) parts.push(`기본 제작비 ${formatKRW(campaign.fixedFee)}`);
  if (campaign.performanceRate) parts.push(`인정 매출의 ${campaign.performanceRate}%`);
  if (campaign.bonusMax) parts.push(`성과 보너스 최대 ${formatKRW(campaign.bonusMax)}`);
  return parts;
}

export function MarketplaceCampaignCard({ campaign }: { campaign: MarketplaceCampaign }) {
  return (
    <GlassPanel className="flex flex-col gap-3 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 overflow-hidden rounded-lg">
            <PlaceholderArt seed={campaign.id} icon={Megaphone} label={campaign.brandName} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground-subtle">{campaign.brandName}</p>
            <Link href={`/marketplace/campaigns/${campaign.slug}`} className="text-sm font-semibold text-foreground hover:text-accent-lime">
              {campaign.title}
            </Link>
          </div>
        </div>
        <Badge tone={campaign.status === "open" ? "bestSeller" : "mock"}>{STATUS_LABEL[campaign.status]}</Badge>
      </div>

      <p className="line-clamp-2 text-sm text-foreground-muted">{campaign.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {campaign.contentFormats.map((format) => (
          <span key={format} className="rounded-full bg-surface-strong px-2 py-0.5 text-[10px] text-foreground-muted">
            {format}
          </span>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-surface p-3 text-xs">
        {compensationSummary(campaign).map((line) => (
          <p key={line} className="text-foreground-muted">
            {line}
          </p>
        ))}
        <Badge tone="mock" className="mt-1.5">
          예시 예산
        </Badge>
      </div>

      <div className="flex items-center justify-between text-xs text-foreground-subtle">
        <span>지원자 {campaign.applicantCount}명 (DEMO)</span>
        <span>마감 {new Date(campaign.dueAt).toLocaleDateString("ko-KR")}</span>
      </div>

      <Button href={`/marketplace/campaigns/${campaign.slug}`} variant="outline" className="text-xs">
        캠페인 상세 보기
      </Button>
    </GlassPanel>
  );
}
