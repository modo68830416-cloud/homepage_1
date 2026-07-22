/** Fixed-size placeholder to avoid CLS while data loads (docs/design/component-principles.md §6). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[var(--radius-sm)] bg-[var(--color-surface-100)] ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
