import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, Search } from "lucide-react";
import { popularRegions } from "@/lib/properties/mock-data";

export const metadata: Metadata = {
  title: "지역정보",
  description: "지역별 평균 시세와 매물 현황을 확인하세요.",
};

interface RegionPageProps {
  searchParams: Promise<{ slug?: string }>;
}

export default async function RegionPage({ searchParams }: RegionPageProps) {
  const { slug } = await searchParams;
  const selected = popularRegions.find((region) => region.id === slug);

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        지역정보
      </h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        인기 지역의 평균 시세와 등록 매물 현황을 확인해보세요
      </p>

      {selected && (
        <div
          className={`mt-8 flex flex-col justify-between gap-4 rounded-[var(--radius-lg)] bg-gradient-to-br p-6 text-white shadow-[var(--shadow-md)] sm:flex-row sm:items-center ${selected.gradient}`}
        >
          <div>
            <p className="text-[length:var(--font-size-body-sm)] text-white/70">{selected.city}</p>
            <p className="text-[length:var(--font-size-heading-1)] font-bold">{selected.name}</p>
            <p className="mt-1 flex items-center gap-1.5 text-white/85">
              <TrendingUp size={16} />
              평당 평균 {selected.avgPricePerPyeong} · 매물 {selected.listingCount.toLocaleString()}건
            </p>
          </div>
          <Link
            href={`/search?q=${encodeURIComponent(selected.name)}`}
            className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-5 py-2.5 font-semibold text-[var(--text-primary)] transition hover:opacity-90"
          >
            <Search size={16} />
            {selected.name} 매물 보기
          </Link>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {popularRegions.map((region) => (
          <Link
            key={region.id}
            href={`/region?slug=${region.id}`}
            className={`flex items-center justify-between rounded-[var(--radius-lg)] border p-5 transition hover:shadow-[var(--shadow-md)] ${
              region.id === slug
                ? "border-[var(--color-primary-600)] bg-[var(--bg-surface)]"
                : "border-[var(--border-default)] bg-[var(--bg-page)]"
            }`}
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
