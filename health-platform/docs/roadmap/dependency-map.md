# 의존성 지도

- 작업 ID: TASK-010

## 1. 모듈 의존 관계 (상위 → 하위)

```
(site)/layout.tsx
  ├─ components/layout/Header.tsx ── lib/content/data.ts (categories)
  ├─ components/layout/CartLink.tsx ── lib/commerce/cart.tsx
  ├─ components/motion/PageTransition.tsx ── motion/react
  └─ components/layout/Footer.tsx

lib/content/data.ts        (client-safe: articles, categories — no server-only import)
lib/content/public.ts      (server-only: getPublished*, depends on lib/admin/content-overrides.ts)
lib/admin/content-overrides.ts (server-only: in-memory status Map)
lib/admin/audit.ts         (server-only: in-memory audit log)
lib/admin/roles.ts         (client+server safe: RBAC matrix, no I/O)
lib/admin/require-section.ts (server-only: cookies() + roles.ts)

lib/products/data.ts       (client-safe: products, shopCategories)
lib/products/types.ts      (types only)
lib/commerce/cart.tsx      (client: localStorage cart)
lib/commerce/orders.ts     (client: localStorage orders, depends on lib/payments/adapter.ts)
lib/payments/adapter.ts    (isomorphic: PaymentAdapter interface + MockPaymentAdapter)
lib/commerce/digital-entitlements.ts (pure function, depends on products/types.ts)
lib/commerce/affiliate-tracking.ts (server-only: in-memory click log)

lib/search/engine.ts       (server: depends on content/public.ts + products/data.ts + search/synonyms.ts + search/log.ts)
lib/search/ask.ts          (server: depends on search/engine.ts + content/data.ts + products/data.ts)
lib/search/log.ts          (server-only: in-memory logs)

src/proxy.ts               (depends only on lib/admin/roles.ts — must stay Node-runtime-safe, no DB clients)
```

## 2. 실제 연동이 필요한 지점 (스캐폴딩 → 프로덕션 전환 시)

| 지점 | 현재 구현 | 전환 시 필요 작업 |
|---|---|---|
| `lib/content/data.ts` articles 배열 | 하드코딩 배열 | CMS/DB 조회로 교체, `getPublishedArticles` 등 공개 함수 시그니처는 유지 |
| `lib/admin/content-overrides.ts` | 프로세스 메모리 Map | DB의 `status` 컬럼으로 교체 |
| `lib/products/data.ts` products 배열 | 하드코딩 배열 | 상품 DB 조회로 교체 |
| `lib/commerce/cart.tsx` / `orders.ts` | localStorage | 서버 세션/DB 기반 장바구니·주문으로 교체, 로그인 연동 필요 |
| `lib/payments/adapter.ts` `MockPaymentAdapter` | 즉시 성공 목업 | 실제 PG SDK로 `PaymentAdapter` 인터페이스 구현체 교체 (인터페이스는 변경 없음) |
| `lib/search/log.ts`, `lib/admin/audit.ts` | 프로세스 메모리 배열 | 영속 저장소(DB/로그 서비스)로 교체 |
| `app/admin/login/actions.ts` | 역할 선택형 목업 로그인 | 실제 인증(자격 증명, 세션/JWT)로 교체, 쿠키 이름·역할 모델은 유지 가능 |
| `/ask` 규칙 기반 응답 (`lib/search/ask.ts`) | 키워드 매칭 | 실 LLM 연동 시에도 8섹션 구조·응급 우선순위는 [[../search/ai-safety-guardrails]] 그대로 강제 |

## 3. 순환 의존 방지 규칙

- `lib/content/data.ts`는 **어떤 `server-only` 모듈도 import하지 않는다** — 클라이언트 컴포넌트(`MobileMenuOverlay` 등)가 `categories`를 가져다 쓰기 때문. 상태 필터링이 필요한 함수는 `lib/content/public.ts`에만 추가한다.
- `lib/admin/*`는 `lib/content/data.ts`의 타입만 참조하고 데이터 배열 자체는 소유하지 않는다.
