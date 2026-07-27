import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
};

export function Marquee({ items, className }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex w-max gap-10 [animation:var(--animate-marquee)] motion-reduce:animate-none">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap text-sm uppercase tracking-[0.2em] text-foreground-subtle"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
