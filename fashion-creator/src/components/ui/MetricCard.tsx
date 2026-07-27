import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  className?: string;
};

export function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  trendPositive = true,
  className,
}: MetricCardProps) {
  return (
    <div className={cn("glass-panel flex flex-col gap-3 rounded-xl p-5", className)}>
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-foreground-subtle" aria-hidden="true" />
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trendPositive ? "text-success" : "text-danger",
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        <p className="mt-0.5 text-xs text-foreground-subtle">{label}</p>
      </div>
    </div>
  );
}
