"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export function FavoriteButton({ propertyId }: { propertyId: string }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFavorited((value) => !value)}
      aria-pressed={favorited}
      aria-label={favorited ? `${propertyId} 관심매물 해제` : `${propertyId} 관심매물 등록`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
        favorited
          ? "border-[var(--color-accent-red)] bg-[var(--color-accent-red)]/10 text-[var(--color-accent-red)]"
          : "border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
      }`}
    >
      <Heart size={16} fill={favorited ? "currentColor" : "none"} />
      {favorited ? "관심매물 등록됨" : "관심매물 등록"}
    </button>
  );
}
