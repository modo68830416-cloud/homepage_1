"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import type { ContentSourceLook, ContentStudioState, GeneratedContent, ChannelCopy } from "@/types/content";
import { ASPECT_RATIOS, BACKGROUNDS, CAMERAS, DEFAULT_STUDIO_STATE, DURATIONS, MOTIONS, STYLES, VIDEO_FORMATS } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { FormatSelector } from "@/components/content-studio/format-selector";
import { LookSourcePanel } from "@/components/content-studio/look-source-panel";
import { OptionChips } from "@/components/content-studio/option-chips";
import { PromptPanel } from "@/components/content-studio/prompt-panel";
import { GenerationProgress } from "@/components/content-studio/generation-progress";
import { GenerationPreview } from "@/components/content-studio/generation-preview";
import { StoryboardEditor } from "@/components/content-studio/storyboard-editor";
import { ChannelCopyEditor } from "@/components/content-studio/channel-copy-editor";
import { GenerationError } from "@/components/content-studio/generation-error";
import { AiGateway } from "@/ai/gateway/ai-gateway";
import { DemoContentService } from "@/services/demo-content-service";
import { useToast } from "@/components/feedback/toast";

type Phase = "configure" | "generating" | "result" | "error";

export function ContentStudioShell({ looks }: { looks: ContentSourceLook[] }) {
  const router = useRouter();
  const { showToast } = useToast();

  const [state, setState] = useState<ContentStudioState>({
    ...DEFAULT_STUDIO_STATE,
    sourceLookId: looks[0]?.id ?? null,
  });
  const [lastLooks, setLastLooks] = useState(looks);

  // `looks` starts as the SSR/pre-hydration fallback (a demo Look, since the
  // real saved Looks live in a Repository that's empty on the server) and
  // then gets replaced once the real value hydrates in. Re-point
  // sourceLookId when that happens so it doesn't stay locked onto a Look
  // that no longer exists in the list — see brand-kit-form.tsx for the same
  // "adjust state during render" pattern.
  if (looks !== lastLooks) {
    setLastLooks(looks);
    if (!looks.some((look) => look.id === state.sourceLookId)) {
      setState((current) => ({ ...current, sourceLookId: looks[0]?.id ?? null }));
    }
  }

  const [phase, setPhase] = useState<Phase>("configure");
  const [generationJobId, setGenerationJobId] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [scenes, setScenes] = useState(content?.scenes ?? []);
  const [copies, setCopies] = useState<ChannelCopy[]>([]);

  const selectedLook = looks.find((look) => look.id === state.sourceLookId) ?? null;
  const isVideoFormat = VIDEO_FORMATS.includes(state.format);

  function updateState(patch: Partial<ContentStudioState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function handleGenerate() {
    if (!selectedLook) {
      setPhase("error");
      return;
    }
    const job = AiGateway.startContentJob(state.format);
    setGenerationJobId(job.id);
    setPhase("generating");
  }

  async function handleGenerationComplete(jobId: string) {
    if (!selectedLook) {
      setPhase("error");
      return;
    }
    try {
      const { content: generated } = await AiGateway.completeContentJob(jobId, {
        settings: state,
        sourceLook: selectedLook,
        projectId: `project-${Date.now()}`,
      });
      const { project, copies: generatedCopies } = DemoContentService.saveProject(state, selectedLook, generated);
      setProjectId(project.id);
      setContent(generated);
      setScenes(generated.scenes);
      setCopies(generatedCopies);
      setPhase("result");
      showToast("콘텐츠 생성이 완료되었습니다");
    } catch {
      setPhase("error");
    }
  }

  const summary = useMemo(() => {
    if (!selectedLook) return null;
    return {
      products: selectedLook.products.length,
      totalPrice: selectedLook.totalPrice,
    };
  }, [selectedLook]);

  if (phase === "error") {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 sm:px-8">
        <GenerationError
          code={!selectedLook ? "invalid-look" : "generation-failed"}
          onRetry={() => setPhase("configure")}
          onEditSettings={() => setPhase("configure")}
          onBackToStudio={() => router.push("/studio")}
        />
      </div>
    );
  }

  if (phase === "generating" && generationJobId) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 sm:px-8">
        <GenerationProgress
          jobId={generationJobId}
          onComplete={handleGenerationComplete}
          onCancel={() => setPhase("configure")}
        />
      </div>
    );
  }

  if (phase === "result" && content && selectedLook) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge tone="ai">콘텐츠 생성 완료</Badge>
            <h1 className="mt-2 text-2xl font-bold text-foreground">{selectedLook.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button href={projectId ? `/create/${projectId}` : "/create"} variant="secondary" className="text-xs">
              내 프로젝트로 이동
            </Button>
            <Button variant="outline" className="text-xs" onClick={() => setPhase("configure")}>
              새로 만들기
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <GenerationPreview content={content} look={selectedLook} />
          <div className="flex flex-col gap-8">
            {isVideoFormat && <StoryboardEditor scenes={scenes} onChange={setScenes} />}
            <ChannelCopyEditor copies={copies} onChange={setCopies} look={selectedLook} state={state} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Create New Content</h1>
        <p className="mt-1.5 text-sm text-foreground-muted">
          Look을 고르고 형식과 스타일을 설정한 뒤 데모 콘텐츠를 생성하세요.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_320px] lg:items-start">
        <GlassPanel className="flex flex-col gap-6 rounded-2xl p-5">
          <LookSourcePanel looks={looks} selectedLookId={state.sourceLookId} onSelect={(id) => updateState({ sourceLookId: id })} />
          <FormatSelector value={state.format} onChange={(format) => updateState({ format })} />
        </GlassPanel>

        <GlassPanel className="flex flex-col gap-6 rounded-2xl p-5">
          <OptionChips legend="비율" name="aspectRatio" options={ASPECT_RATIOS} value={state.aspectRatio} onChange={(aspectRatio) => updateState({ aspectRatio })} />
          {state.format !== "image" && state.format !== "blog" && (
            <OptionChips
              legend="길이"
              name="duration"
              options={DURATIONS}
              value={state.duration ?? 15}
              onChange={(duration) => updateState({ duration })}
              formatLabel={(value) => `${value}초`}
            />
          )}
          <OptionChips legend="배경" name="background" options={BACKGROUNDS} value={state.background} onChange={(background) => updateState({ background })} />
          <OptionChips legend="카메라" name="camera" options={CAMERAS} value={state.camera} onChange={(camera) => updateState({ camera })} />
          <OptionChips legend="모델 동작" name="motion" options={MOTIONS} value={state.motion} onChange={(motion) => updateState({ motion })} />
          <OptionChips legend="분위기" name="style" options={STYLES} value={state.style} onChange={(style) => updateState({ style })} />
          <PromptPanel prompt={state.prompt} onChange={(prompt) => updateState({ prompt })} state={state} />
        </GlassPanel>

        <GlassPanel className="flex flex-col gap-4 rounded-2xl p-5 lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">Look 요약</p>
          {selectedLook ? (
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <PlaceholderArt seed={selectedLook.id} icon={Sparkles} label={selectedLook.name} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{selectedLook.name}</p>
                <p className="text-xs text-foreground-subtle">
                  {summary?.products}개 상품 · {summary?.totalPrice?.toLocaleString("ko-KR")}원
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-foreground-subtle">Look을 선택해주세요.</p>
          )}
          <Badge tone="mock">DEMO Provider</Badge>
          <Button variant="primary" className="w-full" disabled={!selectedLook} onClick={handleGenerate}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            콘텐츠 생성하기
          </Button>
        </GlassPanel>
      </div>
    </div>
  );
}
