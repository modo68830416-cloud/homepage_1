"use client";

import { useState } from "react";
import { QrCode } from "lucide-react";
import { trackCommerceEvent } from "@/lib/commerce-events";
import { cn } from "@/lib/utils";

export function QrReveal({ url }: { url: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setRevealed((current) => {
          if (!current) trackCommerceEvent("qr_scanned");
          return !current;
        });
      }}
      aria-expanded={revealed}
      aria-label="QR 코드 보기"
      className={cn(
        "flex h-16 w-16 shrink-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-border bg-background transition-colors",
        revealed && "border-accent-lime",
      )}
    >
      {revealed ? (
        <span
          className="h-10 w-10 rounded-sm"
          style={{
            backgroundImage:
              "repeating-conic-gradient(var(--foreground) 0% 25%, transparent 0% 50%)",
            backgroundSize: "6px 6px",
          }}
          aria-hidden="true"
        />
      ) : (
        <QrCode className="h-7 w-7 text-foreground-subtle" aria-hidden="true" />
      )}
      <span className="sr-only">{url}</span>
      {revealed && <span className="text-[8px] text-foreground-subtle">DEMO</span>}
    </button>
  );
}
