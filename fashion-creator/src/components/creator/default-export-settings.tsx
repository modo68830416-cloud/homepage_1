"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ASPECT_RATIOS } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { OptionChips } from "@/components/content-studio/option-chips";
import { useToast } from "@/components/feedback/toast";

const CHANNELS = ["YouTube", "Shorts", "Instagram", "TikTok", "Blog"];
const LANGUAGES = ["한국어", "English", "日本語"];

export function DefaultExportSettings() {
  const [aspectRatio, setAspectRatio] = useState<(typeof ASPECT_RATIOS)[number]>("9:16");
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [watermark, setWatermark] = useState(true);
  const [hashtags, setHashtags] = useState(true);
  const { showToast } = useToast();

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

        <Button
          variant="primary"
          className="self-start"
          onClick={() => showToast("기본 설정이 저장되었습니다 (DEMO)")}
        >
          저장하기
        </Button>
      </div>
    </GlassPanel>
  );
}
