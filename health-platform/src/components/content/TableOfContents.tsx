import type { TocEntry } from "@/lib/content/types";

/** Desktop: fixed side panel. Mobile: rendered inline as a collapsible list by the caller (docs/ia/mobile-navigation.md §6). */
export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  return (
    <nav aria-label="목차" className="text-sm">
      <p className="font-semibold mb-2 text-[var(--text-primary)]">목차</p>
      <ol className="space-y-1.5">
        {toc.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="text-[var(--text-secondary)] hover:text-[var(--color-info-500)]">
              {entry.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
