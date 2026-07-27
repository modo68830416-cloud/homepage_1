import { Banknote, CircleDollarSign, ReceiptText, Wallet } from "lucide-react";
import type { RevenueTransaction } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { MetricCard } from "@/components/ui/MetricCard";
import { formatKRW } from "@/lib/utils";

export function RevenueSummary({ transactions }: { transactions: RevenueTransaction[] }) {
  const gross = transactions.reduce((sum, t) => sum + t.grossAmount, 0);
  const refunds = transactions.reduce((sum, t) => sum + t.refundAmount, 0);
  const fees = transactions.reduce((sum, t) => sum + t.feeAmount, 0);
  const recognized = transactions.reduce((sum, t) => sum + t.recognizedAmount, 0);
  const earning = transactions.reduce((sum, t) => sum + t.creatorEarning, 0);
  const confirmed = transactions
    .filter((t) => t.status === "confirmed" || t.status === "paid")
    .reduce((sum, t) => sum + t.creatorEarning, 0);
  const scheduled = transactions.filter((t) => t.status === "scheduled").reduce((sum, t) => sum + t.creatorEarning, 0);
  const paid = transactions.filter((t) => t.status === "paid").reduce((sum, t) => sum + t.creatorEarning, 0);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">수익 요약</h2>
        <Badge tone="mock">DEMO</Badge>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={CircleDollarSign} label="총 발생 매출" value={formatKRW(gross)} />
        <MetricCard icon={ReceiptText} label="취소·반품" value={`-${formatKRW(refunds)}`} />
        <MetricCard icon={Banknote} label="인정 매출" value={formatKRW(recognized)} />
        <MetricCard icon={ReceiptText} label="플랫폼 수수료" value={`-${formatKRW(fees)}`} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={Wallet} label="예상 수익" value={formatKRW(earning)} />
        <MetricCard icon={Wallet} label="확정 수익" value={formatKRW(confirmed)} />
        <MetricCard icon={Wallet} label="정산 예정액" value={formatKRW(scheduled)} />
        <MetricCard icon={Wallet} label="정산 완료액" value={formatKRW(paid)} />
      </div>
    </div>
  );
}
