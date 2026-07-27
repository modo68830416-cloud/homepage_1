import { fashionModels } from "@/data/models";
import { ModelCard } from "@/components/ui/ModelCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function AIModelPreview() {
  const featured = fashionModels.filter((model) => model.isFeatured).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="AI Models"
        title="정면 사진 한 장으로 나만의 아바타를"
        description="기본 AI 모델을 선택하거나, 내 사진으로 아바타를 만들어 코디를 체험하세요."
        linkHref="/models"
        linkLabel="Browse all models"
      />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {featured.map((model, index) => (
          <Reveal key={model.id} delay={index * 0.05}>
            <ModelCard model={model} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
