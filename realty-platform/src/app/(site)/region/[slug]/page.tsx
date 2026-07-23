import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrendingUp, Search } from "lucide-react";
import { popularRegions } from "@/lib/properties/mock-data";
import { getAllProperties } from "@/db/queries";
import { PropertyCard } from "@/components/home/PropertyCard";
import { Breadcrumb } from "@/components/property/Breadcrumb";

function getRegion(slug: string) {
  return popularRegions.find((region) => region.id === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) return { title: "지역을 찾을 수 없습니다" };
  return {
    title: `${region.city} ${region.name} 매물 시세`,
    description: `${region.city} ${region.name} 평균 시세 ${region.avgPricePerPyeong}, 등록 매물 ${region.listingCount.toLocaleString()}건.`,
  };
}

export default async function RegionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const properties = await getAllProperties();
  const listings = properties.filter(
    (property) => property.district.includes(region.name),
  );

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <Breadcrumb items={[{ label: "홈", href: "/" }, { label: "지역정보", href: "/region" }, { label: region.name }]} />

      <div
        className={`mt-6 flex flex-col justify-between gap-4 rounded-[var(--radius-lg)] bg-gradient-to-br p-6 text-white shadow-[var(--shadow-md)] sm:flex-row sm:items-center ${region.gradient}`}
      >
        <div>
          <p className="text-[length:var(--font-size-body-sm)] text-white/70">{region.city}</p>
          <h1 className="font-serif text-[length:var(--font-size-heading-1)] font-bold">{region.name}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-white/85">
            <TrendingUp size={16} />
            평당 평균 {region.avgPricePerPyeong} · 매물 {region.listingCount.toLocaleString()}건
          </p>
        </div>
        <Link
          href={`/search?q=${encodeURIComponent(region.name)}`}
          className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-5 py-2.5 font-semibold text-[var(--color-neutral-900)] transition hover:opacity-90"
        >
          <Search size={16} />
          전체 매물 검색
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
          {region.name} 등록 매물
        </h2>

        {listings.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-[var(--radius-md)] bg-[var(--bg-surface)] p-6 text-center text-[var(--text-secondary)]">
            아직 등록된 매물이 없습니다.{" "}
            <Link href={`/search?q=${encodeURIComponent(region.name)}`} className="font-semibold text-[var(--color-primary-600)]">
              전체 매물에서 찾아보기
            </Link>
          </p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
          다른 인기 지역
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {popularRegions
            .filter((item) => item.id !== region.id)
            .map((item) => (
              <Link
                key={item.id}
                href={`/region/${item.id}`}
                className="rounded-full border border-[var(--border-default)] px-4 py-2 text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-surface)]"
              >
                {item.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
