"use client";

import { useState } from "react";
import { Info, Send } from "lucide-react";

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-6 shadow-[var(--shadow-sm)]"
    >
      <div>
        <label htmlFor="inquiry-name" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
          이름
        </label>
        <input
          id="inquiry-name"
          type="text"
          required
          placeholder="홍길동"
          className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-2.5 outline-none focus:border-[var(--color-primary-600)]"
        />
      </div>

      <div>
        <label htmlFor="inquiry-contact" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
          연락처
        </label>
        <input
          id="inquiry-contact"
          type="tel"
          required
          placeholder="010-0000-0000"
          className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-2.5 outline-none focus:border-[var(--color-primary-600)]"
        />
      </div>

      <div>
        <label htmlFor="inquiry-message" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
          문의 내용
        </label>
        <textarea
          id="inquiry-message"
          required
          rows={4}
          placeholder="궁금하신 내용을 남겨주시면 담당 중개사가 확인 후 연락드립니다."
          className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--border-default)] px-4 py-2.5 outline-none focus:border-[var(--color-primary-600)]"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary-900)] py-3 font-semibold text-white transition hover:opacity-90"
      >
        <Send size={16} />
        문의 보내기
      </button>

      {submitted && (
        <p className="flex items-start gap-1.5 rounded-[var(--radius-md)] bg-[var(--bg-surface)] px-3 py-2.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
          <Info size={16} className="mt-0.5 shrink-0" />
          문의가 접수되었습니다 (데모 환경 — 실제로 전송되지는 않습니다).
        </p>
      )}
    </form>
  );
}
