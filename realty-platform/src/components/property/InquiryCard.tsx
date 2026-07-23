import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck, HelpCircle, UserRound } from "lucide-react";

export function InquiryCard() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-6 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--color-primary-600)]">
          <UserRound size={22} />
        </span>
        <div>
          <p className="font-bold text-[var(--text-primary)]">김민준 공인중개사</p>
          <p className="text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
            프리미엄부동산 강남지점
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <a
          href="tel:1588-0000"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-primary-600)] px-4 py-2.5 text-[length:var(--font-size-body-sm)] font-semibold text-white transition hover:opacity-90"
        >
          <Phone size={16} />
          전화하기
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#fee500] px-4 py-2.5 text-[length:var(--font-size-body-sm)] font-semibold text-[#191919] transition hover:opacity-90"
        >
          <MessageCircle size={16} />
          카카오톡
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--border-default)] px-4 py-2.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface)]"
        >
          <CalendarCheck size={16} />
          상담예약
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--border-default)] px-4 py-2.5 text-[length:var(--font-size-body-sm)] font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-surface)]"
        >
          <HelpCircle size={16} />
          문의하기
        </Link>
      </div>
    </div>
  );
}
