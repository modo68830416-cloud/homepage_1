import Link from "next/link";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/motion/Reveal";
import { formatKRW } from "@/lib/utils";

export function CategoryRanking({ products }: { products: Product[] }) {
  const categories = Array.from(new Set(products.map((product) => product.category)));

  const ranking = categories
    .map((category) => {
      const items = products.filter((product) => product.category === category);
      const avgScore = Math.round(items.reduce((sum, item) => sum + item.trendScore, 0) / items.length);
      const topItem = items.slice().sort((a, b) => b.trendScore - a.trendScore)[0];
      return { category, avgScore, itemCount: items.length, topItem };
    })
    .sort((a, b) => b.avgScore - a.avgScore);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal className="mb-8">
        <h2 className="text-xl font-semibold text-foreground">카테고리별 인기 랭킹</h2>
        <p className="mt-1 text-sm text-foreground-subtle">평균 Trend Score 기준 카테고리 순위입니다.</p>
      </Reveal>
      <div className="flex flex-col gap-3">
        {ranking.map((entry, index) => (
          <Reveal key={entry.category} delay={index * 0.04}>
            <GlassPanel className="flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="font-mono text-lg font-semibold text-foreground-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{entry.category}</p>
                  <p className="text-xs text-foreground-subtle">{entry.itemCount}개 아이템</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {entry.topItem && (
                  <Link
                    href={`/trends/${entry.topItem.slug}`}
                    className="hidden text-xs text-foreground-subtle hover:text-foreground sm:inline"
                  >
                    Top: {entry.topItem.name} · {formatKRW(entry.topItem.salePrice ?? entry.topItem.price)}
                  </Link>
                )}
                <Badge tone={entry.avgScore >= 85 ? "bestSeller" : entry.avgScore >= 70 ? "trending" : "mock"}>
                  {entry.avgScore}점
                </Badge>
              </div>
            </GlassPanel>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
