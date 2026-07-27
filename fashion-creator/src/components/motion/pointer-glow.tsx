"use client";

import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/hooks/use-media-query";

export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;

    function handleMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          node!.style.setProperty("--pointer-x", `${targetX}px`);
          node!.style.setProperty("--pointer-y", `${targetY}px`);
          frame = 0;
        });
      }
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70 print:hidden"
      style={{
        background:
          "radial-gradient(600px circle at var(--pointer-x, 50%) var(--pointer-y, 30%), rgba(217,255,87,0.05), transparent 70%)",
      }}
    />
  );
}
