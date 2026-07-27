import { Check, Minus } from "lucide-react";
import type { SubscriptionPlan } from "@/types/creator-business";
import { GlassPanel } from "@/components/ui/GlassPanel";

const ROWS: { label: string; values: (plan: SubscriptionPlan) => boolean }[] = [
  { label: "AI 모델", values: () => true },
  { label: "아바타 생성", values: (plan) => plan.id !== "free" },
  { label: "이미지 생성", values: () => true },
  { label: "영상 생성", values: (plan) => plan.id !== "free" },
  { label: "긴 영상", values: (plan) => plan.id === "creator-pro" || plan.id === "business" },
  { label: "워터마크 제거", values: (plan) => plan.id !== "free" },
  { label: "구매 링크", values: (plan) => plan.id !== "free" },
  { label: "성과 분석", values: (plan) => plan.id !== "free" },
  { label: "마켓플레이스", values: (plan) => plan.id !== "free" },
  { label: "브랜드 캠페인", values: (plan) => plan.id === "business" },
  { label: "팀 계정", values: (plan) => plan.id === "business" },
  { label: "우선 지원", values: (plan) => plan.id === "creator-pro" || plan.id === "business" },
];

export function PlanComparisonTable({ plans }: { plans: SubscriptionPlan[] }) {
  return (
    <GlassPanel className="overflow-x-auto rounded-xl p-5">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="sr-only">플랜별 기능 비교표</caption>
        <thead>
          <tr className="border-b border-border text-left text-xs text-foreground-subtle">
            <th className="py-2 pr-3 font-medium">기능</th>
            {plans.map((plan) => (
              <th key={plan.id} className="py-2 pr-3 text-center font-medium">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <td className="py-2.5 pr-3 text-foreground-muted">{row.label}</td>
              {plans.map((plan) => (
                <td key={plan.id} className="py-2.5 pr-3 text-center">
                  {row.values(plan) ? (
                    <Check className="mx-auto h-4 w-4 text-accent-lime" aria-label="포함" />
                  ) : (
                    <Minus className="mx-auto h-4 w-4 text-foreground-subtle" aria-label="미포함" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </GlassPanel>
  );
}
