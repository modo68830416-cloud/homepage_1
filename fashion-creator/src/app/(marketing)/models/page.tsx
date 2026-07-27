import type { Metadata } from "next";
import { UploadCloud } from "lucide-react";
import { fashionModels } from "@/data/models";
import { ModelCard } from "@/components/ui/ModelCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/home/PageIntro";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "AI Models",
  description: "기본 AI 모델을 선택하거나 정면 사진 한 장으로 나만의 아바타를 만들어보세요.",
};

export default function ModelsPage() {
  return (
    <>
      <PageIntro
        eyebrow="AI Models"
        title="AI 모델·아바타 선택"
        description="다양한 성별, 체형, 스타일의 기본 모델 중에서 고르거나 내 아바타를 생성하세요."
      />

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <Reveal>
          <GlassPanel className="flex flex-col items-center gap-4 rounded-2xl border-dashed p-10 text-center sm:p-14">
            <UploadCloud className="h-8 w-8 text-accent-lime" aria-hidden="true" />
            <div>
              <p className="font-semibold text-foreground">정면 사진 한 장으로 아바타 생성</p>
              <p className="mt-1 text-sm text-foreground-muted">
                업로드 및 실제 AI 아바타 생성은 준비 중입니다.
              </p>
            </div>
            <Button variant="secondary" disabled>
              사진 업로드 (준비 중)
            </Button>
          </GlassPanel>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {fashionModels.map((model, index) => (
            <Reveal key={model.id} delay={index * 0.05}>
              <ModelCard model={model} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
