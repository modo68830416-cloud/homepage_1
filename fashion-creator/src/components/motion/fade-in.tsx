"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { duration as durationTokens, easing } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  amount?: number;
  once?: boolean;
};

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
  none: {},
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 0.2,
  once = true,
}: FadeInProps) {
  const offset = OFFSETS[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: durationTokens.slow, delay, ease: easing.emphasized }}
    >
      {children}
    </motion.div>
  );
}
