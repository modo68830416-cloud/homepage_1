import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "photo", label: "사진" },
  { key: "info", label: "기본 정보" },
  { key: "body", label: "체형" },
  { key: "generating", label: "생성" },
  { key: "result", label: "결과" },
] as const;

export type WizardStepKey = (typeof STEPS)[number]["key"];

export function WizardProgress({ current }: { current: WizardStepKey }) {
  const currentIndex = STEPS.findIndex((step) => step.key === current);

  return (
    <ol className="mb-10 flex items-center justify-between gap-1 sm:gap-2" aria-label="아바타 생성 단계">
      {STEPS.map((step, index) => {
        const state = index < currentIndex ? "done" : index === currentIndex ? "current" : "upcoming";
        return (
          <li key={step.key} className="flex flex-1 items-center gap-1 sm:gap-2">
            <div
              aria-current={state === "current" ? "step" : undefined}
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors sm:h-8 sm:w-8",
                state === "done" && "bg-accent-lime text-[#0a0a0a]",
                state === "current" && "bg-surface-strong text-foreground ring-2 ring-accent-lime",
                state === "upcoming" && "bg-surface text-foreground-subtle",
              )}
            >
              {state === "done" ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : index + 1}
            </div>
            <span
              className={cn(
                "hidden text-xs sm:inline",
                state === "upcoming" ? "text-foreground-subtle" : "text-foreground",
              )}
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-px flex-1",
                  state === "done" ? "bg-accent-lime" : "bg-border",
                )}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export const WIZARD_STEPS = STEPS;
