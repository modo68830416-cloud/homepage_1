"use client";

import { useEffect } from "react";

/**
 * Root-level error boundary — catches errors that escape every nested
 * error.tsx. A production deployment reports `error` to an APM/error
 * tracker here (Sentry, etc.) instead of just logging.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", fontFamily: "system-ui" }}>
          <p>일시적인 오류가 발생했습니다.</p>
          <button onClick={reset} style={{ textDecoration: "underline" }}>
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
