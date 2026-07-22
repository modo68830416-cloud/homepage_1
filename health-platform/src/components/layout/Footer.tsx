import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border-default)] bg-[var(--color-surface-50)]">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-semibold mb-3">고객지원</p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li><Link href="/support/faq">자주 묻는 질문</Link></li>
            <li><Link href="/support/contact">1:1 문의</Link></li>
            <li><Link href="/support/report">콘텐츠 신고/수정요청</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">정책</p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li><Link href="/support/policy">이용약관·개인정보처리방침</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">판매자</p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li><Link href="/support/contact">입점 문의</Link></li>
          </ul>
        </div>
      </div>
      <p className="text-xs text-[var(--text-secondary)] text-center pb-8">
        본 사이트의 건강정보는 의학적 진단이나 처방을 대체하지 않습니다.
      </p>
    </footer>
  );
}
