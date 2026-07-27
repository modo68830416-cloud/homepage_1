"use client";

import { Trash2, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AvatarPreview } from "@/components/models/avatar-preview";
import { useSavedAvatars, useSelectedModel } from "@/lib/model-store";
import { useToast } from "@/components/feedback/toast";

export function SavedModels() {
  const { savedAvatars, removeAvatar } = useSavedAvatars();
  const { selectModel } = useSelectedModel();
  const { showToast } = useToast();

  if (savedAvatars.length === 0) {
    return (
      <GlassPanel className="rounded-xl p-8 text-center">
        <p className="text-sm text-foreground-muted">
          아직 저장한 모델이 없습니다.
          <br />
          기본 AI 모델을 선택하거나 내 아바타를 만들어보세요.
        </p>
      </GlassPanel>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {savedAvatars.map((avatar) => (
        <GlassPanel key={avatar.id} className="flex items-center gap-4 rounded-xl p-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border-strong">
            <AvatarPreview imageUrl={avatar.previewImageUrl} seed={avatar.id} icon={UserRound} label={avatar.name} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-semibold text-foreground">{avatar.name}</p>
              {!avatar.previewImageUrl && <Badge tone="mock">DEMO</Badge>}
            </div>
            <p className="truncate text-xs text-foreground-subtle">
              {avatar.bodySettings.bodyType} · {avatar.ageGroup}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-1.5">
            <Button
              variant="secondary"
              className="text-xs"
              onClick={() => {
                selectModel({
                  modelId: avatar.id,
                  modelType: "avatar",
                  modelName: avatar.name,
                  previewImage: avatar.previewImage,
                  previewImageUrl: avatar.previewImageUrl,
                  bodyProfileSummary: `${avatar.bodySettings.bodyType} · ${avatar.ageGroup}`,
                  styleTags: [],
                });
                showToast(`${avatar.name} 아바타를 선택했습니다`);
              }}
            >
              선택
            </Button>
            <Button
              variant="icon"
              aria-label={`${avatar.name} 삭제`}
              onClick={() => {
                removeAvatar(avatar.id);
                showToast("아바타를 삭제했습니다 (DEMO 데이터)", "info");
              }}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
