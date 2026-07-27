"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useIsTouchDevice } from "@/hooks/use-media-query";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
};

export function Spotlight({ children, className, size = 240, color = "rgba(217,255,87,0.12)" }: SpotlightProps) {
  const isTouch = useIsTouchDevice();
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 70%)`;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (isTouch) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <div className={cn("group relative", className)} onMouseMove={handleMouseMove}>
      {!isTouch && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      {children}
    </div>
  );
}
