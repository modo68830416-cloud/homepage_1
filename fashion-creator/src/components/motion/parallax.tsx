"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";
import { useIsDesktop } from "@/hooks/use-media-query";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  maxOffset?: number;
};

export function Parallax({ children, className, maxOffset = 40 }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionContext();
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-maxOffset, maxOffset]);

  if (reduced || !isDesktop) {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
