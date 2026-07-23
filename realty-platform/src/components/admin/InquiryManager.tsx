"use client";

import { Fragment, useMemo, useState } from "react";
import { NotebookPen, Trash2 } from "lucide-react";
import { staffMembers } from "@/lib/properties/mock-data";
import { useInquiries } from "@/lib/use-inquiries";
import type { InquiryStatus } from "@/types/property";

const STATUS_OPTIONS: InquiryStatus[] = ["접수", "진행", "완료", "취소"];

const STATUS_STYLE: Record<InquiryStatus, string> = {
  접수: "bg-[var(--color-primary-600)]/10 text-[var(--color-primary-600)]",
  진행: "bg-[var(--color-accent-amber)]/10 text-[var(--color-accent-amber)]",
  완료: "bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)]",
  취소: "bg-[var(--bg-surface)] text-[var(--text-secondary)]",
};

function formatDate(iso: string) {
  return iso.slice(0, 16).replace("T", " ");
}

export function InquiryManager() {
  const { inquiries, updateInquiry, removeInquiry } = useInquiries();
  const [statusFilter, setStatusFilter] = useState<"all" | InquiryStatus>("all");
  const [openMemoId, setOpenMemoId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      [...inquiries]
        .filter((item) => statusFilter === "all" || item.status === statusFilter)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
    [inquiries, statusFilter],
  );

  const countByStatus = (status: InquiryStatus) => inquiries.filter((i) => i.status === status).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
            문의관리
          </h1>
          <p className="mt-1.5 text-[var(--text-secondary)]">
            총 {inquiries.length}건 · 접수 {countByStatus("접수")}건 · 진행 {countByStatus("진행")}건 · 완료{" "}
            {countByStatus("완료")}건
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["all", ...STATUS_OPTIONS] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatusFilter(option)}
              className={`rounded-full px-3.5 py-1.5 text-[length:var(--font-size-body-sm)] font-semibold transition ${
                statusFilter === option
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
        <table className="w-full min-w-[860px] text-left text-[length:var(--font-size-body-sm)]">
          <thead className="border-b border-[var(--border-default)] text-[var(--text-secondary)]">
            <tr>
              <th className="px-4 py-3 font-medium">문의자</th>
              <th className="px-4 py-3 font-medium">매물</th>
              <th className="px-4 py-3 font-medium">문의내용</th>
              <th className="px-4 py-3 font-medium">접수일</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">담당자</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <Fragment key={item.id}>
                <tr className="border-b border-[var(--border-default)] last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
                    <p className="text-[var(--text-secondary)]">{item.phone}</p>
                  </td>
                  <td className="max-w-[160px] truncate px-4 py-3 text-[var(--text-secondary)]">
                    {item.propertyTitle ?? "일반 문의"}
                  </td>
                  <td className="max-w-[240px] truncate px-4 py-3 text-[var(--text-primary)]" title={item.message}>
                    {item.message}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={item.status}
                      onChange={(event) =>
                        updateInquiry(item.id, { status: event.target.value as InquiryStatus })
                      }
                      className={`rounded-full border-0 px-2.5 py-1 text-[length:var(--font-size-body-sm)] font-semibold outline-none ${STATUS_STYLE[item.status]}`}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={item.assignee ?? ""}
                      onChange={(event) => updateInquiry(item.id, { assignee: event.target.value })}
                      className="rounded-[var(--radius-sm)] border border-[var(--border-default)] px-2 py-1.5 text-[var(--text-primary)]"
                    >
                      <option value="">미배정</option>
                      {staffMembers.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setOpenMemoId((current) => (current === item.id ? null : item.id))}
                        aria-label="메모 열기"
                        className={`rounded-full p-1.5 transition hover:bg-[var(--bg-surface)] ${
                          item.memo ? "text-[var(--color-primary-600)]" : "text-[var(--text-secondary)]"
                        }`}
                      >
                        <NotebookPen size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeInquiry(item.id)}
                        aria-label="문의 삭제"
                        className="rounded-full p-1.5 text-[var(--color-accent-red)] transition hover:bg-[var(--color-accent-red)]/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {openMemoId === item.id && (
                  <tr className="border-b border-[var(--border-default)] bg-[var(--bg-surface)] last:border-0">
                    <td colSpan={7} className="px-4 py-3">
                      <label className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-secondary)]">
                        내부 메모
                      </label>
                      <textarea
                        defaultValue={item.memo ?? ""}
                        onBlur={(event) => updateInquiry(item.id, { memo: event.target.value })}
                        rows={2}
                        placeholder="상담 진행 상황을 기록하세요"
                        className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--bg-page)] px-3 py-2 text-[var(--text-primary)] outline-none focus:border-[var(--color-primary-600)]"
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-[var(--text-secondary)]">해당 조건의 문의가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
