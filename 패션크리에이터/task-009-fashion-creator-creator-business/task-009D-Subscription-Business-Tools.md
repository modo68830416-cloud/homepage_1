# TASK-009D — Creator Subscription & Business Tools

> 선행: TASK-009A ~ TASK-009C 완료

---

# 1. 목표

구독 크리에이터와 사업자가 생성 크레딧, 플랜 기능, 팀 사용과 비즈니스 도구를 관리할 수 있는 화면을 구축한다.

---

# 2. 라우트

```text
/creator/subscription
/creator/settings
```

---

# 3. 구독 플랜 DEMO

## Free

- 기본 모델
- 제한된 Look 저장
- 워터마크
- 월 소량 생성 크레딧
- 구매 링크 체험

## Creator

- 고화질 이미지
- 쇼츠·릴스
- 워터마크 제거
- 구매 링크
- 성과 분석
- 마켓플레이스 등록

## Creator Pro

- 더 많은 생성 크레딧
- 긴 영상
- 고급 템플릿
- AI Insight
- 우선 처리 DEMO
- 고급 분석

## Business

- 상품 대량 관리
- 브랜드 캠페인
- 팀 계정
- 브랜드 전용 모델
- API 연동 준비
- 고급 리포트

가격은 확정 정책처럼 표시하지 않는다.

예시 DEMO:

```text
Creator: 월 29,000원
Creator Pro: 월 79,000원
Business: 별도 문의
```

모든 가격에 `예시 플랜` 표시.

---

# 4. Credit System

표시:

- 월 제공 크레딧
- 사용 크레딧
- 남은 크레딧
- 갱신 예정일
- 최근 사용 내역

DEMO 차감 기준 예시:

- 이미지 1장: 1 credit
- 5초 영상: 5 credits
- 15초 영상: 12 credits
- 30초 영상: 25 credits

실제 요금 정책 아님을 명시한다.

---

# 5. Usage History

컬럼:

- 날짜
- 콘텐츠
- 작업 유형
- 사용 크레딧
- 상태
- 잔여 크레딧

---

# 6. Plan Comparison

비교 항목:

- AI 모델
- 아바타
- 이미지 생성
- 영상 생성
- 최대 길이
- 워터마크
- 구매 링크
- 분석
- 마켓플레이스
- 캠페인
- 팀 계정
- 지원

---

# 7. Business Tools

## Brand Kit

- 브랜드명
- 로고 업로드 DEMO
- 브랜드 색상
- 기본 폰트
- CTA 문구
- 제휴 고지 문구

원본 로고 base64 장기 저장 금지.

## Default Export Settings

- 기본 비율
- 기본 채널
- 워터마크
- 구매 CTA
- 언어
- 해시태그

## Team DEMO

- 멤버 목록
- 역할
- 초대 UI
- owner
- admin
- editor
- viewer

실제 이메일 발송 없음.

---

# 8. Upgrade UX

업그레이드 CTA는 공격적이거나 방해적이지 않게 한다.

- 사용 제한 도달 시 명확한 설명
- 남은 크레딧 표시
- 기능 비교
- 뒤로가기 가능
- 자동 결제처럼 오해하게 하지 않음

---

# 9. Billing DEMO

표시:

- 현재 플랜
- 다음 갱신일
- 결제 수단 placeholder
- 청구 내역
- 플랜 변경
- 구독 해지

실제 카드번호를 입력받지 않는다.

실제 결제 TODO:

- 결제 Provider
- webhook
- invoice
- proration
- failed payment
- refund
- tax
- cancellation policy

---

# 10. 데이터 구조

```ts
export type SubscriptionPlan = {
  id: string;
  name: string;
  monthlyPrice?: number;
  credits: number;
  features: string[];
  isRecommended?: boolean;
  isDemo: boolean;
};

export type CreditUsage = {
  id: string;
  usedAt: string;
  contentTitle: string;
  operation: "image" | "video" | "copy" | "thumbnail";
  creditsUsed: number;
  balanceAfter: number;
  isDemo: boolean;
};
```

---

# 11. 완료 조건

- [ ] 구독 플랜 화면
- [ ] 플랜 비교
- [ ] Credit 잔액과 사용 내역
- [ ] Brand Kit DEMO
- [ ] 기본 출력 설정
- [ ] 팀 관리 DEMO
- [ ] Billing DEMO
- [ ] 실제 결제 정보 입력 없음
- [ ] 원화 형식과 예시 표시
- [ ] lint, typecheck, build 통과

---

# 12. TASK-010 연결

TASK-010에서는 크리에이터 마켓플레이스와 브랜드 캠페인 거래 흐름을 완성한다.

연결 항목:

```text
크리에이터 공개 프로필
콘텐츠 등록
콘텐츠 라이선스
브랜드 캠페인
제작 의뢰
지원·선정
시안 검수
에스크로 DEMO
거래·정산 연결
```
