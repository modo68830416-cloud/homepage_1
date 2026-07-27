import { Sparkles } from "lucide-react";
import type { Creator, Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";
import { formatKRW } from "@/lib/utils";

export function CreatorPicks({ products, creators }: { products: Product[]; creators: Creator[] }) {
  const picks = products.filter((product) => product.trendLabel === "creator-pick");

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal className="mb-8">
        <h2 className="text-xl font-semibold text-foreground">Creator Pick</h2>
        <p className="mt-1 text-sm text-foreground-subtle">검증된 크리에이터가 직접 선택한 아이템입니다.</p>
      </Reveal>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {picks.map((product, index) => {
          const creator = creators[index % creators.length];
          return (
            <Reveal key={product.id} delay={index * 0.06}>
              <GlassPanel className="flex flex-col gap-4 rounded-xl p-5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full border border-border-strong">
                    <PlaceholderArt seed={creator.id} icon={Sparkles} label={creator.displayName} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-foreground">{creator.displayName}</p>
                    <p className="truncate text-[11px] text-foreground-subtle">{creator.handle}</p>
                  </div>
                  <Badge tone="creatorPick" className="ml-auto">
                    PICK
                  </Badge>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-foreground-subtle">{product.brand}</p>
                  <p className="mt-1 font-semibold text-foreground">{product.name}</p>
                  <p className="mt-1 text-sm text-accent-lime">
                    {formatKRW(product.salePrice ?? product.price)}
                  </p>
                </div>
              </GlassPanel>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
