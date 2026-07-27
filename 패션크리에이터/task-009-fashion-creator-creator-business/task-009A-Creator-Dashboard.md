# TASK-009A — Creator Business Dashboard

> 프로젝트: Fashion Creator
> 선행 작업: TASK-001 ~ TASK-008 완료
> 상태: Ready
> 목적: 크리에이터가 콘텐츠, 판매, 수익, 캠페인과 구독 상태를 한 화면에서 운영할 수 있는 비즈니스 대시보드를 구축한다.

---

## Claude Code 실행 지시

```text
task-009-fashion-creator-creator-business 폴더 안의 모든 md 파일을 아래 순서대로 읽고 구현해줘.

1. task-009A-Creator-Dashboard.md
2. task-009B-Revenue-Settlement.md
3. task-009C-Analytics-AI-Insights.md
4. task-009D-Subscription-Business-Tools.md

Task-001~008에서 만든 프로젝트 구조, 디자인 시스템, 상태관리, DEMO 데이터를 먼저 분석하고 보존해줘.
기존 기능을 삭제하거나 단순화하지 말고 확장하는 방식으로 구현해줘.

실제 결제, 정산, 세금계산, 구독 결제 API는 아직 연결하지 말고,
실제 서비스로 확장 가능한 Provider 및 Repository 구조의 DEMO 모드로 구현해줘.

모든 금액은 대한민국 원화 형식으로 표시해줘.
모든 수치와 수익 데이터에는 DEMO 또는 예상 데이터 표시를 명확히 해줘.

각 문서 구현 후 lint, typecheck, build를 실행하고 오류를 모두 수정해줘.
최종 완료 보고에는 변경 파일, 실행 URL, 모바일 대응, 접근성, 성능, 남은 TODO를 정리해줘.
```

---

# 1. 목표

Fashion Creator의 구독 크리에이터와 사업자가 다음 업무를 한 곳에서 수행하게 한다.

```text
콘텐츠 관리
→ 구매 링크 성과 확인
→ 판매 매출 확인
→ 예상 수익 확인
→ 정산 상태 확인
→ 브랜드 캠페인 확인
→ AI 추천 리포트 확인
→ 구독 및 생성 크레딧 관리
```

---

# 2. 라우트

```text
/creator
/creator/content
/creator/analytics
/creator/revenue
/creator/settlements
/creator/campaigns
/creator/subscription
/creator/settings
```

초기 프로토타입에서는 `/creator` 내부 탭 또는 nested route로 구현할 수 있다.

---

# 3. Creator Dashboard 홈

## 상단 환영 영역

표시:

- 크리에이터명
- 프로필 이미지
- 현재 등급
- 구독 플랜
- 생성 크레딧
- 최근 활동
- `새 콘텐츠 만들기` CTA

## KPI 카드

최소 6개:

- 콘텐츠 조회수
- 구매 링크 클릭
- 장바구니 담기
- 인정 주문 수
- 인정 매출
- 예상 크리에이터 수익

예시:

```text
총 조회수: 128,400
링크 클릭: 8,920
인정 주문: 164건
인정 매출: 12,480,000원
예상 수익: 1,248,000원
```

모든 값은 `DEMO DATA` 표시.

---

# 4. 오늘의 운영 요약

카드:

- 오늘 성과
- 이번 주 성과
- 이번 달 성과
- 전월 대비 변화
- 가장 잘 팔린 Look
- 가장 반응이 좋은 콘텐츠

상승·하락은 색상뿐 아니라 아이콘과 텍스트로 표시한다.

---

# 5. 최근 콘텐츠

TASK-007의 ContentProject를 재사용한다.

표시:

- thumbnail
- 제목
- 플랫폼
- 상태
- 조회수
- 클릭
- 주문
- 인정 매출
- 예상 수익

액션:

- 열기
- 성과 보기
- 구매 링크 복사
- 복제
- 다시 생성

---

# 6. 빠른 작업

버튼:

- 새 쇼츠 만들기
- 저장한 Look 열기
- 인기 상품으로 콘텐츠 만들기
- 구매 링크 만들기
- 캠페인 확인
- 정산 내역 보기

각 버튼은 기존 라우트와 연결한다.

---

# 7. 크리에이터 등급

DEMO 등급:

- New Creator
- Rising Creator
- Pro Creator
- Top Creator
- Verified Creator

표시 기준:

- 콘텐츠 완료 수
- 인정 매출
- 전환율
- 납기 준수율
- 신고·분쟁 기록
- 브랜드 평가

등급 산정은 DEMO 규칙으로 분리한다.

---

# 8. Navigation

데스크톱:

- 좌측 sidebar
- 상단 global header
- content area

모바일:

- 상단 compact header
- 하단 주요 메뉴 또는 sheet menu
- KPI 카드 1~2열
- safe-area 적용

---

# 9. 데이터 구조

```ts
export type CreatorProfile = {
  id: string;
  displayName: string;
  handle: string;
  avatar: string;
  tier: "new" | "rising" | "pro" | "top" | "verified";
  subscriptionPlan: string;
  creditsRemaining: number;
  joinedAt: string;
  isDemo: boolean;
};

export type CreatorDashboardMetrics = {
  views: number;
  linkClicks: number;
  addToCarts: number;
  attributedOrders: number;
  attributedRevenue: number;
  estimatedEarnings: number;
  conversionRate: number;
  period: "today" | "week" | "month";
  isDemo: boolean;
};
```

---

# 10. 컴포넌트 권장 구조

```text
src/components/creator/
├── creator-shell.tsx
├── creator-sidebar.tsx
├── creator-mobile-nav.tsx
├── creator-header.tsx
├── metric-card.tsx
├── dashboard-summary.tsx
├── recent-content-table.tsx
├── top-look-card.tsx
├── quick-actions.tsx
├── creator-tier-card.tsx
├── credit-status-card.tsx
└── demo-data-notice.tsx
```

---

# 11. 접근성

- sidebar landmark
- active navigation aria-current
- metric 의미를 텍스트로 제공
- 표 caption
- 모바일 터치 영역 44px 이상
- focus-visible
- 그래프에 텍스트 요약
- 색상 외 증감 표시

---

# 12. 완료 조건

- [ ] `/creator` 대시보드가 완성된다.
- [ ] KPI 카드가 표시된다.
- [ ] 최근 콘텐츠가 표시된다.
- [ ] 빠른 작업이 기존 기능과 연결된다.
- [ ] 크리에이터 등급과 크레딧이 표시된다.
- [ ] 원화 형식이 적용된다.
- [ ] DEMO 표시가 명확하다.
- [ ] 데스크톱·모바일에서 정상 작동한다.
- [ ] lint, typecheck, build가 통과한다.
