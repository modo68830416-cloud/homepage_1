"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { spring as springTokens } from "@/lib/motion";
import { useIsTouchDevice } from "@/hooks/use-media-query";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";

type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reduced = useReducedMotionContext();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springTokens.magnetic);
  const springY = useSpring(y, springTokens.magnetic);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (isTouch || reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
