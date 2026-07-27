"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { getGenerationSteps } from "@/lib/avatar-demo";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";

type AvatarGeneratingStepProps = {
  onComplete: () => void;
  onCancel: () => void;
};

const STEPS = getGenerationSteps();
const STEP_DURATION_MS = 800;

export function AvatarGeneratingStep({ onComplete, onCancel }: AvatarGeneratingStepProps) {
  const reduced = useReducedMotionContext();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }
    if (activeIndex >= STEPS.length) {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setActiveIndex((i) => i + 1), STEP_DURATION_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, reduced]);

  return (
    <div className="flex flex-col items-center gap-6 py-10 text-center">
      <Badge tone="ai">AI Avatar Demo</Badge>
      <h2 className="text-xl font-semibold text-foreground">아바타를 생성하고 있어요</h2>
      <p className="max-w-sm text-sm text-foreground-muted">
        업로드한 사진과 선택한 체형 설정을 반영해 데모 아바타를 준비하고 있습니다.
      </p>

      <GlassPanel className="w-full max-w-sm rounded-xl p-5 text-left" aria-live="polite">
        <ul className="flex flex-col gap-3">
          {STEPS.map((step, index) => {
            const done = index < activeIndex;
            const current = index === activeIndex;
            return (
              <li key={step} className="flex items-center gap-3 text-sm">
                {done ? (
                  <Check className="h-4 w-4 shrink-0 text-accent-lime" aria-hidden="true" />
                ) : current ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-accent-lime" aria-hidden="true" />
                ) : (
                  <span className="h-4 w-4 shrink-0 rounded-full border border-border" aria-hidden="true" />
                )}
                <span className={done || current ? "text-foreground" : "text-foreground-subtle"}>
                  {step}
                </span>
              </li>
            );
          })}
        </ul>
      </GlassPanel>

      <Button variant="ghost" className="text-xs" onClick={onCancel}>
        취소하고 이전으로
      </Button>
    </div>
  );
}
