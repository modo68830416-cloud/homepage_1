# TASK-009C — Creator Analytics & AI Business Insights

> 선행: TASK-009A, TASK-009B 완료

---

# 1. 목표

단순 숫자 나열이 아니라 크리에이터가 다음 콘텐츠와 판매 전략을 결정할 수 있는 분석 화면을 구축한다.

---

# 2. 라우트

```text
/creator/analytics
```

---

# 3. 주요 분석

## 콘텐츠 성과

- 조회수
- 시청 완료율 DEMO
- 링크 클릭률
- 장바구니 전환율
- 구매 전환율
- 인정 매출
- 예상 수익

## 채널별 성과

- YouTube
- Shorts
- Blog
- Instagram
- TikTok
- Direct Link

## 상품별 성과

- 클릭
- 구매
- 인정 매출
- 반품률
- 콘텐츠 수

## Look별 성과

- 가장 많이 본 Look
- 전환이 높은 Look
- 수익이 높은 Look

---

# 4. 기간 필터

- 오늘
- 최근 7일
- 최근 30일
- 이번 달
- 지난달
- 사용자 지정 DEMO

---

# 5. AI Insight Cards

최소 5개:

```text
이번 주에는 9:16 쇼츠의 구매 전환율이 가장 높았습니다.

가방이 포함된 Look이 평균보다 24% 높은 클릭률을 보였습니다.

30대 출근룩 콘텐츠의 판매 성과가 상승 중입니다.

조회수는 높지만 구매 전환이 낮은 콘텐츠가 3개 있습니다.

다음 콘텐츠 추천: 여름 미니멀 출근룩 쇼츠
```

모두 `AI DEMO INSIGHT` 표시.

---

# 6. Opportunity Radar

TASK-004 Trend Radar 데이터를 연결한다.

추천:

- 인기 상승 상품
- 콘텐츠 경쟁이 낮은 상품
- 높은 수수료 DEMO 상품
- 기존 팔로워 관심사와 맞는 상품
- 재고가 안정적인 상품 DEMO

CTA:

- 이 상품으로 Look 만들기
- 이 상품으로 쇼츠 만들기
- 캠페인 확인

---

# 7. Funnel

```text
콘텐츠 조회
→ 링크 클릭
→ 장바구니
→ 결제 시작
→ 인정 주문
```

각 단계:

- 수치
- 이전 단계 대비 전환율
- 이탈률
- DEMO 표시

---

# 8. 차트

권장:

- 매출 추이 line chart
- 채널 성과 bar chart
- 전환 funnel
- 콘텐츠별 table

차트 라이브러리가 없다면 가벼운 라이브러리를 선택하거나 CSS/SVG로 구현한다.

금지:

- 무거운 대시보드 라이브러리
- 접근성 없는 canvas-only 차트
- 수치 설명 없는 그래프

---

# 9. 데이터 구조

```ts
export type CreatorAnalyticsPoint = {
  date: string;
  views: number;
  clicks: number;
  addToCarts: number;
  orders: number;
  revenue: number;
  earnings: number;
};

export type CreatorInsight = {
  id: string;
  type: "growth" | "warning" | "opportunity" | "recommendation";
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  confidence: "low" | "medium" | "high";
  isDemo: boolean;
};
```

---

# 10. 분석 정확성 안내

화면 문구:

```text
현재 분석은 DEMO 데이터 기반입니다.
실제 서비스에서는 확정 주문, 취소·반품, 채널 추적 정책을 반영합니다.
```

조회수와 판매의 인과관계를 확정적으로 표현하지 않는다.

---

# 11. 접근성

- 차트 데이터 표 제공
- 색상 외 구분
- screen reader 요약
- tooltip 키보드 접근
- 기간 filter label
- 모바일 차트 가로 스크롤 최소화

---

# 12. 완료 조건

- [ ] 기간 필터
- [ ] 콘텐츠·채널·상품 분석
- [ ] 전환 Funnel
- [ ] AI Insight 카드
- [ ] Opportunity Radar
- [ ] 차트와 텍스트 요약
- [ ] DEMO 표시
- [ ] 모바일 반응형
- [ ] lint, typecheck, build 통과
