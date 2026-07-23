# TASK-008 — 관리자(Admin) 시스템 명세

## 목적
플랫폼 운영자가 매물, 회원, 문의, 콘텐츠 및 통계를 효율적으로 관리할 수 있는 관리자 시스템을 구축한다.

---

# 1. 관리자 대시보드

- 오늘 방문자
- 신규 회원
- 신규 매물
- 상담 요청
- 거래 현황
- 최근 활동 로그
- 실시간 알림

---

# 2. 매물 관리

기능
- 등록
- 수정
- 삭제
- 임시 저장
- 공개/비공개
- 승인/반려
- 일괄 수정
- 일괄 삭제

필터
- 거래 유형
- 지역
- 담당자
- 등록일
- 상태

---

# 3. 회원 관리

- 회원 검색
- 권한 변경
- 계정 활성/비활성
- 활동 이력
- 로그인 기록

권한
- USER
- AGENT
- ADMIN

---

# 4. 상담 관리

- 상담 목록
- 예약 일정
- 처리 상태
- 담당자 지정
- 메모

상태
- 접수
- 진행
- 완료
- 취소

---

# 5. 콘텐츠 관리

- 공지사항
- FAQ
- 배너
- 팝업
- 메인 추천 영역

---

# 6. 통계

- 방문자
- 페이지뷰
- 인기 지역
- 인기 매물
- 검색 키워드
- 전환율

차트
- 일간
- 주간
- 월간
- 연간

---

# 7. 파일 관리

- 이미지 업로드
- WebP 변환
- 썸네일 생성
- 용량 최적화

---

# 8. 로그 관리

- 관리자 활동 로그
- 로그인 로그
- 오류 로그
- API 로그

---

# 9. 보안

- 관리자 전용 Route Guard
- 2단계 인증(확장 가능)
- IP 제한
- 감사 로그(Audit Log)

---

# 10. API

GET /admin/dashboard
GET /admin/properties
POST /admin/properties
PATCH /admin/properties/{id}
DELETE /admin/properties/{id}

GET /admin/users
PATCH /admin/users/{id}

GET /admin/inquiries
PATCH /admin/inquiries/{id}

GET /admin/statistics

---

# 11. DB 주요 테이블

admin_logs
audit_logs
banners
notices
faqs
popup_messages

---

# 12. Claude Code 컴포넌트

AdminLayout.tsx
Dashboard.tsx
PropertyManager.tsx
UserManager.tsx
InquiryManager.tsx
StatisticsDashboard.tsx
BannerManager.tsx
NoticeManager.tsx
FileManager.tsx

모든 관리자 기능은 Role 기반 접근 제어(RBAC)를 적용하며, 기능별 모듈로 분리하여 구현한다.
