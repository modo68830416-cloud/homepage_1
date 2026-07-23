import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight size={14} aria-hidden />}
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--text-primary)]">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-[var(--text-primary)]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
