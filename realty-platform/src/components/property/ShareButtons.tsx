"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // 사용자가 공유를 취소한 경우 — 별도 처리 없음
      }
      return;
    }
    await handleCopy();
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] px-4 py-2.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface)]"
      >
        <Share2 size={16} />
        공유하기
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] px-4 py-2.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface)]"
      >
        {copied ? <Check size={16} className="text-[var(--color-accent-emerald)]" /> : <Link2 size={16} />}
        {copied ? "복사됨" : "링크복사"}
      </button>
    </div>
  );
}
