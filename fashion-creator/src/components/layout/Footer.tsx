import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { navLinks } from "@/components/layout/nav-links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-foreground-subtle">
            AI 모델과 아바타에게 패션을 코디하고, 영상과 쇼츠를 만들어 구매와 수익으로 연결하는
            AI 패션 콘텐츠 커머스 플랫폼.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/creator"
            className="text-sm text-foreground-muted transition-colors hover:text-foreground"
          >
            Creator Dashboard
          </Link>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-8 text-xs text-foreground-subtle sm:px-8">
        © {new Date().getFullYear()} Fashion Creator. 모든 콘텐츠와 판매 데이터는 데모입니다.
      </div>
    </footer>
  );
}
