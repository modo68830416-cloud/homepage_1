import Link from "next/link";
import { getAllProperties } from "@/db/queries";
import { PropertyCard } from "@/components/home/PropertyCard";

export async function FeaturedSection() {
  const featuredProperties = (await getAllProperties()).slice(0, 6);

  return (
    <section className="bg-[var(--bg-surface)] py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
              지금 추천하는 프리미엄 매물
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              전문가가 엄선한 이번 주 인기 매물
            </p>
          </div>
          <Link
            href="/search"
            className="hidden text-[length:var(--font-size-body-sm)] font-semibold text-[var(--color-primary-600)] sm:inline-block"
          >
            전체보기
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
