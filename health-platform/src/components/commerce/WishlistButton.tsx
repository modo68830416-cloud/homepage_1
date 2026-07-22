"use client";

import { useWishlist } from "@/lib/commerce/wishlist";

export function WishlistButton({ productId }: { productId: string }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(productId);

  return (
    <button
      type="button"
      aria-label={active ? "찜 목록에서 제거" : "찜하기"}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        toggleWishlist(productId);
      }}
      className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-surface-0)]/90 shadow-[var(--shadow-sm)]"
    >
      <span aria-hidden style={{ color: active ? "var(--color-danger-500)" : "var(--text-secondary)" }}>
        {active ? "♥" : "♡"}
      </span>
    </button>
  );
}
