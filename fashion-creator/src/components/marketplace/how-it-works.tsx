import { FileCheck, Search, ShieldCheck, Sparkles } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  { step: "01", icon: Search, title: "탐색", description: "크리에이터, 콘텐츠, 브랜드 캠페인을 검색하고 필터로 좁혀보세요." },
  { step: "02", icon: Sparkles, title: "연결", description: "제작 의뢰를 보내거나 캠페인에 지원해 협업을 시작하세요." },
  { step: "03", icon: FileCheck, title: "제작·검토", description: "시안을 제출하고 검토·수정을 거쳐 콘텐츠를 완성합니다." },
  { step: "04", icon: ShieldCheck, title: "거래·정산", description: "에스크로 DEMO로 안전하게 거래하고 수익을 정산받습니다." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <Reveal className="mb-8">
        <h2 className="text-xl font-semibold text-foreground">How It Works</h2>
      </Reveal>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <Reveal key={step.step} delay={index * 0.06}>
            <FeatureCard {...step} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
