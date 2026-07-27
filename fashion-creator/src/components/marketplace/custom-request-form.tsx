"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Paperclip, Send } from "lucide-react";
import { marketplaceCreators } from "@/data/marketplace";
import { products } from "@/data/products";
import { ASPECT_RATIOS, BACKGROUNDS, STYLES } from "@/types/content";
import type { LicenseType } from "@/types/marketplace";
import { LICENSE_LABEL } from "@/types/marketplace";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { OptionChips } from "@/components/content-studio/option-chips";
import { useCustomRequests } from "@/lib/marketplace-store";
import { useToast } from "@/components/feedback/toast";

const CONTENT_TYPES = ["Image", "Shorts", "Reels", "YouTube", "Blog"];
const LICENSE_TYPES: LicenseType[] = ["personal", "social-commercial", "advertising", "exclusive"];

export function CustomRequestForm() {
  const router = useRouter();
  const { submitRequest } = useCustomRequests();
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [targetCreator, setTargetCreator] = useState(marketplaceCreators[0]?.handle ?? "");
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);
  const [aspectRatio, setAspectRatio] = useState<(typeof ASPECT_RATIOS)[number]>("9:16");
  const [duration, setDuration] = useState(15);
  const [style, setStyle] = useState(STYLES[0]);
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [mustHave, setMustHave] = useState("");
  const [mustAvoid, setMustAvoid] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [revisionLimit, setRevisionLimit] = useState(2);
  const [license, setLicense] = useState<LicenseType>("social-commercial");
  const [budget, setBudget] = useState(300000);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!dueAt) {
      showToast("납기일을 선택해주세요", "info");
      return;
    }
    submitRequest({
      id: `request-${Date.now()}`,
      title,
      targetCreatorHandle: targetCreator,
      productIds: [productId],
      contentType,
      aspectRatio,
      duration: contentType === "Image" || contentType === "Blog" ? null : duration,
      style,
      background,
      mustHave,
      mustAvoid,
      dueAt: new Date(dueAt).toISOString(),
      revisionLimit,
      license,
      budget,
      submittedAt: new Date().toISOString(),
      isDemo: true,
    });
    showToast("주문 제작 의뢰가 접수되었습니다 (DEMO)");
    router.push("/marketplace/creators");
  }

  return (
    <GlassPanel className="mx-auto max-w-2xl rounded-2xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <p className="text-lg font-semibold text-foreground">주문 제작 의뢰</p>
        <Badge tone="mock">DEMO</Badge>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          요청 제목
          <input
            required
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
            대상 크리에이터
            <select
              value={targetCreator}
              onChange={(event) => setTargetCreator(event.target.value)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
            >
              {marketplaceCreators.map((creator) => (
                <option key={creator.id} value={creator.handle}>
                  {creator.displayName} ({creator.handle})
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
            상품
            <select
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <OptionChips legend="콘텐츠 유형" name="request-content-type" options={CONTENT_TYPES} value={contentType} onChange={setContentType} />
        <OptionChips legend="비율" name="request-aspect" options={ASPECT_RATIOS} value={aspectRatio} onChange={setAspectRatio} />
        {contentType !== "Image" && contentType !== "Blog" && (
          <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
            길이 (초)
            <input
              type="number"
              min={5}
              max={60}
              value={duration}
              onChange={(event) => setDuration(Number(event.target.value))}
              className="w-28 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
            />
          </label>
        )}
        <OptionChips legend="스타일" name="request-style" options={STYLES} value={style} onChange={setStyle} />
        <OptionChips legend="배경" name="request-background" options={BACKGROUNDS} value={background} onChange={setBackground} />

        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          필수 요소
          <textarea
            value={mustHave}
            onChange={(event) => setMustHave(event.target.value)}
            rows={2}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          금지 요소
          <textarea
            value={mustAvoid}
            onChange={(event) => setMustAvoid(event.target.value)}
            rows={2}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
            납기
            <input
              required
              type="date"
              value={dueAt}
              onChange={(event) => setDueAt(event.target.value)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
            수정 가능 횟수
            <input
              type="number"
              min={0}
              max={5}
              value={revisionLimit}
              onChange={(event) => setRevisionLimit(Number(event.target.value))}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
            />
          </label>
        </div>

        <OptionChips
          legend="사용권"
          name="request-license"
          options={LICENSE_TYPES}
          value={license}
          onChange={setLicense}
          formatLabel={(value) => LICENSE_LABEL[value]}
        />

        <label className="flex flex-col gap-1.5 text-xs text-foreground-subtle">
          예산 (원, 예시)
          <input
            type="number"
            min={0}
            step={10000}
            value={budget}
            onChange={(event) => setBudget(Number(event.target.value))}
            className="w-40 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
          />
        </label>

        <div className="flex items-center gap-2 rounded-lg border-2 border-dashed border-border p-4 text-xs text-foreground-subtle">
          <Paperclip className="h-4 w-4 shrink-0" aria-hidden="true" />
          참고 자료 첨부는 준비 중입니다. (placeholder)
        </div>

        <Button type="submit" variant="primary" className="self-start">
          <Send className="h-4 w-4" aria-hidden="true" />
          제작 의뢰 보내기
        </Button>
      </form>
    </GlassPanel>
  );
}
