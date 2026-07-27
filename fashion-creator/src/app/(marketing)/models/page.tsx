import type { Metadata } from "next";
import { Camera, Sparkles } from "lucide-react";
import { aiModelPresets } from "@/data/ai-models";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Reveal } from "@/components/motion/Reveal";
import { ModelLibrary } from "@/components/models/model-library";
import { SavedModels } from "@/components/models/saved-models";

export const metadata: Metadata = {
  title: "AI Models",
  description: "기본 AI 모델을 선택하거나 정면 사진 한 장으로 나만의 아바타를 만들어보세요.",
};

export default function ModelsPage() {
  const featured = aiModelPresets.filter((model) => model.isFeatured);

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-14 pt-20 sm:px-8 sm:pt-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Badge tone="ai">AI Models</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Choose Your AI Model
            <br />
            or Create Your Own.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-foreground-muted">
            기본 AI 모델을 바로 선택하거나, 정면 사진 한 장으로 나만의 아바타를 만들어보세요.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#model-library" variant="primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              기본 모델 선택하기
            </Button>
            <Button href="/models/create" variant="outline">
              <Camera className="h-4 w-4" aria-hidden="true" />
              내 사진으로 아바타 만들기
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <Reveal className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Featured Models</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((model, index) => (
            <Reveal key={model.id} delay={index * 0.05}>
              <GlassPanel className="flex flex-col overflow-hidden rounded-xl">
                <div className="aspect-[3/4]">
                  <PlaceholderArt seed={model.id} icon={Sparkles} label={model.name} className="rounded-none" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground">{model.name}</p>
                  <p className="text-xs text-foreground-subtle">{model.styleTags.join(" · ")}</p>
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="model-library" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-4 sm:px-8">
        <Reveal className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Model Library</h2>
          <p className="mt-1 text-sm text-foreground-subtle">
            검색하거나 필터를 사용해 원하는 스타일의 모델을 찾아보세요.
          </p>
        </Reveal>
        <ModelLibrary models={aiModelPresets} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">My Models</h2>
        </Reveal>
        <SavedModels />
      </section>
    </>
  );
}
