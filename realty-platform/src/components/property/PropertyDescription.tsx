import { CheckCircle2, AlertTriangle, Hammer } from "lucide-react";
import type { PropertyDescription as PropertyDescriptionType } from "@/types/property";

export function PropertyDescription({
  description,
}: {
  description: PropertyDescriptionType;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
          매물 특징
        </h2>
        <ul className="mt-3 space-y-2 text-[var(--text-primary)]">
          {description.features.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary-600)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="flex items-center gap-1.5 font-bold text-[var(--color-accent-emerald)]">
          <CheckCircle2 size={18} />
          장점
        </h3>
        <ul className="mt-2 space-y-1.5 text-[var(--text-primary)]">
          {description.pros.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="flex items-center gap-1.5 font-bold text-[var(--color-accent-amber)]">
          <AlertTriangle size={18} />
          유의사항
        </h3>
        <ul className="mt-2 space-y-1.5 text-[var(--text-primary)]">
          {description.cautions.map((item) => (
            <li key={item}>· {item}</li>
          ))}
        </ul>
      </div>

      {description.renovated && (
        <div className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--bg-surface)] px-4 py-3 text-[length:var(--font-size-body-sm)] text-[var(--text-primary)]">
          <Hammer size={16} className="text-[var(--color-primary-600)]" />
          리모델링 완료된 매물입니다.
        </div>
      )}
    </div>
  );
}
