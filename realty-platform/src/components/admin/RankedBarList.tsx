export function RankedBarList({
  title,
  items,
  valueSuffix = "",
}: {
  title: string;
  items: { label: string; value: number }[];
  valueSuffix?: string;
}) {
  const maxValue = Math.max(...items.map((item) => item.value));

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-5 shadow-[var(--shadow-sm)]">
      <h2 className="font-bold text-[var(--text-primary)]">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-center justify-between gap-3 text-[length:var(--font-size-body-sm)]">
              <span className="min-w-0 truncate text-[var(--text-primary)]">
                <span className="mr-1.5 text-[var(--text-secondary)]">{index + 1}</span>
                {item.label}
              </span>
              <span className="shrink-0 font-semibold text-[var(--text-primary)]">
                {item.value.toLocaleString()}
                {valueSuffix}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--bg-surface)]">
              <div
                className="h-full rounded-full bg-[var(--color-primary-600)]"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
