import Link from "next/link";
import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-lime text-[#0a0a0a]">
        <Sparkle className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span>
        Fashion<span className="text-gradient-aurora">Creator</span>
      </span>
    </Link>
  );
}
