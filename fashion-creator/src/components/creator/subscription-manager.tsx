"use client";

import type { CreditUsage, SubscriptionPlan } from "@/types/creator-business";
import { PlanCard } from "@/components/creator/plan-card";
import { PlanComparisonTable } from "@/components/creator/plan-comparison-table";
import { CreditStatus } from "@/components/creator/credit-status";
import { BillingPanel } from "@/components/creator/billing-panel";
import { useCreatorSubscription } from "@/lib/creator-settings-store";
import { useToast } from "@/components/feedback/toast";

export function SubscriptionManager({
  plans,
  creditUsageHistory,
}: {
  plans: SubscriptionPlan[];
  creditUsageHistory: CreditUsage[];
}) {
  const { subscription, changePlan } = useCreatorSubscription();
  const { showToast } = useToast();
  const currentPlan = plans.find((plan) => plan.name === subscription.planName);

  function handleSelectPlan(planName: string) {
    changePlan(planName);
    showToast(`${planName} 플랜으로 변경되었습니다 (DEMO)`);
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrent={plan.name === subscription.planName}
            onSelect={() => handleSelectPlan(plan.name)}
          />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">플랜 비교</h2>
        <PlanComparisonTable plans={plans} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <CreditStatus
          monthlyCredits={currentPlan?.credits ?? 400}
          remaining={subscription.creditsRemaining}
          usage={creditUsageHistory}
        />
        <BillingPanel price={currentPlan?.monthlyPrice} />
      </div>
    </>
  );
}
