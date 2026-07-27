import * as React from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
};

export function GlassPanel({ className, glow, children, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-xl",
        glow && "shadow-[0_0_60px_-15px_rgba(217,255,87,0.25)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
