interface TrustPanelProps {
  author: string;
  reviewer: string;
  publishedAt: string;
  updatedAt: string;
}

/**
 * Source/reviewer/date disclosure, always in the same position at the top
 * of an article body (docs/design/component-principles.md §3,
 * user promise "출처가 보이는 정보" in docs/strategy/user-value-proposition.md).
 */
export function TrustPanel({ author, reviewer, publishedAt, updatedAt }: TrustPanelProps) {
  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)] border-y border-[var(--border-default)] py-3 mb-6">
      <div className="flex gap-1">
        <dt className="font-medium">작성</dt>
        <dd>{author}</dd>
      </div>
      <div className="flex gap-1">
        <dt className="font-medium">검수</dt>
        <dd>{reviewer}</dd>
      </div>
      <div className="flex gap-1">
        <dt className="font-medium">작성일</dt>
        <dd>{publishedAt}</dd>
      </div>
      <div className="flex gap-1">
        <dt className="font-medium">수정일</dt>
        <dd>{updatedAt}</dd>
      </div>
    </dl>
  );
}
