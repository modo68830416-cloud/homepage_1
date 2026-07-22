"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import {
  CART_ELIGIBLE_SALE_TYPES,
  SINGLE_ITEM_ONLY_SALE_TYPES,
  type Product,
} from "@/lib/products/types";
import { createLocalStorageStore } from "@/lib/utils/local-store";

export interface CartLine {
  productId: string;
  slug: string;
  title: string;
  thumbnail: string;
  price: number;
  saleType: Product["saleType"];
  quantity: number;
  combinedShippingAllowed: boolean;
}

interface CartContextValue {
  lines: CartLine[];
  addToCart: (product: Product) => { ok: boolean; reason?: string };
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const cartStore = createLocalStorageStore<CartLine[]>("health-platform.cart.v1", []);

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);

  function addToCart(product: Product): { ok: boolean; reason?: string } {
    if (!CART_ELIGIBLE_SALE_TYPES.includes(product.saleType)) {
      return { ok: false, reason: "이 판매 유형은 장바구니를 거치지 않고 바로 진행됩니다." };
    }

    const combinedShippingAllowed =
      "shippingPolicy" in product ? (product.shippingPolicy?.combinedShippingAllowed ?? true) : true;

    const current = cartStore.read();

    if (SINGLE_ITEM_ONLY_SALE_TYPES.includes(product.saleType)) {
      cartStore.set([
        {
          productId: product.id,
          slug: product.slug,
          title: product.title,
          thumbnail: product.images[0] ?? "",
          price: product.price,
          saleType: product.saleType,
          quantity: 1,
          combinedShippingAllowed,
        },
      ]);
      return { ok: true };
    }

    const withoutSingleItemLines = current.filter(
      (line) => !SINGLE_ITEM_ONLY_SALE_TYPES.includes(line.saleType),
    );
    const existing = withoutSingleItemLines.find((line) => line.productId === product.id);

    if (existing) {
      cartStore.set(
        withoutSingleItemLines.map((line) =>
          line.productId === product.id ? { ...line, quantity: line.quantity + 1 } : line,
        ),
      );
    } else {
      cartStore.set([
        ...withoutSingleItemLines,
        {
          productId: product.id,
          slug: product.slug,
          title: product.title,
          thumbnail: product.images[0] ?? "",
          price: product.price,
          saleType: product.saleType,
          quantity: 1,
          combinedShippingAllowed,
        },
      ]);
    }

    return { ok: true };
  }

  function removeFromCart(productId: string) {
    cartStore.set(cartStore.read().filter((line) => line.productId !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) return removeFromCart(productId);
    cartStore.set(
      cartStore.read().map((line) => (line.productId === productId ? { ...line, quantity } : line)),
    );
  }

  function clearCart() {
    cartStore.set([]);
  }

  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.price * line.quantity, 0), [lines]);

  return (
    <CartContext.Provider value={{ lines, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
