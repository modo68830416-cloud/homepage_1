import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { formatKRW } from "@/lib/utils";

export function OpportunityRadar() {
  const rising = products
    .slice()
    .filter((product) => product.trendLabel === "rising")
    .sort((a, b) => b.signals.growthScore - a.signals.growthScore)
    .slice(0, 3);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">Opportunity Radar</p>
        <Badge tone="mock">DEMO</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {rising.map((product) => (
          <GlassPanel key={product.id} className="flex flex-col gap-2 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-foreground-subtle">{product.brand}</p>
            <p className="text-sm font-semibold text-foreground">{product.name}</p>
            <p className="text-xs text-foreground-subtle">
              성장 신호 {product.signals.growthScore} · {formatKRW(product.salePrice ?? product.price)}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button href="/studio" variant="secondary" className="min-h-8 px-2.5 text-[11px]">
                이 상품으로 Look 만들기
              </Button>
              <Button href="/create/new" variant="outline" className="min-h-8 px-2.5 text-[11px]">
                쇼츠 만들기
              </Button>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
