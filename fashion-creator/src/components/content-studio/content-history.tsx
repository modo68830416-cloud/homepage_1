"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import type { ContentProject, GenerationJobStatus } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ProjectCard } from "@/components/content-studio/project-card";
import { useContentDraft, useContentProjects } from "@/lib/content-store";
import { useToast } from "@/components/feedback/toast";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "favorites" | GenerationJobStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "generating", label: "생성 중" },
  { key: "completed", label: "완료" },
  { key: "failed", label: "실패" },
  { key: "draft", label: "초안" },
  { key: "favorites", label: "즐겨찾기" },
];

export function ContentHistory() {
  const { projects, removeProject, duplicateProject, toggleFavorite } = useContentProjects();
  const { draft, clearDraft } = useContentDraft();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (filter === "favorites" && !project.isFavorite) return false;
      if (filter !== "all" && filter !== "favorites" && project.status !== filter) return false;
      if (query.trim() && !project.title.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [projects, filter, query]);

  function handleDuplicate(project: ContentProject) {
    duplicateProject(project.id);
    showToast(`${project.title}을(를) 복제했습니다`);
  }

  function handleDelete(project: ContentProject) {
    removeProject(project.id);
    showToast("프로젝트를 삭제했습니다", "info");
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">내 콘텐츠 프로젝트</h1>
          <p className="mt-1 text-sm text-foreground-muted">저장한 Look으로 만든 콘텐츠를 관리하세요.</p>
        </div>
        <Button href="/create/new" variant="primary">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          콘텐츠 만들기
        </Button>
      </div>

      {draft && (
        <GlassPanel className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl p-4">
          <p className="text-sm text-foreground">
            작성 중인 콘텐츠가 있습니다. 이어서 작업할까요?
          </p>
          <div className="flex gap-2">
            <Button href="/create/new" variant="secondary" className="text-xs">
              이어서 작업
            </Button>
            <Button
              variant="ghost"
              className="text-xs"
              onClick={() => {
                clearDraft();
                showToast("작성 중이던 콘텐츠를 삭제했습니다", "info");
              }}
            >
              삭제
            </Button>
          </div>
        </GlassPanel>
      )}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="상태 필터">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              aria-pressed={filter === item.key}
              className={cn(
                "min-h-9 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                filter === item.key
                  ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                  : "border-border text-foreground-muted hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="프로젝트 이름 검색"
            aria-label="프로젝트 검색"
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <GlassPanel className="flex flex-col items-center gap-4 rounded-2xl p-12 text-center">
          <p className="text-sm text-foreground-muted">
            아직 만든 콘텐츠가 없습니다.
            <br />
            저장한 Look으로 첫 쇼츠를 만들어보세요.
          </p>
          <div className="flex gap-2">
            <Button href="/create/new" variant="primary" className="text-xs">
              콘텐츠 만들기
            </Button>
            <Button href="/studio" variant="outline" className="text-xs">
              Studio 열기
            </Button>
          </div>
        </GlassPanel>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDuplicate={() => handleDuplicate(project)}
              onDelete={() => handleDelete(project)}
              onToggleFavorite={() => toggleFavorite(project.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
