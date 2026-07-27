"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { duration as durationTokens, easing } from "@/lib/motion";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";

type TextRevealMode = "line" | "word" | "char";

type TextRevealProps = {
  text: string;
  mode?: TextRevealMode;
  className?: string;
  delay?: number;
  step?: number;
  as?: "span" | "h1" | "h2" | "p";
};

export function TextReveal({
  text,
  mode = "line",
  className,
  delay = 0,
  step = 0.03,
  as: Tag = "span",
}: TextRevealProps) {
  const reduced = useReducedMotionContext();
  const units = mode === "char" ? Array.from(text) : text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("inline-block overflow-hidden", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {units.map((unit, index) => (
          <span key={index} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{
                duration: durationTokens.slow,
                delay: delay + index * step,
                ease: easing.emphasized,
              }}
            >
              {unit}
              {mode !== "char" && index < units.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
