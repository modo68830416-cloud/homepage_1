# TASK-007 — 회원 시스템 및 마이페이지 명세

## 목적
회원 인증, 권한 관리, 관심 매물, 상담 이력 등을 제공하는 사용자 시스템을 정의한다.

---

# 1. 회원 유형

- 일반 회원
- 공인중개사
- 관리자

---

# 2. 인증

- 이메일 회원가입
- 이메일 로그인
- 비밀번호 찾기
- JWT 인증
- Refresh Token
- OAuth 확장 가능(Google, Kakao, Naver)

---

# 3. 회원가입

필수 정보
- 이름
- 이메일
- 비밀번호
- 휴대폰 번호
- 약관 동의

선택 정보
- 관심 지역
- 관심 매물 유형

---

# 4. 마이페이지

- 프로필
- 관심 매물
- 최근 본 매물
- 상담 내역
- 예약 내역
- 알림 설정
- 계정 설정

---

# 5. 관심 매물

- 추가
- 삭제
- 메모
- 정렬
- 공유

---

# 6. 최근 본 매물

- 최대 100건
- 로그인 시 서버 동기화
- 비회원은 LocalStorage 사용

---

# 7. 알림

- 신규 매물
- 가격 변경
- 예약 일정
- 공지사항

---

# 8. 보안

- 비밀번호 해시(Bcrypt/Argon2)
- HTTPS 전용
- CSRF 대응
- Rate Limit
- XSS / SQL Injection 방어

---

# 9. API

POST /auth/signup
POST /auth/login
POST /auth/logout
POST /auth/refresh

GET /me
PATCH /me

GET /favorites
POST /favorites
DELETE /favorites/{id}

GET /history

---

# 10. DB 주요 테이블

users
user_profiles
favorites
view_history
notifications
reservations

---

# 11. 권한(Role)

USER
AGENT
ADMIN

Route Guard 적용

---

# 12. Claude Code 컴포넌트

LoginForm.tsx
SignupForm.tsx
ForgotPassword.tsx
ProfileCard.tsx
FavoriteList.tsx
HistoryList.tsx
NotificationPanel.tsx
ReservationList.tsx

모든 인증 로직은 Middleware 및 Server Action과 연계하여 구현한다.
