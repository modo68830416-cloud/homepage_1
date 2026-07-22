# 배포 런북

- 작업 ID: TASK-010

## 1. 배포 전 확인

1. `npm run build`가 로컬에서 통과하는지 확인.
2. [[../roadmap/release-checklist]]의 해당 단계(Alpha/Beta/Production) 항목을 모두 확인.
3. `.env.example`과 실제 배포 환경의 환경변수가 어긋나지 않는지 확인.

## 2. 배포 절차 (Vercel 기준 권장)

1. `main` 브랜치 병합 → `.github/workflows/deploy.yml`이 프로덕션 배포 트리거.
2. 배포 후 헬스체크: `/`, `/health`, `/shop`, `/api/search?q=test` 가 200을 반환하는지 확인.
3. `sitemap.xml`/`robots.txt`가 배포된 도메인 기준으로 올바른 URL을 포함하는지 확인 (`NEXT_PUBLIC_SITE_URL` 환경변수 반영 여부).

## 3. 장애 대응

| 증상 | 우선 확인 사항 |
|---|---|
| 전체 500 오류 | 최근 배포의 서버 컴포넌트 오류 로그, `global-error.tsx` 로그 |
| 관리자 접근 불가 | `src/proxy.ts` matcher/쿠키 이름(`ADMIN_ROLE_COOKIE`) 변경 여부 |
| 콘텐츠가 갑자기 비공개 처리됨 | 관리자 콘텐츠 상태 실수 변경 여부 — `/admin/audit-log`에서 최근 `CONTENT_STATUS_CHANGED` 이벤트 확인 |
| 검색 결과 이상 | `src/lib/search/engine.ts`의 동의어 사전(`synonyms.ts`) 최근 변경 여부 |
| 특정 콘텐츠/상품이 404 | 상태가 `PUBLISHED`/`status: PUBLISHED`가 아닌지 확인, [[../seo/seo-policy]] §3 참고 |

## 4. 롤백

- Vercel 등 플랫폼의 "이전 배포로 되돌리기" 기능을 우선 사용한다(코드 롤백보다 빠름).
- 관리자 콘텐츠 상태 변경으로 인한 문제는 코드 롤백이 아니라 `/admin/content`에서 상태를 되돌리는 것으로 해결한다(인메모리 오버라이드이므로 서버 재시작 시에도 초기화됨에 유의).

## 5. 알려진 프레임워크 이슈 (반드시 인지)

동적 라우트(`generateStaticParams` 목록에 없는 slug)에서 `notFound()`를 호출하는 페이지에 **`loading.tsx`를 추가하면 안 된다.** `loading.tsx`가 Suspense 스트리밍 경계를 만들어 HTTP 200 헤더가 먼저 전송되고, 이후 `notFound()`가 호출되어도 상태 코드를 404로 되돌릴 수 없다. 이 문제는 이번 세션에서 `health/articles/[slug]`에 실제로 재현·확인했다 ([[../qa/acceptance-criteria]] TASK-008 항목 참고). 새 동적 라우트에 `loading.tsx`를 추가할 때는 반드시 존재하지 않는 slug로 실제 HTTP 상태 코드를 확인한다.

## 6. 운영 인수 시 전달 사항

- 이 플랫폼은 실제 데이터베이스가 없다: 콘텐츠/상품은 코드에 하드코딩(`src/lib/*/data.ts`), 주문/장바구니는 브라우저 localStorage, 검색/감사 로그는 서버 프로세스 메모리에 있다. **서버 재시작 시 로그와 콘텐츠 상태 오버라이드가 초기화된다.**
- 관리자 로그인은 실제 인증이 아니라 역할 선택 데모이다. 프로덕션 전환 전 반드시 실제 인증으로 교체해야 한다.
- [[../roadmap/dependency-map]] §2 표가 "무엇을 실제 서비스로 교체해야 하는지"의 체크리스트 역할을 한다.
