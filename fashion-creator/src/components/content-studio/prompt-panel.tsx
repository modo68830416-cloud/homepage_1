"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { summarizePrompt } from "@/lib/prompt-parser";
import type { ContentStudioState } from "@/types/content";

export function PromptPanel({
  prompt,
  onChange,
  state,
}: {
  prompt: string;
  onChange: (value: string) => void;
  state: ContentStudioState;
}) {
  const summary = useMemo(() => summarizePrompt(prompt, state), [prompt, state]);

  return (
    <div>
      <label htmlFor="content-prompt" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
        추가 요청 (선택)
      </label>
      <textarea
        id="content-prompt"
        value={prompt}
        onChange={(event) => onChange(event.target.value.slice(0, 300))}
        rows={3}
        maxLength={300}
        placeholder="예: 서울 야경을 배경으로 고급스럽고 차분한 워킹 쇼츠를 만들어줘."
        className="w-full rounded-xl border border-border bg-surface p-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
      />
      {prompt.trim() && (
        <GlassPanel className="mt-3 rounded-lg p-3 text-xs text-foreground-muted">
          <div className="mb-1.5 flex items-center gap-2">
            <Badge tone="mock">DEMO 요약</Badge>
          </div>
          <ul className="flex flex-col gap-1">
            <li>배경: {summary.background}</li>
            <li>스타일: {summary.style}</li>
            <li>카메라: {summary.camera}</li>
            <li>형식: {summary.format}</li>
            <li>길이: {summary.duration}</li>
          </ul>
        </GlassPanel>
      )}
    </div>
  );
}
