"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  FileText,
  LayoutDashboard,
  Megaphone,
  Settings,
  Sparkles,
  Wallet,
  Receipt,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/creator", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/create", label: "콘텐츠", icon: FileText, exact: false },
  { href: "/creator/analytics", label: "Analytics", icon: BarChart3, exact: false },
  { href: "/creator/revenue", label: "Revenue", icon: Wallet, exact: false },
  { href: "/creator/settlements", label: "Settlements", icon: Receipt, exact: false },
  { href: "/marketplace", label: "Campaigns", icon: Megaphone, exact: false },
  { href: "/creator/subscription", label: "Subscription", icon: Sparkles, exact: false },
  { href: "/creator/settings", label: "Settings", icon: Settings, exact: false },
] as const;

export function useCreatorNavItems() {
  const pathname = usePathname();
  return NAV_ITEMS.map((item) => ({
    ...item,
    active: item.exact ? pathname === item.href : pathname.startsWith(item.href),
  }));
}

export function CreatorSidebar() {
  const items = useCreatorNavItems();

  return (
    <nav
      aria-label="Creator navigation"
      className="hidden w-56 shrink-0 flex-col gap-1 border-r border-border p-4 print:hidden lg:flex"
    >
      <div className="mb-6 px-2">
        <Logo />
      </div>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition-colors",
            item.active
              ? "bg-surface-strong text-foreground"
              : "text-foreground-muted hover:bg-surface hover:text-foreground",
          )}
        >
          <item.icon className="h-4 w-4" aria-hidden="true" />
          {item.label}
        </Link>
      ))}
      <div className="mt-auto pt-4">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm text-foreground-subtle hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Fashion Creator
        </Link>
      </div>
    </nav>
  );
}
