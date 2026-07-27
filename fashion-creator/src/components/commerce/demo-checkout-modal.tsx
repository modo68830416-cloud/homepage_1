"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, CreditCard, Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DemoMarketplaceService, type DemoCheckoutResult } from "@/services/demo-marketplace-service";
import { cn, formatKRW } from "@/lib/utils";

type LineItem = { label: string; amount: number };

type DemoCheckoutModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  lineItems: LineItem[];
  total: number;
  onConfirmed?: (result: DemoCheckoutResult) => void;
};

const PAYMENT_METHODS = ["Demo Card •••• 4242", "Demo Card •••• 1881", "간편결제 (DEMO)"];

// The shared DEMO checkout used by both LOOK purchase and marketplace
// license purchase — real inputs (payment method selection), no real
// payment. Backed by DemoMarketplaceService.simulateCheckout, the seam a
// real payment provider replaces later.
export function DemoCheckoutModal({ open, onClose, title, lineItems, total, onConfirmed }: DemoCheckoutModalProps) {
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [phase, setPhase] = useState<"review" | "processing" | "done">("review");
  const [result, setResult] = useState<DemoCheckoutResult | null>(null);

  function handleClose() {
    setPhase("review");
    setResult(null);
    onClose();
  }

  function handleConfirm() {
    setPhase("processing");
    window.setTimeout(() => {
      const checkout = DemoMarketplaceService.simulateCheckout(total);
      setResult(checkout);
      setPhase("done");
      onConfirmed?.(checkout);
    }, 900);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="glass-panel fixed left-1/2 top-1/2 z-[70] w-[min(420px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-foreground">{title}</p>
              <button
                type="button"
                onClick={handleClose}
                aria-label="닫기"
                className="text-foreground-subtle hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {phase === "done" && result ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle2 className="h-10 w-10 text-accent-lime" aria-hidden="true" />
                <p className="text-base font-semibold text-foreground">결제가 완료되었습니다 (DEMO)</p>
                <p className="text-xs text-foreground-subtle">주문번호 {result.orderId}</p>
                <p className="text-sm font-medium text-foreground">{formatKRW(result.total)}</p>
                <Button variant="primary" className="mt-2 w-full" onClick={handleClose}>
                  확인
                </Button>
              </div>
            ) : (
              <>
                <ul className="mb-4 flex flex-col gap-1.5 text-sm">
                  {lineItems.map((item) => (
                    <li key={item.label} className="flex justify-between text-foreground-muted">
                      <span>{item.label}</span>
                      <span className="text-foreground">{formatKRW(item.amount)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-4 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold">
                  <span className="text-foreground-subtle">총 결제 금액</span>
                  <span className="text-foreground">{formatKRW(total)}</span>
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
                  결제 수단 (DEMO)
                </p>
                <div className="mb-4 flex flex-col gap-2">
                  {PAYMENT_METHODS.map((option) => (
                    <label
                      key={option}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                        method === option ? "border-accent-lime bg-accent-lime/10" : "border-border",
                      )}
                    >
                      <input
                        type="radio"
                        name="demo-payment-method"
                        checked={method === option}
                        onChange={() => setMethod(option)}
                        className="accent-[var(--accent-lime)]"
                      />
                      <CreditCard className="h-4 w-4 text-foreground-subtle" aria-hidden="true" />
                      {option}
                    </label>
                  ))}
                </div>

                <Badge tone="mock" className="mb-4">
                  실제 결제는 이루어지지 않습니다 (DEMO)
                </Badge>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleConfirm}
                  disabled={phase === "processing" || lineItems.length === 0}
                >
                  {phase === "processing" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      결제 처리 중...
                    </>
                  ) : (
                    "결제하기"
                  )}
                </Button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
