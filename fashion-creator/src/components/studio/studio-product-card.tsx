"use client";

import { Check, Heart, Shirt } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { useFavoriteProducts } from "@/lib/favorites-store";
import { useToast } from "@/components/feedback/toast";
import { formatKRW } from "@/lib/utils";
import { cn } from "@/lib/utils";

type StudioProductCardProps = {
  product: Product;
  worn: boolean;
  onToggle: () => void;
};

export function StudioProductCard({ product, worn, onToggle }: StudioProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavoriteProducts();
  const { showToast } = useToast();
  const favorite = isFavorite(product.id);

  function handleToggleFavorite() {
    toggleFavorite(product.id);
    showToast(favorite ? "즐겨찾기에서 제거했습니다" : "즐겨찾기에 추가했습니다");
  }

  return (
    <div
      className={cn(
        "glass-panel flex items-center gap-3 rounded-lg p-2.5 transition-colors",
        worn && "border-accent-lime/60",
      )}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
        <PlaceholderArt seed={product.id} icon={Shirt} label={product.name} />
        {worn && (
          <div className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-lime text-[#0a0a0a]">
            <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-1">
          <p className="truncate text-xs font-medium text-foreground">{product.name}</p>
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={favorite ? `${product.name} 즐겨찾기 해제` : `${product.name} 즐겨찾기 추가`}
            aria-pressed={favorite}
            className="shrink-0 text-foreground-subtle hover:text-danger"
          >
            <Heart className={cn("h-3.5 w-3.5", favorite && "fill-danger text-danger")} aria-hidden="true" />
          </button>
        </div>
        <p className="truncate text-[11px] text-foreground-subtle">{product.brand}</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="text-xs font-semibold text-foreground">
            {formatKRW(product.salePrice ?? product.price)}
          </span>
          <Badge tone="mock" className="!px-1.5 !py-0 !text-[9px]">
            DEMO
          </Badge>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-1">
        <Button variant={worn ? "primary" : "secondary"} className="min-h-8 px-2.5 text-[11px]" onClick={onToggle}>
          {worn ? "착용중" : "입혀보기"}
        </Button>
        <Link
          href={`/trends/${product.slug}`}
          className="text-center text-[11px] text-foreground-subtle hover:text-foreground"
        >
          상세보기
        </Link>
      </div>
    </div>
  );
}
