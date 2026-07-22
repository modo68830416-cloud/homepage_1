import { requireSection } from "@/lib/admin/require-section";
import { ROLE_LABELS } from "@/lib/admin/roles";

const MOCK_STAFF = [
  { name: "김민준", email: "minjun@example.com", role: "SUPER_ADMIN" as const },
  { name: "이서연", email: "seoyeon@example.com", role: "OPS_ADMIN" as const },
  { name: "박도윤", email: "doyun@example.com", role: "CONTENT_WRITER" as const },
  { name: "최지우 (검수의)", email: "jiwoo.md@example.com", role: "CONTENT_REVIEWER" as const },
  { name: "정하은", email: "haeun@example.com", role: "PRODUCT_MANAGER" as const },
  { name: "강서준", email: "seojun@example.com", role: "ORDER_MANAGER" as const },
  { name: "윤아린", email: "arin@example.com", role: "SUPPORT" as const },
  { name: "케어텍 공식스토어", email: "seller@caretech.example.com", role: "SELLER" as const },
  { name: "오지훈", email: "jihoon@example.com", role: "ANALYST" as const },
];

/** Staff/role directory — member (customer) accounts are a separate concern not modeled in this scaffold. */
export default async function AdminUsersPage() {
  const access = await requireSection("users");
  if (!access.allowed) return <p>접근 권한이 없습니다.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">회원(운영진) 관리</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">목업 데이터 — 실제 회원 데이터베이스는 연결되어 있지 않습니다.</p>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b border-[var(--border-default)]">
            <th className="py-2">이름</th>
            <th className="py-2">이메일</th>
            <th className="py-2">역할</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_STAFF.map((staff) => (
            <tr key={staff.email} className="border-b border-[var(--border-default)]">
              <td className="py-2 pr-4">{staff.name}</td>
              <td className="py-2 pr-4 text-[var(--text-secondary)]">{staff.email}</td>
              <td className="py-2">{ROLE_LABELS[staff.role]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
