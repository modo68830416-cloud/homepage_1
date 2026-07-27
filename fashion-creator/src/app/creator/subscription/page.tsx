import type { Metadata } from "next";
import { creditUsageHistory, subscriptionPlans } from "@/data/creator-business";
import { SubscriptionManager } from "@/components/creator/subscription-manager";

export const metadata: Metadata = {
  title: "Subscription",
  description: "구독 플랜, 생성 크레딧, 결제 정보를 관리하세요.",
};

export default function CreatorSubscriptionPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Subscription</h1>
      <SubscriptionManager plans={subscriptionPlans} creditUsageHistory={creditUsageHistory} />
    </div>
  );
}
