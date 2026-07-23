"use client";

import Link from "next/link";
import Image from "next/image";
import { Scale, X } from "lucide-react";
import { useCompare } from "@/lib/use-compare";
import type { Property } from "@/types/property";

const ROWS: { label: string; value: (p: Property) => string }[] = [
  { label: "거래유형", value: (p) => `${p.dealType}${p.listingType !== "일반" ? ` · ${p.listingType}` : ""}` },
  { label: "매물종류", value: (p) => p.propertyType },
  { label: "지역", value: (p) => `${p.city} ${p.district}` },
  { label: "면적", value: (p) => `${p.areaM2}㎡ (${Math.round(p.areaM2 / 3.3058)}평)` },
  { label: "방/욕실", value: (p) => `방 ${p.bedroomCount}개 / 욕실 ${p.bathroomCount}개` },
  { label: "층수", value: (p) => p.floor },
  { label: "준공연도", value: (p) => `${p.builtYear}년` },
  { label: "관리비", value: (p) => p.maintenanceFee },
  { label: "입주 가능일", value: (p) => p.moveInDate },
  { label: "옵션", value: (p) => (p.options.length > 0 ? p.options.join(", ") : "-") },
];

export function CompareView({ properties }: { properties: Property[] }) {
  const { compareIds, remove, clear } = useCompare();
  const items = compareIds
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is NonNullable<typeof property> => Boolean(property));

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
            매물 비교하기
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            매물 카드나 상세 페이지의 저울 아이콘을 눌러 최대 4개까지 나란히 비교할 수 있습니다.
          </p>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            전체 삭제
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center text-[var(--text-secondary)]">
          <Scale size={32} className="text-[var(--border-default)]" />
          <p className="font-semibold text-[var(--text-primary)]">비교함이 비어 있습니다</p>
          <p className="text-[length:var(--font-size-body-sm)]">
            매물을 둘러보며 비교하고 싶은 매물을 담아보세요.
          </p>
          <Link
            href="/search"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-600)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            매물 둘러보기
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[length:var(--font-size-body-sm)]">
            <thead>
              <tr>
                <th className="w-32 px-2 py-2 align-bottom text-[var(--text-secondary)]" />
                {items.map((property) => (
                  <th key={property.id} className="min-w-[220px] px-3 py-2 align-bottom">
                    <div className="relative h-32 w-full overflow-hidden rounded-[var(--radius-md)]">
                      <Image src={property.images[0]} alt={property.title} fill sizes="220px" className="object-cover" />
                      <button
                        type="button"
                        onClick={() => remove(property.id)}
                        aria-label={`${property.title} 비교함에서 제거`}
                        className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-[var(--color-neutral-900)] hover:bg-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <Link
                      href={`/property/${property.id}`}
                      className="mt-2 block truncate font-bold text-[var(--text-primary)] hover:text-[var(--color-primary-600)]"
                    >
                      {property.title}
                    </Link>
                    <p className="font-extrabold text-[var(--color-primary-600)]">
                      {property.price}
                      {property.monthlyRent && (
                        <span className="ml-1 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-secondary)]">
                          {property.monthlyRent}
                        </span>
                      )}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-t border-[var(--border-default)]">
                  <th className="px-2 py-3 text-left font-medium text-[var(--text-secondary)]">{row.label}</th>
                  {items.map((property) => (
                    <td key={property.id} className="px-3 py-3 text-[var(--text-primary)]">
                      {row.value(property)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
