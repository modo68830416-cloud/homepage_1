"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  function go(delta: number) {
    setActive((current) => (current + delta + images.length) % images.length);
  }

  function handleTouchStart(event: React.TouchEvent) {
    setTouchStartX(event.touches[0].clientX);
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) go(delta > 0 ? -1 : 1);
    setTouchStartX(null);
  }

  return (
    <div>
      <div
        className={`relative h-[52vh] min-h-[320px] overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br ${images[active]}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="img"
        aria-label={`${title} 대표 이미지 ${active + 1}/${images.length}`}
      >
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="이전 이미지"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[var(--text-primary)] transition hover:bg-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="다음 이미지"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[var(--text-primary)] transition hover:bg-white"
        >
          <ChevronRight size={20} />
        </button>
        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="전체 화면으로 보기"
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)] transition hover:bg-white"
        >
          <Expand size={16} />
          {active + 1}/{images.length}
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`${index + 1}번째 썸네일`}
            aria-current={index === active}
            className={`h-16 w-24 shrink-0 rounded-[var(--radius-sm)] bg-gradient-to-br ${image} transition ${
              index === active ? "ring-2 ring-[var(--color-primary-600)] ring-offset-2" : "opacity-70 hover:opacity-100"
            }`}
          />
        ))}
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} 이미지 전체 화면`}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/90 p-6"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="닫기"
            className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="이전 이미지"
            className="absolute left-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            className={`h-[70vh] w-full max-w-4xl rounded-[var(--radius-lg)] bg-gradient-to-br ${images[active]}`}
          />
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="다음 이미지"
            className="absolute right-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
