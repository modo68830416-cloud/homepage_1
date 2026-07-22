"use client";

import Link from "next/link";
import { useCart } from "@/lib/commerce/cart";

export function CartLink() {
  const { lines } = useCart();
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <Link href="/shop/cart" className="relative">
      장바구니
      {count > 0 && (
        <span className="ml-1 inline-flex items-center justify-center rounded-full bg-[var(--color-accent-500)] text-white text-[10px] w-4 h-4">
          {count}
        </span>
      )}
    </Link>
  );
}
