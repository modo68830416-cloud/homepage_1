"use client";

import { useId, useState } from "react";
import { Sparkles, TrendingUp, X } from "lucide-react";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DemoActionButton } from "@/components/ui/DemoActionButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { formatKRW } from "@/lib/utils";

type LookPanelProps = {
  wornProducts: Product[];
  onRemove: (productId: string) => void;
  onSave: (name: string) => void;
  onRecommend: () => void;
  canSave: boolean;
};

export function LookPanel({ wornProducts, onRemove, onSave, onRecommend, canSave }: LookPanelProps) {
  const [name, setName] = useState("My Look");
  const nameId = useId();

  const totalPrice = wornProducts.reduce((sum, p) => sum + (p.salePrice ?? p.price), 0);
  const avgTrendScore = wornProducts.length
    ? Math.round(wornProducts.reduce((sum, p) => sum + p.trendScore, 0) / wornProducts.length)
    : 0;
  const contentStyle =
    avgTrendScore >= 90 ? "Cinematic Editorial" : avgTrendScore >= 75 ? "Trendy Street" : "Everyday Casual";

  return (
    <GlassPanel className="flex h-full flex-col gap-4 rounded-2xl p-4">
      <div>
        <label htmlFor={nameId} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
          Look 이름
        </label>
        <input
          id={nameId}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={40}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
        />
      </div>

      <Button variant="outline" className="w-full text-xs" onClick={onRecommend}>
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        AI가 코디 추천
      </Button>

      <div className="flex-1 overflow-y-auto">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
          현재 착용 상품 ({wornProducts.length})
        </p>
        {wornProducts.length === 0 ? (
          <p className="py-6 text-center text-xs text-foreground-subtle">
            왼쪽에서 상품을 선택해 코디를 시작하세요.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {wornProducts.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-border px-2.5 py-1.5 text-xs"
              >
                <span className="truncate text-foreground-muted">{product.name}</span>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-medium text-foreground">
                    {formatKRW(product.salePrice ?? product.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(product.id)}
                    aria-label={`${product.name} 제거`}
                    className="text-foreground-subtle hover:text-danger"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground-subtle">예상 콘텐츠 스타일</span>
          <span className="font-medium text-foreground">{contentStyle}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-foreground-subtle">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            평균 Trend Score
          </span>
          <span className="font-medium text-accent-lime">{avgTrendScore || "-"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-subtle">총 금액</span>
          <span className="text-lg font-semibold text-foreground">{formatKRW(totalPrice)}</span>
        </div>
        {wornProducts.length > 0 && <Badge tone="mock">DEMO DATA</Badge>}
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="primary" className="w-full" disabled={!canSave} onClick={() => onSave(name.trim() || "My Look")}>
          Look 저장
        </Button>
        <DemoActionButton variant="secondary" className="w-full" message="콘텐츠 제작 기능은 준비 중입니다">
          콘텐츠 만들기
        </DemoActionButton>
      </div>
    </GlassPanel>
  );
}
