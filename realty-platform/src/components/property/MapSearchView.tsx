"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";
import { popularRegions } from "@/lib/properties/mock-data";
import { PropertyCard } from "@/components/home/PropertyCard";
import type { Property } from "@/types/property";

// 실제 지도 API 연동 전까지 지역 핀 배치를 위한 목업 좌표 (% 기준)
const PIN_POSITIONS: Record<string, { top: string; left: string }> = {
  gangnam: { top: "58%", left: "52%" },
  seocho: { top: "62%", left: "47%" },
  haeundae: { top: "86%", left: "68%" },
  seongsu: { top: "50%", left: "55%" },
  pangyo: { top: "64%", left: "58%" },
  songdo: { top: "48%", left: "22%" },
  itaewon: { top: "52%", left: "48%" },
  jamsil: { top: "56%", left: "63%" },
  yeouido: { top: "54%", left: "40%" },
  gwanggyo: { top: "70%", left: "45%" },
};

export function MapSearchView({ properties }: { properties: Property[] }) {
  const [activeId, setActiveId] = useState(popularRegions[0].id);
  const activeRegion = popularRegions.find((region) => region.id === activeId) ?? popularRegions[0];
  const results = properties.filter((property) => property.district.includes(activeRegion.name) || property.city === activeRegion.city).slice(0, 6);

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <h1 className="font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        지도검색
      </h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        지역 핀을 눌러 해당 지역의 매물을 확인하세요.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div
          className="relative h-[420px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] sm:h-[520px]"
          style={{
            background:
              "radial-gradient(120% 100% at 20% 0%, color-mix(in srgb, var(--color-primary-400) 15%, transparent), var(--bg-surface) 60%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {popularRegions.map((region) => {
            const pos = PIN_POSITIONS[region.id] ?? { top: "50%", left: "50%" };
            const active = region.id === activeId;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setActiveId(region.id)}
                aria-pressed={active}
                aria-label={`${region.name} 매물 보기`}
                style={{ top: pos.top, left: pos.left }}
                className={`absolute -translate-x-1/2 -translate-y-full transition ${
                  active ? "z-[var(--z-overlay)] scale-110" : "hover:scale-105"
                }`}
              >
                <span
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold shadow-[var(--shadow-md)] ${
                    active
                      ? "bg-[var(--color-primary-600)] text-white"
                      : "bg-[var(--bg-page)] text-[var(--text-primary)]"
                  }`}
                >
                  <MapPin size={14} />
                  {region.name}
                </span>
              </button>
            );
          })}
        </div>

        <div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 shadow-[var(--shadow-sm)]">
            <p className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              {activeRegion.city} · 선택된 지역
            </p>
            <p className="mt-1 text-lg font-bold text-[var(--text-primary)]">{activeRegion.name}</p>
            <div className="mt-3 flex items-center gap-4 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              <span>매물 {activeRegion.listingCount.toLocaleString()}건</span>
              <span>평당 {activeRegion.avgPricePerPyeong}</span>
            </div>
            <a
              href={`https://map.kakao.com/link/search/${encodeURIComponent(`${activeRegion.city} ${activeRegion.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--color-primary-600)]"
            >
              카카오맵에서 실제 지도 보기
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="mt-4 space-y-3">
            {results.length > 0 ? (
              results.map((property) => (
                <Link
                  key={property.id}
                  href={`/property/${property.id}`}
                  className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border-default)] p-3 transition hover:bg-[var(--bg-surface)]"
                >
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)]">
                    <Image src={property.images[0]} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[var(--text-primary)]">{property.title}</p>
                    <p className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
                      {property.dealType} {property.price}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="rounded-[var(--radius-md)] bg-[var(--bg-surface)] p-4 text-center text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
                이 지역에 등록된 매물이 아직 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-10">
          <h2 className="font-serif text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
            {activeRegion.name} 추천 매물
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
