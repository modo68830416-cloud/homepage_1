"use client";

import { useState } from "react";
import { Palette, Upload } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useToast } from "@/components/feedback/toast";

const SWATCHES = ["#D9FF57", "#FF78C8", "#A98BFF", "#76A9FF", "#FF8B5D"];

export function BrandKitForm() {
  const [brandName, setBrandName] = useState("Fashion Creator Studio");
  const [color, setColor] = useState(SWATCHES[0]);
  const [ctaCopy, setCtaCopy] = useState("Shop the Look");
  const [disclosure, setDisclosure] = useState(
    "이 콘텐츠에는 제휴 링크가 포함될 수 있으며, 구매 시 크리에이터에게 일정 수익이 발생할 수 있습니다.",
  );
  const { showToast } = useToast();

  return (
    <GlassPanel className="rounded-xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Palette className="h-4 w-4 text-accent-lime" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-foreground">Brand Kit</h2>
        <Badge tone="mock" className="ml-auto">
          DEMO
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          브랜드명
          <input
            type="text"
            value={brandName}
            onChange={(event) => setBrandName(event.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>

        <div>
          <p className="mb-2 text-xs text-foreground-subtle">로고 업로드 (DEMO)</p>
          <button
            type="button"
            onClick={() => showToast("로고 업로드는 DEMO 모드에서 저장되지 않습니다", "info")}
            className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border text-foreground-subtle hover:border-border-strong"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            <span className="text-[10px]">업로드</span>
          </button>
        </div>

        <div>
          <p className="mb-2 text-xs text-foreground-subtle">브랜드 색상</p>
          <div className="flex gap-2">
            {SWATCHES.map((swatch) => (
              <button
                key={swatch}
                type="button"
                onClick={() => setColor(swatch)}
                aria-label={`색상 ${swatch} 선택`}
                aria-pressed={color === swatch}
                className="h-8 w-8 rounded-full border-2"
                style={{ backgroundColor: swatch, borderColor: color === swatch ? "var(--foreground)" : "transparent" }}
              />
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          기본 CTA 문구
          <input
            type="text"
            value={ctaCopy}
            onChange={(event) => setCtaCopy(event.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          제휴 고지 문구
          <textarea
            value={disclosure}
            onChange={(event) => setDisclosure(event.target.value)}
            rows={2}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>

        <Button
          variant="primary"
          className="self-start"
          onClick={() => showToast("DEMO 모드에서는 실제 저장되지 않습니다", "info")}
        >
          저장하기
        </Button>
      </div>
    </GlassPanel>
  );
}
