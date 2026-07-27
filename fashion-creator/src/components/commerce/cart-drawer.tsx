"use client";

import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { DemoActionButton } from "@/components/ui/DemoActionButton";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { useCart } from "@/lib/cart-store";
import { trackCommerceEvent } from "@/lib/commerce-events";
import { formatKRW } from "@/lib/utils";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, setQuantity } = useCart();

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((line): line is { product: (typeof products)[number]; quantity: number } => Boolean(line));

  const total = lines.reduce((sum, line) => sum + (line.product.salePrice ?? line.product.price) * line.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="장바구니"
            className="glass-panel fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col p-5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">장바구니</h2>
              <Button variant="icon" aria-label="장바구니 닫기" onClick={onClose}>
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                <ShoppingBag className="h-8 w-8 text-foreground-subtle" aria-hidden="true" />
                <p className="text-sm text-foreground-subtle">장바구니가 비어 있습니다.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-3">
                  {lines.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                        <PlaceholderArt seed={product.id} icon={ShoppingBag} label={product.name} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-foreground-subtle">
                          {formatKRW(product.salePrice ?? product.price)}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Button
                            variant="icon"
                            className="h-6 w-6"
                            aria-label="수량 감소"
                            onClick={() => setQuantity(product.id, quantity - 1)}
                          >
                            <Minus className="h-3 w-3" aria-hidden="true" />
                          </Button>
                          <span className="w-4 text-center text-xs text-foreground">{quantity}</span>
                          <Button
                            variant="icon"
                            className="h-6 w-6"
                            aria-label="수량 증가"
                            onClick={() => setQuantity(product.id, quantity + 1)}
                          >
                            <Plus className="h-3 w-3" aria-hidden="true" />
                          </Button>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="ml-auto text-[11px] text-foreground-subtle hover:text-danger"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground-subtle">총 금액</span>
                <span className="text-lg font-semibold text-foreground">{formatKRW(total)}</span>
              </div>
              <DemoActionButton
                variant="primary"
                className="w-full"
                message="실제 결제 연동은 준비 중입니다"
                disabled={lines.length === 0}
                onClick={() => trackCommerceEvent("purchase_started")}
              >
                구매하기
              </DemoActionButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
