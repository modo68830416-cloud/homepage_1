"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const ReducedMotionContext = React.createContext(false);

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <ReducedMotionContext.Provider value={reduced}>{children}</ReducedMotionContext.Provider>
  );
}

export function useReducedMotionContext() {
  return React.useContext(ReducedMotionContext);
}
