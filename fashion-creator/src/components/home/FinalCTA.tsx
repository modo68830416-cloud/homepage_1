import { Button } from "@/components/ui/Button";
import { FloatingOrb } from "@/components/motion/FloatingOrb";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-8">
      <FloatingOrb color="violet" className="left-1/4 top-0" size={420} />
      <FloatingOrb color="blue" className="right-1/4 bottom-0" size={380} delay={2} />

      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Your next fashion business
          <br />
          starts with <span className="text-gradient-aurora">one look.</span>
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/models" variant="magnetic">
            AI 모델로 시작하기
          </Button>
          <Button href="/pricing" variant="outline">
            구독 플랜 보기
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
