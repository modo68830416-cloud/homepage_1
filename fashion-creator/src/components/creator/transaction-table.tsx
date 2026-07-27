"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { RevenueTransaction, RevenueTransactionType, SettlementStatus } from "@/types/creator-business";
import { REVENUE_TYPE_LABEL, SETTLEMENT_STATUS_LABEL } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { downloadCsv } from "@/lib/csv-export";
import { cn, formatKRW } from "@/lib/utils";

const TYPE_FILTERS: (RevenueTransactionType | "all")[] = ["all", "affiliate", "content-sale", "campaign", "bonus", "adjustment"];
const STATUS_FILTERS: (SettlementStatus | "all")[] = ["all", "estimated", "pending", "confirmed", "scheduled", "paid", "held", "cancelled"];

export function TransactionTable({ transactions }: { transactions: RevenueTransaction[] }) {
  const [typeFilter, setTypeFilter] = useState<RevenueTransactionType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<SettlementStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (query.trim() && !t.referenceTitle.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [transactions, typeFilter, statusFilter, query]);

  function handleExport() {
    downloadCsv(
      "revenue-transactions.csv",
      ["날짜", "유형", "콘텐츠", "채널", "발생금액", "차감금액", "인정금액", "수익", "상태"],
      filtered.map((t) => [
        new Date(t.occurredAt).toLocaleDateString("ko-KR"),
        REVENUE_TYPE_LABEL[t.type],
        t.referenceTitle,
        t.channel,
        t.grossAmount,
        t.refundAmount + t.feeAmount,
        t.recognizedAmount,
        t.creatorEarning,
        SETTLEMENT_STATUS_LABEL[t.status],
      ]),
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">거래 내역</h2>
        <Button variant="outline" className="text-xs" onClick={handleExport}>
          CSV 다운로드
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-3">
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="콘텐츠명 또는 캠페인명 검색"
            aria-label="거래 내역 검색"
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent-lime focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="유형 필터">
          {TYPE_FILTERS.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              aria-pressed={typeFilter === type}
              className={cn(
                "min-h-8 rounded-full border px-3 py-1 text-[11px] font-medium",
                typeFilter === type ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
              )}
            >
              {type === "all" ? "전체 유형" : REVENUE_TYPE_LABEL[type]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="상태 필터">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              aria-pressed={statusFilter === status}
              className={cn(
                "min-h-8 rounded-full border px-3 py-1 text-[11px] font-medium",
                statusFilter === status ? "border-accent-lime bg-accent-lime/10 text-accent-lime" : "border-border text-foreground-muted",
              )}
            >
              {status === "all" ? "전체 상태" : SETTLEMENT_STATUS_LABEL[status]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <caption className="sr-only">수익 거래 내역 표</caption>
          <thead>
            <tr className="border-b border-border text-left text-xs text-foreground-subtle">
              <th className="py-2 pr-3 font-medium">날짜</th>
              <th className="py-2 pr-3 font-medium">유형</th>
              <th className="py-2 pr-3 font-medium">콘텐츠 / 캠페인</th>
              <th className="py-2 pr-3 font-medium">채널</th>
              <th className="py-2 pr-3 font-medium">발생 금액</th>
              <th className="py-2 pr-3 font-medium">인정 금액</th>
              <th className="py-2 pr-3 font-medium">수익</th>
              <th className="py-2 font-medium">상태</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0">
                <td className="py-2.5 pr-3 text-xs text-foreground-muted">{new Date(t.occurredAt).toLocaleDateString("ko-KR")}</td>
                <td className="py-2.5 pr-3 text-xs text-foreground-muted">{REVENUE_TYPE_LABEL[t.type]}</td>
                <td className="py-2.5 pr-3 text-foreground">{t.referenceTitle}</td>
                <td className="py-2.5 pr-3 text-xs text-foreground-muted">{t.channel}</td>
                <td className="py-2.5 pr-3 text-foreground-muted">{formatKRW(t.grossAmount)}</td>
                <td className="py-2.5 pr-3 text-foreground-muted">{formatKRW(t.recognizedAmount)}</td>
                <td className="py-2.5 pr-3 font-medium text-accent-lime">{formatKRW(t.creatorEarning)}</td>
                <td className="py-2.5">
                  <Badge tone={t.status === "paid" || t.status === "confirmed" ? "bestSeller" : "mock"}>
                    {SETTLEMENT_STATUS_LABEL[t.status]}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-xs text-foreground-subtle">조건에 맞는 거래 내역이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
