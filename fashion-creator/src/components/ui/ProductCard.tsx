import { Shirt } from "lucide-react";
import type { Product } from "@/types";
import { Badge, trendLabelText, trendLabelTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { formatKRW } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group glass-panel flex flex-col overflow-hidden rounded-xl transition-transform duration-300 ease-[var(--ease-premium)] hover:-translate-y-1">
      <div className="relative aspect-[4/5]">
        <PlaceholderArt seed={product.id} icon={Shirt} label={product.name} className="rounded-none" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone={trendLabelTone[product.trendLabel]}>
            {trendLabelText[product.trendLabel]}
          </Badge>
          {product.isDemo && <Badge tone="mock">DEMO DATA</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-foreground-subtle">{product.brand}</p>
          <h3 className="mt-1 text-base font-semibold text-foreground">{product.name}</h3>
          <p className="mt-1 text-xs text-foreground-subtle">{product.category}</p>
        </div>
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
            <span className="text-lg font-semibold text-foreground">{formatKRW(product.price)}</span>
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
  );
}
