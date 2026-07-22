# 의사결정 로그

- 작업 ID: TASK-001
- 형식: 날짜 · 결정 · 배경 · 대안 · 담당

## 2026-07-22

| # | 결정 | 배경 | 검토한 대안 | 상태 |
|---|---|---|---|---|
| D-001 | 신규 플랫폼은 별도 디렉터리(`health-platform/`)에서 독립 프로젝트로 개발한다 | 기존 저장소의 MERION/MOMO 홈페이지와 라우트(`/`) 충돌을 피하고, TASK 문서의 "MERION/MOMO와 무관한 독립 프로젝트" 원칙을 지키기 위함 | (a) 같은 앱 내 `/platform` 하위 경로 공존 (b) 기존 홈페이지 교체 | 확정 (사용자 선택) |
| D-002 | 프레임워크는 Next.js App Router + TypeScript + Tailwind CSS로 시작한다 | Vercel 배포 환경과 최신 패턴(Server Components, Cache Components)과의 호환성 | Pages Router 유지 | 확정 |
| D-003 | 비전 문장을 "몰입형 건강 라이프스타일 플랫폼"으로 확정 | TASK-001 목표에 따른 단일 문장 비전 요구 | 여러 후보 문구 검토 | 확정 |
| D-004 | 결제/물류/PG 실연동은 이번 범위에서 제외하고 인터페이스만 구축 | 실계약 없이는 실동작이 불가능하므로 확장 지점만 검증 | 처음부터 목업 없이 스텁만 | 확정 |

## 미결정 항목 추적 (Scope-and-Non-Goals·기타 문서에서 이월)

| 항목 | 최초 발생 문서 | 상태 |
|---|---|---|
| 서비스/브랜드명 확정 | project-vision.md | 미결정 |
| 1차 타깃 시장/다국어 여부 | project-vision.md | 미결정 |
| 의료광고법 등 규제 적용 범위 | project-vision.md | 미결정 |
| 유료 멤버십 등급 존재 여부 | user-value-proposition.md | 미결정 |
| 실사 기반 벤치마크 갱신 | visual-benchmark-matrix.md | 미결정 |
| 국내 경쟁사 벤치마크 추가 | visual-benchmark-matrix.md | 미결정 |
| 사업자 형태/신고 대상 여부 | scope-and-non-goals.md | 미결정 |
| 초기 카테고리 우선순위 | scope-and-non-goals.md | 미결정 |
| MVP 판매유형 범위 | scope-and-non-goals.md | 미결정 |

이 표는 이후 작업(TASK-002~010)에서 새로운 미결정 항목이 발생할 때마다 갱신한다.
