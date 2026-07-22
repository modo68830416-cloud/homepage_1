# 관리자 콘텐츠 워크플로

- 작업 ID: TASK-008
- 구현: `src/lib/admin/content-overrides.ts`, `src/app/admin/content/`, `src/lib/content/public.ts`

## 1. 상태 값 (TASK-008 §3)

`DRAFT → REVIEW_REQUESTED → IN_REVIEW → (CHANGES_REQUESTED ↺) → APPROVED → SCHEDULED → PUBLISHED`, 그리고 `UNPUBLISHED` / `ARCHIVED`.

## 2. 승인 게이트

공개 라우트(`/health`, `/health/[category]`, `/health/articles/[slug]`, 검색, `/ask`)는 모두 `src/lib/content/public.ts`의 `getPublished*` 함수만 사용한다. 이 함수들은 상태가 정확히 `PUBLISHED`인 콘텐츠만 반환하므로, 관리자가 승인하지 않은 콘텐츠는 절대 공개 노출되지 않는다 (TASK-009 §6 완료조건).

## 2-1. `loading.tsx`를 의도적으로 두지 않는 이유

`health/articles/[slug]`에는 `loading.tsx`를 두지 않는다. `loading.tsx`는 Suspense 스트리밍 경계를 만들어 응답을 즉시 200으로 시작하는데, 이후 `notFound()`가 호출되어도 이미 전송된 HTTP 상태 코드는 되돌릴 수 없어 미공개 콘텐츠가 200으로 응답하는 문제가 생긴다. 목업 데이터는 실제 비동기 지연이 없어 스켈레톤이 필요하지 않으므로, 실제 데이터 소스 연동 시 이 트레이드오프를 다시 검토해야 한다.

## 3. 구현상의 한계

상태 오버라이드는 서버 프로세스 메모리에 저장된다(`content-overrides.ts`). 서버가 재시작되면 초기화되며, 실제 배포에서는 CMS 데이터베이스에 상태 컬럼으로 저장해야 한다.

## 4. 감사 로그 연결

상태 변경은 `src/app/admin/content/actions.ts`의 `updateContentStatus`를 통해서만 이루어지며, 매 호출마다 `logAuditEvent()`로 기록된다. 기록된 내역은 `/admin/audit-log`에서 확인할 수 있다.
