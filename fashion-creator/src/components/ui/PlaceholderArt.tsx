import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-accent-lime/30 via-accent-blue/20 to-transparent",
  "from-accent-pink/30 via-accent-violet/20 to-transparent",
  "from-accent-violet/30 via-accent-blue/20 to-transparent",
  "from-accent-orange/30 via-accent-pink/20 to-transparent",
  "from-accent-blue/30 via-accent-lime/20 to-transparent",
];

function hashSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

type PlaceholderArtProps = {
  seed: string;
  icon: LucideIcon;
  label?: string;
  className?: string;
};

export function PlaceholderArt({ seed, icon: Icon, label, className }: PlaceholderArtProps) {
  const gradient = GRADIENTS[hashSeed(seed) % GRADIENTS.length];

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-background-elevated",
        className,
      )}
      role="img"
      aria-label={label ?? "Fashion Creator demo visual"}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 45%)",
        }}
        aria-hidden="true"
      />
      <Icon className="relative h-8 w-8 text-foreground/70" strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}
