"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Sends Core Web Vitals to /api/vitals (docs/performance/monitoring.md).
 * A production deployment swaps the fetch target for a real analytics
 * endpoint (e.g. Vercel Analytics, Datadog RUM).
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    navigator.sendBeacon?.("/api/vitals", JSON.stringify(metric));
  });

  return null;
}
