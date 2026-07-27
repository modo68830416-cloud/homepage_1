"use client";

import { useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AiGateway } from "@/ai/gateway/ai-gateway";
import { useAiJob } from "@/ai/gateway/use-ai-job";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";
import type { AvatarBasicInfo, BodySettings } from "@/types/models";

type AvatarGeneratingStepProps = {
  jobId: string;
  basicInfo: AvatarBasicInfo;
  bodySettings: BodySettings;
  photoFile?: File | null;
  useRealProvider?: boolean;
  onComplete: (previewImageUrl?: string, realGenerationFailed?: boolean) => void;
  onCancel: () => void;
};

const STEP_DURATION_MS = 800;

function finish(
  jobId: string,
  basicInfo: AvatarBasicInfo,
  bodySettings: BodySettings,
  photoFile: File | null | undefined,
  useRealProvider: boolean | undefined,
  onComplete: (previewImageUrl?: string, realGenerationFailed?: boolean) => void,
) {
  AiGateway.completeAvatarJob(jobId, { basicInfo, bodySettings, photoFile: photoFile ?? undefined, useRealProvider }).then(
    (result) => onComplete(result.provider !== "demo" ? result.previewUrl ?? undefined : undefined),
    () => onComplete(undefined, useRealProvider),
  );
}

// The job is created by the caller (a click handler, not a render/effect)
// before this step ever mounts — this component only ticks and displays an
// existing AI Gateway Job Queue entry, it never creates one itself.
export function AvatarGeneratingStep({
  jobId,
  basicInfo,
  bodySettings,
  photoFile,
  useRealProvider,
  onComplete,
  onCancel,
}: AvatarGeneratingStepProps) {
  const reduced = useReducedMotionContext();
  const job = useAiJob(jobId);

  useEffect(() => {
    if (reduced) {
      finish(jobId, basicInfo, bodySettings, photoFile, useRealProvider, onComplete);
      return;
    }
    if (!job) return;
    if (job.activeStepIndex >= job.steps.length) {
      const timer = setTimeout(() => finish(jobId, basicInfo, bodySettings, photoFile, useRealProvider, onComplete), 400);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => AiGateway.advanceStep(jobId), STEP_DURATION_MS);
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
      <Badge tone="ai">{useRealProvider ? "AI Avatar" : "AI Avatar Demo"}</Badge>
      <h2 className="text-xl font-semibold text-foreground">아바타를 생성하고 있어요</h2>
      <p className="max-w-sm text-sm text-foreground-muted">
        {useRealProvider
          ? "업로드한 사진과 선택한 체형 설정을 반영해 AI가 아바타를 생성하고 있습니다. 몇 초 정도 걸릴 수 있어요."
          : "업로드한 사진과 선택한 체형 설정을 반영해 데모 아바타를 준비하고 있습니다."}
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
                <span className={done || current ? "text-foreground" : "text-foreground-subtle"}>
                  {step}
                </span>
              </li>
            );
          })}
        </ul>
      </GlassPanel>

      <Button variant="ghost" className="text-xs" onClick={handleCancel}>
        취소하고 이전으로
      </Button>
    </div>
  );
}
