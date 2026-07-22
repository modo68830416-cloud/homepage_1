"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useReducedMotion as usePrefersReducedMotionMotion, useMotionValue, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  /** How strongly the button follows the cursor, in px. */
  strength?: number;
  type?: "button" | "submit";
  "aria-label"?: string;
}

/**
 * Cursor-attraction CTA button. Keyboard focus receives the same emphasis
 * state as hover so the effect never becomes mouse-only
 * (docs/motion/interaction-catalog.md, common rules).
 */
export function MagneticButton({
  children,
  className,
  onClick,
  strength = 16,
  type = "button",
  ...aria
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotionMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  function handlePointerMove(event: MouseEvent<HTMLButtonElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const relativeX = event.clientX - (bounds.left + bounds.width / 2);
    const relativeY = event.clientY - (bounds.top + bounds.height / 2);
    x.set((relativeX / bounds.width) * strength);
    y.set((relativeY / bounds.height) * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileFocus={{ scale: 1.03 }}
      {...aria}
    >
      {children}
    </motion.button>
  );
}
