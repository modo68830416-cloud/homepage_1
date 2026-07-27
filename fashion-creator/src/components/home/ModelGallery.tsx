"use client";

import { useState } from "react";
import type { FashionModel } from "@/types";
import { ModelCard } from "@/components/ui/ModelCard";
import { Stagger } from "@/components/motion/stagger";
import { useToast } from "@/components/feedback/toast";

export function ModelGallery({ models }: { models: FashionModel[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { showToast } = useToast();

  function handleSelect(model: FashionModel) {
    setSelectedId(model.id);
    showToast(`${model.name} 모델을 선택했습니다`);
  }

  return (
    <Stagger className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
          selected={selectedId === model.id}
          onSelect={() => handleSelect(model)}
        />
      ))}
    </Stagger>
  );
}
