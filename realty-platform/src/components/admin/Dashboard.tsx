import { Users, Building2, MessageSquare, Handshake } from "lucide-react";
import { properties } from "@/lib/properties/mock-data";

const DASHBOARD_STATS = [
  { label: "오늘 방문자", value: "3,842", icon: Users, delta: "+12.4%" },
  { label: "신규 회원", value: "128", icon: Users, delta: "+4.1%" },
  { label: "신규 매물", value: `${properties.length}`, icon: Building2, delta: "+2건" },
  { label: "상담 요청", value: "56", icon: MessageSquare, delta: "+8건" },
];

const RECENT_ACTIVITY = [
  { id: "a1", text: "새 매물이 등록되었습니다 — 강남 프리미엄 타워 101동", time: "5분 전" },
  { id: "a2", text: "상담 문의가 접수되었습니다 — 해운대 마린뷰 레지던스", time: "22분 전" },
  { id: "a3", text: "회원 가입 — user_2481", time: "40분 전" },
  { id: "a4", text: "매물 상태 변경 — 성수 디자이너 로프트 (공개 → 거래완료)", time: "1시간 전" },
  { id: "a5", text: "배너 콘텐츠가 수정되었습니다", time: "3시간 전" },
];

export function Dashboard() {
  return (
    <div>
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        대시보드
      </h1>
      <p className="mt-1.5 text-[var(--text-secondary)]">플랫폼 현황을 한눈에 확인하세요.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map(({ label, value, icon: Icon, delta }) => (
          <div
            key={label}
            className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--color-primary-600)]">
                <Icon size={16} />
              </span>
              <span className="text-[length:var(--font-size-body-sm)] font-semibold text-[var(--color-accent-emerald)]">
                {delta}
              </span>
            </div>
            <p className="mt-3 text-2xl font-extrabold text-[var(--text-primary)]">{value}</p>
            <p className="mt-1 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 shadow-[var(--shadow-sm)]">
          <h2 className="font-bold text-[var(--text-primary)]">최근 활동 로그</h2>
          <ul className="mt-4 space-y-3">
            {RECENT_ACTIVITY.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-4 text-[length:var(--font-size-body-sm)]">
                <span className="text-[var(--text-primary)]">{item.text}</span>
                <span className="shrink-0 text-[var(--text-secondary)]">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 shadow-[var(--shadow-sm)]">
          <h2 className="flex items-center gap-2 font-bold text-[var(--text-primary)]">
            <Handshake size={18} className="text-[var(--color-primary-600)]" />
            거래 현황
          </h2>
          <div className="mt-4 space-y-3 text-[length:var(--font-size-body-sm)]">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">이번 달 거래완료</span>
              <span className="font-semibold text-[var(--text-primary)]">42건</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">진행 중인 상담</span>
              <span className="font-semibold text-[var(--text-primary)]">18건</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-secondary)]">승인 대기 매물</span>
              <span className="font-semibold text-[var(--text-primary)]">6건</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
