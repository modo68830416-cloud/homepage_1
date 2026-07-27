"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { VideoScene } from "@/types/content";
import { BACKGROUNDS } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";

function reorder(scenes: VideoScene[]): VideoScene[] {
  return scenes.map((scene, index) => ({ ...scene, order: index }));
}

export function StoryboardEditor({
  scenes,
  onChange,
}: {
  scenes: VideoScene[];
  onChange: (scenes: VideoScene[]) => void;
}) {
  function moveScene(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= scenes.length) return;
    const next = scenes.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange(reorder(next));
  }

  function updateScene(id: string, patch: Partial<VideoScene>) {
    onChange(scenes.map((scene) => (scene.id === id ? { ...scene, ...patch } : scene)));
  }

  function removeScene(id: string) {
    onChange(reorder(scenes.filter((scene) => scene.id !== id)));
  }

  function addScene() {
    const newScene: VideoScene = {
      id: `scene-${Date.now()}`,
      order: scenes.length,
      title: `Scene ${scenes.length + 1}`,
      duration: 5,
      shotType: "전신",
      modelAction: "포즈",
      cameraMotion: "정면",
      background: BACKGROUNDS[0],
    };
    onChange([...scenes, newScene]);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">Storyboard</p>
        <Button variant="outline" className="text-xs" onClick={addScene}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Scene 추가
        </Button>
      </div>
      {scenes.map((scene, index) => (
        <GlassPanel key={scene.id} className="flex flex-col gap-2 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {index + 1}. {scene.title}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="icon"
                className="h-7 w-7"
                aria-label="위로 이동"
                onClick={() => moveScene(index, -1)}
                disabled={index === 0}
              >
                <ArrowUp className="h-3 w-3" aria-hidden="true" />
              </Button>
              <Button
                variant="icon"
                className="h-7 w-7"
                aria-label="아래로 이동"
                onClick={() => moveScene(index, 1)}
                disabled={index === scenes.length - 1}
              >
                <ArrowDown className="h-3 w-3" aria-hidden="true" />
              </Button>
              <Button
                variant="icon"
                className="h-7 w-7"
                aria-label={`${scene.title} 삭제`}
                onClick={() => removeScene(scene.id)}
                disabled={scenes.length <= 1}
              >
                <Trash2 className="h-3 w-3" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <label className="flex flex-col gap-1">
              <span className="text-foreground-subtle">길이(초)</span>
              <input
                type="number"
                min={2}
                max={30}
                value={scene.duration}
                onChange={(event) => updateScene(scene.id, { duration: Number(event.target.value) })}
                className="rounded-md border border-border bg-surface px-2 py-1 text-foreground"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-foreground-subtle">배경</span>
              <select
                value={scene.background}
                onChange={(event) => updateScene(scene.id, { background: event.target.value })}
                className="rounded-md border border-border bg-surface px-2 py-1 text-foreground"
              >
                {BACKGROUNDS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </label>
            <label className="col-span-2 flex flex-col gap-1 sm:col-span-2">
              <span className="text-foreground-subtle">오버레이 텍스트</span>
              <input
                type="text"
                value={scene.overlayText ?? ""}
                onChange={(event) => updateScene(scene.id, { overlayText: event.target.value })}
                maxLength={40}
                className="rounded-md border border-border bg-surface px-2 py-1 text-foreground"
              />
            </label>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
