import { requireSection } from "@/lib/admin/require-section";
import { getAskLogs, getFailedSearches, getSearchLogs } from "@/lib/search/log";

/**
 * Reads the in-memory logs written by src/lib/search/log.ts (TASK-006 §5).
 * Scoped to this server process's lifetime — a production deployment
 * persists these to a queryable store instead.
 */
export default async function SearchAnalyticsPage() {
  const access = await requireSection("search-analytics");
  if (!access.allowed) return <p>접근 권한이 없습니다.</p>;

  const logs = getSearchLogs();
  const failed = getFailedSearches();
  const askLogs = getAskLogs();

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">검색 분석</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">전체 검색 {logs.length}건 · 실패 {failed.length}건 · AI 질문 {askLogs.length}건</p>

      <section className="mb-8">
        <h2 className="font-semibold text-sm mb-2">검색 결과 없음 (콘텐츠/상품 갭 후보)</h2>
        <table className="w-full text-sm border-collapse">
          <tbody>
            {failed.length === 0 && (
              <tr>
                <td className="py-2 text-[var(--text-secondary)]">실패한 검색이 없습니다.</td>
              </tr>
            )}
            {failed.map((log, i) => (
              <tr key={i} className="border-b border-[var(--border-default)]">
                <td className="py-2 pr-4">{log.query}</td>
                <td className="py-2 text-xs text-[var(--text-secondary)]">
                  {new Date(log.timestamp).toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-sm mb-2">전체 검색 로그</h2>
        <table className="w-full text-sm border-collapse">
          <tbody>
            {logs.slice(-30).reverse().map((log, i) => (
              <tr key={i} className="border-b border-[var(--border-default)]">
                <td className="py-2 pr-4">{log.query || "(빈 검색어)"}</td>
                <td className="py-2 pr-4">결과 {log.resultCount}건</td>
                <td className="py-2 text-xs text-[var(--text-secondary)]">
                  {new Date(log.timestamp).toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="font-semibold text-sm mb-2">AI 질문 로그 (응급 신호 표시)</h2>
        <table className="w-full text-sm border-collapse">
          <tbody>
            {askLogs.map((log, i) => (
              <tr key={i} className="border-b border-[var(--border-default)]">
                <td className="py-2 pr-4">{log.question}</td>
                <td className="py-2 pr-4">
                  {log.isEmergency && <span className="text-[var(--color-danger-500)] font-semibold">응급 신호</span>}
                </td>
                <td className="py-2 text-xs text-[var(--text-secondary)]">
                  {new Date(log.timestamp).toLocaleString("ko-KR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
