"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { properties as initialProperties } from "@/lib/properties/mock-data";

type Status = "공개" | "비공개";

export function PropertyManager() {
  const [rows, setRows] = useState(() =>
    initialProperties.map((property) => ({ ...property, status: "공개" as Status })),
  );
  const [dealFilter, setDealFilter] = useState<"all" | Status>("all");

  const filtered = useMemo(
    () => (dealFilter === "all" ? rows : rows.filter((row) => row.status === dealFilter)),
    [rows, dealFilter],
  );

  function toggleStatus(id: string) {
    setRows((current) =>
      current.map((row) =>
        row.id === id ? { ...row, status: row.status === "공개" ? "비공개" : "공개" } : row,
      ),
    );
  }

  function remove(id: string) {
    setRows((current) => current.filter((row) => row.id !== id));
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
            매물관리
          </h1>
          <p className="mt-1.5 text-[var(--text-secondary)]">
            총 {rows.length}건 · 공개 {rows.filter((r) => r.status === "공개").length}건 · 비공개{" "}
            {rows.filter((r) => r.status === "비공개").length}건
          </p>
        </div>

        <div className="flex gap-2">
          {(["all", "공개", "비공개"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setDealFilter(option)}
              className={`rounded-full px-3.5 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
                dealFilter === option
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
              <th className="px-4 py-3 font-medium">매물명</th>
              <th className="px-4 py-3 font-medium">거래유형</th>
              <th className="px-4 py-3 font-medium">지역</th>
              <th className="px-4 py-3 font-medium">가격</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-[var(--border-default)] last:border-0">
                <td className="max-w-[220px] truncate px-4 py-3 font-medium text-[var(--text-primary)]">
                  {row.title}
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{row.dealType}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  {row.city} {row.district}
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{row.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[length:var(--font-size-body-sm)] font-semibold ${
                      row.status === "공개"
                        ? "bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)]"
                        : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleStatus(row.id)}
                      aria-label={row.status === "공개" ? "비공개로 전환" : "공개로 전환"}
                      className="rounded-full p-1.5 text-[var(--text-secondary)] transition hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
                    >
                      {row.status === "공개" ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(row.id)}
                      aria-label="매물 삭제"
                      className="rounded-full p-1.5 text-[var(--color-accent-red)] transition hover:bg-[var(--color-accent-red)]/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-[var(--text-secondary)]">해당 조건의 매물이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
