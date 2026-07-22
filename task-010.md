# TASK-010 통합·QA·배포·Claude Code 실행 로드맵

- 프로젝트: 고도화 건강정보·멀티커머스 플랫폼
- 작업 ID: TASK-010
- 문서 버전: v1.0
- 작성일: 2026-07-23
- 실행 대상: Claude Code
- 선행 원칙: MERION/MOMO와 무관한 독립 프로젝트
- 상태: 실행 준비

---


## 1. 목표

TASK-001~009의 결과를 하나의 서비스로 통합하고, 반복 가능한 QA·배포·운영 체계를 완성한다.

## 2. 통합 순서

1. 전략 문서 검수
2. IA와 URL 검수
3. 디자인 토큰 적용
4. 모션 시스템 적용
5. 메인·콘텐츠 통합
6. 검색 통합
7. 커머스 통합
8. 관리자 통합
9. 성능·보안·SEO 적용
10. 배포 및 모니터링

## 3. 환경

- local
- development
- staging
- production

환경별 데이터, 결제키, 검색 인덱스, 파일 저장소를 분리한다.

## 4. 테스트

- Unit
- Integration
- E2E
- Visual Regression
- Accessibility
- Performance
- Security
- Payment Sandbox
- Search relevance
- Content safety
- Mobile device test

## 5. 출시 단계

### Alpha

핵심 콘텐츠와 검색, 샘플 상품으로 내부 검증

### Beta

회원, 장바구니, 결제, 관리자, 분석 포함 제한 공개

### Production

운영 정책, 고객지원, 백업, 모니터링까지 완료 후 공개

## 6. 산출물

- `docs/roadmap/master-roadmap.md`
- `docs/roadmap/dependency-map.md`
- `docs/roadmap/release-checklist.md`
- `docs/qa/test-plan.md`
- `docs/qa/acceptance-criteria.md`
- `docs/deployment/runbook.md`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- 환경변수 예시
- 샘플 데이터
- 운영 인수 문서

## 7. Claude Code 작업 규칙

각 구현 작업은 다음 형식으로 관리한다.

- Task ID
- 목적
- 선행 작업
- 수정 파일
- 구현 내용
- 제외 범위
- 테스트
- 완료 조건
- 롤백 방법
- 결과 요약

한 번에 거대한 기능을 구현하지 않는다. 각 작업은 독립적으로 검수하고 커밋할 수 있는 크기로 나눈다.

## 8. 최종 완료 조건

- 메인, 콘텐츠, 검색, 상품, 회원, 주문, 관리자 핵심 흐름이 연결된다.
- 자체판매와 제휴판매가 최소 실제 동작한다.
- 다른 판매 유형은 데이터 구조와 확장 지점이 검증된다.
- 모바일과 데스크톱에서 시각적 완성도가 유지된다.
- 접근성, 성능, 보안 기준을 통과한다.
- 장애 대응과 배포 롤백 문서가 있다.
- Claude Code가 다음 작업을 판단할 수 있는 최신 상태 문서가 있다.
