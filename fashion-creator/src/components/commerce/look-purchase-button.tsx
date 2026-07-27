"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoCheckoutModal } from "@/components/commerce/demo-checkout-modal";
import { useToast } from "@/components/feedback/toast";
import { trackCommerceEvent } from "@/lib/commerce-events";

type LookPurchaseButtonProps = {
  className?: string;
  lookTitle: string;
  items: { name: string; price: number }[];
  total: number;
};

export function LookPurchaseButton({ className, lookTitle, items, total }: LookPurchaseButtonProps) {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <>
      <Button
        variant="primary"
        className={className}
        onClick={() => {
          trackCommerceEvent("purchase_started");
          setOpen(true);
        }}
      >
        <ShoppingBag className="h-4 w-4" aria-hidden="true" />
        이 룩 전체 구매하기
      </Button>
      <DemoCheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        title={lookTitle}
        lineItems={items.map((item) => ({ label: item.name, amount: item.price }))}
        total={total}
        onConfirmed={() => showToast("구매가 완료되었습니다 (DEMO)")}
      />
    </>
  );
}
