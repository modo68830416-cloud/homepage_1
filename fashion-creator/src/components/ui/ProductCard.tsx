import Link from "next/link";
import { Shirt, TrendingUp } from "lucide-react";
import type { Product } from "@/types";
import { Badge, trendLabelText, trendLabelTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { FavoriteButton } from "@/components/commerce/favorite-button";
import { TiltCard } from "@/components/motion/tilt-card";
import { Spotlight } from "@/components/motion/spotlight";
import { formatKRW } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  showTrendDetails?: boolean;
};

export function ProductCard({ product, showTrendDetails = false }: ProductCardProps) {
  return (
    <TiltCard maxTilt={5}>
      <Spotlight className="glass-panel flex h-full flex-col overflow-hidden rounded-xl transition-transform duration-300 ease-[var(--ease-premium)] hover:-translate-y-1">
        <article className="flex h-full flex-col">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Link href={`/trends/${product.slug}`} className="absolute inset-0 block">
              <PlaceholderArt
                seed={product.id}
                icon={Shirt}
                label={product.name}
                className="rounded-none transition-transform duration-500 hover:scale-[1.03]"
              />
            </Link>
            <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
              <Badge tone={trendLabelTone[product.trendLabel]}>
                {trendLabelText[product.trendLabel]}
              </Badge>
              {product.isDemo && <Badge tone="mock">DEMO DATA</Badge>}
            </div>
            <FavoriteButton productId={product.id} productName={product.name} className="absolute right-3 top-3" />
            {showTrendDetails && (
              <div className="pointer-events-none absolute right-3 top-14 flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-[11px] font-semibold text-accent-lime">
                <TrendingUp className="h-3 w-3" aria-hidden="true" />
                {product.trendScore}
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-foreground-subtle">{product.brand}</p>
              <Link href={`/trends/${product.slug}`} className="hover:text-accent-lime">
                <h3 className="mt-1 text-base font-semibold text-foreground">{product.name}</h3>
              </Link>
              <p className="mt-1 text-xs text-foreground-subtle">
                {product.category}
                {showTrendDetails && (
                  <span className="ml-2 text-success">
                    +{product.growthRate}% {product.trendScore >= 90 ? "급상승" : ""}
                  </span>
                )}
              </p>
            </div>
            {showTrendDetails && (
              <p className="line-clamp-2 text-xs leading-relaxed text-foreground-subtle">
                {product.aiSummary}
              </p>
            )}
            <div className="flex items-baseline gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-semibold text-accent-lime">
                    {formatKRW(product.salePrice)}
                  </span>
                  <span className="text-sm text-foreground-subtle line-through">
                    {formatKRW(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-semibold text-foreground">
                  {formatKRW(product.price)}
                </span>
              )}
            </div>
            <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
              <Button href="/models" variant="secondary" className="flex-1 text-xs">
                Try on AI Model
              </Button>
              <Button href="/studio" variant="outline" className="flex-1 text-xs">
                Create Content
              </Button>
            </div>
          </div>
        </article>
      </Spotlight>
    </TiltCard>
  );
}
