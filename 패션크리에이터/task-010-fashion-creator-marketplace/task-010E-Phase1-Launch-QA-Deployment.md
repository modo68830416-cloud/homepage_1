# TASK-010E — Phase 1 Integration, QA & Public Preview Deployment

> 선행: TASK-010A ~ TASK-010D 완료

---

# 1. 목표

TASK-001부터 TASK-010까지 구현된 Fashion Creator 1차 디자인 프로토타입을 통합 점검하고, 실제 사용자가 접속 가능한 공개 URL로 배포할 수 있는 상태로 만든다.

---

# 2. 핵심 사용자 시나리오

## 일반 사용자

```text
홈
→ 인기 상품
→ AI 모델 선택
→ 상품 코디
→ Look 저장
→ 콘텐츠 생성
→ LOOK 구매 페이지
→ 상품 구매 CTA
```

## 크리에이터

```text
아바타 또는 모델
→ Look 생성
→ 쇼츠 생성
→ 구매 링크
→ Creator Dashboard
→ 수익·분석
→ Marketplace 등록
```

## 브랜드

```text
Marketplace
→ 크리에이터 탐색
→ 캠페인 확인
→ 제작 의뢰
→ 제출 검토
→ 승인 DEMO
```

모든 흐름에서 막힌 링크가 없어야 한다.

---

# 3. 통합 점검 라우트

```text
/
/trends
/models
/models/create
/studio
/create
/create/new
/look/demo-look
/creator
/creator/analytics
/creator/revenue
/creator/subscription
/marketplace
/marketplace/creators
/marketplace/content
/marketplace/campaigns
/pricing
```

---

# 4. 데이터 일관성

확인:

- 선택한 모델이 Studio에 전달
- 저장한 Look이 Content Studio에 전달
- 생성 콘텐츠가 LOOK 페이지에 연결
- 구매 링크가 Creator Dashboard에 표시
- Marketplace 콘텐츠가 Creator 프로필에 연결
- 캠페인 수익이 Revenue DEMO에 반영
- 모든 ID와 slug가 안정적

---

# 5. UI 일관성

- 동일한 디자인 토큰
- 동일한 버튼 높이
- 동일한 카드 radius
- 동일한 DEMO 배지
- 동일한 원화 표기
- 동일한 loading·empty·error 패턴
- 동일한 모바일 navigation

---

# 6. 모바일 QA

최소:

- 360px
- 390px
- 768px
- 1024px
- 1440px

확인:

- 가로 스크롤 없음
- CTA 잘림 없음
- bottom bar safe-area
- modal·sheet 접근 가능
- 표는 card 또는 responsive table
- 영상 프리뷰 비율 유지

---

# 7. 접근성 QA

- 키보드만으로 주요 흐름 완료
- focus-visible
- heading 계층
- landmark
- alt
- form label
- error message
- reduced motion
- 차트 텍스트 요약
- dialog focus trap
- ESC 닫기

---

# 8. 성능 QA

- next/image
- 불필요한 `"use client"` 최소화
- dynamic import 검토
- 대형 이미지 최적화
- 영상 poster
- offscreen animation 감소
- localStorage 크기 제한
- console error 제거

목표:

- Lighthouse Performance 80 이상
- Accessibility 90 이상
- Best Practices 90 이상
- SEO 90 이상

---

# 9. SEO

- 페이지별 metadata
- Open Graph
- Twitter Card
- sitemap
- robots
- canonical 준비
- noindex DEMO 관리자 영역 검토

---

# 10. Vercel 배포

필수:

- production build 성공
- 환경변수 없이 DEMO 모드 실행
- 모든 라우트 직접 접근 가능
- refresh 시 404 없음
- public asset 정상
- Vercel 설정 정리

권장 임시 주소:

```text
https://fashion-creator.vercel.app
```

실제 URL은 프로젝트 상황에 따라 다를 수 있다.

최종 도메인 계획:

```text
https://fashioncreator.co.kr
https://fashioncreator.kr
```

대표 도메인은 `fashioncreator.co.kr`, 보조 도메인은 대표 주소로 redirect 준비.

---

# 11. DEMO Mode

공통 설정:

```ts
export const APP_MODE = "demo";
```

또는 환경변수:

```text
NEXT_PUBLIC_APP_MODE=demo
```

모든 허위 오해 가능 수치에:

- DEMO DATA
- AI DEMO
- 예시 플랜
- 예시 예산
- 실제 결제 아님

표시.

---

# 12. 검증 명령

```bash
npm run lint
npm run typecheck
npm run build
```

가능하면:

```bash
npm run test
```

테스트가 없다면 핵심 유틸리티 단위 테스트 추가를 검토한다.

---

# 13. 완료 보고

```text
TASK-010 및 Phase 1 완료

1. Marketplace 구현
2. Creator Profile·Licensing 구현
3. Campaign·Request 구현
4. Review·Escrow Demo 구현
5. TASK-001~010 통합 점검
6. 수정 파일 목록
7. lint 결과
8. typecheck 결과
9. build 결과
10. 모바일 QA
11. 접근성 QA
12. 성능 QA
13. 배포 URL
14. 알려진 제한
15. Phase 2 우선순위
```

---

# 14. 최종 성공 기준

공개 URL에 접속한 사용자가 설명 없이도 다음을 이해해야 한다.

```text
Fashion Creator는
AI 모델이나 내 아바타에게 인기 패션 상품을 입혀보고,
이미지와 영상을 만들어 구매 링크와 함께 공유하며,
상품 판매·콘텐츠 판매·브랜드 협업으로 수익을 만들 수 있는
AI 패션 콘텐츠 커머스 플랫폼이다.
```
