"use client";

import { Check, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToast } from "@/components/feedback/toast";

export function CopyLinkButton({ path, className }: { path: string; className?: string }) {
  const { copied, copy } = useCopyToClipboard();
  const { showToast } = useToast();

  async function handleCopy() {
    const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
    const success = await copy(url);
    if (success) showToast("링크가 복사되었습니다");
  }

  return (
    <Button variant="secondary" className={className} onClick={handleCopy}>
      {copied ? (
        <Check className="h-4 w-4 text-accent-lime" aria-hidden="true" />
      ) : (
        <LinkIcon className="h-4 w-4" aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy Link"}
    </Button>
  );
}
