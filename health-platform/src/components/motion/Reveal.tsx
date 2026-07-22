"use client";

import { motion, useReducedMotion as usePrefersReducedMotionMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  /** Distance in px the content travels in from. Use motion-translate-* tokens. */
  distance?: number;
  delay?: number;
  className?: string;
  /** Effect budget tier — see docs/design/motion-tokens.md §4. Lower tiers use a shorter, simpler transition. */
  budget?: "low" | "medium" | "high";
}

const OFFSETS: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
  none: {},
};

/**
 * Scroll-triggered reveal used across content and commerce sections
 * (interaction #4 in docs/motion/interaction-catalog.md).
 */
export function Reveal({
  children,
  direction = "up",
  distance = 24,
  delay = 0,
  className,
  budget = "medium",
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotionMotion();
  const offset = OFFSETS[direction];
  const duration = budget === "high" ? 0.48 : budget === "medium" ? 0.32 : 0.22;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: offset.x ? offset.x * distance : 0,
        y: offset.y ? offset.y * distance : 0,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
