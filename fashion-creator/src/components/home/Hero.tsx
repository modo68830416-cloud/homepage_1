"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ChevronDown, Shirt, Sparkles, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FloatingOrb } from "@/components/motion/FloatingOrb";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";

const headline = ["Try. Create.", "Share. Sell."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 20 });
  const layerX = useTransform(springX, (v) => v * 18);
  const layerY = useTransform(springY, (v) => v * 18);

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
    >
      <FloatingOrb color="lime" className="-left-40 -top-20" size={480} />
      <FloatingOrb color="pink" className="-right-32 top-40" size={420} delay={1.5} />
      <FloatingOrb color="violet" className="left-1/3 top-96" size={360} delay={3} />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge tone="ai">AI Fashion Content Commerce</Badge>
          </motion.div>

          <h1 className="mt-6 text-6xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-[clamp(4rem,7vw,6.5rem)]">
            {headline.map((line, lineIndex) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={lineIndex === 1 ? "text-gradient-aurora inline-block" : "inline-block"}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.7, delay: 0.15 + lineIndex * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
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
            <Button href="/models" variant="magnetic">
              AI 모델로 시작하기
            </Button>
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
            <PlaceholderArt seed="hero-model" icon={Sparkles} label="AI fashion model preview" />
          </GlassPanel>

          <motion.div
            style={{ x: useTransform(layerX, (v) => v * -0.6), y: useTransform(layerY, (v) => v * -0.6) }}
            className="absolute -left-8 top-8 w-36 sm:-left-14"
          >
            <GlassPanel className="rounded-xl p-3">
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <PlaceholderArt seed="hero-product-1" icon={Shirt} label="Floating product card" />
              </div>
              <p className="mt-2 text-xs font-medium text-foreground">Aurora Blazer</p>
            </GlassPanel>
          </motion.div>

          <motion.div
            style={{ x: useTransform(layerX, (v) => v * 0.9), y: useTransform(layerY, (v) => v * 0.4) }}
            className="absolute -bottom-6 -right-6 w-40 sm:-right-12"
          >
            <GlassPanel className="rounded-xl p-3">
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <PlaceholderArt seed="hero-product-2" icon={Shirt} label="Floating product card" />
              </div>
              <p className="mt-2 text-xs font-medium text-foreground">Liquid Glass Top</p>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute -top-6 right-4 sm:right-10"
          >
            <GlassPanel className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium">
              <Wand2 className="h-3.5 w-3.5 text-accent-lime" aria-hidden="true" />
              AI 코디 생성 중...
            </GlassPanel>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative mx-auto mt-16 flex max-w-7xl justify-center"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-foreground-subtle" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
