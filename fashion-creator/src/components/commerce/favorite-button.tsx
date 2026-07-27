"use client";

import { Heart } from "lucide-react";
import { useFavoriteProducts } from "@/lib/favorites-store";
import { useToast } from "@/components/feedback/toast";
import { cn } from "@/lib/utils";

// Small Client Component boundary so widely-reused Server Components like
// ProductCard don't have to become Client Components just to host a favorite
// toggle (Sprint-02 performance goal: minimize Client Component surface).
export function FavoriteButton({
  productId,
  productName,
  className,
}: {
  productId: string;
  productName: string;
  className?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavoriteProducts();
  const { showToast } = useToast();
  const favorite = isFavorite(productId);

  return (
    <button
      type="button"
      onClick={() => {
        toggleFavorite(productId);
        showToast(favorite ? "즐겨찾기에서 제거했습니다" : "즐겨찾기에 추가했습니다");
      }}
      aria-label={favorite ? `${productName} 즐겨찾기 해제` : `${productName} 즐겨찾기 추가`}
      aria-pressed={favorite}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground-subtle backdrop-blur-sm transition-colors hover:text-danger",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", favorite && "fill-danger text-danger")} aria-hidden="true" />
    </button>
  );
}
