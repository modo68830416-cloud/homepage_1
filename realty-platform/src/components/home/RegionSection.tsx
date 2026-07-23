"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { popularRegions } from "@/lib/properties/mock-data";

export function RegionSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 sm:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
            지금 많이 찾는 인기 지역
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            실시간 검색량 기준 Top 10 지역
          </p>
        </div>
        <Link
          href="/region"
          className="hidden text-[length:var(--font-size-body-sm)] font-semibold text-[var(--color-primary-600)] sm:inline-block"
        >
          전체보기
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {popularRegions.map((region, index) => (
          <motion.div
            key={region.id}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
          >
            <Link
              href={`/region/${region.id}`}
              className={`relative flex h-40 flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br p-4 text-white shadow-[var(--shadow-md)] ${region.gradient}`}
            >
              <span className="text-[length:var(--font-size-body-sm)] font-medium text-white/70">
                {index + 1}위 · {region.city}
              </span>
              <div>
                <p className="text-lg font-bold">{region.name}</p>
                <p className="text-[length:var(--font-size-body-sm)] text-white/80">
                  매물 {region.listingCount.toLocaleString()}건
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
