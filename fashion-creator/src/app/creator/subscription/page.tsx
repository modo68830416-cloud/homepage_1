import type { Metadata } from "next";
import { creatorProfile, creditUsageHistory, subscriptionPlans } from "@/data/creator-business";
import { PlanCard } from "@/components/creator/plan-card";
import { PlanComparisonTable } from "@/components/creator/plan-comparison-table";
import { CreditStatus } from "@/components/creator/credit-status";
import { BillingPanel } from "@/components/creator/billing-panel";

export const metadata: Metadata = {
  title: "Subscription",
  description: "구독 플랜, 생성 크레딧, 결제 정보를 관리하세요.",
};

export default function CreatorSubscriptionPage() {
  const currentPlan = subscriptionPlans.find((plan) => plan.name === creatorProfile.subscriptionPlan);

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Subscription</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {subscriptionPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} isCurrent={plan.name === creatorProfile.subscriptionPlan} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-foreground">플랜 비교</h2>
        <PlanComparisonTable plans={subscriptionPlans} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <CreditStatus
          monthlyCredits={currentPlan?.credits ?? 400}
          remaining={creatorProfile.creditsRemaining}
          usage={creditUsageHistory}
        />
        <BillingPanel planName={creatorProfile.subscriptionPlan} price={currentPlan?.monthlyPrice} />
      </div>
    </div>
  );
}
