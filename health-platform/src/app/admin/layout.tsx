import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { ADMIN_ROLE_COOKIE, ROLE_LABELS, SECTION_LABELS, sectionsForRole, type AdminRole } from "@/lib/admin/roles";
import { logout } from "./login/actions";

/**
 * Admin shell — deliberately motion-free and data-dense
 * (docs/design/visual-concept.md §2 관리자 효과 예산 0~10, TASK-008 §5).
 * /admin does not use the (site) Header/Footer/PageTransition.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const role = cookieStore.get(ADMIN_ROLE_COOKIE)?.value as AdminRole | undefined;

  if (!role) return <>{children}</>; // login page itself

  const sections = sectionsForRole(role);
  const sectionHref: Record<string, string> = {
    dashboard: "/admin",
    content: "/admin/content",
    products: "/admin/products",
    orders: "/admin/orders",
    users: "/admin/users",
    "search-analytics": "/admin/search-analytics",
    "audit-log": "/admin/audit-log",
    files: "/admin/files",
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "var(--font-sans)" }}>
      <aside className="w-56 shrink-0 border-r border-[var(--border-default)] bg-[var(--color-surface-50)] p-4 flex flex-col">
        <p className="font-bold mb-6 px-2">관리자</p>
        <nav className="space-y-1 flex-1">
          {sections.map((section) => (
            <Link
              key={section}
              href={sectionHref[section]}
              className="block rounded px-2 py-2 text-sm hover:bg-[var(--color-surface-100)]"
            >
              {SECTION_LABELS[section]}
            </Link>
          ))}
        </nav>
        <div className="border-t border-[var(--border-default)] pt-3 mt-3 text-xs text-[var(--text-secondary)]">
          <p className="mb-2">{ROLE_LABELS[role]}로 로그인됨</p>
          <form action={logout}>
            <button type="submit" className="underline">
              로그아웃
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-x-auto">{children}</main>
    </div>
  );
}
