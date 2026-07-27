# TASK-009B — Revenue, Earnings & Settlement Preparation

> 선행: TASK-009A 완료

---

# 1. 목표

콘텐츠를 통해 발생한 상품 판매, 콘텐츠 판매, 캠페인 제작비와 성과 보너스를 구분해 보여주고 향후 실제 정산 시스템으로 확장 가능한 구조를 만든다.

---

# 2. 라우트

```text
/creator/revenue
/creator/settlements
```

---

# 3. 수익 구분

## 상품 판매 추천 수익

- 콘텐츠 구매 링크를 통해 발생
- 취소·반품 반영
- 인정 매출 기준

## 콘텐츠 판매 수익

- 마켓플레이스 콘텐츠 판매
- 라이선스 판매
- 템플릿 판매

## 브랜드 캠페인 수익

- 고정 제작비
- 성과 보너스
- 혼합형 보상

## 기타

- 프리셋 판매
- 광고 협업
- 플랫폼 프로모션

---

# 4. Revenue Summary

표시:

- 총 발생 매출
- 인정 매출
- 취소·반품
- 플랫폼 수수료
- 예상 수익
- 확정 수익
- 정산 예정액
- 정산 완료액

예시:

```text
총 발생 매출: 14,200,000원
취소·반품: -1,120,000원
인정 매출: 13,080,000원
예상 크리에이터 수익: 1,308,000원
```

모든 값은 DEMO.

---

# 5. 정산 상태

```ts
type SettlementStatus =
  | "estimated"
  | "pending"
  | "confirmed"
  | "scheduled"
  | "paid"
  | "held"
  | "cancelled";
```

상태 UI:

- 예상
- 확인 중
- 확정
- 지급 예정
- 지급 완료
- 보류
- 취소

---

# 6. 정산 주기 DEMO

예:

```text
매월 1일~말일 실적
→ 다음 달 7일 확정
→ 다음 달 15일 지급 예정
```

실제 정책이 확정된 것처럼 표현하지 말고 `예시 정책` 표시.

---

# 7. 거래 내역

표 컬럼:

- 날짜
- 유형
- 콘텐츠
- 주문 또는 캠페인
- 발생 금액
- 차감 금액
- 인정 금액
- 수익
- 상태

필터:

- 기간
- 수익 유형
- 상태
- 콘텐츠
- 채널

검색:

- 콘텐츠명
- 주문 참조 번호
- 캠페인명

내부 ID를 사용자에게 불필요하게 노출하지 않는다.

---

# 8. Settlement Statement

정산 명세서 DEMO:

- 정산 기간
- 발생 매출
- 취소·환불
- 플랫폼 수수료
- 기타 조정
- 세전 정산액
- 지급 예정액
- 지급 상태

PDF 다운로드는 이번 Task에서 필수 아님.

최소 구현:

- 인쇄 가능한 HTML
- CSV 다운로드
- 명세서 상세 화면

---

# 9. 계좌 및 사업자 정보

초기 프로토타입에서는 폼 UI만 제공한다.

항목:

- 정산 유형
- 개인
- 개인사업자
- 법인
- 예금주
- 은행
- 계좌번호
- 사업자명
- 사업자등록번호
- 세금 관련 안내

민감정보는 localStorage에 저장하지 않는다.

입력 후:

```text
DEMO 모드에서는 실제 저장되지 않습니다.
```

실제 서비스 TODO:

- 암호화
- 마스킹
- 본인 인증
- 계좌 검증
- 세금계산서·원천징수 검토
- 개인정보 보존 정책

---

# 10. 데이터 구조

```ts
export type RevenueTransaction = {
  id: string;
  occurredAt: string;
  type: "affiliate" | "content-sale" | "campaign" | "bonus" | "adjustment";
  referenceTitle: string;
  grossAmount: number;
  refundAmount: number;
  feeAmount: number;
  recognizedAmount: number;
  creatorEarning: number;
  status: SettlementStatus;
  isDemo: boolean;
};

export type SettlementStatement = {
  id: string;
  periodStart: string;
  periodEnd: string;
  grossRevenue: number;
  refunds: number;
  fees: number;
  adjustments: number;
  settlementAmount: number;
  status: SettlementStatus;
  scheduledAt?: string;
  paidAt?: string;
  isDemo: boolean;
};
```

---

# 11. 원화 포맷

공통 helper 사용:

```ts
new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});
```

`₩1,000,000` 또는 `1,000,000원` 중 프로젝트 전체 형식에 맞춰 일관되게 사용한다.

---

# 12. 완료 조건

- [ ] 수익 요약 화면
- [ ] 거래 내역 표
- [ ] 기간·상태·유형 필터
- [ ] 정산 상태 표시
- [ ] 명세서 상세 화면
- [ ] CSV 다운로드
- [ ] 정산 정보 폼 DEMO
- [ ] 민감정보 저장 금지
- [ ] 원화 형식 적용
- [ ] lint, typecheck, build 통과
