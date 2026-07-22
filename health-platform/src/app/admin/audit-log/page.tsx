import { requireSection } from "@/lib/admin/require-section";
import { ROLE_LABELS } from "@/lib/admin/roles";
import { getAuditLog } from "@/lib/admin/audit";

export default async function AuditLogPage() {
  const access = await requireSection("audit-log");
  if (!access.allowed) return <p>접근 권한이 없습니다.</p>;

  const entries = getAuditLog();

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">감사 로그</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        로그인 및 콘텐츠 상태 변경 등 중요 변경 이력 (TASK-008 §7 완료조건)
      </p>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b border-[var(--border-default)]">
            <th className="py-2">역할</th>
            <th className="py-2">동작</th>
            <th className="py-2">대상</th>
            <th className="py-2">일시</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-[var(--text-secondary)]">
                기록된 감사 로그가 없습니다.
              </td>
            </tr>
          )}
          {entries.map((entry) => (
            <tr key={entry.id} className="border-b border-[var(--border-default)]">
              <td className="py-2 pr-4">{ROLE_LABELS[entry.actorRole]}</td>
              <td className="py-2 pr-4">{entry.action}</td>
              <td className="py-2 pr-4">{entry.target}</td>
              <td className="py-2 text-xs text-[var(--text-secondary)]">
                {new Date(entry.timestamp).toLocaleString("ko-KR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
