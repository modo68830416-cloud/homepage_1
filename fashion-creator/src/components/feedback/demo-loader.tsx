"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";

type DemoLoaderProps = {
  skeleton: React.ReactNode;
  children: React.ReactNode;
  delayMs?: number;
};

export function DemoLoader({ skeleton, children, delayMs = 500 }: DemoLoaderProps) {
  const reduced = useReducedMotionContext();
  const [loading, setLoading] = React.useState(() => delayMs > 0 && !reduced);

  React.useEffect(() => {
    if (reduced || delayMs === 0) return;
    const timer = setTimeout(() => setLoading(false), delayMs);
    return () => clearTimeout(timer);
  }, [reduced, delayMs]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div key="skeleton" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {skeleton}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
