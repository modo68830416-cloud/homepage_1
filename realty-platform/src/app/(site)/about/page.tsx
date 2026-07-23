import type { Metadata } from "next";
import { Building2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { stats } from "@/lib/properties/mock-data";

export const metadata: Metadata = {
  title: "회사소개",
  description: "프리미엄부동산의 팀과 비전을 소개합니다.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "검증된 매물만",
    description: "현장 실사와 등기 확인을 거친 매물만 게시해 신뢰할 수 있는 정보를 제공합니다.",
  },
  {
    icon: Sparkles,
    title: "프리미엄 큐레이션",
    description: "전문가가 엄선한 매물과 AI 추천으로 조건에 맞는 최적의 선택을 돕습니다.",
  },
  {
    icon: Users,
    title: "전문 중개사 네트워크",
    description: "지역별 전문 공인중개사와 연결되어 상담부터 계약까지 원스톱으로 지원합니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[960px] px-6 py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-surface)] px-4 py-1.5 text-[length:var(--font-size-body-sm)] font-medium text-[var(--text-secondary)]">
          <Building2 size={16} />
          회사소개
        </span>
        <h1 className="mt-4 font-serif text-[length:var(--font-size-heading-1)] font-bold text-[var(--text-primary)]">
          믿을 수 있는 부동산 검색,
          <br />
          프리미엄부동산이 만듭니다
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
          검증된 매물 정보와 정교한 검색 경험으로 아파트부터 상가, 경매까지 —
          당신의 다음 거래를 가장 빠르고 안전하게 완성합니다.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-page)] p-6 shadow-[var(--shadow-sm)]"
          >
            <Icon size={24} className="text-[var(--color-primary-600)]" />
            <p className="mt-3 font-bold text-[var(--text-primary)]">{title}</p>
            <p className="mt-1.5 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 rounded-[var(--radius-lg)] bg-[var(--bg-surface)] p-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <p className="text-2xl font-extrabold text-[var(--color-primary-600)]">
              {stat.value.toLocaleString()}
              {stat.suffix}
            </p>
            <p className="mt-1 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 space-y-3 text-[length:var(--font-size-body-sm)] text-[var(--text-secondary)]">
        <p>상호명: 프리미엄부동산 주식회사 · 대표: 홍길동</p>
        <p>사업자등록번호: 123-45-67890 · 통신판매업신고: 제2026-서울강남-00000호</p>
        <p>공인중개사사무소 등록번호: 서울강남 제2026-00호</p>
        <p>주소: 서울특별시 강남구 테헤란로 427, 8층</p>
      </div>
    </div>
  );
}
