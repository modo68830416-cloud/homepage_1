import { Flame, Layers, Sparkles, TrendingUp } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import { Reveal } from "@/components/motion/Reveal";

export function RadarSummary({ products }: { products: Product[] }) {
  const avgScore = Math.round(products.reduce((sum, p) => sum + p.trendScore, 0) / products.length);
  const risingCount = products.filter((p) => p.trendLabel === "rising").length;
  const categoryCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
  const bestSellerCount = products.filter((p) => p.trendLabel === "best-seller").length;

  return (
    <div className="mb-10">
      <Reveal className="mb-4 flex">
        <Badge tone="mock">DEMO DATA</Badge>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <MetricCard icon={TrendingUp} label="평균 Trend Score" value={String(avgScore)} trend="+4.2" />
        <MetricCard icon={Flame} label="급상승 아이템" value={`${risingCount}개`} trend="+2" />
        <MetricCard icon={Sparkles} label="베스트셀러" value={`${bestSellerCount}개`} trend="+1" />
        <MetricCard icon={Layers} label="최다 인기 카테고리" value={topCategory} />
      </div>
    </div>
  );
}
