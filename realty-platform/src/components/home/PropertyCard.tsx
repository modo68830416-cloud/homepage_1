"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Property } from "@/types/property";

export function PropertyCard({ property }: { property: Property }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)]">
      <div className="relative">
        <Link href={`/property/${property.id}`} tabIndex={-1}>
          <div
            className={`flex h-48 items-end bg-gradient-to-br p-4 ${property.gradient}`}
          >
            <span className="rounded-full bg-white/15 px-3 py-1 text-[length:var(--font-size-body-sm)] font-medium text-white backdrop-blur-sm">
              {property.dealType}
            </span>
          </div>
        </Link>

        <div className="absolute left-3 top-3 flex gap-1.5">
          {property.badges.map((badge) => (
            <Badge key={badge} type={badge} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setFavorited((value) => !value)}
          aria-pressed={favorited}
          aria-label="관심매물 등록"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-[var(--color-accent-red)] shadow-[var(--shadow-sm)] transition hover:bg-white"
        >
          <Heart size={16} fill={favorited ? "currentColor" : "none"} />
        </button>
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
