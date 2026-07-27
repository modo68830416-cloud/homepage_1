# SPRINT-02 — Data Flow, State Management & Demo Engine

> 프로젝트: Fashion Creator
> 선행: SPRINT-01 완료
> 목표: 화면은 그대로 유지하면서 프로젝트 전체를 하나의 살아있는 서비스처럼 연결한다.

## Claude Code 실행

```text
SPRINT-02-DataFlow-State.md를 읽고 프로젝트 전체를 분석한 뒤 구현해줘.

중요 원칙
- UI/디자인은 유지
- 기존 기능은 삭제하지 말고 확장
- 실제 AI/결제 API는 연결하지 않음
- 모든 화면은 DEMO 데이터와 상태관리로 연결
- Zustand(또는 기존 Store)를 중심으로 통합
- lint, typecheck, build를 매 단계마다 실행
```

---

# Sprint 목표

다음 흐름이 실제로 연결되어야 한다.

홈
→ 모델 선택
→ Studio
→ Look 저장
→ Content Studio
→ 콘텐츠 생성(DEMO)
→ LOOK Page
→ Creator Dashboard
→ Marketplace
→ Campaign

---

# 1. 전역 상태 통합

통합 Store

- User
- Avatar
- SelectedModel
- Look
- Products
- Cart
- ContentProject
- Creator
- Marketplace
- Analytics

새로고침 후에도 핵심 데이터 유지.

---

# 2. 데이터 흐름

Avatar 생성
→ Studio

Studio
→ Look 저장

Look
→ Content Studio

Content
→ Creator Dashboard

Creator
→ Marketplace

Marketplace
→ Revenue(DEMO)

모든 단계가 실제 데이터로 연결되어야 한다.

---

# 3. Demo Engine

실제 API 대신 Demo Service 계층 구현

예)

- DemoAvatarService
- DemoProductService
- DemoContentService
- DemoAnalyticsService
- DemoMarketplaceService

UI는 Service만 호출하도록 구성.

---

# 4. Repository 패턴

화면은 localStorage를 직접 접근하지 않는다.

Repository 계층

- LookRepository
- ProductRepository
- ContentRepository
- CreatorRepository

---

# 5. Mock API

/api/demo/*

예)

- /api/demo/trends
- /api/demo/products
- /api/demo/looks
- /api/demo/content
- /api/demo/analytics

향후 실제 API 교체 가능하도록 설계.

---

# 6. Analytics 연결

Creator Dashboard 수치가

- Look
- Content
- Marketplace

데이터를 기반으로 자동 갱신.

모든 값은 DEMO 표시.

---

# 7. 에러 처리

공통 Error Boundary

Retry

Offline DEMO

Toast

---

# 8. 성능

- 불필요한 Client Component 제거
- Memoization
- Dynamic Import
- Lazy Loading

---

# 9. 완료 조건

- 전체 상태관리 통합
- Demo Engine 구축
- Mock API 연결
- Repository 적용
- Dashboard 자동 갱신
- 페이지 간 데이터 유지
- lint/typecheck/build 통과

---

# 완료 보고

1. Store 구조
2. Repository
3. Demo Services
4. Mock API
5. 수정 파일
6. 테스트
7. lint
8. typecheck
9. build
10. Sprint-03 준비
