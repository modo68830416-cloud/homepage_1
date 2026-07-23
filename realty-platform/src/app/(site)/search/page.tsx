import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import { properties } from "@/lib/properties/mock-data";
import { PropertyCard } from "@/components/home/PropertyCard";
import { SearchFilterPanel, type SearchFilterValues } from "@/components/search/SearchFilterPanel";
import type { DealType, PropertyType } from "@/types/property";

export const metadata: Metadata = {
  title: "매물검색",
  description: "조건에 맞는 매물을 검색하세요.",
};

interface SearchPageProps {
  searchParams: Promise<{
    dealType?: string;
    propertyType?: string;
    city?: string;
    q?: string;
    sort?: string;
  }>;
}

const DEAL_TYPES: DealType[] = ["매매", "전세", "월세"];
const PROPERTY_TYPES: PropertyType[] = ["아파트", "주택", "오피스텔", "상가", "사무실", "토지"];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const dealType = DEAL_TYPES.includes(params.dealType as DealType)
    ? (params.dealType as DealType)
    : "all";
  const propertyType = PROPERTY_TYPES.includes(params.propertyType as PropertyType)
    ? (params.propertyType as PropertyType)
    : "all";
  const city = params.city ?? "all";
  const q = params.q ?? "";
  const sort = params.sort ?? "latest";

  let results = properties.filter((property) => {
    if (dealType !== "all" && property.dealType !== dealType) return false;
    if (propertyType !== "all" && property.propertyType !== propertyType) return false;
    if (city !== "all" && property.city !== city) return false;
    if (q.trim()) {
      const haystack = `${property.title} ${property.city} ${property.district}`;
      if (!haystack.includes(q.trim())) return false;
    }
    return true;
  });

  if (sort === "price-asc") {
    results = [...results].sort((a, b) => a.priceValue - b.priceValue);
  } else if (sort === "price-desc") {
    results = [...results].sort((a, b) => b.priceValue - a.priceValue);
  }

  const filterValues: SearchFilterValues = { dealType, propertyType, city, q, sort };

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        매물검색
      </h1>

      <div className="mt-6">
        <SearchFilterPanel initial={filterValues} />
      </div>

      <div className="mt-6 flex items-center gap-2 text-[var(--text-secondary)]">
        <SlidersHorizontal size={16} />
        <p>
          총 <span className="font-semibold text-[var(--text-primary)]">{results.length}</span>건의 매물
        </p>
      </div>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2 text-center text-[var(--text-secondary)]">
          <p className="font-semibold text-[var(--text-primary)]">조건에 맞는 매물이 없습니다</p>
          <p className="text-[length:var(--font-size-body-sm)]">
            필터를 조정하시거나 다른 키워드로 검색해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
