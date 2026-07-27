"use client";

import { Button } from "@/components/ui/Button";
import { BodyOptionCard } from "@/components/models/body-option-card";
import type { AgeGroup, AvatarBasicInfo, GenderPresentation } from "@/types/models";

const GENDER_OPTIONS: { value: GenderPresentation; label: string }[] = [
  { value: "feminine", label: "여성형" },
  { value: "masculine", label: "남성형" },
  { value: "androgynous", label: "중성적" },
];

const AGE_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: "teen", label: "10대 후반" },
  { value: "20s", label: "20대" },
  { value: "30s", label: "30대" },
  { value: "40s", label: "40대" },
  { value: "50plus", label: "50대 이상" },
];

type BasicInfoStepProps = {
  value: AvatarBasicInfo;
  onChange: (value: AvatarBasicInfo) => void;
  onNext: () => void;
  onBack: () => void;
};

export function BasicInfoStep({ value, onChange, onNext, onBack }: BasicInfoStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">기본 정보</h2>
        <p className="mt-1.5 text-sm text-foreground-muted">
          키와 몸무게는 선택 입력이며, 체형을 확정하는 절대 기준으로 사용되지 않습니다.
        </p>
      </div>

      <BodyOptionCard
        legend="모델 표현 스타일"
        name="genderPresentation"
        options={GENDER_OPTIONS}
        value={value.genderPresentation}
        onChange={(genderPresentation) => onChange({ ...value, genderPresentation })}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="height" className="mb-2 block text-sm font-medium text-foreground">
            키 (선택, cm)
          </label>
          <input
            id="height"
            type="range"
            min={140}
            max={210}
            value={value.height ?? 170}
            onChange={(event) => onChange({ ...value, height: Number(event.target.value) })}
            className="w-full accent-[var(--accent-lime)]"
          />
          <div className="mt-1 flex items-center justify-between text-xs text-foreground-subtle">
            <span>{value.height ? `${value.height}cm` : "건너뛰기"}</span>
            {value.height !== undefined && (
              <button
                type="button"
                className="underline"
                onClick={() => onChange({ ...value, height: undefined })}
              >
                초기화
              </button>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="weight" className="mb-2 block text-sm font-medium text-foreground">
            몸무게 (선택, kg)
          </label>
          <input
            id="weight"
            type="range"
            min={35}
            max={180}
            value={value.weight ?? 60}
            onChange={(event) => onChange({ ...value, weight: Number(event.target.value) })}
            className="w-full accent-[var(--accent-lime)]"
          />
          <div className="mt-1 flex items-center justify-between text-xs text-foreground-subtle">
            <span>{value.weight ? `${value.weight}kg` : "건너뛰기"}</span>
            {value.weight !== undefined && (
              <button
                type="button"
                className="underline"
                onClick={() => onChange({ ...value, weight: undefined })}
              >
                초기화
              </button>
            )}
          </div>
        </div>
      </div>

      <BodyOptionCard
        legend="연령대"
        name="ageGroup"
        options={AGE_OPTIONS}
        value={value.ageGroup}
        onChange={(ageGroup) => onChange({ ...value, ageGroup })}
      />

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          이전
        </Button>
        <Button variant="primary" onClick={onNext}>
          다음 단계
        </Button>
      </div>
    </div>
  );
}
