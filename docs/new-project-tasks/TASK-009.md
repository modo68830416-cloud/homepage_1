# TASK-009 — 시스템 아키텍처 및 데이터베이스 설계

## 목적
Claude Code가 전체 프로젝트를 안정적으로 구현할 수 있도록 시스템 구조, 데이터베이스, API, 인프라를 정의한다.

---

# 1. 기술 스택

Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion

Backend
- NestJS
- Prisma ORM

Database
- PostgreSQL

Cache
- Redis

Search
- Elasticsearch

Storage
- AWS S3 (확장 가능)

---

# 2. 프로젝트 구조

apps/
  web/
  api/

packages/
  ui/
  config/
  types/
  utils/

---

# 3. 데이터베이스 주요 테이블

users
profiles
properties
property_images
favorites
reservations
notifications
view_history
regions
banners
notices
faqs
audit_logs

---

# 4. Prisma 모델 예시

User
Property
Favorite
Reservation
Notification

모든 모델은 createdAt, updatedAt을 포함한다.

---

# 5. API 구조

Auth
/auth/*

User
/users/*

Property
/properties/*

Reservation
/reservations/*

Favorite
/favorites/*

Admin
/admin/*

---

# 6. 인증

- JWT Access Token
- Refresh Token
- Role Based Access Control(RBAC)

Roles
- USER
- AGENT
- ADMIN

---

# 7. Redis

- Session Cache
- 검색 캐시
- 인기 검색어
- Rate Limit

---

# 8. Elasticsearch

Index
- property
- region
- keyword

지원 기능
- 자동완성
- 전문 검색
- 유사 검색

---

# 9. 파일 저장

원본 이미지
썸네일
WebP 변환

폴더 구조
/uploads
/properties
/banners
/users

---

# 10. 환경 변수

DATABASE_URL
REDIS_URL
JWT_SECRET
S3_KEY
S3_SECRET
ELASTICSEARCH_URL

---

# 11. 배포

Frontend
Vercel

Backend
Docker

Database
PostgreSQL

Redis

Nginx Reverse Proxy

---

# 12. 모니터링

Health Check

Logging

Error Tracking

Performance Monitoring

---

# 13. Claude Code 구현 규칙

- Feature 기반 폴더 구조
- Clean Architecture 적용
- Repository Pattern
- Service Layer 분리
- DTO Validation
- Swagger 자동 문서화
- 단위 테스트 및 E2E 테스트 지원
