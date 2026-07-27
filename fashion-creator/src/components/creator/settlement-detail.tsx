"use client";

import { Printer, Download } from "lucide-react";
import type { SettlementStatement } from "@/types/creator-business";
import { SETTLEMENT_STATUS_LABEL } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { downloadCsv } from "@/lib/csv-export";
import { formatKRW } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR");
}

export function SettlementDetail({ statement }: { statement: SettlementStatement }) {
  function handleCsv() {
    downloadCsv(
      `settlement-${statement.id}.csv`,
      ["항목", "금액"],
      [
        ["정산 기간", `${formatDate(statement.periodStart)} ~ ${formatDate(statement.periodEnd)}`],
        ["발생 매출", statement.grossRevenue],
        ["취소·환불", statement.refunds],
        ["플랫폼 수수료", statement.fees],
        ["기타 조정", statement.adjustments],
        ["세전 정산액", statement.settlementAmount],
        ["상태", SETTLEMENT_STATUS_LABEL[statement.status]],
      ],
    );
  }

  return (
    <GlassPanel className="rounded-xl p-6" id={`statement-${statement.id}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Badge tone="mock">DEMO 정산 명세서</Badge>
        <div className="flex gap-2">
          <Button variant="outline" className="text-xs" onClick={handleCsv}>
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            CSV 다운로드
          </Button>
          <Button variant="secondary" className="text-xs" onClick={() => window.print()}>
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            인쇄
          </Button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground">
        {formatDate(statement.periodStart)} ~ {formatDate(statement.periodEnd)} 정산 명세서
      </h3>
      <p className="mt-1 text-xs text-foreground-subtle">
        예시 정책: 매월 1일~말일 실적 → 다음 달 7일 확정 → 다음 달 15일 지급 예정
      </p>

      <dl className="mt-5 flex flex-col divide-y divide-border text-sm">
        {[
          ["발생 매출", statement.grossRevenue],
          ["취소·환불", statement.refunds],
          ["플랫폼 수수료", statement.fees],
          ["기타 조정", statement.adjustments],
        ].map(([label, value]) => (
          <div key={label as string} className="flex items-center justify-between py-2">
            <dt className="text-foreground-subtle">{label}</dt>
            <dd className="text-foreground">{formatKRW(value as number)}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between py-2">
          <dt className="font-semibold text-foreground">세전 정산액</dt>
          <dd className="font-semibold text-accent-lime">{formatKRW(statement.settlementAmount)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-border p-3 text-sm">
        <span className="text-foreground-subtle">지급 상태</span>
        <div className="flex items-center gap-2">
          <Badge tone={statement.status === "paid" ? "bestSeller" : "mock"}>
            {SETTLEMENT_STATUS_LABEL[statement.status]}
          </Badge>
          {statement.scheduledAt && (
            <span className="text-xs text-foreground-subtle">예정일 {formatDate(statement.scheduledAt)}</span>
          )}
        </div>
      </div>
    </GlassPanel>
  );
}
