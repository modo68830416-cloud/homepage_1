import Link from "next/link";
import { categories } from "@/lib/content/data";
import { SearchExpandable } from "./SearchExpandable";
import { MobileMenuOverlay } from "./MobileMenuOverlay";
import { CartLink } from "./CartLink";

/** Persistent header — search is always visible, never collapsed to an icon (docs/ia/navigation-model.md §1). */
export function Header() {
  return (
    <header className="sticky top-0 z-[var(--z-sticky)] bg-[var(--bg-page)]/90 backdrop-blur border-b border-[var(--border-default)]">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center gap-6">
        <MobileMenuOverlay />
        <Link href="/" className="font-bold text-lg tracking-tight">
          건강라이프
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <div className="group relative">
            <button type="button" className="py-2">
              건강정보
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block pt-2">
              <ul className="w-56 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--color-surface-0)] shadow-[var(--shadow-lg)] p-3 space-y-1">
                {categories.map((category) => (
                  <li key={category.key}>
                    <Link
                      href={`/health/${category.key}`}
                      className="block rounded-[var(--radius-sm)] px-2 py-1.5 hover:bg-[var(--color-surface-50)]"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/shop">스토어</Link>
          <Link href="/ask">건강 질문하기</Link>
        </nav>

        <div className="ml-auto hidden sm:block">
          <SearchExpandable />
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/account/wishlist">찜</Link>
          <CartLink />
          <Link href="/account/login">로그인</Link>
        </div>
      </div>
    </header>
  );
}
