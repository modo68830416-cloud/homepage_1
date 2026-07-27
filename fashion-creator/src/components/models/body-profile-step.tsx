"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { BodyOptionCard } from "@/components/models/body-option-card";
import { BodyPreview } from "@/components/models/body-preview";
import { DemoAvatarService } from "@/services/demo-avatar-service";
import type { BodySettings } from "@/types/models";

type BodyProfileStepProps = {
  settings: BodySettings;
  onChange: (settings: BodySettings) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function BodyProfileStep({
  settings,
  onChange,
  description,
  onDescriptionChange,
  onNext,
  onBack,
}: BodyProfileStepProps) {
  const [advanced, setAdvanced] = useState(false);
  const analysis = useMemo(() => DemoAvatarService.analyzeBodyDescription(description), [description]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_240px] lg:items-start">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">간편 체형 설정</h2>
          <p className="mt-1.5 text-sm text-foreground-muted">
            숫자 치수 대신 편안한 선택지로 체형을 알려주세요. 언제든 바꿀 수 있습니다.
          </p>
        </div>

        <BodyOptionCard
          legend="전체 체형"
          name="bodyType"
          options={[
            { value: "slim", label: "마른 편" },
            { value: "balanced", label: "균형적인 편" },
            { value: "athletic", label: "탄탄한 편" },
            { value: "curvy", label: "볼륨 있는 편" },
            { value: "solid", label: "체격이 있는 편" },
          ]}
          value={settings.bodyType}
          onChange={(bodyType) => onChange({ ...settings, bodyType })}
        />

        <BodyOptionCard
          legend="상하체 비율"
          name="proportion"
          options={[
            { value: "upper-long", label: "상체가 긴 편" },
            { value: "balanced", label: "균형적인 편" },
            { value: "leg-long", label: "다리가 긴 편" },
          ]}
          value={settings.proportion}
          onChange={(proportion) => onChange({ ...settings, proportion })}
        />

        {!advanced ? (
          <Button variant="outline" className="self-start text-xs" onClick={() => setAdvanced(true)}>
            더 정교하게 조정하기
          </Button>
        ) : (
          <>
            <BodyOptionCard
              legend="어깨"
              name="shoulder"
              options={[
                { value: "narrow", label: "좁은 편" },
                { value: "regular", label: "보통" },
                { value: "wide", label: "넓은 편" },
              ]}
              value={settings.shoulder}
              onChange={(shoulder) => onChange({ ...settings, shoulder })}
            />
            <BodyOptionCard
              legend="팔"
              name="arms"
              options={[
                { value: "slim", label: "가는 편" },
                { value: "regular", label: "보통" },
                { value: "full", label: "볼륨 있는 편" },
              ]}
              value={settings.arms}
              onChange={(arms) => onChange({ ...settings, arms })}
            />
            <BodyOptionCard
              legend="복부"
              name="abdomen"
              options={[
                { value: "slim", label: "평평한 편" },
                { value: "regular", label: "약간 볼륨 있는 편" },
                { value: "full", label: "볼륨 있는 편" },
              ]}
              value={settings.abdomen}
              onChange={(abdomen) => onChange({ ...settings, abdomen })}
            />
            <BodyOptionCard
              legend="하체"
              name="lowerBody"
              options={[
                { value: "slim", label: "가는 편" },
                { value: "regular", label: "보통" },
                { value: "full", label: "볼륨 있는 편" },
              ]}
              value={settings.lowerBody}
              onChange={(lowerBody) => onChange({ ...settings, lowerBody })}
            />
          </>
        )}

        <div>
          <label htmlFor="body-description" className="mb-2 block text-sm font-medium text-foreground">
            자연어로 설명하기 (선택)
          </label>
          <textarea
            id="body-description"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value.slice(0, 300))}
            maxLength={300}
            rows={3}
            placeholder="예: 다리가 조금 짧고 어깨가 넓은 편이에요."
            className="w-full rounded-xl border border-border bg-surface p-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
          />
          {analysis.length > 0 && (
            <GlassPanel className="mt-3 rounded-lg p-3 text-xs text-foreground-muted">
              <div className="mb-1 flex items-center gap-2">
                <Badge tone="mock">DEMO 분석</Badge>
                <span>입력하신 설명을 다음과 같이 반영할 예정입니다.</span>
              </div>
              <ul className="mt-1 list-inside list-disc">
                {analysis.map((item) => (
                  <li key={item.label}>{item.label}</li>
                ))}
              </ul>
            </GlassPanel>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={onBack}>
            이전
          </Button>
          <Button variant="primary" onClick={onNext}>
            아바타 생성하기
          </Button>
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <BodyPreview settings={settings} />
      </div>
    </div>
  );
}
