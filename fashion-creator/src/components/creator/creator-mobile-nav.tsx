"use client";

import Link from "next/link";
import { useCreatorNavItems } from "@/components/creator/creator-sidebar";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function CreatorMobileNav() {
  const items = useCreatorNavItems();

  return (
    <div className="border-b border-border print:hidden lg:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <Logo />
        <Button href="/" variant="ghost" className="min-h-9 px-2 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          홈
        </Button>
      </div>
      <nav
        aria-label="Creator navigation"
        className="flex gap-1.5 overflow-x-auto px-4 pb-3"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "min-h-9 shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium",
              item.active
                ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                : "border-border text-foreground-muted",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
