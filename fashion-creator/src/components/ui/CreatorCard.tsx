import { BadgeCheck, Sparkles } from "lucide-react";
import type { Creator } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { formatCompactNumber, formatKRW } from "@/lib/utils";

export function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <article className="glass-panel flex flex-col gap-4 rounded-xl p-5 transition-transform duration-300 ease-[var(--ease-premium)] hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border-strong">
          <PlaceholderArt seed={creator.id} icon={Sparkles} label={creator.displayName} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-semibold text-foreground">{creator.displayName}</p>
            {creator.isVerified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-accent-blue" aria-label="Verified creator" />
            )}
          </div>
          <p className="truncate text-xs text-foreground-subtle">{creator.handle}</p>
        </div>
      </div>
      <p className="text-sm text-foreground-muted">{creator.specialty}</p>
      <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
        <div>
          <p className="text-foreground-subtle">Views</p>
          <p className="font-semibold text-foreground">{formatCompactNumber(creator.totalViews)}</p>
        </div>
        <div className="text-right">
          <p className="text-foreground-subtle">Attributed sales</p>
          <p className="font-semibold text-accent-lime">{formatKRW(creator.attributedSales)}</p>
        </div>
      </div>
      {creator.isDemo && <Badge tone="mock">DEMO DATA</Badge>}
    </article>
  );
}
