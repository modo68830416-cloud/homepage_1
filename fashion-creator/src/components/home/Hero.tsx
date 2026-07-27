"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ChevronDown, Shirt, Sparkles, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FloatingOrb } from "@/components/motion/FloatingOrb";
import { Magnetic } from "@/components/motion/magnetic";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";

const statusSteps = [
  "AI Styling",
  "Model selected",
  "4 products matched",
  "Video format: 9:16",
  "Shop link ready",
];

function AIStatusPanel() {
  const reduced = useReducedMotionContext();
  const [activeCount, setActiveCount] = useState(reduced ? statusSteps.length : 1);

  useEffect(() => {
    if (reduced) return;
    if (activeCount >= statusSteps.length) return;
    const timer = setTimeout(() => setActiveCount((count) => count + 1), 850);
    return () => clearTimeout(timer);
  }, [activeCount, reduced]);

  return (
    <GlassPanel className="w-56 rounded-xl p-4" edgeGlow>
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Wand2 className="h-3.5 w-3.5 text-accent-lime" aria-hidden="true" />
          AI Styling
        </span>
        <Badge tone="mock" className="!px-2 !py-0.5 !text-[9px]">
          Interactive Demo
        </Badge>
      </div>
      <ul className="flex flex-col gap-1.5">
        {statusSteps.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-2 text-[11px] transition-colors duration-300"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                index < activeCount ? "bg-accent-lime" : "bg-border-strong"
              }`}
              aria-hidden="true"
            />
            <span className={index < activeCount ? "text-foreground" : "text-foreground-subtle"}>
              {step}
            </span>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionContext();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 20 });
  const layerX = useTransform(springX, (v) => v * 18);
  const layerY = useTransform(springY, (v) => v * 18);
  const layerXSecondary = useTransform(springX, (v) => v * -0.6 * 18);
  const layerYSecondary = useTransform(springY, (v) => v * -0.6 * 18);
  const layerXTertiary = useTransform(springX, (v) => v * 0.9 * 18);
  const layerYTertiary = useTransform(springY, (v) => v * 0.4 * 18);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0.6]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((event.clientX - rect.left) / rect.width - 0.5);
    mvY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:pt-28"
      style={{
        background:
          "radial-gradient(1100px circle at 20% -10%, rgba(217,255,87,0.08), transparent 55%), radial-gradient(900px circle at 90% 10%, rgba(169,139,255,0.1), transparent 55%)",
      }}
    >
      <FloatingOrb color="lime" className="-left-40 -top-20" size={480} />
      <FloatingOrb color="pink" className="-right-32 top-40" size={420} delay={1.5} />
      <FloatingOrb color="violet" className="left-1/3 top-96" size={360} delay={3} />

      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge tone="ai">AI Fashion Content Commerce</Badge>
          </motion.div>

          <h1 className="mt-6 text-6xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-[clamp(4rem,7vw,6.5rem)]">
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                Try.{" "}
                <span className="text-gradient-aurora">Create.</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, delay: 0.27, ease: [0.16, 1, 0.3, 1] }}
              >
                Share. <span className="text-gradient-aurora">Sell.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-foreground-muted"
          >
            AI 모델에게 패션을 입히고, 영상과 쇼츠를 만들어 구매와 수익으로 연결하세요.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic>
              <Button href="/models" variant="magnetic" className="w-full sm:w-auto">
                AI 모델로 시작하기
              </Button>
            </Magnetic>
            <Button href="/trends" variant="outline">
              인기 아이템 보기
            </Button>
          </motion.div>
        </div>

        <motion.div
          style={{ x: layerX, y: layerY }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <GlassPanel className="absolute inset-0 overflow-hidden rounded-2xl" glow>
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <PlaceholderArt seed="hero-model" icon={Sparkles} label="AI fashion model preview" />
            </motion.div>
          </GlassPanel>

          <motion.div
            style={{ x: layerXSecondary, y: layerYSecondary }}
            className="absolute -left-8 top-8 w-36 sm:-left-14"
          >
            <a href="/trends" className="block">
              <GlassPanel className="rounded-xl p-3 transition-transform hover:-translate-y-1">
                <div className="aspect-square w-full overflow-hidden rounded-lg">
                  <PlaceholderArt seed="hero-product-1" icon={Shirt} label="Floating product card" />
                </div>
                <p className="mt-2 text-xs font-medium text-foreground">Aurora Blazer</p>
                <p className="text-[11px] text-foreground-subtle">₩149,000</p>
              </GlassPanel>
            </a>
          </motion.div>

          <motion.div
            style={{ x: layerXTertiary, y: layerYTertiary }}
            className="absolute -bottom-6 -right-6 w-40 sm:-right-12"
          >
            <a href="/studio" className="block">
              <GlassPanel className="rounded-xl p-3 transition-transform hover:-translate-y-1">
                <div className="aspect-square w-full overflow-hidden rounded-lg">
                  <PlaceholderArt seed="hero-product-2" icon={Shirt} label="Floating product card" />
                </div>
                <p className="mt-2 text-xs font-medium text-foreground">Liquid Glass Top</p>
                <p className="text-[11px] text-foreground-subtle">₩69,000</p>
              </GlassPanel>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute -top-8 right-2 sm:-top-6 sm:right-10"
          >
            <AIStatusPanel />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#trend-radar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative mx-auto mt-16 flex max-w-7xl justify-center"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-foreground-subtle" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
