# 보안 정책

- 작업 ID: TASK-009
- 구현: `next.config.ts` `headers()`, `src/proxy.ts`, `src/lib/admin/*`

## 1. 응답 보안 헤더 (구현됨)

| 헤더 | 값 | 목적 |
|---|---|---|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; ...` | XSS 완화 |
| `X-Frame-Options` | `DENY` | 클릭재킹 방지 |
| `X-Content-Type-Options` | `nosniff` | MIME 스니핑 방지 |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | 리퍼러 정보 최소 노출 |
| `Permissions-Policy` | 카메라·마이크·위치 차단 | 불필요한 브라우저 API 차단 |

### CSP에서 nonce 대신 `unsafe-inline`을 선택한 이유

nonce 기반 strict CSP는 모든 페이지를 동적 렌더링으로 강제 전환해야 한다(Next.js 공식 문서, Static/ISR 및 PPR 비활성화). 이 플랫폼은 성능 예산(TASK-009 §2)을 지키기 위해 상품/콘텐츠 목록 등 다수 페이지를 SSG로 유지하는 것을 우선한다. → [결정 필요] 실제 운영 전환 시 인라인 스크립트를 제거하고 strict-dynamic + nonce로 전환할지 재검토.

## 2. 인증·인가

- 사용자 인증(로그인)은 이번 범위 밖(스캐폴딩 단계, [[../strategy/scope-and-non-goals]] 참조)이며, 관리자 영역만 역할 쿠키 기반 데모 인증을 구현했다(TASK-008, `src/lib/admin/roles.ts`).
- 관리자 인가는 2단계로 강제된다: `src/proxy.ts`(로그인 여부만 확인) + 각 페이지의 `requireSection()`(섹션별 역할 확인). Proxy 하나에만 의존하지 않는다 — Next.js Data Security 가이드의 권고를 따른다.
- 관리자 MFA는 실제 인증 시스템 도입 시 함께 검토한다. → [결정 필요]

## 3. 입력값 검증 · 인젝션 방어

- 검색 쿼리(`src/lib/search/engine.ts`)는 문자열 포함 비교만 수행하며 어떤 사용자 입력도 HTML로 렌더링하지 않는다(React의 기본 이스케이프에 의존).
- `src/components/seo/JsonLd.tsx`는 유일하게 `dangerouslySetInnerHTML`을 사용하는 곳이며, 항상 서버에서 생성한 구조화 데이터 객체만 직렬화한다 — 사용자 입력을 절대 전달하지 않는다.
- SQL Injection은 이번 범위에 실제 DB가 없어 해당 없음. 실제 DB 도입 시 파라미터화된 쿼리(ORM)를 필수로 한다. → [결정 필요]

## 4. Rate Limit

- 이번 범위에는 구현되어 있지 않다. `/api/search`, `/api/ask`, `/admin/login` 서버 액션은 실 운영 전 Rate Limit 미들웨어(예: Vercel Firewall, Upstash Ratelimit) 적용이 필요하다. → [결정 필요]

## 5. 감사 로그

TASK-008에서 구현한 `src/lib/admin/audit.ts`가 관리자 로그인·콘텐츠 상태 변경을 기록한다. 결제/주문 관련 감사 로그는 실제 결제 연동 시 확장한다.

## 6. 비밀정보 관리

- 현재 코드에는 비밀키가 존재하지 않는다(목업 결제 어댑터, 목업 인증).
- 실제 PG 키, DB 접속정보 등은 환경변수로만 관리하며 저장소에 커밋하지 않는다 ([[../roadmap/master-roadmap|master-roadmap]] 환경변수 예시 참조).

## 7. 백업·복구

- 이번 범위는 서버 프로세스 메모리 기반 데이터(검색 로그, 감사 로그, 콘텐츠 상태 오버라이드)와 브라우저 localStorage 기반 데이터(장바구니, 주문)만 존재하며 둘 다 영속적 백업 대상이 아니다.
- 실제 데이터베이스 도입 시 최소 일 1회 스냅샷 백업 및 복구 리허설 절차가 필요하다. → [결정 필요] 백업 주기·보관기간·복구 목표시간(RTO/RPO)
