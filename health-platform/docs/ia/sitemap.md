# 사이트맵

- 작업 ID: TASK-002
- 노드 상세 정의는 [[category-tree]] 참조 (ID, 우선순위, 사용자유형 포함)

## 1. 전체 트리 (URL 기준 요약)

```
/                                   N-HOME
/health                             N-HEALTH
  /health/symptoms                  N-HEALTH-SYMPTOMS
  /health/conditions                N-HEALTH-CONDITIONS
  /health/lifestyle                 N-HEALTH-LIFESTYLE
    /health/lifestyle/exercise      N-HEALTH-EXERCISE
    /health/lifestyle/diet          N-HEALTH-DIET
    /health/lifestyle/sleep         N-HEALTH-SLEEP
    /health/lifestyle/mental        N-HEALTH-MENTAL
  /health/checkup                   N-HEALTH-CHECKUP
  /health/audience                  N-HEALTH-AUDIENCE
    /health/audience/women          N-HEALTH-AUD-WOMEN
    /health/audience/men            N-HEALTH-AUD-MEN
    /health/audience/senior         N-HEALTH-AUD-SENIOR
    /health/audience/kids           N-HEALTH-AUD-KIDS
  /health/seasonal                  N-HEALTH-SEASONAL
  /health/latest                    N-HEALTH-LATEST
  /health/articles/[slug]           N-HEALTH-ARTICLE
/shop                                N-SHOP
  /shop/categories/supplements      N-SHOP-SUPPLEMENT
  /shop/categories/exercise         N-SHOP-EXERCISE
  /shop/categories/sleep            N-SHOP-SLEEP
  /shop/categories/posture          N-SHOP-POSTURE
  /shop/categories/devices          N-SHOP-DEVICES
  /shop/categories/daily            N-SHOP-DAILY
  /shop/categories/senior           N-SHOP-SENIOR
  /shop/categories/digital          N-SHOP-DIGITAL
  /shop/categories/subscription     N-SHOP-SUBSCRIPTION
  /shop/categories/booking          N-SHOP-BOOKING
  /shop/products/[slug]             N-SHOP-PRODUCT
  /shop/cart                        (장바구니, 비메뉴 노드)
  /shop/checkout                    (결제, 비메뉴 노드)
/search                              N-SEARCH
/ask                                 N-ASK
/account                             N-ACCOUNT (MEMBER)
  /account/login                    N-ACC-LOGIN (GUEST)
  /account/signup                   N-ACC-SIGNUP (GUEST)
  /account/orders                   N-ACC-ORDERS
    /account/orders/shipping        N-ACC-SHIPPING
  /account/wishlist                 N-ACC-WISHLIST
  /account/bookmarks                N-ACC-BOOKMARKS
  /account/recent                   N-ACC-RECENT
  /account/inquiries                N-ACC-INQUIRIES
/support                             N-SUPPORT
  /support/faq                      N-SUPPORT-FAQ
  /support/contact                  N-SUPPORT-CONTACT
  /support/policy                   N-SUPPORT-POLICY
  /support/report                   N-SUPPORT-REPORT
/admin                               (관리자 영역, TASK-008 참조, 별도 권한 체계)
```

## 2. 뎁스 규칙

- 주요 콘텐츠(증상/질환/상품 카테고리)는 홈 기준 3클릭 이내 도달을 원칙으로 한다: 홈 → 대분류 → 상세.
- 검색은 모든 페이지에서 헤더를 통해 1클릭으로 접근 가능해야 한다(뎁스 0).

## 3. 동적 라우트 정책

- `/health/articles/[slug]`: 콘텐츠 slug는 발행 시 고정되며 변경 시 301 리다이렉트 필수 (TASK-009 SEO 정책과 연결).
- `/shop/products/[slug]`: 품절/판매종료 상품도 URL은 유지하고 상태 배지로 표시 (TASK-009 §4 품절 정책 참고).

## 4. 관리자 영역과의 관계

`/admin` 이하는 이 사이트맵의 사용자 내비게이션에 포함되지 않으며 별도 인증·권한 체계를 가진다 (TASK-008).
