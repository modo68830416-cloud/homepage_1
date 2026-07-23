import Link from "next/link";
import { Calculator } from "lucide-react";
import type { Property } from "@/types/property";

export function PriceCard({ property }: { property: Property }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-6 shadow-[var(--shadow-sm)]">
      <p className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
        {property.dealType}가
      </p>
      <p className="mt-1 text-[length:var(--font-size-display-2)] font-extrabold text-[var(--color-primary-600)]">
        {property.price}
        {property.monthlyRent && (
          <span className="ml-2 text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
            / {property.monthlyRent}
          </span>
        )}
      </p>

      <dl className="mt-4 space-y-2 border-t border-[var(--border-default)] pt-4 text-[length:var(--font-size-body-sm)]">
        <div className="flex justify-between">
          <dt className="text-[var(--text-secondary)]">관리비</dt>
          <dd className="font-medium text-[var(--text-primary)]">{property.maintenanceFee}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[var(--text-secondary)]">취득세 예상</dt>
          <dd className="font-medium text-[var(--text-primary)]">
            {property.dealType === "매매" ? "매매가의 약 1~3%" : "해당 없음"}
          </dd>
        </div>
      </dl>

      <Link
        href="/contact"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-default)] px-4 py-2.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface)]"
      >
        <Calculator size={16} />
        대출 상담 계산하기
      </Link>
      <p className="mt-2 text-[11px] text-[var(--text-secondary)]">
        정확한 취득세·대출 한도는 지역·면적·개인 조건에 따라 달라지므로 상담을
        통해 안내받으실 수 있습니다.
      </p>
    </div>
  );
}
