"use client";

import { useEffect, useState } from "react";

interface ExternalRedirectNoticeProps {
  externalUrl: string;
  merchantName: string;
  priceAsOf: string;
}

/**
 * Confirmation shown before an AFFILIATE product sends the user off-platform
 * (docs/ia/user-flows.md 흐름 5, TASK-007 §4 제휴판매 UX).
 */
export function ExternalRedirectNotice({ externalUrl, merchantName, priceAsOf }: ExternalRedirectNoticeProps) {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = externalUrl;
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, externalUrl]);

  return (
    <div className="mx-auto max-w-md px-6 py-20 text-center">
      <p className="text-xs rounded-full inline-block px-3 py-1 mb-4" style={{ backgroundColor: "var(--color-badge-affiliate)", color: "white" }}>
        제휴 상품
      </p>
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold mb-3">외부 사이트로 이동합니다</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-1">
        <strong>{merchantName}</strong>(으)로 이동하여 구매를 진행합니다.
      </p>
      <p className="text-xs text-[var(--text-secondary)] mb-6">가격 기준 시점: {priceAsOf} (실제 판매가는 변동될 수 있습니다)</p>
      <a
        href={externalUrl}
        className="inline-block rounded-full bg-[var(--color-brand-600)] text-white px-8 py-3 font-semibold"
      >
        지금 이동하기 ({seconds}초 후 자동 이동)
      </a>
    </div>
  );
}
