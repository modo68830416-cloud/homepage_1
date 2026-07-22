import { ROLE_LABELS, type AdminRole } from "@/lib/admin/roles";
import { loginAsRole } from "./actions";

interface AdminLoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { next } = await searchParams;
  const roles = Object.keys(ROLE_LABELS) as AdminRole[];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-50)] px-6">
      <form action={loginAsRole} className="w-full max-w-sm rounded-[var(--radius-md)] border border-[var(--border-default)] bg-white p-8">
        <h1 className="text-lg font-bold mb-1">관리자 로그인 (데모)</h1>
        <p className="text-xs text-[var(--text-secondary)] mb-6">
          실제 인증은 구현되어 있지 않습니다. 역할을 선택하면 해당 권한으로 진입합니다.
        </p>

        <input type="hidden" name="next" value={next ?? "/admin"} />

        <label htmlFor="role" className="block text-sm font-medium mb-2">
          역할 선택
        </label>
        <select
          id="role"
          name="role"
          defaultValue="SUPER_ADMIN"
          className="w-full rounded border border-[var(--border-default)] px-3 py-2 mb-6 text-sm"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {ROLE_LABELS[role]}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full rounded-full bg-[var(--color-brand-600)] text-white px-6 py-3 font-semibold">
          입장하기
        </button>
      </form>
    </div>
  );
}
