import Link from "next/link";
import { requireSection } from "@/lib/admin/require-section";
import { ROLE_LABELS } from "@/lib/admin/roles";
import { articles } from "@/lib/content/data";
import { getEffectiveArticleStatus } from "@/lib/admin/content-overrides";
import { products } from "@/lib/products/data";
import { getSearchLogs, getFailedSearches } from "@/lib/search/log";
import { getAuditLog } from "@/lib/admin/audit";

export default async function AdminDashboardPage() {
  const access = await requireSection("dashboard");
  if (!access.allowed) return <p>접근 권한이 없습니다.</p>;

  const statusCounts = articles.reduce<Record<string, number>>((acc, article) => {
    const status = getEffectiveArticleStatus(article);
    acc[status] = (acc[status] ?? 0) + 1;
    return acc;
  }, {});

  const searchLogs = getSearchLogs();
  const failedSearches = getFailedSearches();
  const auditEntries = getAuditLog();

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">대시보드</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">{ROLE_LABELS[access.role]}로 로그인됨</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="전체 콘텐츠" value={articles.length} />
        <StatCard label="공개됨" value={statusCounts.PUBLISHED ?? 0} />
        <StatCard label="전체 상품" value={products.length} />
        <StatCard label="검색 실패 키워드" value={failedSearches.length} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <section className="border border-[var(--border-default)] rounded p-4">
          <h2 className="font-semibold mb-3 text-sm">콘텐츠 상태 분포</h2>
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(statusCounts).map(([status, count]) => (
                <tr key={status} className="border-t border-[var(--border-default)]">
                  <td className="py-1">{status}</td>
                  <td className="py-1 text-right">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/admin/content" className="text-xs text-[var(--color-info-500)] underline mt-3 inline-block">
            콘텐츠 관리로 이동
          </Link>
        </section>

        <section className="border border-[var(--border-default)] rounded p-4">
          <h2 className="font-semibold mb-3 text-sm">최근 검색 로그 ({searchLogs.length}건)</h2>
          <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
            {searchLogs.slice(-8).reverse().map((log, i) => (
              <li key={i} className="flex justify-between border-t border-[var(--border-default)] pt-1">
                <span>{log.query || "(빈 검색어)"}</span>
                <span className={log.resultCount === 0 ? "text-[var(--color-danger-500)]" : "text-[var(--text-secondary)]"}>
                  결과 {log.resultCount}건
                </span>
              </li>
            ))}
          </ul>
          <Link href="/admin/search-analytics" className="text-xs text-[var(--color-info-500)] underline mt-3 inline-block">
            검색 분석으로 이동
          </Link>
        </section>
      </div>

      <section className="border border-[var(--border-default)] rounded p-4 mt-6">
        <h2 className="font-semibold mb-3 text-sm">최근 감사 로그 ({auditEntries.length}건)</h2>
        <ul className="text-sm space-y-1">
          {auditEntries.slice(0, 5).map((entry) => (
            <li key={entry.id} className="flex justify-between border-t border-[var(--border-default)] pt-1">
              <span>
                {entry.action} · {entry.target}
              </span>
              <span className="text-[var(--text-secondary)]">{new Date(entry.timestamp).toLocaleString("ko-KR")}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-[var(--border-default)] rounded p-4">
      <p className="text-xs text-[var(--text-secondary)] mb-1">{label}</p>
      <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>
        {value}
      </p>
    </div>
  );
}
