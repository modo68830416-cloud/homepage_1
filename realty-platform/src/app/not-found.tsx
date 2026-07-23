import Link from "next/link";
import { Building2, Home } from "lucide-react";

export default function RootNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <Link href="/" className="mb-8 flex items-center gap-2 font-bold text-[var(--text-primary)]">
        <Building2 className="text-[var(--color-primary-600)]" size={24} />
        <span className="text-lg tracking-tight">프리미엄부동산</span>
      </Link>
      <span className="text-6xl font-bold text-[var(--color-primary-600)]">404</span>
      <h1 className="mt-4 text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        페이지를 찾을 수 없습니다
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-600)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        <Home size={18} />
        홈으로 돌아가기
      </Link>
    </div>
  );
}
