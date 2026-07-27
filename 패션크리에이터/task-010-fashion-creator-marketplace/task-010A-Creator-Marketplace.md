# TASK-010A — Creator Marketplace Foundation

> 프로젝트: Fashion Creator
> 선행 작업: TASK-001 ~ TASK-009 완료
> 상태: Ready
> 목적: 크리에이터의 콘텐츠·코디·제작 역량을 브랜드 및 일반 사용자가 탐색하고 거래할 수 있는 마켓플레이스 기반을 구축한다.

---

## Claude Code 실행 지시

```text
task-010-fashion-creator-marketplace 폴더의 모든 md 파일을 README.md에 적힌 순서대로 읽고 구현해줘.

Task-001~009에서 만든 구조, 디자인 시스템, 상태관리, DEMO 데이터를 먼저 분석하고 보존해줘.
기존 기능을 삭제하거나 단순화하지 말고 확장하는 방식으로 구현해줘.

실제 결제, 에스크로, 계약, 전자서명, 세금, 정산 API는 아직 연결하지 말고
Provider 및 Repository 패턴을 적용한 DEMO 모드로 구현해줘.

모든 금액은 대한민국 원화로 표시하고,
모든 거래·수익·성과 수치는 DEMO 또는 예시 데이터임을 명확히 표시해줘.

각 문서 완료 후 lint, typecheck, build를 실행하고 오류를 모두 수정해줘.
```

---

# 1. 목표

Fashion Creator 사용자가 다음 활동을 할 수 있게 한다.

```text
크리에이터 프로필 탐색
→ 공개 콘텐츠·Look 확인
→ 착용 상품 구매
→ 콘텐츠 사용권 구매
→ 주문 제작 의뢰
→ 브랜드 캠페인 지원
→ 시안 검수
→ 거래 완료
→ 수익·정산 시스템 연결
```

---

# 2. 라우트

```text
/marketplace
/marketplace/creators
/marketplace/creators/[handle]
/marketplace/content
/marketplace/content/[slug]
/marketplace/campaigns
/marketplace/campaigns/[slug]
/marketplace/requests/new
```

---

# 3. Marketplace 홈

## Hero

문구:

```text
Where Fashion Creators
Meet Brands.
```

한국어 보조 문구:

```text
AI 패션 콘텐츠를 발견하고,
크리에이터와 협업하며,
판매 가능한 콘텐츠를 확보하세요.
```

CTA:

- 크리에이터 찾기
- 콘텐츠 둘러보기
- 캠페인 등록하기
- 크리에이터로 참여하기

## 주요 섹션

- Featured Creators
- Trending Content
- Open Brand Campaigns
- High-Converting Looks
- New Marketplace Assets
- How It Works

모든 성과 수치에 DEMO 표시.

---

# 4. 검색과 필터

## 크리에이터 필터

- 전문 카테고리
- 콘텐츠 형식
- 타깃 연령
- 스타일
- 평균 제작비
- 작업 가능 상태
- 브랜드 협업 경험
- 판매 전환 성과 DEMO
- 등급

## 콘텐츠 필터

- 이미지
- 쇼츠
- 릴스
- 유튜브
- 블로그 패키지
- 코디 템플릿
- 썸네일
- 광고 소재

## 캠페인 필터

- 카테고리
- 콘텐츠 형식
- 예산
- 마감일
- 고정 제작비
- 성과형
- 혼합형

---

# 5. Creator Card

표시:

- 프로필 이미지
- 크리에이터명
- handle
- 인증 배지
- 전문 분야
- 대표 콘텐츠
- 완료 프로젝트 수
- 브랜드 평가 DEMO
- 인정 매출 DEMO
- 평균 응답 시간 DEMO
- 작업 가능 상태

CTA:

- 프로필 보기
- 제작 문의
- 팔로우 DEMO

---

# 6. Content Card

표시:

- thumbnail
- 콘텐츠 제목
- 크리에이터
- 콘텐츠 유형
- 사용 라이선스 시작 가격
- 착용 상품
- 조회수 DEMO
- 인정 매출 DEMO
- 태그
- DEMO 표시

CTA:

- 콘텐츠 보기
- 사용권 확인
- 상품 구매
- 비슷한 콘텐츠

---

# 7. Campaign Card

표시:

- 브랜드명
- 캠페인명
- 상품 카테고리
- 콘텐츠 형식
- 제작 예산
- 성과 보너스
- 마감일
- 지원자 수 DEMO
- 상태

원화 예시:

```text
기본 제작비 300,000원
성과 보너스 최대 500,000원
```

반드시 `예시 예산` 표시.

---

# 8. 데이터 구조

```ts
export type MarketplaceCreator = {
  id: string;
  handle: string;
  displayName: string;
  avatar: string;
  bio: string;
  specialties: string[];
  contentFormats: string[];
  tier: string;
  rating: number;
  completedProjects: number;
  attributedRevenue: number;
  responseTimeLabel: string;
  availability: "available" | "limited" | "unavailable";
  isVerified: boolean;
  isDemo: boolean;
};

export type MarketplaceContent = {
  id: string;
  slug: string;
  creatorId: string;
  title: string;
  thumbnail: string;
  type: string;
  licensePriceFrom: number;
  productIds: string[];
  views: number;
  attributedRevenue: number;
  tags: string[];
  isDemo: boolean;
};
```

---

# 9. 컴포넌트 권장 구조

```text
src/components/marketplace/
├── marketplace-hero.tsx
├── marketplace-search.tsx
├── marketplace-filter-sheet.tsx
├── creator-card.tsx
├── content-card.tsx
├── campaign-card.tsx
├── featured-creators.tsx
├── trending-content.tsx
├── open-campaigns.tsx
├── marketplace-empty-state.tsx
└── marketplace-demo-notice.tsx
```

---

# 10. 완료 조건

- [ ] `/marketplace` 완성
- [ ] 크리에이터·콘텐츠·캠페인 탐색 가능
- [ ] 검색과 필터 작동
- [ ] 카드 CTA 작동
- [ ] DEMO 금액·성과 표시 명확
- [ ] 모바일 반응형
- [ ] 접근성 준수
- [ ] lint, typecheck, build 통과
