import type { PropertyBadge } from "@/types/property";

const BADGE_STYLE: Record<PropertyBadge, string> = {
  NEW: "bg-[var(--color-badge-new)]",
  HOT: "bg-[var(--color-badge-hot)]",
  PREMIUM: "bg-[var(--color-badge-premium)]",
  SOLD: "bg-[var(--color-badge-sold)]",
};

export function Badge({ type }: { type: PropertyBadge }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide text-white ${BADGE_STYLE[type]}`}
    >
      {type}
    </span>
  );
}
