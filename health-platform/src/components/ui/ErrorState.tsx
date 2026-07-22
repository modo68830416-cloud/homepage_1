interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "일시적인 오류가 발생했습니다.", onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="rounded-[var(--radius-md)] border border-[var(--border-default)] p-6 text-center">
      <p className="text-sm text-[var(--text-secondary)] mb-3">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-sm font-medium text-[var(--color-info-500)] underline"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
