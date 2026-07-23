"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { addBanner, deleteBanner, updateBanner } from "@/db/actions";
import type { BannerRow } from "@/db/schema";

const NEW_BANNER_GRADIENT = "from-slate-800 via-slate-700 to-slate-900";

export function BannerManager({ initialRows }: { initialRows: BannerRow[] }) {
  const [banners, setBanners] = useState(initialRows);
  const [, startTransition] = useTransition();

  function patchLocal(id: string, patch: Partial<BannerRow>) {
    setBanners((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function persist(id: string, patch: Partial<{ title: string; subtitle: string; href: string; active: boolean }>) {
    startTransition(() => {
      updateBanner(id, patch);
    });
  }

  function toggleActive(banner: BannerRow) {
    const next = !banner.active;
    patchLocal(banner.id, { active: next });
    persist(banner.id, { active: next });
  }

  function remove(id: string) {
    setBanners((current) => current.filter((item) => item.id !== id));
    startTransition(() => {
      deleteBanner(id);
    });
  }

  function add() {
    startTransition(async () => {
      const id = `ban-${Date.now()}`;
      const banner: BannerRow = {
        id,
        title: "새 배너 제목",
        subtitle: "새 배너 부제목",
        href: "/",
        active: false,
        gradient: NEW_BANNER_GRADIENT,
        createdAt: new Date(),
      };
      setBanners((current) => [banner, ...current]);
      await addBanner({ title: banner.title, subtitle: banner.subtitle, href: banner.href, gradient: banner.gradient });
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
            배너관리
          </h1>
          <p className="mt-1.5 text-[var(--text-secondary)]">
            총 {banners.length}개 · 노출중 {banners.filter((b) => b.active).length}개
          </p>
        </div>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary-900)] px-4 py-2 text-[length:var(--font-size-body-sm)] font-semibold text-white transition hover:opacity-90"
        >
          <Plus size={16} />
          배너 추가
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="grid grid-cols-1 gap-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-4 shadow-[var(--shadow-sm)] sm:grid-cols-[160px_1fr_auto]"
          >
            <div className={`h-24 rounded-[var(--radius-md)] bg-gradient-to-br ${banner.gradient}`} />

            <div className="space-y-2">
              <input
                value={banner.title}
                onChange={(event) => patchLocal(banner.id, { title: event.target.value })}
                onBlur={(event) => persist(banner.id, { title: event.target.value })}
                aria-label="배너 제목"
                className="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] px-3 py-1.5 font-semibold text-[var(--text-primary)] outline-none focus:border-[var(--color-primary-600)]"
              />
              <input
                value={banner.subtitle}
                onChange={(event) => patchLocal(banner.id, { subtitle: event.target.value })}
                onBlur={(event) => persist(banner.id, { subtitle: event.target.value })}
                aria-label="배너 부제목"
                className="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] px-3 py-1.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)] outline-none focus:border-[var(--color-primary-600)]"
              />
              <input
                value={banner.href}
                onChange={(event) => patchLocal(banner.id, { href: event.target.value })}
                onBlur={(event) => persist(banner.id, { href: event.target.value })}
                aria-label="배너 링크"
                className="w-full rounded-[var(--radius-sm)] border border-[var(--border-default)] px-3 py-1.5 text-[length:var(--font-size-body-sm)] text-[var(--color-primary-600)] outline-none focus:border-[var(--color-primary-600)]"
              />
            </div>

            <div className="flex flex-row gap-1.5 sm:flex-col sm:items-end">
              <button
                type="button"
                onClick={() => toggleActive(banner)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
                  banner.active
                    ? "bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)]"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                }`}
              >
                {banner.active ? <Eye size={14} /> : <EyeOff size={14} />}
                {banner.active ? "노출중" : "비노출"}
              </button>
              <button
                type="button"
                onClick={() => remove(banner.id)}
                aria-label="배너 삭제"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--color-accent-red)] transition hover:bg-[var(--color-accent-red)]/10"
              >
                <Trash2 size={14} />
                삭제
              </button>
            </div>
          </div>
        ))}

        {banners.length === 0 && (
          <p className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border-default)] px-4 py-10 text-center text-[var(--text-secondary)]">
            등록된 배너가 없습니다. &quot;배너 추가&quot;로 새로 만들어보세요.
          </p>
        )}
      </div>
    </div>
  );
}
