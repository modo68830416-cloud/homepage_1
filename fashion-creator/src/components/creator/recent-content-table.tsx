"use client";

import Link from "next/link";
import { Copy, ExternalLink, Play, RotateCcw } from "lucide-react";
import { CONTENT_FORMATS } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { useContentProjects } from "@/lib/content-store";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToast } from "@/components/feedback/toast";
import { formatCompactNumber, formatKRW } from "@/lib/utils";

// Demo per-project performance derived deterministically from the project id
// so the numbers stay stable across renders without a real analytics join.
function demoPerformance(seed: string) {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) % 100000;
  const views = 800 + (hash % 24000);
  const clicks = Math.round(views * 0.16);
  const orders = Math.round(clicks * 0.12);
  const revenue = orders * 118000;
  return { views, clicks, orders, revenue, earnings: Math.round(revenue * 0.1) };
}

export function RecentContentTable() {
  const { projects } = useContentProjects();
  const { copy } = useCopyToClipboard();
  const { showToast } = useToast();

  const recent = projects.slice(0, 6);

  if (recent.length === 0) {
    return (
      <GlassPanel className="rounded-xl p-8 text-center text-sm text-foreground-muted">
        아직 만든 콘텐츠가 없습니다.{" "}
        <Link href="/create/new" className="text-accent-lime underline">
          첫 콘텐츠를 만들어보세요.
        </Link>
      </GlassPanel>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <caption className="sr-only">최근 콘텐츠 성과 표</caption>
        <thead>
          <tr className="border-b border-border text-left text-xs text-foreground-subtle">
            <th className="py-2 pr-3 font-medium">콘텐츠</th>
            <th className="py-2 pr-3 font-medium">형식</th>
            <th className="py-2 pr-3 font-medium">상태</th>
            <th className="py-2 pr-3 font-medium">조회수</th>
            <th className="py-2 pr-3 font-medium">클릭</th>
            <th className="py-2 pr-3 font-medium">주문</th>
            <th className="py-2 pr-3 font-medium">인정 매출</th>
            <th className="py-2 pr-3 font-medium">예상 수익</th>
            <th className="py-2 font-medium">액션</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((project) => {
            const perf = demoPerformance(project.id);
            const formatLabel = CONTENT_FORMATS.find((f) => f.value === project.format)?.label ?? project.format;
            return (
              <tr key={project.id} className="border-b border-border last:border-0">
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md">
                      <PlaceholderArt seed={project.thumbnailSeed} icon={Play} label={project.title} />
                    </div>
                    <span className="max-w-[160px] truncate text-foreground">{project.title}</span>
                  </div>
                </td>
                <td className="py-2.5 pr-3 text-xs text-foreground-muted">{formatLabel}</td>
                <td className="py-2.5 pr-3">
                  <Badge tone={project.status === "completed" ? "bestSeller" : "mock"}>{project.status}</Badge>
                </td>
                <td className="py-2.5 pr-3 text-foreground-muted">{formatCompactNumber(perf.views)}</td>
                <td className="py-2.5 pr-3 text-foreground-muted">{formatCompactNumber(perf.clicks)}</td>
                <td className="py-2.5 pr-3 text-foreground-muted">{perf.orders}</td>
                <td className="py-2.5 pr-3 text-foreground-muted">{formatKRW(perf.revenue)}</td>
                <td className="py-2.5 pr-3 font-medium text-accent-lime">{formatKRW(perf.earnings)}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/create/${project.id}`}
                      aria-label={`${project.title} 열기`}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-subtle hover:text-foreground"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      aria-label={`${project.title} 구매 링크 복사`}
                      onClick={async () => {
                        const ok = await copy(`https://fashioncreator.co.kr/look/${project.sourceLookId}`);
                        if (ok) showToast("구매 링크를 복사했습니다");
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-subtle hover:text-foreground"
                    >
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <Link
                      href="/create/new"
                      aria-label={`${project.title} 다시 생성`}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-subtle hover:text-foreground"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
