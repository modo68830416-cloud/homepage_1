import type { SaleType } from "@/lib/products/types";

const SALE_TYPE_META: Record<SaleType, { label: string; color: string }> = {
  DIRECT: { label: "자체배송", color: "var(--color-badge-direct)" },
  AFFILIATE: { label: "제휴", color: "var(--color-badge-affiliate)" },
  DROPSHIP: { label: "위탁배송", color: "var(--color-badge-dropship)" },
  MARKETPLACE: { label: "입점", color: "var(--color-badge-marketplace)" },
  DIGITAL: { label: "디지털", color: "var(--color-badge-digital)" },
  SUBSCRIPTION: { label: "구독", color: "var(--color-badge-subscription)" },
  BOOKING: { label: "예약", color: "var(--color-badge-booking)" },
};

/**
 * Sale-type disclosure badge — must appear on every card, detail page, cart
 * line, and order row for a product (docs/strategy/scope-and-non-goals.md,
 * TASK-007 §4 UX, docs/design/color-system.md §4).
 */
export function SaleTypeBadge({ saleType }: { saleType: SaleType }) {
  const meta = SALE_TYPE_META[saleType];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white"
      style={{ backgroundColor: meta.color }}
    >
      {meta.label}
    </span>
  );
}
