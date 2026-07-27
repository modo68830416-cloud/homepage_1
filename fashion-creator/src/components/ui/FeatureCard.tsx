import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  step?: string;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, description, step, className }: FeatureCardProps) {
  return (
    <div className={cn("glass-panel flex flex-col gap-4 rounded-xl p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-strong">
          <Icon className="h-5 w-5 text-accent-lime" strokeWidth={1.75} aria-hidden="true" />
        </div>
        {step && <span className="text-xs font-mono text-foreground-subtle">{step}</span>}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{description}</p>
      </div>
    </div>
  );
}
