"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { members as initialMembers } from "@/lib/properties/mock-data";
import type { MemberRole, MemberStatus } from "@/types/property";

const ROLE_OPTIONS: MemberRole[] = ["USER", "AGENT", "ADMIN"];

const ROLE_STYLE: Record<MemberRole, string> = {
  USER: "bg-[var(--bg-surface)] text-[var(--text-secondary)]",
  AGENT: "bg-[var(--color-primary-600)]/10 text-[var(--color-primary-600)]",
  ADMIN: "bg-[var(--color-accent-red)]/10 text-[var(--color-accent-red)]",
};

function formatDate(iso: string) {
  return iso.slice(0, 16).replace("T", " ");
}

export function MemberManager() {
  const [rows, setRows] = useState(initialMembers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | MemberRole>("all");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (roleFilter !== "all" && row.role !== roleFilter) return false;
      if (keyword && !`${row.name} ${row.email}`.toLowerCase().includes(keyword)) return false;
      return true;
    });
  }, [rows, query, roleFilter]);

  function updateRole(id: string, role: MemberRole) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, role } : row)));
  }

  function toggleStatus(id: string) {
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        const status: MemberStatus = row.status === "활성" ? "비활성" : "활성";
        return { ...row, status };
      }),
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
            회원관리
          </h1>
          <p className="mt-1.5 text-[var(--text-secondary)]">
            총 {rows.length}명 · 활성 {rows.filter((r) => r.status === "활성").length}명
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="이름, 이메일 검색"
              aria-label="회원 검색"
              className="rounded-full border border-[var(--border-default)] py-1.5 pl-8 pr-3 text-[length:var(--font-size-body-sm)] text-[var(--text-primary)] outline-none focus:border-[var(--color-primary-600)]"
            />
          </div>
          {(["all", ...ROLE_OPTIONS] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRoleFilter(option)}
              className={`rounded-full px-3.5 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
                roleFilter === option
                  ? "bg-[var(--color-primary-900)] text-white"
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {option === "all" ? "전체" : option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)]">
        <table className="w-full min-w-[720px] text-left text-[length:var(--font-size-body-sm)]">
          <thead className="border-b border-[var(--border-default)] text-[var(--text-secondary)]">
            <tr>
              <th className="px-4 py-3 font-medium">이름</th>
              <th className="px-4 py-3 font-medium">이메일</th>
              <th className="px-4 py-3 font-medium">가입일</th>
              <th className="px-4 py-3 font-medium">최근 로그인</th>
              <th className="px-4 py-3 font-medium">권한</th>
              <th className="px-4 py-3 font-medium">상태</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-[var(--border-default)] last:border-0">
                <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.name}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{row.email}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{row.joinedAt}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{formatDate(row.lastLoginAt)}</td>
                <td className="px-4 py-3">
                  <select
                    value={row.role}
                    onChange={(event) => updateRole(row.id, event.target.value as MemberRole)}
                    className={`rounded-full border-0 px-2.5 py-1 text-[length:var(--font-size-body-sm)] font-semibold outline-none ${ROLE_STYLE[row.role]}`}
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggleStatus(row.id)}
                    aria-pressed={row.status === "활성"}
                    className={`rounded-full px-2.5 py-1 text-[length:var(--font-size-body-sm)] font-semibold transition ${
                      row.status === "활성"
                        ? "bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)]"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {row.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-[var(--text-secondary)]">해당 조건의 회원이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
