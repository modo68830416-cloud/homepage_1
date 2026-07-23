# TASK-001 — 프로젝트 비전 및 개발요건 정의서

> Project: Premium Real Estate Platform 2026

## 1. 프로젝트 목표

공인중개사가 직접 운영하는 프리미엄 부동산 플랫폼을 구축한다.

단순한 매물 나열형 홈페이지가 아닌 **검색 중심**, **고급 비주얼**, **빠른 사용자 경험**, **확장 가능한 구조**를 갖춘 차세대 플랫폼을 목표로 한다.

---

## 2. 핵심 목표

- 2026 UI/UX 트렌드 반영
- 국내 최고 수준의 부동산 검색 경험
- 모바일 우선 반응형 설계
- 화려하지만 빠른 애니메이션
- SEO 및 AI 검색 최적화
- Claude Code 기반 모듈형 개발

---

## 3. 서비스 범위

### 취급 부동산

- 아파트
- 주택
- 오피스텔
- 상가
- 사무실
- 토지
- 공장
- 창고
- 신축 분양
- 분양권
- 경매
- 급매물

---

## 4. 주요 사용자

- 매수 고객
- 매도 고객
- 임차인
- 임대인
- 투자자
- 공인중개사
- 관리자

---

## 5. 2026 디자인 방향

### Visual Keywords

- Glass Morphism
- Aurora Gradient
- Bento Layout
- Cinematic Hero
- Scroll Storytelling
- Premium Typography
- Micro Interaction
- GSAP Motion
- Framer Motion
- Three.js Effects

### 브랜드 이미지

고급 · 신뢰 · 미래지향 · 프리미엄

---

## 6. 메인 화면 컨셉

1. Full Screen Hero
2. 대형 통합 검색창
3. 인기 지역
4. 추천 매물
5. 지도 연동
6. AI 추천
7. 실시간 거래 현황
8. 고객 후기
9. 상담 CTA

---

## 7. 개발 원칙

- Component First
- Atomic Design
- Mobile First
- Accessibility
- SEO First
- Performance First

---

## 8. 기술 스택

Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- Framer Motion
- GSAP
- Three.js

Backend

- NestJS
- PostgreSQL
- Prisma

Infra

- Docker
- Vercel
- Cloudflare
- Cloudflare R2

검색

- Elasticsearch

지도

- Kakao Maps
- Naver Maps

---

## 9. 폴더 구조

```text
apps/
packages/
components/
features/
shared/
lib/
styles/
public/
docs/
```

---

## 10. Claude Code 개발 규칙

- 기능 단위로 Task 생성
- 작은 PR 단위 개발
- 재사용 가능한 컴포넌트 우선
- TypeScript strict 사용
- ESLint/Prettier 준수
- 테스트 가능한 구조 유지

---

## 11. 성공 기준

- Lighthouse Performance 95+
- SEO 100 목표
- 접근성 AA 이상
- 모바일 최적화
- 확장 가능한 모듈 구조
- 유지보수 용이성 확보

---

## 다음 문서

- TASK-002.md : IA / 사이트맵 / 정보구조
