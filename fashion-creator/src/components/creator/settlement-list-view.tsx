"use client";

import { useState } from "react";
import type { SettlementStatement } from "@/types/creator-business";
import { SETTLEMENT_STATUS_LABEL } from "@/types/creator-business";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SettlementDetail } from "@/components/creator/settlement-detail";
import { cn, formatKRW } from "@/lib/utils";

export function SettlementListView({ statements }: { statements: SettlementStatement[] }) {
  const [selectedId, setSelectedId] = useState(statements[0]?.id ?? null);
  const selected = statements.find((s) => s.id === selectedId) ?? statements[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col gap-3">
        {statements.map((statement) => (
          <button
            key={statement.id}
            type="button"
            onClick={() => setSelectedId(statement.id)}
            className="text-left"
          >
            <GlassPanel
              className={cn(
                "flex flex-col gap-1.5 rounded-xl p-4 transition-colors",
                selectedId === statement.id && "border-accent-lime/60",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {new Date(statement.periodStart).toLocaleDateString("ko-KR", { year: "numeric", month: "long" })}
                </span>
                <Badge tone={statement.status === "paid" ? "bestSeller" : "mock"}>
                  {SETTLEMENT_STATUS_LABEL[statement.status]}
                </Badge>
              </div>
              <span className="text-lg font-semibold text-accent-lime">{formatKRW(statement.settlementAmount)}</span>
            </GlassPanel>
          </button>
        ))}
      </div>
      {selected && <SettlementDetail statement={selected} />}
    </div>
  );
}
