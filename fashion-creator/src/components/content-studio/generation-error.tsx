import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ERROR_MESSAGES: Record<string, string> = {
  "invalid-look": "선택한 Look 정보를 불러올 수 없습니다.",
  "unsupported-format": "지원하지 않는 콘텐츠 형식입니다.",
  "media-unavailable": "생성된 미디어를 표시할 수 없습니다.",
  "generation-failed": "콘텐츠 생성에 실패했습니다.",
};

export function GenerationError({
  code = "generation-failed",
  onRetry,
  onEditSettings,
  onBackToStudio,
}: {
  code?: keyof typeof ERROR_MESSAGES;
  onRetry: () => void;
  onEditSettings: () => void;
  onBackToStudio: () => void;
}) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-10 text-center">
      <AlertTriangle className="h-8 w-8 text-danger" aria-hidden="true" />
      <div>
        <h2 className="text-lg font-semibold text-foreground">문제가 발생했습니다</h2>
        <p className="mt-1 text-sm text-foreground-muted">{ERROR_MESSAGES[code]}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="primary" onClick={onRetry}>
          다시 시도
        </Button>
        <Button variant="secondary" onClick={onEditSettings}>
          설정 수정
        </Button>
        <Button variant="ghost" onClick={onBackToStudio}>
          Studio로 돌아가기
        </Button>
      </div>
    </div>
  );
}
