"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false },
);

function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * 12);
    rotateX.set(py * -12);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="h-40 w-full rounded-[var(--radius-lg)] bg-[var(--color-surface-50)] border border-[var(--border-default)] shadow-[var(--shadow-md)] flex items-center justify-center"
    >
      #7 Card tilt
    </motion.div>
  );
}

function SpotlightCard() {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const background = useTransform(
    [x, y],
    ([latestX, latestY]) =>
      `radial-gradient(220px circle at ${latestX}% ${latestY}%, rgba(255,255,255,0.35), transparent 70%)`,
  );

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width) * 100);
    y.set(((event.clientY - bounds.top) / bounds.height) * 100);
  }

  return (
    <div
      onMouseMove={handleMove}
      className="relative h-40 w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-800)] text-white flex items-center justify-center"
    >
      <motion.div className="absolute inset-0" style={{ background }} />
      <span className="relative">#9 Product spotlight</span>
    </div>
  );
}

function StatCounter({ target, label }: { target: number; label: string }) {
  const [inView, setInView] = useState(false);
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("ko-KR"));

  return (
    <motion.div
      onViewportEnter={() => {
        setInView(true);
        spring.set(target);
      }}
      viewport={{ once: true }}
      className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-6 text-center"
    >
      <motion.span className="block text-[length:var(--font-size-data,1.25rem)] font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
        {inView ? display : 0}
      </motion.span>
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
    </motion.div>
  );
}

export function MotionLabClient() {
  const reducedMotion = useReducedMotion();
  const capability = useDeviceCapability();

  return (
    <main className="wide max-w-4xl mx-auto px-6 py-16 space-y-20">
      <header className="space-y-2">
        <h1 className="text-[length:var(--font-size-heading-1)] font-bold">
          Motion Lab — /design-lab/motion
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          prefers-reduced-motion: <strong>{String(reducedMotion)}</strong> · device capability:{" "}
          <strong>{capability}</strong>
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-[length:var(--font-size-heading-2)] font-semibold">#2/#3 Hero object + depth</h2>
        <HeroScene
          className="h-72 w-full rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-brand-950)]"
          fallback={
            <div className="h-72 w-full rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-brand-800)] to-[var(--color-brand-600)] flex items-center justify-center text-white">
              Static hero fallback
            </div>
          }
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-[length:var(--font-size-heading-2)] font-semibold">#4 Scroll reveal</h2>
        <div className="space-y-4">
          <Reveal direction="up">
            <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-50)] p-6">Reveal — up</div>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <div className="rounded-[var(--radius-md)] bg-[var(--color-surface-50)] p-6">Reveal — left, delayed</div>
          </Reveal>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[length:var(--font-size-heading-2)] font-semibold">#8 Parallax</h2>
        <div className="h-64 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface-100)] flex items-center justify-center">
          <Parallax strength={40}>
            <div className="rounded-[var(--radius-md)] bg-[var(--color-brand-600)] text-white px-8 py-6">
              Parallax layer
            </div>
          </Parallax>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TiltCard />
        <SpotlightCard />
      </section>

      <section className="space-y-4">
        <h2 className="text-[length:var(--font-size-heading-2)] font-semibold">#14 Stat counters</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCounter target={128000} label="누적 사용자" />
          <StatCounter target={4200} label="검수 콘텐츠" />
          <StatCounter target={97} label="신뢰 점수" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[length:var(--font-size-heading-2)] font-semibold">Magnetic CTA</h2>
        <MagneticButton
          className="rounded-full bg-[var(--color-accent-500)] text-white px-8 py-4 font-semibold"
          aria-label="지금 시작하기"
        >
          지금 시작하기
        </MagneticButton>
      </section>
    </main>
  );
}
