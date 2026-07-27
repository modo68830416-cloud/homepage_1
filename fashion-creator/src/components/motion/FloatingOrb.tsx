import { cn } from "@/lib/utils";

type FloatingOrbProps = {
  className?: string;
  color?: "lime" | "pink" | "violet" | "blue" | "orange";
  size?: number;
  delay?: number;
};

const COLOR_MAP: Record<NonNullable<FloatingOrbProps["color"]>, string> = {
  lime: "bg-accent-lime",
  pink: "bg-accent-pink",
  violet: "bg-accent-violet",
  blue: "bg-accent-blue",
  orange: "bg-accent-orange",
};

export function FloatingOrb({ className, color = "lime", size = 420, delay = 0 }: FloatingOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full opacity-20 blur-[110px]",
        "[animation:var(--animate-float)]",
        COLOR_MAP[color],
        className,
      )}
      style={{ width: size, height: size, animationDelay: `${delay}s` }}
    />
  );
}
