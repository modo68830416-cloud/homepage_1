import {
  Car,
  ArrowUpDown,
  PawPrint,
  Wind,
  Shirt,
  Trees,
  Camera,
  ShieldCheck,
} from "lucide-react";
import type { PropertyOption } from "@/types/property";

const ALL_OPTIONS: { key: PropertyOption; icon: typeof Car }[] = [
  { key: "주차", icon: Car },
  { key: "엘리베이터", icon: ArrowUpDown },
  { key: "반려동물", icon: PawPrint },
  { key: "에어컨", icon: Wind },
  { key: "붙박이장", icon: Shirt },
  { key: "발코니", icon: Trees },
  { key: "CCTV", icon: Camera },
  { key: "보안", icon: ShieldCheck },
];

export function OptionList({ options }: { options: PropertyOption[] }) {
  return (
    <div>
      <h2 className="font-serif text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
        옵션 정보
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ALL_OPTIONS.map(({ key, icon: Icon }) => {
          const included = options.includes(key);
          return (
            <div
              key={key}
              className={`flex flex-col items-center gap-1.5 rounded-[var(--radius-md)] border px-3 py-4 text-center ${
                included
                  ? "border-[var(--color-primary-600)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
                  : "border-[var(--border-default)] text-[var(--text-secondary)] opacity-50"
              }`}
            >
              <Icon size={20} />
              <span className="text-[length:var(--font-size-body-sm)]">{key}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
