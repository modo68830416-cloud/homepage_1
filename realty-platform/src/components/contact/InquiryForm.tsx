"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { useInquiries } from "@/lib/use-inquiries";

export function InquiryForm({ propertyTitle }: { propertyTitle?: string }) {
  const { addInquiry } = useInquiries();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    addInquiry({ name, phone, message, propertyTitle });
    setName("");
    setPhone("");
    setMessage("");
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-6 shadow-[var(--shadow-sm)]"
    >
      {propertyTitle && (
        <p className="rounded-[var(--radius-md)] bg-[var(--bg-surface)] px-3 py-2 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
          관련 매물: <span className="font-semibold text-[var(--text-primary)]">{propertyTitle}</span>
        </p>
      )}

      <div>
        <label htmlFor="inquiry-name" className="text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-primary)]">
          이름
        </label>
        <input
          id="inquiry-name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
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
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
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
          value={message}
          onChange={(event) => setMessage(event.target.value)}
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
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--color-accent-emerald)]" />
          문의가 접수되었습니다. 담당자가 확인 후 연락드립니다.
        </p>
      )}
    </form>
  );
}
