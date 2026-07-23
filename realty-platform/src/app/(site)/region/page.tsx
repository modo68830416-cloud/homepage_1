import type { Metadata } from "next";
import Link from "next/link";
import { popularRegions } from "@/lib/properties/mock-data";

export const metadata: Metadata = {
  title: "지역정보",
  description: "지역별 평균 시세와 매물 현황을 확인하세요.",
};

export default function RegionPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <h1 className="font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        지역정보
      </h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        인기 지역의 평균 시세와 등록 매물 현황을 확인해보세요
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {popularRegions.map((region) => (
          <Link
            key={region.id}
            href={`/region/${region.id}`}
            className="flex items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 transition hover:border-[var(--color-primary-600)] hover:shadow-[var(--shadow-md)]"
          >
            <div>
              <p className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
                {region.city}
              </p>
              <p className="font-bold text-[var(--text-primary)]">{region.name}</p>
              <p className="mt-1 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
                매물 {region.listingCount.toLocaleString()}건
              </p>
            </div>
            <p className="text-right font-semibold text-[var(--color-primary-600)]">
              {region.avgPricePerPyeong}
              <br />
              <span className="text-[length:var(--font-size-body-sm)] font-normal text-[var(--text-secondary)]">
                평당
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
