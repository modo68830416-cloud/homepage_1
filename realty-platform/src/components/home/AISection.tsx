import { Sparkles } from "lucide-react";
import { getAllProperties } from "@/db/queries";
import { PropertyCard } from "@/components/home/PropertyCard";

const REASONS = [
  "최근 검색한 '강남 아파트'와 조건이 비슷해요",
  "관심 등록한 매물과 같은 지역이에요",
  "최근 조회한 평형대와 일치해요",
];

export async function AISection() {
  const recommended = (await getAllProperties()).slice(0, 3);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 sm:py-24">
      <div className="mb-10 flex items-center gap-2">
        <Sparkles className="text-[var(--color-accent-amber)]" size={22} />
        <h2 className="font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
          AI가 찾아드린 맞춤 추천
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((property, index) => (
          <div key={property.id} className="flex flex-col gap-2">
            <PropertyCard property={property} />
            <p className="flex items-start gap-1.5 px-1 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              <Sparkles size={14} className="mt-0.5 shrink-0 text-[var(--color-accent-amber)]" />
              {REASONS[index]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
