import type { Property } from "@/types/property";
import { Badge } from "@/components/ui/Badge";

const FIELDS: { label: string; value: (p: Property) => string }[] = [
  { label: "매물번호", value: (p) => p.propertyNumber },
  { label: "거래유형", value: (p) => p.dealType },
  { label: "매물종류", value: (p) => p.propertyType },
  { label: "주소", value: (p) => p.address },
  { label: "면적", value: (p) => `${p.areaM2}㎡ (${Math.round(p.areaM2 / 3.3058)}평)` },
  { label: "방/욕실", value: (p) => `방 ${p.bedroomCount}개 / 욕실 ${p.bathroomCount}개` },
  { label: "층수", value: (p) => p.floor },
  { label: "방향", value: (p) => p.direction },
  { label: "준공연도", value: (p) => `${p.builtYear}년` },
  { label: "입주 가능일", value: (p) => p.moveInDate },
];

export function PropertySummary({ property }: { property: Property }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {property.badges.map((badge) => (
          <Badge key={badge} type={badge} />
        ))}
      </div>
      <h1 className="mt-2 font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        {property.title}
      </h1>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--border-default)] pt-6 sm:grid-cols-3">
        {FIELDS.map((field) => (
          <div key={field.label}>
            <dt className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              {field.label}
            </dt>
            <dd className="mt-1 font-medium text-[var(--text-primary)]">
              {field.value(property)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
