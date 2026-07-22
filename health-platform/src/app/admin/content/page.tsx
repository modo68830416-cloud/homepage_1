import { requireSection } from "@/lib/admin/require-section";
import { getEffectiveArticleStatus } from "@/lib/admin/content-overrides";
import { articles, categories } from "@/lib/content/data";
import type { ContentStatus } from "@/lib/content/types";
import { updateContentStatus } from "./actions";

const STATUS_OPTIONS: ContentStatus[] = [
  "DRAFT",
  "REVIEW_REQUESTED",
  "IN_REVIEW",
  "CHANGES_REQUESTED",
  "APPROVED",
  "SCHEDULED",
  "PUBLISHED",
  "UNPUBLISHED",
  "ARCHIVED",
];

export default async function AdminContentPage() {
  const access = await requireSection("content");
  if (!access.allowed) return <p>접근 권한이 없습니다.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">콘텐츠 관리</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        상태를 변경하면 즉시 공개 사이트에 반영됩니다 (PUBLISHED만 공개 노출).
      </p>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b border-[var(--border-default)]">
            <th className="py-2">제목</th>
            <th className="py-2">카테고리</th>
            <th className="py-2">검수자</th>
            <th className="py-2">수정일</th>
            <th className="py-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            const effectiveStatus = getEffectiveArticleStatus(article);
            const categoryLabel = categories.find((c) => c.key === article.category)?.label ?? article.category;
            return (
              <tr key={article.slug} className="border-b border-[var(--border-default)]">
                <td className="py-2 pr-4">{article.title}</td>
                <td className="py-2 pr-4">{categoryLabel}</td>
                <td className="py-2 pr-4">{article.reviewer}</td>
                <td className="py-2 pr-4">{article.updatedAt}</td>
                <td className="py-2">
                  <form action={updateContentStatus} className="flex items-center gap-2">
                    <input type="hidden" name="slug" value={article.slug} />
                    <select name="status" defaultValue={effectiveStatus} className="border border-[var(--border-default)] rounded px-2 py-1 text-xs">
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="text-xs text-[var(--color-info-500)] underline">
                      저장
                    </button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
