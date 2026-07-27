"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ASPECT_RATIOS } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { OptionChips } from "@/components/content-studio/option-chips";
import { useDefaultExportSettings } from "@/lib/creator-settings-store";
import { useToast } from "@/components/feedback/toast";

const CHANNELS = ["YouTube", "Shorts", "Instagram", "TikTok", "Blog"];
const LANGUAGES = ["한국어", "English", "日本語"];

export function DefaultExportSettings() {
  const { exportSettings, save } = useDefaultExportSettings();
  const [loadedSettings, setLoadedSettings] = useState(exportSettings);
  const [aspectRatio, setAspectRatio] = useState<(typeof ASPECT_RATIOS)[number]>(exportSettings.aspectRatio);
  const [channel, setChannel] = useState(exportSettings.channel);
  const [language, setLanguage] = useState(exportSettings.language);
  const [watermark, setWatermark] = useState(exportSettings.watermark);
  const [hashtags, setHashtags] = useState(exportSettings.hashtags);
  const { showToast } = useToast();

  // Adjust local field state during render when the repository's real
  // stored value replaces the SSR fallback — see brand-kit-form.tsx.
  if (exportSettings !== loadedSettings) {
    setLoadedSettings(exportSettings);
    setAspectRatio(exportSettings.aspectRatio);
    setChannel(exportSettings.channel);
    setLanguage(exportSettings.language);
    setWatermark(exportSettings.watermark);
    setHashtags(exportSettings.hashtags);
  }

  function handleSave() {
    save({ aspectRatio, channel, language, watermark, hashtags });
    showToast("기본 설정이 저장되었습니다 (DEMO)");
  }

  return (
    <GlassPanel className="rounded-xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-accent-lime" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-foreground">기본 출력 설정</h2>
        <Badge tone="mock" className="ml-auto">
          DEMO
        </Badge>
      </div>

      <div className="flex flex-col gap-5">
        <OptionChips legend="기본 비율" name="default-aspect" options={ASPECT_RATIOS} value={aspectRatio} onChange={setAspectRatio} />
        <OptionChips legend="기본 채널" name="default-channel" options={CHANNELS} value={channel} onChange={setChannel} />
        <OptionChips legend="언어" name="default-language" options={LANGUAGES} value={language} onChange={setLanguage} />

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={watermark}
              onChange={(event) => setWatermark(event.target.checked)}
              className="h-4 w-4 accent-[var(--accent-lime)]"
            />
            워터마크 표시
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={hashtags}
              onChange={(event) => setHashtags(event.target.checked)}
              className="h-4 w-4 accent-[var(--accent-lime)]"
            />
            해시태그 자동 추가
          </label>
        </div>

        <Button variant="primary" className="self-start" onClick={handleSave}>
          저장하기
        </Button>
      </div>
    </GlassPanel>
  );
}
