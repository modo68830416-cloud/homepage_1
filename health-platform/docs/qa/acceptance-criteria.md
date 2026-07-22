# 인수 조건 (Acceptance Criteria)

- 작업 ID: TASK-010

각 TASK의 완료조건을 실제로 검증 가능한 조건으로 재정리한다. "완료"로 표시된 항목은 이번 스캐폴딩 세션에서 실제로 빌드·런타임 검증까지 마친 항목이다.

## TASK-001~004 (전략/IA/디자인/모션)

- [x] 문서 6+7+8개 및 토큰/모션 파일 생성 확인 (파일 존재 여부로 검증 가능)
- [x] `/design-lab/motion`에서 카탈로그의 각 인터랙션이 독립적으로 렌더링됨

## TASK-005 (메인/콘텐츠)

- [x] 모바일 뷰포트 기준 Hero 검색 폼이 최초 렌더링에 포함됨 (SSR HTML에 `<input type="search">` 존재)
- [x] 콘텐츠 상세에 출처·검수자·수정일이 항상 렌더링됨 (`TrustPanel`)
- [x] 응급 콘텐츠에서 `EmergencyBanner`가 최상단에 렌더링됨

## TASK-006 (검색/AI)

- [x] `/api/search?q=` 가 콘텐츠/상품을 구분된 배열(`articleResults`/`productResults`)로 반환
- [x] `/api/ask` 응답이 8개 필드(질문요약~출처) 구조를 항상 포함
- [x] 응급 신호 질문에서 `emergency.isEmergency === true` 및 `note` 채워짐 (실제 curl 테스트로 확인)

## TASK-007 (커머스)

- [x] 7개 판매유형 상품이 각각 상세 페이지에서 정상 렌더링 (실제 curl 200 확인)
- [x] AFFILIATE 상품만 `/go/[slug]`에서 200, 나머지 판매유형은 404 (실제 확인됨)
- [x] DIRECT 상품 장바구니→체크아웃→주문완료 흐름에서 타입 에러 없이 빌드됨

## TASK-008 (관리자)

- [x] 비로그인 상태로 `/admin` 접근 시 307 리다이렉트 (실제 확인)
- [x] 콘텐츠 상태를 `DRAFT`로 설정하면 공개 라우트가 404를 반환 (실제 확인 — 이 과정에서 `loading.tsx`가 원인이 되어 상태코드가 200으로 새는 문제를 발견해 라우트에서 제거함)
- [x] 역할별 `SECTION_PERMISSIONS`가 코드로 명시되어 있고 `requireSection()`이 모든 관리자 페이지에서 호출됨

## TASK-009 (성능/보안/SEO/접근성/안전)

- [x] `sitemap.xml`/`robots.txt`가 정적 라우트로 생성됨 (실제 curl 확인)
- [x] 모든 응답에 CSP/X-Frame-Options 등 보안 헤더 포함 (실제 curl 확인)
- [x] 콘텐츠/상품 상세에 JSON-LD 구조화 데이터 포함 (실제 curl 확인)
- [ ] Lighthouse CI/`pa11y-ci` 실행 결과 — 이번 세션에서는 설정만 완료, 실제 브라우저 기반 실행은 CI 환경에서 수행 필요 (헤드리스 브라우저 미설치)

## TASK-010 (통합)

- [x] `.github/workflows/ci.yml`/`deploy.yml` 존재 및 문법 검증(YAML) 통과
- [x] `.env.example` 존재
- [ ] 실제 GitHub Actions 실행 결과 — 저장소에 push 후에만 확인 가능
