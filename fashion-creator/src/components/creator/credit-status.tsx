import { Zap } from "lucide-react";
import type { CreditUsage } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";

const OPERATION_LABEL: Record<CreditUsage["operation"], string> = {
  image: "이미지 생성",
  video: "영상 생성",
  copy: "카피 생성",
  thumbnail: "썸네일 생성",
};

export function CreditStatus({
  monthlyCredits,
  remaining,
  usage,
}: {
  monthlyCredits: number;
  remaining: number;
  usage: CreditUsage[];
}) {
  const used = monthlyCredits - remaining;
  const usedPct = Math.min(100, Math.round((used / monthlyCredits) * 100));

  return (
    <div className="flex flex-col gap-6">
      <GlassPanel className="rounded-xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-accent-lime" aria-hidden="true" />
          <p className="text-sm font-semibold text-foreground">생성 크레딧</p>
          <Badge tone="mock" className="ml-auto">
            DEMO 차감 기준
          </Badge>
        </div>
        <div className="mb-2 flex items-end justify-between">
          <span className="text-2xl font-bold text-foreground">{remaining}</span>
          <span className="text-xs text-foreground-subtle">/ 월 {monthlyCredits}개</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-strong">
          <div className={cn("h-full rounded-full bg-accent-lime")} style={{ width: `${usedPct}%` }} />
        </div>
        <p className="mt-2 text-xs text-foreground-subtle">
          다음 갱신일: 2026-08-01 · 이미지 1장 1credit · 15초 영상 12credits (실제 요금 정책 아님)
        </p>
      </GlassPanel>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">사용 내역</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <caption className="sr-only">크레딧 사용 내역</caption>
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground-subtle">
                <th className="py-2 pr-3 font-medium">날짜</th>
                <th className="py-2 pr-3 font-medium">콘텐츠</th>
                <th className="py-2 pr-3 font-medium">작업</th>
                <th className="py-2 pr-3 font-medium">사용</th>
                <th className="py-2 font-medium">잔여</th>
              </tr>
            </thead>
            <tbody>
              {usage.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  <td className="py-2 pr-3 text-xs text-foreground-muted">
                    {new Date(item.usedAt).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="py-2 pr-3 text-foreground">{item.contentTitle}</td>
                  <td className="py-2 pr-3 text-xs text-foreground-muted">{OPERATION_LABEL[item.operation]}</td>
                  <td className="py-2 pr-3 text-foreground-muted">-{item.creditsUsed}</td>
                  <td className="py-2 text-foreground-muted">{item.balanceAfter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
