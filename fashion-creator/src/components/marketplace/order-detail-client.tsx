"use client";

import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OrderWorkspace } from "@/components/marketplace/order-workspace";
import { useMarketplaceOrders } from "@/lib/marketplace-store";

export function OrderDetailClient({ orderId }: { orderId: string }) {
  const { orders } = useMarketplaceOrders();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-5 py-24 text-center sm:px-8">
        <Compass className="h-8 w-8 text-foreground-subtle" aria-hidden="true" />
        <p className="text-sm text-foreground-muted">이 거래를 찾을 수 없습니다.</p>
        <Button href="/marketplace" variant="primary" className="text-xs">
          마켓플레이스로 이동
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <OrderWorkspace order={order} />
    </div>
  );
}
