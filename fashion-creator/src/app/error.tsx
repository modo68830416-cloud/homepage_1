"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-5 text-center">
      <Logo />
      <AlertTriangle className="h-10 w-10 text-danger" aria-hidden="true" />
      <div>
        <h1 className="text-2xl font-bold text-foreground">문제가 발생했습니다</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          일시적인 오류입니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={reset}>
          다시 시도
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          이전 화면
        </Button>
        <Button href="/" variant="primary">
          홈으로 이동
        </Button>
      </div>
    </div>
  );
}
