import Link from "next/link";
import { Share2, Globe, Mail } from "lucide-react";

const FOOTER_LINKS = [
  { label: "회사소개", href: "/about" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "고객센터", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-bold text-[var(--text-primary)]">프리미엄부동산</p>
            <p className="mt-2 max-w-sm text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              검색 중심, 고급 비주얼, 빠른 사용자 경험을 갖춘 프리미엄 부동산
              플랫폼입니다.
            </p>
            <p className="mt-4 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              대표: 홍길동 · 사업자등록번호 000-00-00000
              <br />
              공인중개사등록번호 제0000-000000호
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3" aria-label="SNS 및 연락 채널">
            <span className="rounded-full bg-[var(--bg-page)] p-2 text-[var(--text-secondary)]">
              <Share2 size={18} aria-hidden />
            </span>
            <span className="rounded-full bg-[var(--bg-page)] p-2 text-[var(--text-secondary)]">
              <Globe size={18} aria-hidden />
            </span>
            <span className="rounded-full bg-[var(--bg-page)] p-2 text-[var(--text-secondary)]">
              <Mail size={18} aria-hidden />
            </span>
          </div>
        </div>

        <p className="mt-10 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} 프리미엄부동산. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
