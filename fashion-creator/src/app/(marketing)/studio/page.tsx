import type { Metadata } from "next";
import { Clapperboard, Shirt, SlidersHorizontal, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { DemoActionButton } from "@/components/ui/DemoActionButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { PageIntro } from "@/components/home/PageIntro";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Studio",
  description: "AI 모델에게 옷을 입히고 이미지·영상·쇼츠 콘텐츠를 제작하세요.",
};

const controls = [
  { icon: UserRound, label: "Model", value: "Aria · Editorial Minimal" },
  { icon: Shirt, label: "Outfit", value: "Aurora Blazer + Liquid Glass Top" },
  { icon: SlidersHorizontal, label: "Style", value: "Cinematic / Night Aurora" },
  { icon: Clapperboard, label: "Output", value: "Video · Shorts · Image" },
];

export default function StudioPage() {
  return (
    <>
      <PageIntro
        eyebrow="Studio"
        title="가상 코디 & 콘텐츠 제작"
        description="AI 모델에게 상품을 코디하고 이미지, 영상, 쇼츠를 생성하는 제작 공간입니다."
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal>
          <GlassPanel className="grid gap-0 overflow-hidden rounded-2xl lg:grid-cols-[1.2fr_1fr]" glow>
            <div className="relative aspect-video lg:aspect-auto">
              <PlaceholderArt seed="studio-canvas" icon={Clapperboard} label="Studio canvas preview" className="rounded-none" />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge tone="ai">AI GENERATED</Badge>
                <Badge tone="mock">MOCK DATA</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <p className="text-sm font-semibold text-foreground">제작 설정</p>
              <ul className="flex flex-col gap-4">
                {controls.map((control) => (
                  <li key={control.label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-strong">
                      <control.icon className="h-4 w-4 text-accent-lime" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-foreground-subtle">{control.label}</p>
                      <p className="truncate text-sm font-medium text-foreground">{control.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <DemoActionButton
                variant="primary"
                className="mt-auto w-full"
                message="실제 AI 콘텐츠 생성 기능은 준비 중입니다"
              >
                콘텐츠 생성
              </DemoActionButton>
            </div>
          </GlassPanel>
        </Reveal>
      </section>
    </>
  );
}
