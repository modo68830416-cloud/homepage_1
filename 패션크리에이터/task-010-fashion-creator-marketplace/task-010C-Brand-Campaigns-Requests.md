# TASK-010C — Brand Campaigns & Custom Production Requests

> 선행: TASK-010A, TASK-010B 완료

---

# 1. 목표

브랜드가 캠페인을 등록하고 크리에이터가 지원하거나, 브랜드가 특정 크리에이터에게 주문 제작을 의뢰할 수 있는 흐름을 구축한다.

---

# 2. Brand Campaign Detail

라우트:

```text
/marketplace/campaigns/[slug]
```

표시:

- 브랜드
- 캠페인 소개
- 대상 상품
- 타깃 고객
- 필요한 콘텐츠 형식
- 영상 비율·길이
- 필수 문구
- 금지 표현
- 제출 마감
- 게시 채널
- 게시 유지 기간
- 라이선스
- 제작비
- 성과 보너스
- 지원 조건

---

# 3. Campaign Application

크리에이터 입력:

- 지원 메시지
- 제안 콘셉트
- 예상 작업 기간
- 포트폴리오 선택
- 예상 Look
- 수정 가능 횟수 동의
- 사용권 동의
- 지원 제출

DEMO 제출 후 상태:

```text
submitted
reviewing
shortlisted
selected
rejected
withdrawn
```

---

# 4. Custom Production Request

라우트:

```text
/marketplace/requests/new
```

브랜드 또는 사용자 입력:

- 요청 제목
- 대상 크리에이터
- 상품
- 콘텐츠 유형
- 비율
- 길이
- 스타일
- 배경
- 필수 요소
- 금지 요소
- 납기
- 수정 횟수
- 사용권
- 예산
- 참고 자료 placeholder

---

# 5. 보상 방식

## Fixed

고정 제작비

## Performance

판매 성과 수수료

## Hybrid

기본 제작비 + 성과 수수료

예시:

```text
기본 제작비 400,000원
인정 매출의 8%
성과 보너스 최대 600,000원
```

모두 예시 금액.

---

# 6. Campaign Management DEMO

브랜드 화면:

- 캠페인 상태
- 지원자
- shortlist
- 선정
- 제출 콘텐츠
- 수정 요청
- 승인
- 성과 보기

크리에이터 화면:

- 지원 상태
- 선정 여부
- 마감일
- 제출 상태
- 수정 요청
- 승인 상태
- 예상 수익

---

# 7. 데이터 구조

```ts
export type BrandCampaign = {
  id: string;
  slug: string;
  brandName: string;
  title: string;
  description: string;
  productIds: string[];
  contentFormats: string[];
  targetAudience: string;
  deliverables: string[];
  dueAt: string;
  fixedFee?: number;
  performanceRate?: number;
  bonusMax?: number;
  compensationType: "fixed" | "performance" | "hybrid";
  status: "draft" | "open" | "reviewing" | "active" | "completed" | "cancelled";
  isDemo: boolean;
};
```

---

# 8. 완료 조건

- [ ] 캠페인 상세
- [ ] 크리에이터 지원
- [ ] 주문 제작 폼
- [ ] 고정·성과·혼합 보상
- [ ] 브랜드 관리 DEMO
- [ ] 크리에이터 진행 상태 DEMO
- [ ] 원화 및 예시 표시
- [ ] lint, typecheck, build 통과
