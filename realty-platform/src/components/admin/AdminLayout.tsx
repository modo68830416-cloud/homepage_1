"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Users,
  Image as ImageIcon,
  BarChart3,
  ArrowLeft,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "대시보드", href: "/admin", icon: LayoutDashboard },
  { label: "매물관리", href: "/admin/properties", icon: Building2 },
  { label: "문의관리", href: "/admin/inquiries", icon: MessageSquare },
  { label: "회원관리", href: "/admin/members", icon: Users },
  { label: "배너관리", href: "/admin/banners", icon: ImageIcon },
  { label: "통계", href: "/admin/statistics", icon: BarChart3 },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh bg-[var(--bg-surface)]">
      <aside className="hidden w-60 shrink-0 border-r border-[var(--border-default)] bg-[var(--bg-page)] px-4 py-6 lg:block">
        <Link href="/" className="flex items-center gap-2 px-2 font-bold text-[var(--text-primary)]">
          <Building2 className="text-[var(--color-primary-600)]" size={22} />
          프리미엄부동산
          <span className="rounded-full bg-[var(--bg-surface)] px-2 py-0.5 text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-secondary)]">
            Admin
          </span>
        </Link>

        <nav className="mt-8 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2.5 text-[length:var(--font-size-body-sm)] font-medium transition ${
                  active
                    ? "bg-[var(--color-primary-900)] text-white"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="mt-8 flex items-center gap-2 px-3 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={14} />
          사이트로 돌아가기
        </Link>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-page)] px-6 py-4 lg:hidden">
          <span className="font-bold text-[var(--text-primary)]">Admin</span>
          <Link href="/" className="text-[length:var(--font-size-body-sm)] text-[var(--color-primary-600)]">
            사이트로 돌아가기
          </Link>
        </header>
        <main className="p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
