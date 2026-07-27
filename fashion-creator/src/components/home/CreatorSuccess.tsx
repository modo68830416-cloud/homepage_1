import { DollarSign, Eye, Play, TrendingUp } from "lucide-react";
import { creators } from "@/data/creators";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MetricCard } from "@/components/ui/MetricCard";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/home/SectionHeading";
import { formatCompactNumber, formatKRW } from "@/lib/utils";

const totalViews = creators.reduce((sum, creator) => sum + creator.totalViews, 0);
const totalSales = creators.reduce((sum, creator) => sum + creator.attributedSales, 0);

const popularContent = [
  { id: "content-1", title: "Night Aurora Look", creator: "@juno.styles", views: 128400 },
  { id: "content-2", title: "Office Minimal Fit", creator: "@haeun.look", views: 96200 },
  { id: "content-3", title: "Genderless Layering", creator: "@ray.motion", views: 74800 },
];

export function CreatorSuccess() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Creator Success"
        title="크리에이터가 실제로 만든 성과"
        description="Fashion Creator에서 활동하는 크리에이터의 누적 성과입니다."
      />

      <Reveal className="mb-4 flex">
        <Badge tone="mock">DEMO DATA</Badge>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <MetricCard icon={Eye} label="누적 조회수" value={formatCompactNumber(totalViews)} trend="+18.2%" />
        <MetricCard icon={TrendingUp} label="누적 판매 건수" value="1,240건" trend="+9.4%" />
        <MetricCard icon={DollarSign} label="누적 판매 기여액" value={formatKRW(totalSales)} trend="+12.7%" />
        <MetricCard icon={Play} label="인기 콘텐츠" value="86개" trend="+14개" />
      </div>

      <Stagger className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 md:grid-cols-3">
        {popularContent.map((content) => (
          <GlassPanel key={content.id} className="flex items-center gap-4 rounded-xl p-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              <PlaceholderArt seed={content.id} icon={Play} label={content.title} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{content.title}</p>
              <p className="truncate text-xs text-foreground-subtle">{content.creator}</p>
              <p className="mt-1 text-xs text-foreground-subtle">
                {formatCompactNumber(content.views)} views
              </p>
            </div>
          </GlassPanel>
        ))}
      </Stagger>
    </section>
  );
}
