"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useToast } from "@/components/feedback/toast";

type PayoutType = "individual" | "sole-proprietor" | "corporation";

const PAYOUT_TYPE_LABEL: Record<PayoutType, string> = {
  individual: "개인",
  "sole-proprietor": "개인사업자",
  corporation: "법인",
};

// Sensitive fields live only in this component's React state — never
// persisted to localStorage, never logged. See real-service TODOs below.
export function PayoutInfoForm() {
  const [payoutType, setPayoutType] = useState<PayoutType>("individual");
  const [form, setForm] = useState({
    accountHolder: "",
    bank: "",
    accountNumber: "",
    businessName: "",
    businessRegistrationNumber: "",
  });
  const { showToast } = useToast();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    showToast("DEMO 모드에서는 실제 저장되지 않습니다", "info");
  }

  return (
    <GlassPanel className="rounded-xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">계좌 및 사업자 정보</h2>
        <Badge tone="mock">DEMO</Badge>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">정산 유형</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="정산 유형">
            {(Object.keys(PAYOUT_TYPE_LABEL) as PayoutType[]).map((type) => (
              <label
                key={type}
                className={`flex min-h-9 cursor-pointer items-center rounded-full border px-3 py-1.5 text-xs font-medium ${
                  payoutType === type
                    ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                    : "border-border text-foreground-muted"
                }`}
              >
                <input
                  type="radio"
                  name="payoutType"
                  className="sr-only"
                  checked={payoutType === type}
                  onChange={() => setPayoutType(type)}
                />
                {PAYOUT_TYPE_LABEL[type]}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
            예금주
            <input
              type="text"
              value={form.accountHolder}
              onChange={(event) => setForm({ ...form, accountHolder: event.target.value })}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
            은행
            <input
              type="text"
              value={form.bank}
              onChange={(event) => setForm({ ...form, bank: event.target.value })}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle sm:col-span-2">
            계좌번호
            <input
              type="text"
              value={form.accountNumber}
              onChange={(event) => setForm({ ...form, accountNumber: event.target.value })}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
            />
          </label>
          {payoutType !== "individual" && (
            <>
              <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
                사업자명
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(event) => setForm({ ...form, businessName: event.target.value })}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
                사업자등록번호
                <input
                  type="text"
                  value={form.businessRegistrationNumber}
                  onChange={(event) => setForm({ ...form, businessRegistrationNumber: event.target.value })}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
                />
              </label>
            </>
          )}
        </div>

        <div className="flex gap-2 rounded-lg border border-border bg-surface p-3 text-xs text-foreground-subtle">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent-orange" aria-hidden="true" />
          <p>
            정산액은 세전 기준이며 실제 서비스에서는 원천징수·세금계산서 발행이 적용될 수 있습니다.
            DEMO 모드에서는 입력한 정보가 저장되지 않습니다.
          </p>
        </div>

        <Button type="submit" variant="primary" className="self-start">
          저장하기
        </Button>
      </form>
    </GlassPanel>
  );
}
