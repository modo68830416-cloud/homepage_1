"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { useCart } from "@/lib/cart-store";

export function CartButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Button
        variant="icon"
        className={className}
        aria-label={`장바구니 (${count}개)`}
        onClick={() => setOpen(true)}
      >
        <span className="relative">
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-lime px-1 text-[9px] font-bold text-[#0a0a0a]">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </span>
      </Button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
