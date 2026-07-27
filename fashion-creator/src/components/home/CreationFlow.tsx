import { Clapperboard, Share2, Shirt, UserRound } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

const steps = [
  { step: "01", icon: UserRound, title: "Pick a Model", description: "기본 AI 모델을 선택하거나 정면 사진으로 나만의 아바타를 만듭니다." },
  { step: "02", icon: Shirt, title: "Style the Look", description: "인기 상품으로 코디를 구성하고 스타일을 조합합니다." },
  { step: "03", icon: Clapperboard, title: "Generate the Video", description: "이미지, 영상, 쇼츠 형태의 콘텐츠를 자동 생성합니다." },
  { step: "04", icon: Share2, title: "Share & Earn", description: "구매 링크와 함께 SNS에 배포하고 판매 수익을 정산받습니다." },
];

export function CreationFlow() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="How It Works"
        title="네 단계로 완성하는 패션 콘텐츠 커머스"
      />
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, index) => (
          <Reveal key={item.step} delay={index * 0.08}>
            <FeatureCard {...item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
