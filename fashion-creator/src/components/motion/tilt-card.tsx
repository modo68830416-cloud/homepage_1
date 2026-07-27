"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { spring as springTokens } from "@/lib/motion";
import { useIsTouchDevice } from "@/hooks/use-media-query";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
};

export function TiltCard({ children, className, maxTilt = 6 }: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reduced = useReducedMotionContext();
  const [hovered, setHovered] = React.useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springPx = useSpring(px, springTokens.responsive);
  const springPy = useSpring(py, springTokens.responsive);

  const rotateX = useTransform(springPy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springPx, [0, 1], [-maxTilt, maxTilt]);
  const highlightX = useTransform(springPx, (v) => `${v * 100}%`);
  const highlightY = useTransform(springPy, (v) => `${v * 100}%`);
  const highlightBackground = useMotionTemplate`radial-gradient(240px circle at ${highlightX} ${highlightY}, rgba(255,255,255,0.14), transparent 70%)`;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
    setHovered(false);
  }

  if (isTouch || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn("relative", className)}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200",
          hovered ? "opacity-100" : "opacity-0",
        )}
        style={{ background: highlightBackground }}
      />
    </motion.div>
  );
}
