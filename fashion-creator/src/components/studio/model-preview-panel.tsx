"use client";

import { useState } from "react";
import { Maximize2, Minimize2, UserRound } from "lucide-react";
import type { Product } from "@/types";
import type { SelectedModel } from "@/types/models";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AvatarPreview } from "@/components/models/avatar-preview";
import { cn } from "@/lib/utils";

type ModelPreviewPanelProps = {
  selectedModel: SelectedModel | null;
  wornProducts: Product[];
};

export function ModelPreviewPanel({ selectedModel, wornProducts }: ModelPreviewPanelProps) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <GlassPanel className="flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-border p-3">
        <p className="text-sm font-semibold text-foreground">
          {selectedModel ? selectedModel.modelName : "모델을 선택해주세요"}
        </p>
        <Button
          variant="icon"
          aria-label={zoomed ? "축소" : "확대"}
          onClick={() => setZoomed((z) => !z)}
        >
          {zoomed ? <Minimize2 className="h-4 w-4" aria-hidden="true" /> : <Maximize2 className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {selectedModel ? (
          <div className={cn("h-full w-full transition-transform duration-500", zoomed && "scale-125")}>
            <AvatarPreview
              imageUrl={selectedModel.previewImageUrl}
              seed={selectedModel.modelId}
              icon={UserRound}
              label={`${selectedModel.modelName} styling preview`}
              className="rounded-none"
            />
          </div>
        ) : (
          <div className="flex h-full min-h-72 flex-col items-center justify-center gap-3 p-6 text-center">
            <UserRound className="h-10 w-10 text-foreground-subtle" aria-hidden="true" />
            <p className="text-sm text-foreground-muted">
              먼저 AI 모델을 선택하거나 내 아바타를 만들어주세요.
            </p>
            <Button href="/models" variant="secondary" className="text-xs">
              모델 선택하러 가기
            </Button>
          </div>
        )}

        {selectedModel && (
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge tone="ai">AI STYLING</Badge>
            {!selectedModel.previewImageUrl && <Badge tone="mock">DEMO</Badge>}
          </div>
        )}

        {selectedModel && wornProducts.length > 0 && (
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
            {wornProducts.map((product) => (
              <span
                key={product.id}
                className="rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground"
              >
                {product.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </GlassPanel>
  );
}
