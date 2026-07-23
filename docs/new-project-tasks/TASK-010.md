# TASK-010 — Claude Code 개발 실행 가이드

## 목적
본 문서는 TASK-001 ~ TASK-009를 기반으로 Claude Code가 프로젝트를 단계적으로 구현할 수 있도록 개발 순서, 규칙, 품질 기준을 정의한다.

---

# 1. 개발 원칙

- TypeScript 100%
- App Router 기반 Next.js
- Server Component 우선
- Client Component 최소화
- 재사용 가능한 컴포넌트 설계
- Feature 기반 폴더 구조
- 반응형 우선(Mobile First)

---

# 2. 권장 개발 순서

Phase 1
- 프로젝트 초기화
- 디자인 시스템
- 공통 Layout
- Header / Footer

Phase 2
- 메인 페이지
- 검색 시스템
- 목록 페이지

Phase 3
- 상세 페이지
- 지도
- 추천 시스템

Phase 4
- 회원 시스템
- 마이페이지
- 상담 기능

Phase 5
- 관리자 시스템
- 통계
- 운영 기능

Phase 6
- 성능 최적화
- SEO
- 테스트
- 배포

---

# 3. 폴더 구조

app/
components/
features/
hooks/
lib/
services/
store/
styles/
types/
utils/

---

# 4. 코딩 컨벤션

- ESLint
- Prettier
- Husky
- Commitlint

네이밍
- PascalCase: Component
- camelCase: 함수
- kebab-case: Route
- UPPER_SNAKE_CASE: 환경 변수

---

# 5. 품질 기준

- Lighthouse 95+
- Core Web Vitals 통과
- 접근성(ARIA) 준수
- SEO 최적화
- 이미지 WebP/AVIF 사용

---

# 6. 테스트

- Unit Test
- Integration Test
- E2E Test
- API Test

---

# 7. 보안

- JWT
- RBAC
- HTTPS
- CSP
- XSS 방어
- CSRF 방어
- SQL Injection 방어
- Rate Limiting

---

# 8. Git 전략

main
develop
feature/*
hotfix/*

PR 기반 병합

---

# 9. 배포

Frontend: Vercel
Backend: Docker
Database: PostgreSQL
Cache: Redis
Search: Elasticsearch

CI/CD
- GitHub Actions
- 자동 테스트
- 자동 배포

---

# 10. 최종 체크리스트

- 디자인 시스템 적용
- 모든 페이지 반응형
- 검색 기능 정상
- 로그인/권한 정상
- 관리자 기능 정상
- SEO 완료
- 성능 최적화 완료
- 접근성 점검 완료
- 테스트 통과
- 배포 완료

---

# 11. Claude Code 작업 규칙

- 한 번에 하나의 Feature 구현
- 구현 후 즉시 테스트
- 공통 컴포넌트 우선 재사용
- API와 UI를 분리
- 환경 변수 하드코딩 금지
- 에러 처리 및 로깅 필수
- 모든 주요 기능에 타입 정의 작성
- 문서(Task)와 구현 내용 동기화 유지

---

이 문서는 프로젝트의 최종 개발 기준 문서이며 TASK-001부터 TASK-009까지의 모든 명세를 통합하여 구현의 기준으로 사용한다.
