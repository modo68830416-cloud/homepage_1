"use client";

import { Scale } from "lucide-react";
import { useCompare } from "@/lib/use-compare";

export function CompareButton({
  propertyId,
  variant = "icon",
}: {
  propertyId: string;
  variant?: "icon" | "full";
}) {
  const { isComparing, toggle, compareIds, maxCompare } = useCompare();
  const active = isComparing(propertyId);
  const disabled = !active && compareIds.length >= maxCompare;

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggle(propertyId)}
        disabled={disabled}
        aria-pressed={active}
        className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[length:var(--font-size-body-sm)] font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
          active
            ? "border-[var(--color-primary-600)] bg-[var(--color-primary-600)]/10 text-[var(--color-primary-600)]"
            : "border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
        }`}
      >
        <Scale size={16} />
        {active ? "비교함에 담김" : "비교하기"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(propertyId)}
      disabled={disabled}
      aria-pressed={active}
      aria-label={active ? "비교함에서 제거" : "비교하기에 추가"}
      className={`absolute right-3 top-14 rounded-full bg-white/90 p-2 shadow-[var(--shadow-sm)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "text-[var(--color-primary-600)]" : "text-[var(--color-neutral-900)]"
      }`}
    >
      <Scale size={16} />
    </button>
  );
}
