"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Clapperboard, Share2, Shirt, UserRound } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { useIsDesktop } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "01",
    icon: UserRound,
    title: "Pick a Model",
    description: "기본 AI 모델을 선택하거나 정면 사진으로 나만의 아바타를 만듭니다.",
  },
  {
    step: "02",
    icon: Shirt,
    title: "Style the Look",
    description: "인기 상품으로 코디를 구성하고 스타일을 조합합니다.",
  },
  {
    step: "03",
    icon: Clapperboard,
    title: "Generate the Video",
    description: "이미지, 영상, 쇼츠 형태의 콘텐츠를 자동 생성합니다.",
  },
  {
    step: "04",
    icon: Share2,
    title: "Share & Earn",
    description: "구매 링크와 함께 SNS에 배포하고 판매 수익을 정산받습니다.",
  },
];

function DesktopCreationFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    setActiveStep(index);
  });

  return (
    <div ref={containerRef} style={{ height: `${steps.length * 70}vh` }} className="relative">
      <div className="sticky top-24 grid gap-10 lg:grid-cols-2 lg:items-center">
        <ul className="flex flex-col gap-3">
          {steps.map((item, index) => (
            <li key={item.step}>
              <div
                className={cn(
                  "flex items-start gap-4 rounded-xl border border-transparent p-4 transition-all duration-500",
                  activeStep === index
                    ? "border-border bg-surface"
                    : "opacity-40",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-mono transition-colors duration-500",
                    activeStep === index
                      ? "bg-accent-lime text-[#0a0a0a]"
                      : "bg-surface-strong text-foreground-subtle",
                  )}
                >
                  {item.step}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <GlassPanel className="relative aspect-video overflow-hidden rounded-2xl" glow>
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: activeStep === index ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <PlaceholderArt seed={`flow-${item.step}`} icon={item.icon} label={item.title} />
            </motion.div>
          ))}
        </GlassPanel>
      </div>
    </div>
  );
}

function MobileCreationFlow() {
  return (
    <div className="grid gap-4 sm:gap-6">
      {steps.map((item, index) => (
        <Reveal key={item.step} delay={index * 0.06}>
          <FeatureCard {...item} />
        </Reveal>
      ))}
    </div>
  );
}

export function CreationFlow() {
  const isDesktop = useIsDesktop();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading eyebrow="How It Works" title="네 단계로 완성하는 패션 콘텐츠 커머스" />
      {isDesktop ? <DesktopCreationFlow /> : <MobileCreationFlow />}
    </section>
  );
}
