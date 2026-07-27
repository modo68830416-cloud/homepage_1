import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
  {
    variants: {
      tone: {
        trending: "bg-accent-orange/15 text-accent-orange border border-accent-orange/30",
        ai: "bg-accent-violet/15 text-accent-violet border border-accent-violet/30",
        bestSeller: "bg-accent-lime/15 text-accent-lime border border-accent-lime/30",
        creatorPick: "bg-accent-pink/15 text-accent-pink border border-accent-pink/30",
        mock: "bg-white/10 text-foreground-subtle border border-border",
      },
    },
    defaultVariants: {
      tone: "mock",
    },
  },
);

type BadgeProps = VariantProps<typeof badgeVariants> & {
  className?: string;
  children: React.ReactNode;
};

export function Badge({ tone, className, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)}>{children}</span>;
}

export const trendLabelTone = {
  "best-seller": "bestSeller",
  rising: "trending",
  "creator-pick": "creatorPick",
} as const;

export const trendLabelText = {
  "best-seller": "BEST SELLER",
  rising: "TRENDING",
  "creator-pick": "CREATOR PICK",
} as const;
