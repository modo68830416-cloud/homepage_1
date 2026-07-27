"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-store";
import { useToast } from "@/components/feedback/toast";
import { trackCommerceEvent } from "@/lib/commerce-events";
import { formatKRW } from "@/lib/utils";

export function LookProductRow({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  return (
    <li className="flex items-center justify-between gap-3 border-b border-border pb-3 text-sm last:border-0 last:pb-0">
      <Link
        href={`/trends/${product.slug}`}
        onClick={() => trackCommerceEvent("product_clicked")}
        className="min-w-0 flex-1"
      >
        <p className="truncate font-medium text-foreground hover:text-accent-lime">{product.name}</p>
        <p className="truncate text-xs text-foreground-subtle">{product.brand}</p>
      </Link>
      <span className="shrink-0 font-medium text-foreground">{formatKRW(product.salePrice ?? product.price)}</span>
      <Button
        variant="icon"
        className="h-8 w-8 shrink-0"
        aria-label={`${product.name} 장바구니에 담기`}
        onClick={() => {
          addItem(product.id);
          showToast(`${product.name}을(를) 장바구니에 담았습니다`);
        }}
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>
    </li>
  );
}
