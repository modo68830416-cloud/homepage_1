# 마스터 로드맵

- 작업 ID: TASK-010
- 목적: TASK-001~009의 산출물을 하나의 서비스로 통합하는 순서와 환경 정의

## 1. 통합 순서 (완료 상태)

| 순서 | 영역 | 상태 | 핵심 산출물 |
|---|---|---|---|
| 1 | 전략 문서 검수 | 완료 | [[../strategy/project-vision]] 등 6개 문서 |
| 2 | IA와 URL 검수 | 완료 | [[../ia/sitemap]] 등 7개 문서 |
| 3 | 디자인 토큰 적용 | 완료 | `src/styles/tokens.css`, `src/styles/globals.css` |
| 4 | 모션 시스템 적용 | 완료 | `src/components/motion/*`, `src/components/three/HeroScene.tsx`, `/design-lab/motion` |
| 5 | 메인·콘텐츠 통합 | 완료 | `/`, `/health`, `/health/[category]`, `/health/articles/[slug]` |
| 6 | 검색 통합 | 완료 | `/search`, `/ask`, `/api/search*`, `/api/ask` |
| 7 | 커머스 통합 | 완료 | `/shop/*`, `src/lib/commerce/*`, `src/lib/payments/adapter.ts` |
| 8 | 관리자 통합 | 완료 | `/admin/*`, `src/lib/admin/*`, `src/proxy.ts` |
| 9 | 성능·보안·SEO 적용 | 완료 | `next.config.ts` headers, `sitemap.ts`/`robots.ts`, `lighthouserc.json`, `.pa11yci.json` |
| 10 | 배포 및 모니터링 | 이 문서 | `.github/workflows/*`, [[../deployment/runbook]] |

## 2. 환경

| 환경 | 용도 | 데이터 | 결제키 | 검색 인덱스 | 파일 저장소 |
|---|---|---|---|---|---|
| local | 개발자 로컬 | 인메모리 목업 데이터 (`src/lib/*/data.ts`) | `MockPaymentAdapter` | 인메모리 배열 검색 | 로컬 `public/` |
| development | 통합 개발 | 공유 개발 DB(예정) | 테스트 PG 키 | 개발용 인덱스(예정) | 개발용 버킷(예정) |
| staging | 출시 전 검증 | 프로덕션과 분리된 스테이징 DB | 테스트 PG 키 | 스테이징 인덱스 | 스테이징 버킷 |
| production | 실 서비스 | 프로덕션 DB | 운영 PG 키 | 운영 인덱스 | 운영 버킷 |

이번 범위는 `local`만 실제로 구현되어 있다(데이터베이스가 없는 인메모리/localStorage 스캐폴딩, [[../strategy/scope-and-non-goals]] 참조). development/staging/production 전환 시 아래 [[dependency-map|의존성 지도]]의 "실제 연동 필요" 항목을 순서대로 해결해야 한다.

## 3. 환경변수

`.env.example` 참조. 최소 다음 키가 필요하다:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

실제 DB/PG/검색 서비스 도입 시 아래 키가 추가된다: `DATABASE_URL`, `PAYMENT_PROVIDER_SECRET_KEY`, `SEARCH_SERVICE_API_KEY`, `BLOB_READ_WRITE_TOKEN`.

## 4. 출시 단계 (TASK-010 §5)

| 단계 | 범위 | 이번 스캐폴딩의 충족 여부 |
|---|---|---|
| Alpha | 핵심 콘텐츠 + 검색 + 샘플 상품, 내부 검증 | 충족 (모든 페이지 동작) |
| Beta | 회원, 장바구니, 결제, 관리자, 분석 포함 제한 공개 | 부분 충족 — 결제는 목업, 회원 인증은 관리자만 데모 구현 |
| Production | 운영 정책·고객지원·백업·모니터링까지 완료 | 미충족 — 실제 DB/PG/인증/백업 필요 |

## 5. Claude Code 다음 작업 판단 기준

이 문서와 [[dependency-map]]을 기준으로 다음 작업을 판단한다. 새로운 기능 요청이 들어오면:

1. 이 로드맵의 어느 단계에 속하는지 확인한다.
2. 해당 단계의 완료 조건([[../strategy/decision-log]]의 미결정 항목 포함)을 먼저 충족했는지 확인한다.
3. [[release-checklist]]의 관련 항목을 갱신한다.
