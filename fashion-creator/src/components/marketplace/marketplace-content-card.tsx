import Link from "next/link";
import { Play } from "lucide-react";
import type { MarketplaceContent } from "@/types/marketplace";
import type { MarketplaceCreator } from "@/types/marketplace";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { formatCompactNumber, formatKRW } from "@/lib/utils";

export function MarketplaceContentCard({
  content,
  creator,
}: {
  content: MarketplaceContent;
  creator?: MarketplaceCreator;
}) {
  return (
    <GlassPanel className="flex flex-col overflow-hidden rounded-xl">
      <Link href={`/marketplace/content/${content.slug}`} className="relative block aspect-[4/5]">
        <PlaceholderArt seed={content.thumbnailSeed} icon={Play} label={content.title} className="rounded-none" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone="ai">{content.type}</Badge>
          <Badge tone="mock">DEMO</Badge>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/marketplace/content/${content.slug}`} className="hover:text-accent-lime">
          <h3 className="text-sm font-semibold text-foreground">{content.title}</h3>
        </Link>
        {creator && <p className="text-xs text-foreground-subtle">{creator.displayName} · {creator.handle}</p>}
        <div className="flex flex-wrap gap-1.5">
          {content.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-strong px-2 py-0.5 text-[10px] text-foreground-muted">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-foreground-subtle">
          <span>{formatCompactNumber(content.views)} views (DEMO)</span>
          <span>인정매출 {formatCompactNumber(content.attributedRevenue)}원</span>
        </div>
        <p className="text-sm font-semibold text-foreground">사용권 {formatKRW(content.licensePriceFrom)}부터</p>
        <div className="mt-auto flex gap-2 pt-1">
          <Button href={`/marketplace/content/${content.slug}`} variant="secondary" className="flex-1 text-xs">
            콘텐츠 보기
          </Button>
          <Button href={`/marketplace/content/${content.slug}`} variant="outline" className="flex-1 text-xs">
            사용권 확인
          </Button>
        </div>
      </div>
    </GlassPanel>
  );
}
