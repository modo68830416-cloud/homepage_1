import { Compass } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-5 text-center">
      <Logo />
      <Compass className="h-10 w-10 text-foreground-subtle" aria-hidden="true" />
      <div>
        <h1 className="text-2xl font-bold text-foreground">페이지를 찾을 수 없습니다</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          찾으시는 룩, 상품, 크리에이터 페이지가 이동했거나 존재하지 않습니다.
        </p>
      </div>
      <Button href="/" variant="primary">
        Back to Fashion Creator
      </Button>
    </div>
  );
}
