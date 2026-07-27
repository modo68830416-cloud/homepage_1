import { Camera, Shirt, Sparkles, TrendingUp, Video } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

const reasons = [
  {
    icon: Sparkles,
    title: "AI 모델",
    description: "다양한 스타일과 체형의 AI 모델로 바로 코디를 시작하세요.",
  },
  {
    icon: Camera,
    title: "내 사진 아바타",
    description: "정면 사진 한 장으로 나만의 아바타를 만들어 착용 경험을 확인하세요.",
  },
  {
    icon: Shirt,
    title: "가상 피팅",
    description: "실제로 입어보지 않아도 코디 결과를 미리 확인할 수 있습니다.",
  },
  {
    icon: Video,
    title: "콘텐츠 제작",
    description: "이미지, 영상, 쇼츠 형태의 콘텐츠를 자동으로 생성합니다.",
  },
  {
    icon: TrendingUp,
    title: "판매 수익",
    description: "생성한 콘텐츠는 구매 링크로 이어지고 판매 수익으로 정산됩니다.",
  },
];

export function WhyFashionCreator() {
  return (
    <section id="why" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8">
      <SectionHeading
        eyebrow="Why Fashion Creator"
        title="쇼핑몰이 아니라 AI 패션 제작 플랫폼입니다"
        description="입어보고, 만들고, 공유하고, 판매하는 흐름을 한곳에서 경험하세요."
      />
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-5">
        {reasons.map((reason, index) => (
          <Reveal key={reason.title} delay={index * 0.05}>
            <FeatureCard {...reason} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
