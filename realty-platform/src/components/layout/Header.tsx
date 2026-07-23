"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Heart, Clock, User, Search, Menu, X, Building2, Scale } from "lucide-react";

const NAV_ITEMS = [
  { label: "매물검색", href: "/search" },
  { label: "지도검색", href: "/map" },
  { label: "분양", href: "/search?type=new-sale" },
  { label: "급매", href: "/search?type=urgent" },
  { label: "경매", href: "/search?type=auction" },
  { label: "지역정보", href: "/region" },
  { label: "부동산뉴스", href: "/news" },
  { label: "고객센터", href: "/contact" },
  { label: "회사소개", href: "/about" },
];

// 데스크톱에서는 헤더 아이콘 행(sm:inline-flex)으로 노출되지만, 좁은 모바일 화면에서는
// 이 링크들에 닿을 방법이 없었으므로 모바일 메뉴 전용으로 별도 노출한다.
const MOBILE_QUICK_LINKS = [
  { label: "관심매물", href: "/my/favorites", icon: Heart },
  { label: "매물 비교하기", href: "/compare", icon: Scale },
  { label: "최근본매물", href: "/my/history", icon: Clock },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--border-default)] bg-[var(--bg-page)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold text-[var(--text-primary)]">
          <Building2 className="text-[var(--color-primary-600)]" size={24} />
          <span className="text-lg tracking-tight">프리미엄부동산</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/search"
            aria-label="통합 검색"
            className="hidden rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] sm:inline-flex"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/my/favorites"
            aria-label="관심매물"
            className="hidden rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] sm:inline-flex"
          >
            <Heart size={20} />
          </Link>
          <Link
            href="/compare"
            aria-label="매물 비교하기"
            className="hidden rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] sm:inline-flex"
          >
            <Scale size={20} />
          </Link>
          <Link
            href="/my/history"
            aria-label="최근본매물"
            className="hidden rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] sm:inline-flex"
          >
            <Clock size={20} />
          </Link>
          {isSignedIn ? (
            <div className="ml-1 hidden sm:inline-flex">
              <UserButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-1 hidden items-center gap-1.5 rounded-full bg-[var(--color-primary-900)] px-4 py-2 text-[length:var(--font-size-body-sm)] font-semibold text-white transition hover:opacity-90 sm:inline-flex"
            >
              <User size={16} />
              로그인
            </Link>
          )}

          <button
            type="button"
            aria-label="메뉴 열기"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="ml-1 inline-flex rounded-full p-2 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-[var(--border-default)] px-4 py-3 lg:hidden">
          <ul className="mb-2 grid grid-cols-3 gap-1 border-b border-[var(--border-default)] pb-2 sm:hidden">
            {MOBILE_QUICK_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-[length:var(--font-size-body-md)] font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {isSignedIn ? (
                <div className="mt-2 flex justify-center">
                  <UserButton />
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-lg bg-[var(--color-primary-900)] px-3 py-2 text-center font-semibold text-white"
                >
                  로그인
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
