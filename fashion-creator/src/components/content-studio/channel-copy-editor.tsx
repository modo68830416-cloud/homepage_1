"use client";

import { useState } from "react";
import { Check, Copy, Download, RotateCcw } from "lucide-react";
import type { ChannelCopy, ChannelKey, ContentSourceLook, ContentStudioState } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToast } from "@/components/feedback/toast";
import { generateChannelCopy } from "@/lib/copy-generator";
import { downloadTextFile } from "@/lib/download-text";

const CHANNEL_LABELS: Record<ChannelKey, string> = {
  youtube: "YouTube",
  shorts: "YouTube Shorts",
  blog: "Naver Blog",
  instagram: "Instagram",
  tiktok: "TikTok",
};

const CHANNEL_FILE_EXT: Record<ChannelKey, string> = {
  youtube: "youtube.txt",
  shorts: "shorts.txt",
  blog: "blog.md",
  instagram: "instagram.txt",
  tiktok: "tiktok.txt",
};

function serializeCopy(copy: ChannelCopy) {
  return [
    copy.title ? `제목: ${copy.title}` : null,
    "",
    copy.body,
    "",
    copy.hashtags.join(" "),
    copy.pinnedComment ? `\n고정 댓글: ${copy.pinnedComment}` : null,
    copy.disclosure ? `\n${copy.disclosure}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function ChannelCopyCard({
  copy,
  onChange,
  onRegenerate,
}: {
  copy: ChannelCopy;
  onChange: (copy: ChannelCopy) => void;
  onRegenerate: () => void;
}) {
  const { copied, copy: copyToClipboard } = useCopyToClipboard();
  const { showToast } = useToast();

  return (
    <GlassPanel className="flex flex-col gap-3 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">{CHANNEL_LABELS[copy.channel]}</p>
        <span className="text-[11px] text-foreground-subtle">{copy.body.length}자</span>
      </div>

      {copy.title !== undefined && (
        <input
          type="text"
          value={copy.title}
          onChange={(event) => onChange({ ...copy, title: event.target.value })}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground focus:border-accent-lime focus:outline-none"
          aria-label={`${CHANNEL_LABELS[copy.channel]} 제목`}
        />
      )}

      <textarea
        value={copy.body}
        onChange={(event) => onChange({ ...copy, body: event.target.value })}
        rows={4}
        className="rounded-lg border border-border bg-surface p-3 text-xs text-foreground focus:border-accent-lime focus:outline-none"
        aria-label={`${CHANNEL_LABELS[copy.channel]} 본문`}
      />

      <div className="flex flex-wrap gap-1.5">
        {copy.hashtags.map((tag) => (
          <span key={tag} className="rounded-full bg-surface-strong px-2 py-0.5 text-[10px] text-foreground-muted">
            {tag}
          </span>
        ))}
      </div>

      {copy.disclosure && <p className="text-[11px] leading-relaxed text-foreground-subtle">{copy.disclosure}</p>}

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          className="text-xs"
          onClick={async () => {
            const ok = await copyToClipboard(serializeCopy(copy));
            if (ok) showToast(`${CHANNEL_LABELS[copy.channel]} 복사 완료`);
          }}
        >
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
          복사
        </Button>
        <Button
          variant="outline"
          className="text-xs"
          onClick={() => downloadTextFile(CHANNEL_FILE_EXT[copy.channel], serializeCopy(copy))}
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          다운로드
        </Button>
        <Button variant="ghost" className="text-xs" onClick={onRegenerate}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          다시 생성 (DEMO)
        </Button>
      </div>
    </GlassPanel>
  );
}

export function ChannelCopyEditor({
  copies,
  onChange,
  look,
  state,
}: {
  copies: ChannelCopy[];
  onChange: (copies: ChannelCopy[]) => void;
  look: ContentSourceLook;
  state: ContentStudioState;
}) {
  const [downloadedAll, setDownloadedAll] = useState(false);

  function updateCopy(index: number, next: ChannelCopy) {
    onChange(copies.map((copy, i) => (i === index ? next : copy)));
  }

  function regenerate(index: number) {
    const target = copies[index];
    onChange(copies.map((copy, i) => (i === index ? generateChannelCopy(target.channel, look, state) : copy)));
  }

  function downloadAll() {
    copies.forEach((copy) => downloadTextFile(CHANNEL_FILE_EXT[copy.channel], serializeCopy(copy)));
    setDownloadedAll(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">채널별 출력</p>
        <Button variant="outline" className="text-xs" onClick={downloadAll}>
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          {downloadedAll ? "다시 전체 다운로드" : "전체 다운로드"}
        </Button>
      </div>
      {copies.length > 0 && <Badge tone="mock">DEMO 구매 링크 · fashioncreator.co.kr/look/{look.id}</Badge>}
      <div className="grid gap-4 md:grid-cols-2">
        {copies.map((copy, index) => (
          <ChannelCopyCard
            key={copy.channel}
            copy={copy}
            onChange={(next) => updateCopy(index, next)}
            onRegenerate={() => regenerate(index)}
          />
        ))}
      </div>
    </div>
  );
}
