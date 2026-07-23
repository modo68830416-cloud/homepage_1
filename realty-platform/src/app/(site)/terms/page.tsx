import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description: "프리미엄부동산 서비스 이용약관입니다.",
};

const SECTIONS = [
  {
    title: "제1조 (목적)",
    body: "본 약관은 프리미엄부동산(이하 '회사')이 제공하는 부동산 정보 서비스의 이용 조건 및 절차, 회사와 회원 간의 권리·의무를 규정함을 목적으로 합니다.",
  },
  {
    title: "제2조 (회원가입)",
    body: "회원가입은 이용자가 약관에 동의하고 회사가 정한 가입 양식을 작성하여 신청하며, 회사가 이를 승낙함으로써 성립합니다.",
  },
  {
    title: "제3조 (서비스의 제공)",
    body: "회사는 매물 검색, 지역 정보, 관심매물 관리, 상담 신청 등의 서비스를 제공하며, 운영상 필요에 따라 내용을 변경할 수 있습니다.",
  },
  {
    title: "제4조 (회원의 의무)",
    body: "회원은 허위 정보를 등록하거나 타인의 정보를 도용해서는 안 되며, 관계 법령과 본 약관을 준수해야 합니다.",
  },
  {
    title: "제5조 (면책조항)",
    body: "회사는 매물 정보의 정확성을 위해 노력하나, 등록된 정보의 최종 확인 책임은 이용자 및 거래 당사자에게 있습니다.",
  },
  {
    title: "제6조 (분쟁 해결)",
    body: "서비스 이용과 관련하여 분쟁이 발생한 경우 회사와 회원은 성실히 협의하며, 협의가 되지 않을 경우 관할 법원에 소를 제기할 수 있습니다.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      <h1 className="text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
        이용약관
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
