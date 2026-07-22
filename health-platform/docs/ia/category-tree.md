# 카테고리 트리 (전체 메뉴 노드 정의)

- 작업 ID: TASK-002
- 규칙: 모든 노드는 `ID · 표시명 · URL · 부모ID · 노출우선순위(1=최상위) · 사용자유형` 을 포함한다.
- 사용자유형 값: `ALL`(비로그인 포함 전체) · `GUEST`(비로그인 전용) · `MEMBER`(로그인 전용)

## 1. 최상위 노드 (Root)

| ID | 표시명 | URL | 부모ID | 우선순위 | 사용자유형 |
|---|---|---|---|---|---|
| N-HOME | 홈 | `/` | — | 1 | ALL |
| N-HEALTH | 건강정보 | `/health` | — | 1 | ALL |
| N-SHOP | 스토어 | `/shop` | — | 1 | ALL |
| N-SEARCH | 검색 | `/search` | — | 2 | ALL |
| N-ASK | 건강 질문하기(AI) | `/ask` | — | 2 | ALL |
| N-ACCOUNT | 마이페이지 | `/account` | — | 3 | MEMBER |
| N-SUPPORT | 고객지원 | `/support` | — | 4 | ALL |

## 2. 건강정보 (N-HEALTH 하위)

| ID | 표시명 | URL | 부모ID | 우선순위 | 사용자유형 |
|---|---|---|---|---|---|
| N-HEALTH-SYMPTOMS | 증상별 | `/health/symptoms` | N-HEALTH | 1 | ALL |
| N-HEALTH-CONDITIONS | 질환별 | `/health/conditions` | N-HEALTH | 1 | ALL |
| N-HEALTH-LIFESTYLE | 생활관리 | `/health/lifestyle` | N-HEALTH | 2 | ALL |
| N-HEALTH-EXERCISE | 운동·스트레칭 | `/health/lifestyle/exercise` | N-HEALTH-LIFESTYLE | 1 | ALL |
| N-HEALTH-DIET | 식단·영양 | `/health/lifestyle/diet` | N-HEALTH-LIFESTYLE | 2 | ALL |
| N-HEALTH-SLEEP | 수면 | `/health/lifestyle/sleep` | N-HEALTH-LIFESTYLE | 3 | ALL |
| N-HEALTH-MENTAL | 정신건강 | `/health/lifestyle/mental` | N-HEALTH-LIFESTYLE | 4 | ALL |
| N-HEALTH-CHECKUP | 건강검진 | `/health/checkup` | N-HEALTH | 3 | ALL |
| N-HEALTH-AUDIENCE | 대상별 | `/health/audience` | N-HEALTH | 4 | ALL |
| N-HEALTH-SEASONAL | 계절별 | `/health/seasonal` | N-HEALTH | 5 | ALL |
| N-HEALTH-LATEST | 최신 건강이슈 | `/health/latest` | N-HEALTH | 2 | ALL |
| N-HEALTH-ARTICLE | 콘텐츠 상세 | `/health/articles/[slug]` | (동적, 상위는 분류 노드) | — | ALL |

### 대상별 하위 (예시)

| ID | 표시명 | URL | 부모ID | 우선순위 | 사용자유형 |
|---|---|---|---|---|---|
| N-HEALTH-AUD-WOMEN | 여성 건강 | `/health/audience/women` | N-HEALTH-AUDIENCE | 1 | ALL |
| N-HEALTH-AUD-MEN | 남성 건강 | `/health/audience/men` | N-HEALTH-AUDIENCE | 2 | ALL |
| N-HEALTH-AUD-SENIOR | 시니어 건강 | `/health/audience/senior` | N-HEALTH-AUDIENCE | 3 | ALL |
| N-HEALTH-AUD-KIDS | 어린이 건강 | `/health/audience/kids` | N-HEALTH-AUDIENCE | 4 | ALL |

## 3. 스토어 (N-SHOP 하위)

| ID | 표시명 | URL | 부모ID | 우선순위 | 사용자유형 |
|---|---|---|---|---|---|
| N-SHOP-SUPPLEMENT | 건강기능식품 | `/shop/categories/supplements` | N-SHOP | 1 | ALL |
| N-SHOP-EXERCISE | 운동용품 | `/shop/categories/exercise` | N-SHOP | 2 | ALL |
| N-SHOP-SLEEP | 수면용품 | `/shop/categories/sleep` | N-SHOP | 3 | ALL |
| N-SHOP-POSTURE | 자세관리 | `/shop/categories/posture` | N-SHOP | 4 | ALL |
| N-SHOP-DEVICES | 건강측정기기 | `/shop/categories/devices` | N-SHOP | 5 | ALL |
| N-SHOP-DAILY | 생활건강 | `/shop/categories/daily` | N-SHOP | 6 | ALL |
| N-SHOP-SENIOR | 실버건강 | `/shop/categories/senior` | N-SHOP | 7 | ALL |
| N-SHOP-DIGITAL | 디지털상품 | `/shop/categories/digital` | N-SHOP | 8 | ALL |
| N-SHOP-SUBSCRIPTION | 구독 | `/shop/categories/subscription` | N-SHOP | 9 | ALL |
| N-SHOP-BOOKING | 예약서비스 | `/shop/categories/booking` | N-SHOP | 10 | ALL |
| N-SHOP-PRODUCT | 상품 상세 | `/shop/products/[slug]` | (동적, 상위는 분류 노드) | — | ALL |

## 4. 검색 (N-SEARCH 하위, 논리적 노드 — 대부분 상태/쿼리 기반)

| ID | 표시명 | URL | 부모ID | 우선순위 | 사용자유형 |
|---|---|---|---|---|---|
| N-SEARCH-UNIFIED | 통합검색 | `/search?q=` | N-SEARCH | 1 | ALL |
| N-SEARCH-HEALTH | 건강정보 검색 | `/search?type=health&q=` | N-SEARCH | 2 | ALL |
| N-SEARCH-PRODUCT | 상품 검색 | `/search?type=product&q=` | N-SEARCH | 3 | ALL |
| N-SEARCH-NL | 자연어 질문 | `/ask` | N-SEARCH | 4 | ALL |
| N-SEARCH-POPULAR | 인기 검색어 | `/search` (홈 위젯) | N-SEARCH | 5 | ALL |
| N-SEARCH-RECENT | 최근 검색어 | `/search` (사용자 상태) | N-SEARCH | 6 | MEMBER |
| N-SEARCH-EMPTY | 검색 결과 없음 | `/search?q=` (상태) | N-SEARCH | — | ALL |

## 5. 사용자/계정 (N-ACCOUNT 하위)

| ID | 표시명 | URL | 부모ID | 우선순위 | 사용자유형 |
|---|---|---|---|---|---|
| N-ACC-LOGIN | 로그인 | `/account/login` | N-ACCOUNT | 1 | GUEST |
| N-ACC-SIGNUP | 회원가입 | `/account/signup` | N-ACCOUNT | 2 | GUEST |
| N-ACC-HOME | 마이페이지 홈 | `/account` | N-ACCOUNT | 1 | MEMBER |
| N-ACC-ORDERS | 주문내역 | `/account/orders` | N-ACCOUNT | 2 | MEMBER |
| N-ACC-SHIPPING | 배송조회 | `/account/orders/shipping` | N-ACC-ORDERS | 1 | MEMBER |
| N-ACC-WISHLIST | 찜 | `/account/wishlist` | N-ACCOUNT | 3 | MEMBER |
| N-ACC-BOOKMARKS | 콘텐츠 북마크 | `/account/bookmarks` | N-ACCOUNT | 4 | MEMBER |
| N-ACC-RECENT | 최근 본 항목 | `/account/recent` | N-ACCOUNT | 5 | MEMBER |
| N-ACC-INQUIRIES | 문의내역 | `/account/inquiries` | N-ACCOUNT | 6 | MEMBER |

## 6. 고객지원 (N-SUPPORT 하위)

| ID | 표시명 | URL | 부모ID | 우선순위 | 사용자유형 |
|---|---|---|---|---|---|
| N-SUPPORT-FAQ | 자주 묻는 질문 | `/support/faq` | N-SUPPORT | 1 | ALL |
| N-SUPPORT-CONTACT | 1:1 문의 | `/support/contact` | N-SUPPORT | 2 | ALL |
| N-SUPPORT-POLICY | 이용약관·정책 | `/support/policy` | N-SUPPORT | 3 | ALL |
| N-SUPPORT-REPORT | 콘텐츠 신고/수정요청 | `/support/report` | N-SUPPORT | 4 | ALL |

## 7. 노드 ID 명명 규칙

`N-<영역>[-<하위영역>][-<세부>]` 형식의 대문자 스네이크 케이스를 사용한다. 새 노드 추가 시 반드시 부모 ID를 명시하고 이 문서를 갱신한다.
