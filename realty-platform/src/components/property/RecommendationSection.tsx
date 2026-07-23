import { properties } from "@/lib/properties/mock-data";
import { PropertyCard } from "@/components/home/PropertyCard";
import type { Property } from "@/types/property";

export function RecommendationSection({ current }: { current: Property }) {
  const sameDistrict = properties.filter(
    (item) => item.id !== current.id && item.district === current.district,
  );
  const others = properties.filter(
    (item) => item.id !== current.id && item.district !== current.district,
  );
  const recommended = [...sameDistrict, ...others].slice(0, 3);

  if (recommended.length === 0) return null;

  return (
    <section>
      <h2 className="text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
        함께 보면 좋은 매물
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {recommended.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
