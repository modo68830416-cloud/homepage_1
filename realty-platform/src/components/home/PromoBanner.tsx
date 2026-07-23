"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useBanners } from "@/lib/use-banners";

export function PromoBanner() {
  const { banners } = useBanners();
  const active = banners.filter((banner) => banner.active);

  if (active.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-10">
      <div className="flex gap-4 overflow-x-auto pb-1">
        {active.map((banner) => (
          <Link
            key={banner.id}
            href={banner.href}
            className={`flex min-w-[280px] flex-1 items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-gradient-to-br p-5 text-white shadow-[var(--shadow-md)] transition hover:opacity-90 ${banner.gradient}`}
          >
            <div className="min-w-0">
              <p className="truncate font-bold">{banner.title}</p>
              <p className="mt-1 truncate text-[length:var(--font-size-body-sm)] text-white/80">
                {banner.subtitle}
              </p>
            </div>
            <ArrowRight size={18} className="shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
