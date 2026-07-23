import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "프리미엄부동산 개인정보처리방침입니다.",
};

const SECTIONS = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: "회원가입 시 이름, 이메일, 비밀번호, 휴대폰 번호를 수집하며, 매물 문의 시 연락처와 문의 내용을 추가로 수집합니다.",
  },
  {
    title: "2. 개인정보의 수집 및 이용 목적",
    body: "회원 관리, 매물 상담 및 예약 처리, 서비스 이용 통계 분석, 신규 서비스 안내를 위해 이용합니다.",
  },
  {
    title: "3. 개인정보의 보유 및 이용 기간",
    body: "회원 탈퇴 시 지체 없이 파기하며, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 별도 보관합니다.",
  },
  {
    title: "4. 개인정보의 제3자 제공",
    body: "이용자의 동의가 있거나 법령에 특별한 규정이 있는 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다.",
  },
  {
    title: "5. 이용자의 권리",
    body: "이용자는 언제든지 자신의 개인정보를 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다.",
  },
  {
    title: "6. 개인정보 보호책임자",
    body: "개인정보 보호책임자: 프리미엄부동산 개인정보보호팀 · 이메일: privacy@premium-realty.example",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        개인정보처리방침
      </h1>
      <p className="mt-3 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
        시행일: 2026년 1월 1일 (본 페이지는 데모용 샘플 텍스트입니다)
      </p>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="font-bold text-[var(--text-primary)]">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
