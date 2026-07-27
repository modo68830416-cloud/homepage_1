"use client";

import { Check, UserRound } from "lucide-react";
import type { AiModelPreset } from "@/types/models";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { TiltCard } from "@/components/motion/tilt-card";
import { Spotlight } from "@/components/motion/spotlight";
import { cn } from "@/lib/utils";

const AGE_LABEL: Record<AiModelPreset["ageGroup"], string> = {
  teen: "10대 후반",
  "20s": "20대",
  "30s": "30대",
  "40s": "40대",
  "50plus": "50대 이상",
};

const BODY_LABEL: Record<AiModelPreset["bodyProfile"], string> = {
  slim: "마른 편",
  balanced: "균형적인 편",
  athletic: "탄탄한 편",
  curvy: "볼륨 있는 편",
  plus: "체격이 있는 편",
};

type PresetModelCardProps = {
  model: AiModelPreset;
  selected?: boolean;
  onSelect?: () => void;
};

export function PresetModelCard({ model, selected, onSelect }: PresetModelCardProps) {
  return (
    <TiltCard maxTilt={5}>
      <Spotlight
        className={cn(
          "group glass-panel flex h-full flex-col overflow-hidden rounded-xl transition-[transform,box-shadow] duration-300 ease-[var(--ease-premium)] hover:-translate-y-1",
          selected && "border-accent-lime/60 shadow-[0_0_50px_-12px_rgba(217,255,87,0.5)]",
        )}
      >
        <article className="flex h-full flex-col">
          <div className="relative aspect-[3/4]">
            <PlaceholderArt
              seed={model.id}
              icon={UserRound}
              label={model.name}
              className="rounded-none transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {model.isDemo && <Badge tone="mock">DEMO</Badge>}
            </div>
            {selected && (
              <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent-lime text-[#0a0a0a]">
                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {model.styleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="text-base font-semibold text-foreground">{model.name}</h3>
            <p className="text-xs text-foreground-subtle">
              {model.styleTags.join(" · ")} · {AGE_LABEL[model.ageGroup]}
            </p>
            <p className="text-xs text-foreground-subtle">
              체형 {BODY_LABEL[model.bodyProfile]} · {model.recommendedFor.join(", ")}
            </p>
            <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
              <Button
                variant={selected ? "primary" : "secondary"}
                className="flex-1 text-xs"
                onClick={onSelect}
              >
                {selected ? "선택됨" : "이 모델 선택"}
              </Button>
              <Button variant="outline" className="flex-1 text-xs" disabled>
                미리보기
              </Button>
            </div>
          </div>
        </article>
      </Spotlight>
    </TiltCard>
  );
}
