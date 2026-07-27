"use client";

import { ShoppingBag } from "lucide-react";
import { DemoActionButton } from "@/components/ui/DemoActionButton";
import { trackCommerceEvent } from "@/lib/commerce-events";

export function LookPurchaseButton({ className }: { className?: string }) {
  return (
    <DemoActionButton
      variant="primary"
      className={className}
      message="실제 결제 연동은 준비 중입니다"
      onClick={() => trackCommerceEvent("purchase_started")}
    >
      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
      이 룩 전체 구매하기
    </DemoActionButton>
  );
}
