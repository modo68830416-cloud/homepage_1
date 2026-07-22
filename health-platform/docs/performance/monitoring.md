# 성능 모니터링 및 예산

- 작업 ID: TASK-009
- 모션 관련 예산: [[../motion/performance-budget]] (TASK-004)

## 1. 목표 지표

| 지표 | 목표 |
|---|---|
| LCP | ≤ 2.5초 |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

## 2. 구현

- `src/components/monitoring/WebVitalsReporter.tsx`가 `next/web-vitals`의 `useReportWebVitals`로 실사용자 지표를 수집해 `/api/vitals`로 전송한다(현재는 로그만 남기는 스텁 — 실 운영에서는 APM/RUM 서비스로 교체).
- `lighthouserc.json` + `npm run test:lighthouse` (Lighthouse CI)가 합성 모니터링을 담당하며 [[../roadmap/master-roadmap|CI 워크플로]]에서 실행된다.

## 3. 초기 JS 예산 (페이지 유형별, 목표치)

| 페이지 유형 | 초기 JS 예산(gzip) |
|---|---|
| 홈 (Hero 3D 포함) | ≤ 220KB (3D 청크는 지연 로딩되어 별도 집계) |
| 콘텐츠 상세 | ≤ 130KB |
| 상품 상세 | ≤ 150KB |
| 결제 | ≤ 100KB |

## 4. 오류 추적

- `src/app/global-error.tsx`가 렌더 트리 전체를 벗어나는 오류를 잡아 콘솔에 기록한다(스텁). 실 운영에서는 Sentry 등 APM으로 전송하도록 교체한다.
- 각 라우트 세그먼트의 `error.tsx`(예: `(site)/health/error.tsx`)가 국소적 오류를 우선 처리한다.

## 5. 미결정 항목

- [결정 필요] 실 운영 APM/RUM 벤더 선정
- [결정 필요] 초기 JS 예산 초과 시 CI 실패 처리 여부(현재는 경고만)
