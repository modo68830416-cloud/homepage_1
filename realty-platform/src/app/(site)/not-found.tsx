import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function SiteNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <span className="font-serif text-6xl font-bold text-[var(--color-primary-600)]">404</span>
      <h1 className="mt-4 font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        주소가 잘못 입력되었거나, 삭제·이동된 페이지일 수 있습니다.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-600)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <Home size={18} />
          홈으로 돌아가기
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-6 py-3 font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface)]"
        >
          <Search size={18} />
          매물 검색하기
        </Link>
      </div>
    </div>
  );
}
