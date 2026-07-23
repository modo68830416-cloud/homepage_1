import Link from "next/link";
import { Phone, MessageCircle, CalendarCheck, HelpCircle } from "lucide-react";

const ACTIONS = [
  { label: "전화상담", href: "tel:1588-0000", icon: Phone },
  { label: "카카오톡 상담", href: "/contact", icon: MessageCircle },
  { label: "방문 예약하기", href: "/contact", icon: CalendarCheck },
  { label: "문의하기", href: "/contact", icon: HelpCircle },
];

export function CTASection() {
  return (
    <section
      data-theme="dark"
      className="mx-6 mb-20 rounded-[var(--radius-2xl)] px-6 py-16 text-center sm:mb-24"
      style={{
        background:
          "radial-gradient(120% 120% at 50% 0%, var(--color-primary-600), var(--color-primary-900) 70%)",
      }}
    >
      <h2 className="text-[length:var(--font-size-heading-1)] font-bold text-white">
        지금 바로 전문 상담을 받아보세요
      </h2>
      <p className="mt-3 text-white/75">
        원하는 매물, 조건에 맞는 전문 중개사가 직접 도와드립니다
      </p>

      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        {ACTIONS.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-white/20 bg-white/10 px-4 py-5 text-white transition hover:bg-white/20"
          >
            <Icon size={22} />
            <span className="text-[length:var(--font-size-body-sm)] font-medium">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
