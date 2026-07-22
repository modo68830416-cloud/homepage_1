"use client";

import { useRef } from "react";
import { motion, useReducedMotion as usePrefersReducedMotionMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Positive = moves slower than scroll (background feel), negative = faster (foreground feel). */
  strength?: number;
  className?: string;
}

/**
 * Scroll-linked parallax layer (interaction #8 in docs/motion/interaction-catalog.md).
 * Disabled entirely under prefers-reduced-motion.
 */
export function Parallax({ children, strength = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotionMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
