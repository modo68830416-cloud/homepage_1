"use client";

import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useCreatorSubscription } from "@/lib/creator-settings-store";
import { useToast } from "@/components/feedback/toast";
import { formatKRW } from "@/lib/utils";

const DEMO_CARD_LAST4 = ["4242", "1881", "0417"];

export function BillingPanel({ price }: { price?: number }) {
  const { subscription, registerPaymentMethod, removePaymentMethod, cancelSubscription } = useCreatorSubscription();
  const { showToast } = useToast();

  function handleRegisterCard() {
    const last4 = DEMO_CARD_LAST4[Math.floor(Math.random() * DEMO_CARD_LAST4.length)];
    registerPaymentMethod({ label: "Demo Card", last4, addedAt: new Date().toISOString() });
    showToast("결제 수단이 등록되었습니다 (DEMO)");
  }

  function handleCancelSubscription() {
    cancelSubscription();
    showToast("구독이 해지되어 Free 플랜으로 변경되었습니다 (DEMO)");
  }

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
          <dd className="text-foreground">{subscription.planName}</dd>
        </div>
        <div className="flex items-center justify-between py-2">
          <dt className="text-foreground-subtle">다음 갱신일</dt>
          <dd className="text-foreground">2026-08-01</dd>
        </div>
        <div className="flex items-center justify-between py-2">
          <dt className="text-foreground-subtle">결제 수단</dt>
          <dd className="text-foreground-subtle">
            {subscription.paymentMethod
              ? `${subscription.paymentMethod.label} •••• ${subscription.paymentMethod.last4}`
              : "등록된 결제 수단 없음"}
          </dd>
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
        {subscription.paymentMethod ? (
          <Button
            variant="outline"
            className="text-xs"
            onClick={() => {
              removePaymentMethod();
              showToast("결제 수단을 삭제했습니다");
            }}
          >
            결제 수단 삭제
          </Button>
        ) : (
          <Button variant="secondary" className="text-xs" onClick={handleRegisterCard}>
            결제 수단 등록
          </Button>
        )}
        <Button
          variant="outline"
          className="text-xs"
          disabled={subscription.planName === "Free"}
          onClick={handleCancelSubscription}
        >
          구독 해지
        </Button>
      </div>
    </GlassPanel>
  );
}
