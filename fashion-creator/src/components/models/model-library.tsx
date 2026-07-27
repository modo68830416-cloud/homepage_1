"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { AiModelPreset } from "@/types/models";
import { PresetModelCard } from "@/components/models/preset-model-card";
import { SelectedModelBar } from "@/components/models/selected-model-bar";
import { Stagger } from "@/components/motion/stagger";
import { useSelectedModel } from "@/lib/model-store";
import { useToast } from "@/components/feedback/toast";
import { cn } from "@/lib/utils";

type FilterKey =
  | "all"
  | "feminine"
  | "masculine"
  | "androgynous"
  | "slim"
  | "balanced"
  | "curvy"
  | "athletic"
  | "senior";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "feminine", label: "여성형" },
  { key: "masculine", label: "남성형" },
  { key: "androgynous", label: "중성적" },
  { key: "slim", label: "슬림" },
  { key: "balanced", label: "보통" },
  { key: "curvy", label: "볼륨" },
  { key: "athletic", label: "스포티" },
  { key: "senior", label: "시니어" },
];

function matchesFilter(model: AiModelPreset, filter: FilterKey) {
  switch (filter) {
    case "all":
      return true;
    case "feminine":
    case "masculine":
    case "androgynous":
      return model.genderPresentation === filter;
    case "slim":
    case "balanced":
    case "curvy":
    case "athletic":
      return model.bodyProfile === filter;
    case "senior":
      return model.ageGroup === "50plus";
    default:
      return true;
  }
}

export function ModelLibrary({ models }: { models: AiModelPreset[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const { selectedModel, selectModel } = useSelectedModel();
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return models.filter((model) => {
      if (!matchesFilter(model, activeFilter)) return false;
      if (!lower) return true;
      return (
        model.name.toLowerCase().includes(lower) ||
        model.styleTags.some((tag) => tag.toLowerCase().includes(lower))
      );
    });
  }, [models, activeFilter, query]);

  function handleSelect(model: AiModelPreset) {
    selectModel({
      modelId: model.id,
      modelType: "preset",
      modelName: model.name,
      previewImage: model.image,
      bodyProfileSummary: `${model.bodyProfile} · ${model.ageGroup}`,
      styleTags: model.styleTags,
    });
    showToast(`${model.name} 모델을 선택했습니다`);
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="모델 이름, 스타일, 분위기 검색"
            className="w-full rounded-full border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
            aria-label="모델 검색"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="모델 필터">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeFilter === filter.key
                  ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                  : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground",
              )}
              aria-pressed={activeFilter === filter.key}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-foreground-subtle">
          조건에 맞는 모델이 없습니다. 다른 필터를 선택해보세요.
        </p>
      ) : (
        <Stagger className="grid grid-cols-2 gap-4 pb-24 sm:gap-6 lg:grid-cols-4" step={0.04} maxDelay={0.6}>
          {filtered.map((model) => (
            <PresetModelCard
              key={model.id}
              model={model}
              selected={selectedModel?.modelId === model.id}
              onSelect={() => handleSelect(model)}
            />
          ))}
        </Stagger>
      )}

      <SelectedModelBar />
    </div>
  );
}
