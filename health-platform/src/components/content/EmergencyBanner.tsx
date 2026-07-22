/**
 * Highest-priority safety component. Emergency guidance must outrank any
 * sales CTA on the page — see docs/ia/user-flows.md 흐름 3 and
 * docs/design/component-principles.md §3.
 */
export function EmergencyBanner({ note }: { note: string }) {
  return (
    <div
      role="alert"
      className="rounded-[var(--radius-md)] p-4 mb-6 border-2"
      style={{
        backgroundColor: "var(--color-emergency-bg)",
        borderColor: "var(--color-danger-500)",
        color: "var(--color-ink-900)",
      }}
    >
      <p className="font-bold mb-1" style={{ color: "var(--color-danger-500)" }}>
        응급 신호 확인
      </p>
      <p className="text-sm leading-relaxed">{note}</p>
    </div>
  );
}
