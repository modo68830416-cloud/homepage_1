"use client";

import { useMemo, useState } from "react";
import { AlertTriangle } from "lucide-react";
import type { ContentLicenseSelection, LicenseType, MarketplaceContent } from "@/types/marketplace";
import { LICENSE_DESCRIPTION, LICENSE_LABEL } from "@/types/marketplace";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DemoCheckoutModal } from "@/components/commerce/demo-checkout-modal";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { OptionChips } from "@/components/content-studio/option-chips";
import { useToast } from "@/components/feedback/toast";
import { DemoMarketplaceService } from "@/services/demo-marketplace-service";
import { formatKRW } from "@/lib/utils";

const LICENSE_TYPES: LicenseType[] = ["personal", "social-commercial", "advertising", "exclusive"];
const CHANNEL_OPTIONS = ["Instagram", "YouTube", "TikTok", "자사몰", "오프라인"];
const TERRITORY_OPTIONS = ["대한민국", "아시아", "글로벌"];
const DURATION_OPTIONS = [1, 3, 6, 12] as const;

export function ContentLicensePanel({ content }: { content: MarketplaceContent }) {
  const [selection, setSelection] = useState<ContentLicenseSelection>({
    licenseType: "social-commercial",
    channels: [CHANNEL_OPTIONS[0]],
    durationMonths: 6,
    territories: [TERRITORY_OPTIONS[0]],
    editable: false,
    exclusive: false,
    sourceFileIncluded: false,
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { showToast } = useToast();

  const price = useMemo(() => DemoMarketplaceService.calculateLicensePrice(selection), [selection]);
  const canPurchase = !content.isPhotoAvatar || content.commercialConsent;

  function toggleChannel(channel: string) {
    setSelection((current) => ({
      ...current,
      channels: current.channels.includes(channel)
        ? current.channels.filter((c) => c !== channel)
        : [...current.channels, channel],
    }));
  }

  return (
    <GlassPanel className="flex flex-col gap-5 rounded-xl p-5">
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-foreground">사용권 선택</p>
        <Badge tone="mock">예시 라이선스 가격</Badge>
      </div>

      <OptionChips
        legend="사용 목적"
        name="license-type"
        options={LICENSE_TYPES}
        value={selection.licenseType}
        onChange={(licenseType) => setSelection((current) => ({ ...current, licenseType }))}
        formatLabel={(value) => LICENSE_LABEL[value]}
      />
      <ul className="-mt-2 flex flex-wrap gap-1.5">
        {LICENSE_DESCRIPTION[selection.licenseType].map((item) => (
          <li key={item} className="rounded-full bg-surface-strong px-2 py-0.5 text-[10px] text-foreground-muted">
            {item}
          </li>
        ))}
      </ul>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">사용 채널</p>
        <div className="flex flex-wrap gap-2">
          {CHANNEL_OPTIONS.map((channel) => (
            <label
              key={channel}
              className={`flex min-h-9 cursor-pointer items-center rounded-full border px-3 py-1.5 text-xs font-medium ${
                selection.channels.includes(channel)
                  ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                  : "border-border text-foreground-muted"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={selection.channels.includes(channel)}
                onChange={() => toggleChannel(channel)}
              />
              {channel}
            </label>
          ))}
        </div>
      </div>

      <OptionChips
        legend="사용 기간"
        name="license-duration"
        options={DURATION_OPTIONS}
        value={selection.durationMonths as (typeof DURATION_OPTIONS)[number]}
        onChange={(durationMonths) => setSelection((current) => ({ ...current, durationMonths }))}
        formatLabel={(value) => `${value}개월`}
      />

      <OptionChips
        legend="사용 국가"
        name="license-territory"
        options={TERRITORY_OPTIONS}
        value={selection.territories[0]}
        onChange={(territory) => setSelection((current) => ({ ...current, territories: [territory] }))}
      />

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={selection.editable}
            onChange={(event) => setSelection((current) => ({ ...current, editable: event.target.checked }))}
            className="h-4 w-4 accent-[var(--accent-lime)]"
          />
          편집 가능 (+30%)
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={selection.exclusive}
            onChange={(event) => setSelection((current) => ({ ...current, exclusive: event.target.checked }))}
            className="h-4 w-4 accent-[var(--accent-lime)]"
          />
          독점 사용 (+100%)
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={selection.sourceFileIncluded}
            onChange={(event) => setSelection((current) => ({ ...current, sourceFileIncluded: event.target.checked }))}
            className="h-4 w-4 accent-[var(--accent-lime)]"
          />
          원본 파일 포함 (+50,000원)
        </label>
      </div>

      <GlassPanel className="rounded-lg p-4 text-xs text-foreground-muted">
        <p>사용 목적: {LICENSE_LABEL[selection.licenseType]}</p>
        <p>사용 채널: {selection.channels.join(", ") || "선택 없음"}</p>
        <p>사용 기간: {selection.durationMonths}개월</p>
        <p>사용 국가: {selection.territories.join(", ")}</p>
        <p>편집 가능: {selection.editable ? "예" : "아니오"}</p>
        <p>독점 사용: {selection.exclusive ? "예" : "아니오"}</p>
        <p className="mt-2 text-sm font-semibold text-accent-lime">예시 가격: {formatKRW(price)}</p>
      </GlassPanel>

      {!canPurchase && (
        <div className="flex gap-2 rounded-lg border border-danger/40 bg-danger/10 p-3 text-xs text-danger">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>이 콘텐츠는 사용자 사진 기반 아바타로 제작되었으며 상업 이용 동의가 없어 구매할 수 없습니다.</p>
        </div>
      )}

      <Button variant="primary" className="w-full" disabled={!canPurchase} onClick={() => setCheckoutOpen(true)}>
        사용권 구매하기
      </Button>

      <DemoCheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        title={`${content.title} 사용권`}
        lineItems={[{ label: `${LICENSE_LABEL[selection.licenseType]} 라이선스`, amount: price }]}
        total={price}
        onConfirmed={() => showToast("사용권 구매가 완료되었습니다 (DEMO)")}
      />
    </GlassPanel>
  );
}
