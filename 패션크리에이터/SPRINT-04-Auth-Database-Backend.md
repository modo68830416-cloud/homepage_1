
# SPRINT-04 — Authentication, Database & Backend Foundation

> 프로젝트: Fashion Creator  
> 선행 작업: SPRINT-01, SPRINT-02, SPRINT-03 완료  
> 목표: 브라우저 DEMO 상태를 실제 사용자 계정과 데이터베이스에 연결할 수 있는 백엔드 기반을 구축한다.  
> 실행 환경: Claude Code + GitHub Codespaces  
> 우선순위: 최상  
> 상태: Ready

---

## 0. Claude Code 실행 지시

이 문서를 프로젝트 루트 또는 `sprints/` 폴더에 저장한 뒤 다음과 같이 실행한다.

```text
SPRINT-04-Auth-Database-Backend.md를 읽고 현재 Fashion Creator 프로젝트 전체를 분석한 뒤 요구사항을 순서대로 구현해줘.

중요 원칙:
- 현재 UI와 디자인 시스템은 유지해줘.
- Sprint-01~03에서 구현한 버튼, 상태관리, Demo Service, Repository, AI Gateway를 삭제하지 말고 확장해줘.
- 기존 localStorage DEMO 데이터는 즉시 제거하지 말고, 로그인하지 않은 사용자용 Guest Mode fallback으로 유지해줘.
- 로그인한 사용자의 데이터는 실제 데이터베이스 Repository를 사용하도록 구조를 분리해줘.
- 인증, 데이터베이스, 파일 저장 Provider는 교체 가능한 인터페이스로 설계해줘.
- 특정 서비스에 강하게 종속되지 않도록 Adapter 패턴을 적용해줘.
- 실제 결제, 실제 AI 생성, 실제 판매 정산은 이번 Sprint에서 연결하지 말아줘.
- 사진, 계좌번호, 카드번호와 같은 민감정보를 브라우저 localStorage에 저장하지 말아줘.
- 환경변수나 비밀키를 클라이언트 코드에 노출하지 말아줘.
- 중간 확인 질문을 반복하지 말고 합리적인 기본값으로 끝까지 구현해줘.

각 단계 완료 후 다음 명령을 실행하고 오류를 모두 수정해줘.

npm run lint
npm run typecheck
npm run build

테스트가 있다면 npm run test도 실행해줘.
```

---

# 1. Sprint 목적

현재 Fashion Creator는 화면, 버튼, Demo Engine, 상태관리와 AI Gateway 구조를 갖추고 있다.

이번 Sprint에서는 다음 단계로 발전시킨다.

```text
Guest Demo Mode
→ 회원가입·로그인
→ 사용자 유형 선택
→ 사용자별 데이터 저장
→ 서버 Repository
→ 비공개 파일 저장 준비
→ 권한 및 보안
→ 실제 서비스 백엔드 기반
```

Sprint 완료 후 사용자는 계정을 생성하고, 자신이 만든 모델·Look·콘텐츠·장바구니·즐겨찾기·크리에이터 설정을 계정별로 저장하고 다시 불러올 수 있어야 한다.

---

# 2. 이번 Sprint 포함 범위

## 포함

- 인증 Provider 인터페이스
- 이메일 기반 회원가입·로그인
- 로그아웃
- 비밀번호 재설정 화면과 흐름 준비
- 소셜 로그인 Provider 확장 구조
- 사용자 세션
- Guest Mode
- 사용자 유형과 역할
- 온보딩
- 데이터베이스 ORM 또는 SDK 구성
- 사용자별 데이터 Repository
- 모델·아바타 설정 저장
- Look 저장
- 콘텐츠 프로젝트 저장
- 장바구니·즐겨찾기 저장
- Creator Profile 저장
- Marketplace 기본 프로필 저장
- 비공개 파일 Storage 인터페이스
- 서버 측 입력 검증
- 권한 검사
- Route Protection
- 데이터 마이그레이션 기반
- 개발용 Seed 데이터
- 감사 로그 기반
- 개인정보 삭제 요청 준비

## 제외

- 실제 AI 생성 API
- 실제 결제 승인
- 실제 정산 송금
- 계좌 인증
- 카드번호 저장
- 세금 처리
- 실제 쇼핑몰 상품 API
- 실제 SNS 자동 게시
- 완전한 운영자 Admin CMS

---

# 3. 권장 기술 선택

Claude Code는 현재 프로젝트와 설치된 패키지를 먼저 확인한다.

다음 우선순위를 사용한다.

## 인증 및 데이터베이스 통합 Provider 후보

1. Supabase
2. Auth.js + PostgreSQL
3. Clerk + PostgreSQL
4. 기존 프로젝트에 이미 포함된 Provider

초기 프로토타입에서는 Supabase가 가장 빠르지만, 코드는 Provider/Repository 인터페이스를 통해 종속성을 최소화한다.

## ORM

- 기존 ORM이 있으면 재사용
- 없다면 Prisma 또는 Drizzle 중 프로젝트 구조와 호환성이 좋은 도구 선택
- Supabase SDK만 사용하는 구조도 가능하지만 Domain Repository 계층은 유지

## 검증

- Zod
- 서버와 클라이언트가 동일 Schema를 재사용할 수 있게 구성

---

# 4. 실행 모드

환경변수로 모드를 구분한다.

```text
NEXT_PUBLIC_APP_MODE=demo
NEXT_PUBLIC_AUTH_MODE=demo
NEXT_PUBLIC_DATA_MODE=local
```

실제 Backend Mode 예시:

```text
NEXT_PUBLIC_APP_MODE=preview
NEXT_PUBLIC_AUTH_MODE=provider
NEXT_PUBLIC_DATA_MODE=database
```

코드에서 직접 문자열 비교를 반복하지 말고 Config Module에서 관리한다.

예:

```ts
export const appConfig = {
  appMode: process.env.NEXT_PUBLIC_APP_MODE ?? "demo",
  authMode: process.env.NEXT_PUBLIC_AUTH_MODE ?? "demo",
  dataMode: process.env.NEXT_PUBLIC_DATA_MODE ?? "local",
};
```

---

# 5. 인증 아키텍처

## 5.1 Auth Provider 인터페이스

```ts
export interface AuthProvider {
  getCurrentUser(): Promise<AuthUser | null>;
  signUp(input: SignUpInput): Promise<AuthResult>;
  signIn(input: SignInInput): Promise<AuthResult>;
  signOut(): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  updatePassword(password: string): Promise<void>;
  getSession(): Promise<AuthSession | null>;
}
```

구현:

```text
DemoAuthProvider
DatabaseAuthProvider 또는 SupabaseAuthProvider
```

UI 컴포넌트가 특정 인증 SDK를 직접 호출하지 않도록 한다.

---

# 6. 인증 화면

라우트:

```text
/auth/sign-in
/auth/sign-up
/auth/forgot-password
/auth/reset-password
/auth/callback
/onboarding
```

## 로그인

- 이메일
- 비밀번호
- 로그인 유지
- 비밀번호 찾기
- 회원가입 이동
- Guest Demo 계속하기

## 회원가입

- 이메일
- 비밀번호
- 비밀번호 확인
- 이용약관 동의
- 개인정보처리 안내 동의
- 마케팅 동의 선택
- 사용자 유형은 가입 후 온보딩에서 선택

## 소셜 로그인 준비

UI 버튼:

- Google
- Kakao
- Naver

실제 Provider가 연결되지 않았으면 `준비 중`이 아니라 DEMO Provider 안내 또는 비활성 상태의 명확한 설명을 제공한다.

---

# 7. 사용자 유형과 역할

## 사용자 유형

```ts
type AccountType =
  | "consumer"
  | "creator"
  | "brand"
  | "admin";
```

## 역할

```ts
type UserRole =
  | "user"
  | "creator"
  | "brand-member"
  | "brand-admin"
  | "platform-admin";
```

## 권한 예시

### Consumer

- AI 모델 선택
- 아바타 생성
- Look 저장
- 콘텐츠 체험
- 상품 구매
- 즐겨찾기

### Creator

- 모든 Consumer 기능
- 콘텐츠 프로젝트
- 구매 링크
- Creator Dashboard
- Marketplace 콘텐츠 등록
- 캠페인 지원
- 수익 화면

### Brand

- 캠페인 생성
- 크리에이터 검색
- 제작 의뢰
- 콘텐츠 라이선스
- 브랜드 팀

### Admin

이번 Sprint에서는 타입과 Guard 기반만 준비한다.

---

# 8. 온보딩

회원가입 후 `/onboarding`으로 이동한다.

## Step 1 — 목적 선택

- 옷을 입혀보고 구매하고 싶어요.
- 패션 콘텐츠를 만들고 싶어요.
- 크리에이터로 수익을 만들고 싶어요.
- 브랜드 상품을 홍보하고 싶어요.

## Step 2 — 프로필

- 표시 이름
- 사용자명
- 프로필 이미지 선택
- 관심 스타일
- 선호 카테고리

## Step 3 — 사용자 유형

- 일반 사용자
- 크리에이터
- 브랜드

## Step 4 — 시작 행동

- AI 모델 선택
- 내 아바타 만들기
- 인기 상품 보기
- Creator Dashboard
- 캠페인 등록

온보딩 완료 상태를 데이터베이스에 저장한다.

---

# 9. 세션과 Route Protection

## 공개 라우트

```text
/
/trends
/models
/marketplace
/marketplace/creators/[handle]
/marketplace/content/[slug]
/look/[slug]
/pricing
/auth/*
```

## 로그인 권장 또는 필요

```text
/models/create
/studio
/create
/create/new
/creator/*
/marketplace/requests/new
```

## 역할 제한

```text
/creator/* → creator 이상
/brand/* → brand 역할
/admin/* → platform-admin
```

Middleware 또는 Server Guard를 사용한다.

클라이언트 redirect만으로 보안을 처리하지 않는다.

---

# 10. Guest Mode

로그인하지 않은 사용자는 DEMO 흐름을 계속 체험할 수 있다.

Guest Mode 데이터:

- selected model
- 최근 선택 상품
- 1~3개 Look
- 1개 콘텐츠 프로젝트
- 장바구니
- 즐겨찾기

저장:

- localStorage Repository

로그인 전환 시 사용자에게 묻는다.

```text
현재 브라우저에 저장된 DEMO 작업을 계정으로 가져오시겠습니까?
```

선택:

- 가져오기
- 새로 시작
- 나중에

---

# 11. Guest Data Migration

마이그레이션 대상:

- Saved Models
- Body Settings
- Saved Looks
- Content Projects
- Cart
- Favorites
- Recently Viewed

절차:

```text
Guest 데이터 읽기
→ 서버 Schema 검증
→ ID 재발급
→ 사용자 ID 연결
→ 중복 검사
→ 저장
→ 성공 후 localStorage 정리 선택
```

마이그레이션은 멱등성을 가져야 한다.

같은 데이터를 여러 번 가져와도 중복 생성되지 않도록 `guestImportKey` 또는 checksum 사용을 검토한다.

---

# 12. 데이터베이스 도메인

최소 엔티티:

```text
users
profiles
user_preferences
avatars
avatar_body_profiles
looks
look_items
content_projects
generated_assets
favorites
recently_viewed
carts
cart_items
creator_profiles
brand_profiles
marketplace_contents
campaigns
campaign_applications
audit_logs
```

---

# 13. 핵심 데이터 모델

## Profile

```ts
type UserProfile = {
  id: string;
  userId: string;
  displayName: string;
  handle: string;
  avatarUrl?: string;
  accountType: AccountType;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};
```

## Avatar

```ts
type AvatarRecord = {
  id: string;
  userId: string;
  name: string;
  source: "preset" | "photo";
  previewUrl: string;
  bodyProfileId?: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
};
```

## Look

```ts
type LookRecord = {
  id: string;
  userId: string;
  slug: string;
  name: string;
  modelId: string;
  visibility: "private" | "unlisted" | "public";
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};
```

## Content Project

```ts
type ContentProjectRecord = {
  id: string;
  userId: string;
  sourceLookId: string;
  title: string;
  format: string;
  status: string;
  settings: unknown;
  outputAssetId?: string;
  createdAt: string;
  updatedAt: string;
};
```

---

# 14. 데이터베이스 제약조건

필수:

- 모든 사용자 데이터에 `userId`
- 외래키
- createdAt
- updatedAt
- 필요한 경우 soft delete
- unique handle
- unique slug
- order/campaign 관련 금액 integer
- 공개 범위 visibility
- 민감 데이터와 공개 데이터 분리

금액:

```text
대한민국 원화는 정수 단위로 저장
예: 29,000원 → 29000
```

---

# 15. Repository 전환

Sprint-02의 Repository를 유지하고 구현체를 추가한다.

```ts
interface LookRepository {
  listByUser(userId: string): Promise<LookRecord[]>;
  getById(id: string, userId: string): Promise<LookRecord | null>;
  create(input: CreateLookInput, userId: string): Promise<LookRecord>;
  update(id: string, input: UpdateLookInput, userId: string): Promise<LookRecord>;
  delete(id: string, userId: string): Promise<void>;
}
```

구현:

```text
LocalLookRepository
DatabaseLookRepository
```

Factory:

```ts
getLookRepository()
```

Data Mode에 따라 구현체 선택.

---

# 16. 서버 액션 또는 API

권장 기능:

```text
POST   /api/looks
GET    /api/looks
GET    /api/looks/[id]
PATCH  /api/looks/[id]
DELETE /api/looks/[id]

POST   /api/content-projects
GET    /api/content-projects
PATCH  /api/content-projects/[id]
DELETE /api/content-projects/[id]

GET    /api/me
PATCH  /api/me/profile
```

Next.js Server Actions를 사용해도 된다.

중요:

- 세션 확인
- 사용자 ID는 client body를 신뢰하지 않음
- 서버에서 session userId 사용
- Zod 검증
- 에러 표준화

---

# 17. API 응답 표준

```ts
type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
};
```

오류 코드 예시:

- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `VALIDATION_ERROR`
- `CONFLICT`
- `RATE_LIMITED`
- `INTERNAL_ERROR`

---

# 18. 파일 Storage 아키텍처

## Storage Provider

```ts
interface StorageProvider {
  createUploadUrl(input: UploadRequest): Promise<SignedUpload>;
  createDownloadUrl(path: string): Promise<string>;
  delete(path: string): Promise<void>;
}
```

구현:

- DemoStorageProvider
- SupabaseStorageProvider 또는 S3CompatibleStorageProvider

---

# 19. 사진과 자산 저장 정책

## 사용자 정면 사진

- private bucket
- 직접 public URL 금지
- signed URL
- 목적 제한
- 원본과 생성 결과 분리
- 삭제 가능
- 향후 자동 삭제 정책 준비

## 공개 Marketplace 콘텐츠

- 승인 후 public 또는 CDN asset
- 원본 파일과 preview 분리
- 워터마크 preview
- 라이선스 구매 후 원본 접근 준비

## 금지

- 원본 사진을 localStorage base64 저장
- public 폴더에 사용자 사진 저장
- 클라이언트에서 서비스 비밀키 사용
- console에 사진 URL 또는 사용자 정보 출력

---

# 20. 파일 업로드 DEMO 및 Preview Mode

실제 Storage 환경변수가 없을 경우:

- 기존 브라우저 object URL preview 유지
- 업로드 버튼은 DEMO MODE 표시
- 데이터베이스에는 실제 object URL을 저장하지 않음
- 저장 실패 시 local fallback 또는 명확한 안내

---

# 21. 보안

## 필수

- Server-side authorization
- CSRF 고려
- XSS 방지
- HTML 입력 sanitize
- 업로드 MIME type 검증
- 파일 크기 제한
- 파일 확장자와 MIME 교차 확인
- Rate limit 인터페이스
- SQL Injection은 ORM parameterization 사용
- 비밀키 server-only
- 공개 환경변수 접두사 주의

## 로그

다음 값을 로그에 남기지 않는다.

- 비밀번호
- 토큰
- 전체 이메일
- 정면 사진 URL
- 계좌번호
- 카드 정보
- 세션 쿠키

---

# 22. 권한 검사

도메인 함수로 분리한다.

```ts
canEditLook(user, look)
canViewAvatar(user, avatar)
canCreateCampaign(user)
canAccessCreatorDashboard(user)
canPublishMarketplaceContent(user, content)
```

UI에서 숨기는 것만으로 권한을 보장하지 않는다.

---

# 23. 개인정보와 계정 삭제

설정 화면에 준비:

```text
/creator/settings
/settings/account
/settings/privacy
```

기능:

- 프로필 수정
- 비밀번호 변경
- 내 데이터 다운로드 준비
- 아바타 원본 사진 삭제
- 생성 콘텐츠 삭제
- 계정 삭제 요청

계정 삭제 DEMO 흐름:

```text
확인
→ 비밀번호 재확인 또는 인증 준비
→ 삭제 대상 안내
→ 유예 기간 안내 DEMO
→ 요청 생성
```

실제 삭제 정책은 법률 검토 TODO로 남긴다.

---

# 24. Audit Log

기록 대상:

- 로그인
- 로그아웃
- 프로필 변경
- 아바타 생성·삭제
- Look 생성·삭제
- 콘텐츠 공개 상태 변경
- Marketplace 게시
- 캠페인 지원
- 권한 변경

```ts
type AuditLog = {
  id: string;
  actorUserId: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
};
```

민감 데이터는 metadata에 넣지 않는다.

---

# 25. Seed 데이터

개발 환경에서 실행 가능한 seed 작성.

포함:

- 일반 사용자 1명
- 크리에이터 2명
- 브랜드 1개
- AI 모델 8개
- 상품 20개
- Look 6개
- 콘텐츠 8개
- 캠페인 4개

실제 개인정보처럼 보이는 데이터를 사용하지 않는다.

---

# 26. 로딩·오류·오프라인 상태

## 인증

- 세션 확인 중
- 로그인 실패
- 이메일 중복
- 비밀번호 정책 오류
- 로그아웃 실패

## 데이터

- 서버 연결 실패
- 저장 실패
- 동기화 실패
- Guest Mode 전환
- 재시도

사용자가 작업을 잃지 않도록 임시 Draft를 유지한다.

---

# 27. Optimistic Update

적용 가능한 기능:

- 즐겨찾기
- Look 이름 변경
- 장바구니
- 콘텐츠 프로젝트 제목
- 공개 상태 변경

실패 시 rollback과 toast.

아바타 삭제나 Marketplace 게시처럼 중요한 작업은 서버 성공 후 UI 확정.

---

# 28. React Server Components 원칙

- 읽기 중심 페이지는 Server Component 우선
- interactive panel만 Client Component
- 인증 세션은 서버에서 우선 확인
- DB 조회는 서버에서 수행
- client bundle 최소화

모든 페이지에 `"use client"`를 추가하는 방식 금지.

---

# 29. 환경변수 문서

`.env.example`을 작성한다.

예시:

```text
NEXT_PUBLIC_APP_MODE=demo
NEXT_PUBLIC_AUTH_MODE=demo
NEXT_PUBLIC_DATA_MODE=local

DATABASE_URL=
AUTH_SECRET=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STORAGE_BUCKET_PRIVATE=
STORAGE_BUCKET_PUBLIC=
```

실제 비밀키 값은 커밋하지 않는다.

---

# 30. 데이터베이스 마이그레이션

필수:

- 초기 Schema Migration
- Seed Script
- rollback 전략 문서
- 개발/Preview/Production 환경 분리

명령은 선택한 ORM에 맞춰 package scripts에 추가한다.

예:

```json
{
  "scripts": {
    "db:generate": "...",
    "db:migrate": "...",
    "db:seed": "...",
    "db:studio": "..."
  }
}
```

---

# 31. 테스트

## Unit Test

- 권한 함수
- Repository
- Schema 검증
- Guest Migration
- 원화 formatter
- slug 생성

## Integration Test

- 회원가입 DEMO
- 로그인
- Guest Look 가져오기
- Look 저장
- Content Project 저장
- 다른 사용자의 Look 접근 차단

## E2E 핵심 흐름

```text
회원가입
→ 온보딩
→ 모델 선택
→ Studio
→ Look 저장
→ 로그아웃
→ 로그인
→ 저장 Look 확인
```

---

# 32. 구현 순서

1. 현재 인증·DB·Repository 구조 분석
2. App Config와 실행 모드 정리
3. Auth Provider 인터페이스
4. Demo Auth 구현
5. 실제 Provider Adapter 준비
6. 인증 화면
7. 세션과 Route Guard
8. 사용자·프로필 Schema
9. 핵심 Domain Schema
10. Database Repository
11. Local/Database Repository Factory
12. Guest 데이터 마이그레이션
13. Storage Provider
14. Account·Privacy 화면
15. Seed와 Migration
16. 테스트
17. 보안·접근성·모바일 점검
18. lint/typecheck/build

---

# 33. 완료 조건

## 인증

- [ ] 회원가입 화면이 작동한다.
- [ ] 로그인·로그아웃이 작동한다.
- [ ] Guest Mode가 유지된다.
- [ ] 온보딩이 작동한다.
- [ ] 세션에 따라 메뉴가 변경된다.
- [ ] 보호 라우트가 서버에서 차단된다.

## 데이터베이스

- [ ] Profile Schema가 존재한다.
- [ ] Avatar·Look·Content Project가 사용자별로 저장된다.
- [ ] 다른 사용자 데이터에 접근할 수 없다.
- [ ] Local Repository와 Database Repository가 분리된다.
- [ ] 환경변수로 Data Mode 전환이 가능하다.

## 마이그레이션

- [ ] Guest 데이터를 계정으로 가져올 수 있다.
- [ ] 중복 가져오기가 방지된다.
- [ ] 성공·실패 상태가 표시된다.

## Storage

- [ ] Storage Provider 인터페이스가 존재한다.
- [ ] private/public 자산 정책이 분리된다.
- [ ] 원본 사진을 localStorage에 저장하지 않는다.
- [ ] signed URL 구조가 준비된다.

## 품질

- [ ] Zod 서버 검증
- [ ] 권한 함수
- [ ] `.env.example`
- [ ] Migration과 Seed
- [ ] Audit Log 기반
- [ ] 모바일 인증 화면
- [ ] 접근성
- [ ] lint 통과
- [ ] typecheck 통과
- [ ] build 통과

---

# 34. 금지 사항

- 기존 UI 전면 변경
- Demo Engine 제거
- 모든 데이터를 갑자기 실제 DB로 강제 이전
- 사용자 ID를 client 입력값으로 신뢰
- 비밀키 client 노출
- 사용자 사진 public 저장
- 원본 사진 base64 localStorage 저장
- 카드번호·계좌번호 저장
- 역할 검사를 클라이언트 UI에만 의존
- 인증 실패를 단순 alert로만 처리
- 모든 페이지를 Client Component로 변경

---

# 35. Sprint 완료 보고 형식

```text
SPRINT-04 완료

1. 선택한 인증·DB 기술
2. Auth Provider 구조
3. 사용자 역할과 권한
4. 데이터베이스 Schema
5. Repository 구현
6. Guest Migration
7. Storage Provider
8. Route Protection
9. 보안 대응
10. 생성/수정 파일
11. Migration·Seed 실행 결과
12. 테스트 결과
13. lint 결과
14. typecheck 결과
15. build 결과
16. 로컬 확인 URL
17. Preview 배포 준비 상태
18. SPRINT-05 권장사항
```

---

# 36. SPRINT-05 연결 준비

SPRINT-04 완료 후 다음 단계에서는 실제 외부 서비스 연동을 선택할 수 있다.

권장 SPRINT-05 후보:

```text
A. 실제 상품 Catalog·제휴 링크 연동
B. 실제 AI 이미지·영상 Provider 1차 연동
C. 결제·구독 Provider 연동
D. Admin CMS·운영 도구
```

현재 프로젝트 목표상 가장 권장되는 다음 순서는:

```text
실제 상품 Catalog 및 제휴 링크
→ 실제 AI 이미지 생성
→ 실제 영상 생성
→ 결제와 구독
```

---

# 최종 목표

SPRINT-04의 목표는 Fashion Creator를 다음 상태로 만드는 것이다.

```text
누구나 체험할 수 있는 Guest Demo와
계정별로 데이터를 안전하게 저장하는 실제 Backend Mode를 함께 제공하고,
향후 AI·결제·쇼핑 API를 연결해도
기존 UI와 도메인 구조를 다시 만들 필요가 없는 서비스 기반.
```
