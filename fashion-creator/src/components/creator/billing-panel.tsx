import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { DemoActionButton } from "@/components/ui/DemoActionButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { formatKRW } from "@/lib/utils";

export function BillingPanel({ planName, price }: { planName: string; price?: number }) {
  return (
    <GlassPanel className="rounded-xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <CreditCard className="h-4 w-4 text-accent-lime" aria-hidden="true" />
        <p className="text-sm font-semibold text-foreground">Billing</p>
        <Badge tone="mock" className="ml-auto">
          DEMO
        </Badge>
      </div>
      <dl className="flex flex-col divide-y divide-border text-sm">
        <div className="flex items-center justify-between py-2">
          <dt className="text-foreground-subtle">현재 플랜</dt>
          <dd className="text-foreground">{planName}</dd>
        </div>
        <div className="flex items-center justify-between py-2">
          <dt className="text-foreground-subtle">다음 갱신일</dt>
          <dd className="text-foreground">2026-08-01</dd>
        </div>
        <div className="flex items-center justify-between py-2">
          <dt className="text-foreground-subtle">결제 수단</dt>
          <dd className="text-foreground-subtle">등록된 결제 수단 없음</dd>
        </div>
        <div className="flex items-center justify-between py-2">
          <dt className="text-foreground-subtle">최근 청구</dt>
          <dd className="text-foreground">{price ? formatKRW(price) : "-"}</dd>
        </div>
      </dl>
      <p className="mt-3 text-[11px] leading-relaxed text-foreground-subtle">
        실제 카드 정보는 입력받지 않습니다. 결제 Provider, webhook, 세금계산서, 환불·해지 정책은 이후
        연동 예정입니다.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <DemoActionButton variant="secondary" className="text-xs" message="결제 수단 등록은 준비 중입니다">
          결제 수단 등록
        </DemoActionButton>
        <DemoActionButton variant="outline" className="text-xs" message="구독 해지 기능은 준비 중입니다">
          구독 해지
        </DemoActionButton>
      </div>
    </GlassPanel>
  );
}
