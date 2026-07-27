"use client";

import { Check, UserRound } from "lucide-react";
import type { FashionModel } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { TiltCard } from "@/components/motion/tilt-card";
import { Spotlight } from "@/components/motion/spotlight";
import { cn } from "@/lib/utils";

type ModelCardProps = {
  model: FashionModel;
  selected?: boolean;
  onSelect?: () => void;
};

export function ModelCard({ model, selected, onSelect }: ModelCardProps) {
  return (
    <TiltCard maxTilt={5}>
      <Spotlight
        className={cn(
          "group glass-panel flex h-full flex-col overflow-hidden rounded-xl transition-[transform,box-shadow] duration-300 ease-[var(--ease-premium)] hover:-translate-y-1",
          selected && "border-accent-lime/60 shadow-[0_0_50px_-12px_rgba(217,255,87,0.5)]",
        )}
      >
        <article className="flex h-full flex-col">
          <button
            type="button"
            onClick={onSelect}
            disabled={!onSelect}
            aria-pressed={onSelect ? selected : undefined}
            className={cn(
              "relative aspect-[3/4] text-left",
              onSelect ? "cursor-pointer" : "cursor-default",
            )}
          >
            <PlaceholderArt
              seed={model.id}
              icon={UserRound}
              label={model.name}
              className={cn(
                "rounded-none transition-transform duration-500",
                "group-hover:scale-[1.02]",
              )}
            />
            {model.isFeatured && (
              <div className="absolute left-3 top-3">
                <Badge tone="ai">AI GENERATED</Badge>
              </div>
            )}
            {selected && (
              <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent-lime text-[#0a0a0a]">
                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              </div>
            )}
          </button>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="text-base font-semibold text-foreground">{model.name}</h3>
            <p className="text-xs text-foreground-subtle">
              {model.style} · {model.bodyType}
            </p>
            <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
              {onSelect ? (
                <Button
                  variant={selected ? "primary" : "secondary"}
                  className="flex-1 text-xs"
                  onClick={onSelect}
                >
                  {selected ? "Selected" : "Use This Model"}
                </Button>
              ) : (
                <Button href="/studio" variant="secondary" className="flex-1 text-xs">
                  Use This Model
                </Button>
              )}
              <Button href="/models" variant="outline" className="flex-1 text-xs">
                Create My Avatar
              </Button>
            </div>
          </div>
        </article>
      </Spotlight>
    </TiltCard>
  );
}
