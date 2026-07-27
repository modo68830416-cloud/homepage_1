import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PageIntro } from "@/components/home/PageIntro";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "₩0",
    period: "언제나 무료",
    description: "패션 트렌드를 탐색하고 AI 코디를 처음 체험해보세요.",
    features: ["인기 상품 탐색", "기본 AI 모델 체험", "제한된 콘텐츠 생성", "커뮤니티 룩 열람"],
    cta: "무료로 시작하기",
    href: "/models",
    highlight: false,
  },
  {
    name: "Creator",
    price: "₩29,000",
    period: "월",
    description: "고화질 콘텐츠를 제작하고 판매 수익을 정산받는 크리에이터 플랜.",
    features: [
      "고화질 이미지·영상·쇼츠 생성",
      "자동 구매 링크 발급",
      "콘텐츠 성과 추적",
      "마켓플레이스 등록",
      "판매 수익 정산",
    ],
    cta: "Creator로 시작하기",
    href: "/creator",
    highlight: true,
  },
  {
    name: "Business",
    price: "맞춤 견적",
    period: "브랜드 전용",
    description: "브랜드 전용 AI 모델과 크리에이터 캠페인으로 성과를 확장하세요.",
    features: [
      "브랜드 전용 AI 모델",
      "크리에이터 캠페인 운영",
      "콘텐츠 제작 의뢰",
      "판매·콘텐츠 성과 분석",
      "전담 매니저 지원",
    ],
    cta: "문의하기",
    href: "/marketplace",
    highlight: false,
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description: "일반 사용자, 구독 크리에이터, 브랜드를 위한 Fashion Creator 요금제.",
};

export default function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pricing"
        title="당신에게 맞는 플랜을 선택하세요"
        description="가볍게 체험하거나, 크리에이터로 수익을 만들거나, 브랜드로 캠페인을 운영하세요."
      />
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <GlassPanel
                className={cn(
                  "flex h-full flex-col gap-6 rounded-2xl p-7",
                  plan.highlight && "border-accent-lime/50 shadow-[0_0_60px_-20px_rgba(217,255,87,0.4)]",
                )}
                glow={plan.highlight}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  {plan.highlight && <Badge tone="bestSeller">MOST POPULAR</Badge>}
                </div>
                <div>
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="ml-2 text-sm text-foreground-subtle">{plan.period}</span>
                </div>
                <p className="text-sm text-foreground-muted">{plan.description}</p>
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-foreground-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href={plan.href}
                  variant={plan.highlight ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
