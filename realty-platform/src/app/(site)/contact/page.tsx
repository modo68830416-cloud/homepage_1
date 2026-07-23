import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { InquiryForm } from "@/components/contact/InquiryForm";

export const metadata: Metadata = {
  title: "고객센터",
  description: "문의 접수와 자주 묻는 질문을 안내합니다.",
};

const CONTACT_METHODS = [
  { icon: Phone, label: "전화 상담", value: "1588-0000", href: "tel:1588-0000" },
  { icon: MessageCircle, label: "카카오톡 상담", value: "@프리미엄부동산", href: "https://pf.kakao.com/_premium-realty" },
  { icon: Mail, label: "이메일", value: "help@premium-realty.example", href: "mailto:help@premium-realty.example" },
  { icon: MapPin, label: "방문 상담", value: "서울 강남구 테헤란로 427, 8층", href: "/about" },
];

const FAQS = [
  {
    question: "매물 등록은 어떻게 하나요?",
    answer: "고객센터로 문의를 남겨주시면 담당 중개사가 연락드려 매물 등록 절차를 안내해드립니다.",
  },
  {
    question: "관심매물은 회원가입 없이도 저장되나요?",
    answer: "네, 브라우저에 저장되어 로그인 없이도 이용할 수 있습니다. 다만 기기를 바꾸면 초기화됩니다.",
  },
  {
    question: "상담 예약은 어떻게 진행되나요?",
    answer: "매물 상세 페이지의 방문 예약하기 버튼 또는 아래 문의 폼을 통해 신청하시면 순차적으로 연락드립니다.",
  },
];

interface ContactPageProps {
  searchParams: Promise<{ property?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { property } = await searchParams;

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-16">
      <div className="text-center">
        <h1 className="font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
          고객센터
        </h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          궁금하신 점을 남겨주시면 빠르게 도와드리겠습니다.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CONTACT_METHODS.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-4 transition hover:bg-[var(--bg-surface)]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-surface)] text-[var(--color-primary-600)]">
              <Icon size={18} />
            </span>
            <span>
              <span className="block text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
                {label}
              </span>
              <span className="block font-semibold text-[var(--text-primary)]">{value}</span>
            </span>
          </a>
        ))}
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
        <Clock size={14} />
        평일 09:00 – 18:00 (주말·공휴일 휴무)
      </p>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-serif text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
            자주 묻는 질문
          </h2>
          <div className="mt-4 space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[var(--radius-md)] border border-[var(--border-default)] p-4"
              >
                <summary className="cursor-pointer list-none font-semibold text-[var(--text-primary)] marker:content-none">
                  {faq.question}
                </summary>
                <p className="mt-2 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[length:var(--font-size-heading-2)] font-bold text-[var(--text-primary)]">
            1:1 문의하기
          </h2>
          <div className="mt-4">
            <InquiryForm propertyTitle={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
