"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { duration as durationTokens, easing } from "@/lib/motion";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  maxDelay?: number;
  step?: number;
  once?: boolean;
};

export function Stagger({ children, className, maxDelay = 0.5, step = 0.06, once = true }: StaggerProps) {
  const childArray = React.Children.toArray(children);
  const cappedStep = childArray.length > 0 ? Math.min(step, maxDelay / childArray.length) : step;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: cappedStep,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={container}
    >
      {childArray.map((child, index) => (
        <StaggerItem key={index}>{child}</StaggerItem>
      ))}
    </motion.div>
  );
}

function StaggerItem({ children }: { children: React.ReactNode }) {
  const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durationTokens.normal, ease: easing.standard },
    },
  };

  return <motion.div variants={item}>{children}</motion.div>;
}
