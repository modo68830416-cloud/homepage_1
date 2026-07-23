import { MapPin, Navigation } from "lucide-react";

export function MapSection({ address }: { address: string }) {
  const query = encodeURIComponent(address);

  return (
    <div>
      <h2 className="font-serif text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
        위치
      </h2>

      <div className="mt-4 flex h-56 flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)]">
        <MapPin size={28} />
        <p className="text-[length:var(--font-size-body-sm)]">
          지도 미리보기는 준비 중입니다 — 아래 버튼으로 실제 지도를 확인하세요
        </p>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[var(--text-primary)]">
        <MapPin size={16} className="text-[var(--color-primary-600)]" />
        {address}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={`https://map.kakao.com/link/search/${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary-900)] px-4 py-2 text-[length:var(--font-size-body-sm)] font-semibold text-white transition hover:opacity-90"
        >
          카카오맵에서 보기
        </a>
        <a
          href={`https://map.kakao.com/link/to/${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] px-4 py-2 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface)]"
        >
          <Navigation size={14} />
          길찾기
        </a>
      </div>
    </div>
  );
}
