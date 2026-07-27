"use client";

import { useState } from "react";
import { Pause, Play, QrCode, ShoppingBag, Type, User, Volume2, VolumeX } from "lucide-react";
import type { GeneratedContent } from "@/types/content";
import type { ContentSourceLook } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { useReducedMotionContext } from "@/components/motion/reduced-motion-provider";
import { cn } from "@/lib/utils";

const ASPECT_CLASS: Record<string, string> = {
  "9:16": "aspect-[9/16] max-w-[220px]",
  "16:9": "aspect-video max-w-md",
  "1:1": "aspect-square max-w-xs",
  "4:5": "aspect-[4/5] max-w-xs",
};

const THUMBNAIL_ICONS = [User, ShoppingBag, Type];
const THUMBNAIL_LABELS = ["모델 중심", "상품 중심", "텍스트 중심"];

export function GenerationPreview({
  content,
  look,
}: {
  content: GeneratedContent;
  look: ContentSourceLook;
}) {
  const reduced = useReducedMotionContext();
  const [version, setVersion] = useState<"clean" | "shoppable">("shoppable");
  const [playing, setPlaying] = useState(!reduced);
  const [muted, setMuted] = useState(true);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  const isVideo = content.type === "video";

  return (
    <div className="flex flex-col items-center gap-5">
      <div className={cn("relative mx-auto w-full overflow-hidden rounded-2xl border border-border-strong", ASPECT_CLASS[content.aspectRatio])}>
        <PlaceholderArt seed={content.mediaSeed} icon={ShoppingBag} label={`${look.name} content preview`} className="rounded-none" />

        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge tone="ai">AI GENERATED</Badge>
          <Badge tone="mock">DEMO</Badge>
        </div>

        {version === "shoppable" && (
          <>
            <div className="absolute inset-x-3 bottom-14 flex flex-wrap gap-1.5">
              {look.products.map((product) => (
                <span key={product.id} className="rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-medium text-foreground">
                  {product.name}
                </span>
              ))}
            </div>
            <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-md bg-background/85">
              <QrCode className="h-4 w-4 text-foreground-subtle" aria-hidden="true" />
            </div>
            <div className="absolute bottom-3 left-3 rounded-full bg-background/70 px-2 py-0.5 text-[10px] text-foreground-subtle">
              Fashion Creator
            </div>
          </>
        )}

        {isVideo && (
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-background/90 to-transparent p-3 pt-8">
            <Button
              variant="icon"
              className="h-8 w-8"
              aria-label={playing ? "일시정지" : "재생"}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
            </Button>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
              <div className={cn("h-full w-1/3 bg-accent-lime", playing && !reduced && "animate-pulse")} />
            </div>
            <span className="text-[10px] text-foreground-subtle">{content.duration}s</span>
            <Button variant="icon" className="h-8 w-8" aria-label={muted ? "음소거 해제" : "음소거"} onClick={() => setMuted((m) => !m)}>
              {muted ? <VolumeX className="h-3.5 w-3.5" aria-hidden="true" /> : <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />}
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-2" role="group" aria-label="버전 선택">
        <button
          type="button"
          onClick={() => setVersion("clean")}
          aria-pressed={version === "clean"}
          className={cn(
            "min-h-9 rounded-full border px-3 text-xs font-medium",
            version === "clean" ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
          )}
        >
          Clean Version
        </button>
        <button
          type="button"
          onClick={() => setVersion("shoppable")}
          aria-pressed={version === "shoppable"}
          className={cn(
            "min-h-9 rounded-full border px-3 text-xs font-medium",
            version === "shoppable" ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
          )}
        >
          Shoppable Version
        </button>
      </div>

      <GlassPanel className="w-full max-w-sm rounded-xl p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">썸네일 선택</p>
        <div className="grid grid-cols-3 gap-2">
          {content.thumbnailOptions.map((seed, index) => {
            const Icon = THUMBNAIL_ICONS[index];
            const checked = thumbnailIndex === index;
            return (
              <button
                key={seed}
                type="button"
                onClick={() => setThumbnailIndex(index)}
                aria-pressed={checked}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg border p-2 text-[10px]",
                  checked ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-subtle",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {THUMBNAIL_LABELS[index]}
              </button>
            );
          })}
        </div>
      </GlassPanel>
    </div>
  );
}
