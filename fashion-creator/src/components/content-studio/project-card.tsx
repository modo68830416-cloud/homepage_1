"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Heart, Sparkles, Trash2 } from "lucide-react";
import type { ContentProject } from "@/types/content";
import { CONTENT_FORMATS } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<ContentProject["status"], string> = {
  draft: "초안",
  queued: "대기 중",
  preparing: "준비 중",
  generating: "생성 중",
  processing: "처리 중",
  completed: "완료",
  failed: "실패",
  cancelled: "취소됨",
};

export function ProjectCard({
  project,
  onDuplicate,
  onDelete,
  onToggleFavorite,
}: {
  project: ContentProject;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}) {
  const formatLabel = CONTENT_FORMATS.find((format) => format.value === project.format)?.label ?? project.format;
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <GlassPanel className="flex flex-col overflow-hidden rounded-xl">
      <div className="relative aspect-video">
        <PlaceholderArt seed={project.thumbnailSeed} icon={Sparkles} label={project.title} className="rounded-none" />
        <div className="absolute left-2 top-2 flex gap-1.5">
          <Badge tone={project.status === "completed" ? "bestSeller" : project.status === "failed" ? "mock" : "ai"}>
            {STATUS_LABEL[project.status]}
          </Badge>
        </div>
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-pressed={project.isFavorite}
          aria-label="즐겨찾기"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80"
        >
          <Heart
            className={cn("h-3.5 w-3.5", project.isFavorite ? "fill-accent-pink text-accent-pink" : "text-foreground-subtle")}
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <p className="truncate text-sm font-semibold text-foreground">{project.title}</p>
        <p className="text-xs text-foreground-subtle">
          {formatLabel} · {new Date(project.createdAt).toLocaleDateString("ko-KR")}
        </p>
        <div className="mt-1 flex flex-wrap gap-2">
          <Link
            href={`/create/${project.id}`}
            className="rounded-full border border-border-strong px-3 py-1 text-xs font-medium text-foreground hover:border-accent-lime hover:text-accent-lime"
          >
            열기
          </Link>
          <Button variant="ghost" className="min-h-8 px-2.5 text-xs" onClick={onDuplicate}>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            복제
          </Button>
          {confirmingDelete ? (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-foreground-subtle">삭제할까요?</span>
              <button type="button" className="font-medium text-danger" onClick={onDelete}>
                삭제
              </button>
              <button
                type="button"
                className="text-foreground-subtle"
                onClick={() => setConfirmingDelete(false)}
              >
                취소
              </button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="min-h-8 px-2.5 text-xs text-danger"
              onClick={() => setConfirmingDelete(true)}
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              삭제
            </Button>
          )}
        </div>
      </div>
    </GlassPanel>
  );
}
