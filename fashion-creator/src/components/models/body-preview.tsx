"use client";

import { useState } from "react";
import type { BodySettings } from "@/types/models";
import { cn } from "@/lib/utils";

const SHOULDER_WIDTH: Record<BodySettings["shoulder"], number> = {
  narrow: 34,
  regular: 40,
  wide: 47,
};

const ARM_WIDTH: Record<BodySettings["arms"], number> = {
  slim: 5,
  regular: 7,
  full: 9.5,
};

const ABDOMEN_WIDTH: Record<BodySettings["abdomen"], number> = {
  slim: 20,
  regular: 25,
  full: 31,
};

const LOWER_WIDTH: Record<BodySettings["lowerBody"], number> = {
  slim: 15,
  regular: 19,
  full: 24,
};

const LEG_LENGTH: Record<BodySettings["proportion"], number> = {
  "upper-long": 62,
  balanced: 70,
  "leg-long": 78,
};

const ANGLES = [
  { key: "front", label: "정면" },
  { key: "side", label: "측면" },
  { key: "back", label: "후면" },
] as const;

export function BodyPreview({ settings }: { settings: BodySettings }) {
  const [angle, setAngle] = useState<(typeof ANGLES)[number]["key"]>("front");

  const shoulderWidth = SHOULDER_WIDTH[settings.shoulder];
  const armWidth = ARM_WIDTH[settings.arms];
  const abdomenWidth = ABDOMEN_WIDTH[settings.abdomen];
  const lowerWidth = LOWER_WIDTH[settings.lowerBody];
  const legLength = LEG_LENGTH[settings.proportion];
  const isSide = angle === "side";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="glass-panel flex h-72 w-full max-w-[220px] items-center justify-center rounded-2xl p-4">
        <svg
          viewBox="0 0 100 160"
          className="h-full w-auto transition-transform duration-500"
          style={{ transform: isSide ? "scaleX(0.55)" : "scaleX(1)" }}
          role="img"
          aria-label={`체형 미리보기 (${ANGLES.find((a) => a.key === angle)?.label} · AI 데모 각도)`}
        >
          <circle cx="50" cy="18" r="12" fill="var(--surface-strong)" stroke="var(--accent-lime)" strokeWidth="1" />
          <rect
            x={50 - shoulderWidth / 2}
            y="32"
            width={shoulderWidth}
            height="10"
            rx="5"
            fill="var(--surface-strong)"
          />
          <rect
            x={50 - abdomenWidth / 2}
            y="40"
            width={abdomenWidth}
            height="38"
            rx="10"
            fill="var(--surface-strong)"
            stroke="var(--border-strong)"
            strokeWidth="0.5"
            className="transition-all duration-500"
          />
          <rect x={50 - shoulderWidth / 2 - armWidth} y="34" width={armWidth} height="42" rx={armWidth / 2} fill="var(--surface)" />
          <rect x={50 + shoulderWidth / 2} y="34" width={armWidth} height="42" rx={armWidth / 2} fill="var(--surface)" />
          <rect
            x={50 - lowerWidth / 2}
            y="78"
            width={lowerWidth}
            height={legLength}
            rx="8"
            fill="var(--surface-strong)"
            className="transition-all duration-500"
          />
        </svg>
      </div>

      <div className="flex gap-2" role="group" aria-label="미리보기 각도">
        {ANGLES.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setAngle(item.key)}
            className={cn(
              "min-h-9 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              angle === item.key
                ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                : "border-border text-foreground-muted hover:text-foreground",
            )}
            aria-pressed={angle === item.key}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="max-w-[220px] text-center text-[11px] leading-relaxed text-foreground-subtle">
        AI 데모 모델의 각도이며, 사용자가 측면·후면 사진을 올린 것이 아닙니다.
      </p>
    </div>
  );
}
