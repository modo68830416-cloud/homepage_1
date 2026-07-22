# URL 정책

- 작업 ID: TASK-002

## 1. 기본 원칙

- 내부 슬러그는 안정적인 영문 소문자 + 하이픈(kebab-case)을 기본으로 한다. 한글 표시는 UI 텍스트로만 제공한다.
- 슬러그는 발행 시점에 고정한다. 제목이 바뀌어도 슬러그는 변경하지 않는 것을 기본으로 하며, 불가피하게 변경 시 301 리다이렉트를 필수로 등록한다.
- 슬러그에 개인정보, 내부 DB PK 노출을 금지한다 (예: `/shop/products/8821` 대신 `/shop/products/omega-3-1000mg`).
- 쿼리 파라미터는 검색·필터·정렬 등 "상태"에만 사용하고 콘텐츠 식별에는 사용하지 않는다.

## 2. 표준 경로 (예시)

| 경로 | 용도 |
|---|---|
| `/health` | 건강정보 허브 |
| `/health/symptoms` | 증상별 목록 |
| `/health/symptoms/headache` | 특정 증상 상세 |
| `/health/conditions/hypertension` | 특정 질환 상세 |
| `/health/lifestyle/sleep` | 생활관리(수면) 목록 |
| `/health/articles/[slug]` | 개별 콘텐츠 상세 |
| `/shop` | 스토어 허브 |
| `/shop/products/[slug]` | 상품 상세 |
| `/search?q=` | 통합검색 |
| `/ask` | 자연어 질문(AI) |
| `/account/orders` | 주문 내역 |
| `/support` | 고객지원 |

## 3. 카테고리 vs 콘텐츠 슬러그 충돌 방지

- 분류 경로(`/health/symptoms`, `/health/conditions` 등)는 예약어로 취급하며 콘텐츠 slug로 재사용할 수 없다.
- 콘텐츠는 `/health/articles/[slug]`로 통일하고, 분류 경로 자체는 목록 페이지 전용으로 둔다. 이렇게 하면 "질환명이 곧 콘텐츠 slug"인 구조에서 발생하는 이름 충돌(예: 동일 이름의 증상과 질환)을 원천 차단한다.
- 상품은 `/shop/products/[slug]`로 통일하고, `/shop/categories/[category]`는 목록 전용으로 분리한다.

## 4. 중복 콘텐츠 처리 정책

- 동일 주제를 다루는 콘텐츠가 여러 카테고리에 노출되어야 할 경우, URL은 하나만 정본(canonical)으로 두고 나머지 카테고리에서는 "연관 링크"로만 연결한다. URL을 복제하지 않는다.
- 시즌성 콘텐츠(계절별)는 매년 새 글을 발행하지 않고 동일 slug를 갱신하는 것을 기본으로 하되, 완전히 다른 내용이면 새 slug + 이전 글에 리다이렉트 또는 "업데이트됨" 배너를 단다.
- `canonical` 태그는 정본 URL을 명시하고, 검색 결과 페이지(`/search?q=`)는 `noindex`로 색인을 차단한다 (TASK-009 SEO 정책과 연결).

## 5. 예약어 목록 (콘텐츠/상품 slug로 사용 금지)

`health`, `shop`, `search`, `ask`, `account`, `support`, `admin`, `api`, `articles`, `products`, `categories`, `cart`, `checkout`, `login`, `signup`

## 6. 외부 이동 링크 규칙 (제휴판매)

- 제휴상품 외부 이동은 `/shop/products/[slug]`에서 클라이언트 사이드 이동이 아닌 내부 리다이렉트 라우트(`/go/[trackingId]`)를 경유해 클릭 추적 후 이동한다. 외부 URL을 그대로 노출하지 않는다.

## 7. 미결정 항목

- [결정 필요] 커스텀 도메인 및 서브도메인 전략(관리자 영역을 서브도메인으로 분리할지 여부)
