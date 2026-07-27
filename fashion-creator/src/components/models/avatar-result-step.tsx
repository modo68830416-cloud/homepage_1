"use client";

import { useId, useState } from "react";
import { RotateCcw, Save, Sparkles, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AvatarPreview } from "@/components/models/avatar-preview";
import { BodyPreview } from "@/components/models/body-preview";
import type { AvatarBasicInfo, BodySettings } from "@/types/models";
import { DemoAvatarService } from "@/services/demo-avatar-service";

type SliderField = {
  key: keyof BodySettings;
  label: string;
  low: string;
  high: string;
  options: string[];
};

const SLIDER_FIELDS: SliderField[] = [
  { key: "bodyType", label: "전체 체형", low: "가늘게", high: "볼륨 있게", options: ["slim", "balanced", "athletic", "curvy", "solid"] },
  { key: "proportion", label: "다리 비율", low: "짧게", high: "길게", options: ["upper-long", "balanced", "leg-long"] },
  { key: "shoulder", label: "어깨", low: "좁게", high: "넓게", options: ["narrow", "regular", "wide"] },
  { key: "arms", label: "팔", low: "가늘게", high: "볼륨 있게", options: ["slim", "regular", "full"] },
  { key: "abdomen", label: "복부", low: "평평하게", high: "볼륨 있게", options: ["slim", "regular", "full"] },
  { key: "lowerBody", label: "하체", low: "가늘게", high: "볼륨 있게", options: ["slim", "regular", "full"] },
];

type AvatarResultStepProps = {
  basicInfo: AvatarBasicInfo;
  bodySettings: BodySettings;
  generatedImageUrl?: string;
  onBodySettingsChange: (settings: BodySettings) => void;
  onSave: (name: string) => void;
  onRestart: () => void;
  onGoToStudio: () => void;
};

export function AvatarResultStep({
  basicInfo,
  bodySettings,
  generatedImageUrl,
  onBodySettingsChange,
  onSave,
  onRestart,
  onGoToStudio,
}: AvatarResultStepProps) {
  const [name, setName] = useState("My Avatar");
  const [saved, setSaved] = useState(false);
  const nameId = useId();
  const seed = DemoAvatarService.buildPreviewSeed(basicInfo, bodySettings);

  function handleSliderChange(field: SliderField, index: number) {
    onBodySettingsChange({ ...bodySettings, [field.key]: field.options[index] });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <Badge tone="ai">{generatedImageUrl ? "AI Avatar" : "AI Avatar Demo"}</Badge>
        <h2 className="mt-3 text-2xl font-bold text-foreground">아바타가 완성되었어요</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground-muted">
          {generatedImageUrl
            ? "이 아바타는 업로드한 정면 사진과 선택한 체형 정보를 바탕으로 AI가 생성한 이미지입니다. 실제 신체 비율이나 의류 착용 결과와 차이가 있을 수 있습니다."
            : "이 아바타는 업로드한 정면 사진과 선택한 체형 정보를 바탕으로 만든 AI 데모 이미지입니다. 실제 신체 비율이나 의류 착용 결과와 차이가 있을 수 있습니다."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="mx-auto">
          <div className="mb-4 aspect-[3/4] w-56 overflow-hidden rounded-2xl border border-border-strong">
            <AvatarPreview imageUrl={generatedImageUrl} seed={seed} icon={UserRound} label="Generated avatar preview" />
          </div>
          <BodyPreview settings={bodySettings} />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor={nameId} className="mb-2 block text-sm font-medium text-foreground">
              아바타 이름
            </label>
            <input
              id={nameId}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={30}
              className="w-full max-w-xs rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
            />
          </div>

          <GlassPanel className="rounded-xl p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              적용된 설정 요약
            </p>
            <p className="text-sm text-foreground-muted">
              {basicInfo.genderPresentation === "feminine"
                ? "여성형"
                : basicInfo.genderPresentation === "masculine"
                  ? "남성형"
                  : "중성적"}{" "}
              · {basicInfo.ageGroup} · {bodySettings.bodyType} 체형
            </p>
          </GlassPanel>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-lime" aria-hidden="true" />
              <p className="text-sm font-semibold text-foreground">미세 조정</p>
            </div>
            <div className="flex flex-col gap-4">
              {SLIDER_FIELDS.map((field) => (
                <div key={field.key}>
                  <label htmlFor={`fine-${field.key}`} className="mb-1 block text-xs text-foreground-subtle">
                    {field.label}
                  </label>
                  <input
                    id={`fine-${field.key}`}
                    type="range"
                    min={0}
                    max={field.options.length - 1}
                    step={1}
                    value={field.options.indexOf(bodySettings[field.key])}
                    onChange={(event) => handleSliderChange(field, Number(event.target.value))}
                    className="w-full accent-[var(--accent-lime)]"
                  />
                  <div className="flex justify-between text-[11px] text-foreground-subtle">
                    <span>{field.low}</span>
                    <span>{field.high}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => {
                onSave(name.trim() || "My Avatar");
                setSaved(true);
              }}
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              {saved ? "저장됨" : "저장하기"}
            </Button>
            <Button variant="secondary" onClick={onRestart}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              다시 만들기
            </Button>
            <Button variant="outline" onClick={onGoToStudio}>
              코디 스튜디오로 이동
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
