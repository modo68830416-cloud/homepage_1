"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { MarketplaceCampaign } from "@/types/marketplace";
import { APPLICATION_STATUS_LABEL } from "@/types/marketplace";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useCampaignApplications } from "@/lib/marketplace-store";
import { useToast } from "@/components/feedback/toast";

export function CampaignApplicationForm({ campaign }: { campaign: MarketplaceCampaign }) {
  const { applications, submitApplication } = useCampaignApplications();
  const { showToast } = useToast();
  const [message, setMessage] = useState("");
  const [concept, setConcept] = useState("");
  const [estimatedDays, setEstimatedDays] = useState(5);
  const [revisionsAgreed, setRevisionsAgreed] = useState(false);
  const [licenseAgreed, setLicenseAgreed] = useState(false);

  const existing = applications.find((app) => app.campaignId === campaign.id);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    submitApplication({
      id: `app-${Date.now()}`,
      campaignId: campaign.id,
      message,
      concept,
      estimatedDays,
      revisionsAgreed,
      licenseAgreed,
      status: "submitted",
      submittedAt: new Date().toISOString(),
      isDemo: true,
    });
    showToast("캠페인 지원이 접수되었습니다 (DEMO)");
  }

  if (existing) {
    return (
      <GlassPanel className="rounded-xl p-5">
        <div className="mb-2 flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">지원 완료</p>
          <Badge tone="ai">{APPLICATION_STATUS_LABEL[existing.status]}</Badge>
        </div>
        <p className="text-xs text-foreground-subtle">
          {new Date(existing.submittedAt).toLocaleString("ko-KR")}에 지원했습니다. 선정 결과는 Creator Dashboard에서 확인할 수 있습니다.
        </p>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="rounded-xl p-5">
      <p className="mb-4 text-sm font-semibold text-foreground">캠페인 지원하기</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          지원 메시지
          <textarea
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={3}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          제안 콘셉트
          <textarea
            required
            value={concept}
            onChange={(event) => setConcept(event.target.value)}
            rows={2}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          예상 작업 기간 (일)
          <input
            type="number"
            min={1}
            max={30}
            value={estimatedDays}
            onChange={(event) => setEstimatedDays(Number(event.target.value))}
            className="w-24 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            required
            checked={revisionsAgreed}
            onChange={(event) => setRevisionsAgreed(event.target.checked)}
            className="h-4 w-4 accent-[var(--accent-lime)]"
          />
          수정 가능 횟수에 동의합니다
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            required
            checked={licenseAgreed}
            onChange={(event) => setLicenseAgreed(event.target.checked)}
            className="h-4 w-4 accent-[var(--accent-lime)]"
          />
          사용권 조건에 동의합니다
        </label>

        <Button type="submit" variant="primary" className="self-start">
          <Send className="h-4 w-4" aria-hidden="true" />
          지원 제출
        </Button>
      </form>
    </GlassPanel>
  );
}
