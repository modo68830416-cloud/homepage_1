"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { properties } from "@/lib/properties/mock-data";
import { PropertyCard } from "@/components/home/PropertyCard";
import { useFavorites } from "@/lib/use-local-list";

export function FavoritesView() {
  const { favoriteIds } = useFavorites();
  const favorites = favoriteIds
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is NonNullable<typeof property> => Boolean(property));

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <h1 className="font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        관심매물
      </h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        하트를 누른 매물이 이 브라우저에 저장됩니다 · 총 {favorites.length}건
      </p>

      {favorites.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center text-[var(--text-secondary)]">
          <Heart size={32} className="text-[var(--border-default)]" />
          <p className="font-semibold text-[var(--text-primary)]">아직 관심매물이 없습니다</p>
          <p className="text-[length:var(--font-size-body-sm)]">
            매물 카드나 상세 페이지의 하트 버튼을 눌러 관심매물로 등록해보세요.
          </p>
          <Link
            href="/search"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-600)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            매물 둘러보기
          </Link>
        </div>
      )}
    </div>
  );
}
