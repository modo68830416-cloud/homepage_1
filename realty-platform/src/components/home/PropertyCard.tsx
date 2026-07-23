"use client";

import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CompareButton } from "@/components/property/CompareButton";
import { useFavorites } from "@/lib/use-local-list";
import type { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const { isFavorited, toggle } = useFavorites();
  const favorited = isFavorited(property.id);

  return (
    <div className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)]">
      <div className="relative">
        <Link href={`/property/${property.id}`} tabIndex={-1}>
          <div className="relative flex h-48 items-end overflow-hidden p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.images[0]}
              alt={property.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="relative flex gap-1.5">
              <span className="rounded-full bg-white/15 px-3 py-1 text-[length:var(--font-size-body-sm)] font-medium text-white backdrop-blur-sm">
                {property.dealType}
              </span>
              {property.listingType !== "일반" && (
                <span className="rounded-full bg-[var(--color-accent-amber)] px-3 py-1 text-[length:var(--font-size-body-sm)] font-semibold text-white">
                  {property.listingType}
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className="absolute left-3 top-3 flex gap-1.5">
          {property.badges.map((badge) => (
            <Badge key={badge} type={badge} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => toggle(property.id)}
          aria-pressed={favorited}
          aria-label="관심매물 등록"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-[var(--color-accent-red)] shadow-[var(--shadow-sm)] transition hover:bg-white"
        >
          <Heart size={16} fill={favorited ? "currentColor" : "none"} />
        </button>
        <CompareButton propertyId={property.id} />
      </div>

      <Link href={`/property/${property.id}`} className="block p-4">
        <p className="line-clamp-1 font-bold text-[var(--text-primary)]">
          {property.title}
        </p>
        <p className="mt-1 text-lg font-extrabold text-[var(--color-primary-600)]">
          {property.price}
          {property.monthlyRent ? (
            <span className="ml-1.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-secondary)]">
              {property.monthlyRent}
            </span>
          ) : null}
        </p>
        <p className="mt-2 flex items-center gap-1 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
          <MapPin size={14} />
          {property.city} {property.district} · {property.areaM2}㎡ · {property.floor}
        </p>
      </Link>
    </div>
  );
}
