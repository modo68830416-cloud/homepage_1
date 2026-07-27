"use client";

import { useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AiGateway } from "@/ai/gateway/ai-gateway";
import { useAiJob } from "@/ai/gateway/use-ai-job";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";

// The job is created by the caller (a click handler) before this step
// mounts — this component only ticks and displays an existing AI Gateway
// Job Queue entry, same pattern as AvatarGeneratingStep.
export function GenerationProgress({
  jobId,
  onComplete,
  onCancel,
}: {
  jobId: string;
  onComplete: (jobId: string) => void;
  onCancel: () => void;
}) {
  const reduced = useReducedMotionContext();
  const job = useAiJob(jobId);

  useEffect(() => {
    if (reduced) {
      onComplete(jobId);
      return;
    }
    if (!job) return;
    if (job.activeStepIndex >= job.steps.length) {
      const timer = setTimeout(() => onComplete(jobId), 400);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => AiGateway.advanceStep(jobId), 1100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId, job?.activeStepIndex, job?.steps.length, reduced]);

  function handleCancel() {
    AiGateway.cancelJob(jobId);
    onCancel();
  }

  const steps = job?.steps ?? [];
  const activeIndex = job?.activeStepIndex ?? 0;

  return (
    <div className="flex flex-col items-center gap-6 py-10 text-center">
      <Badge tone="ai">AI Content Demo</Badge>
      <h2 className="text-xl font-semibold text-foreground">콘텐츠를 생성하고 있어요</h2>
      <p className="max-w-sm text-sm text-foreground-muted">
        선택한 Look과 설정을 반영해 데모 콘텐츠를 준비하고 있습니다.
      </p>

      <GlassPanel className="w-full max-w-sm rounded-xl p-5 text-left" aria-live="polite">
        <ul className="flex flex-col gap-3">
          {steps.map((step, index) => {
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
                <span className={done || current ? "text-foreground" : "text-foreground-subtle"}>{step}</span>
              </li>
            );
          })}
        </ul>
      </GlassPanel>

      <Button variant="ghost" className="text-xs" onClick={handleCancel}>
        취소하고 설정으로 돌아가기
      </Button>
    </div>
  );
}
