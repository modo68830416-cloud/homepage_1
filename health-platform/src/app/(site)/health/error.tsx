"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function HealthSectionError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <ErrorState message="건강정보를 불러오는 중 문제가 발생했습니다." onRetry={reset} />
    </div>
  );
}
