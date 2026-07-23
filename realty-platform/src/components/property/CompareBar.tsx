"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, X } from "lucide-react";
import { useCompare } from "@/lib/use-compare";
import { properties } from "@/lib/properties/mock-data";

export function CompareBar() {
  const pathname = usePathname();
  const { compareIds, remove, clear } = useCompare();

  if (compareIds.length === 0 || pathname === "/compare") return null;

  const items = compareIds
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is NonNullable<typeof property> => Boolean(property));

  return (
    <div className="fixed inset-x-0 bottom-0 z-[var(--z-toast)] border-t border-[var(--border-default)] bg-[var(--bg-page)] shadow-[var(--shadow-lg)]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <span className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
          <Scale size={16} className="text-[var(--color-primary-600)]" />
          비교함 ({items.length})
        </span>

        <div className="flex flex-1 flex-wrap gap-2">
          {items.map((property) => (
            <span
              key={property.id}
              className="inline-flex max-w-[160px] items-center gap-1.5 rounded-full bg-[var(--bg-surface)] py-1 pl-3 pr-1.5 text-[length:var(--font-size-body-sm)] text-[var(--text-primary)]"
            >
              <span className="truncate">{property.title}</span>
              <button
                type="button"
                onClick={() => remove(property.id)}
                aria-label={`${property.title} 비교함에서 제거`}
                className="rounded-full p-0.5 text-[var(--text-secondary)] hover:bg-[var(--border-default)]"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={clear}
            className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            전체 삭제
          </button>
          <Link
            href="/compare"
            className="rounded-full bg-[var(--color-primary-600)] px-4 py-2 text-[length:var(--font-size-body-sm)] font-semibold text-white transition hover:opacity-90"
          >
            비교하기
          </Link>
        </div>
      </div>
    </div>
  );
}
