# TASK-002 — Information Architecture(IA) & Sitemap

## 목적
이 문서는 전체 사이트의 정보구조(IA)를 정의하며 Claude Code가 페이지 생성 및 라우팅을 구현할 수 있도록 한다.

---

# 1. 글로벌 메뉴

- 홈
- 매물검색
- 지도검색
- 분양
- 급매
- 경매
- 지역정보
- 부동산뉴스
- 고객센터
- 회사소개

---

# 2. 사이트맵

```
/
├── search
│   ├── apartment
│   ├── house
│   ├── officetel
│   ├── commercial
│   ├── office
│   ├── land
│   ├── factory
│   ├── warehouse
│   ├── auction
│   └── new-sale
│
├── property
│   └── [propertyId]
│
├── map
├── compare
├── favorites
├── recently-viewed
├── ai-recommend
│
├── region
│   └── [city]
│
├── news
├── guide
├── contact
├── reservation
│
├── login
├── signup
├── my
│   ├── profile
│   ├── inquiries
│   ├── favorites
│   └── history
│
└── admin
    ├── dashboard
    ├── properties
    ├── inquiries
    ├── members
    ├── banners
    ├── statistics
    └── settings
```

---

# 3. 핵심 사용자 플로우

## 매수자

홈
→ 검색
→ 필터
→ 지도
→ 상세
→ 상담
→ 예약

## 매도자

홈
→ 매물등록 의뢰
→ 정보 입력
→ 사진 업로드
→ 상담 접수

## 관리자

로그인
→ 대시보드
→ 매물관리
→ 문의관리
→ 통계

---

# 4. URL 규칙

- /search
- /property/{id}
- /region/{slug}
- /news/{slug}
- /guide/{slug}
- /admin/*

SEO Friendly URL 사용.

---

# 5. Breadcrumb

홈 > 매물검색 > 아파트 > 서울 > 강남구 > 상세

---

# 6. Header

- Logo
- Global Search
- Navigation
- 관심매물
- 최근본매물
- 로그인

Sticky Header 적용.

---

# 7. Footer

- 회사소개
- 개인정보처리방침
- 이용약관
- 공인중개사 정보
- 고객센터
- SNS
- Copyright

---

# 8. 검색 구조

필터

- 거래유형
- 지역
- 가격
- 면적
- 방수
- 욕실수
- 준공연도
- 주차
- 엘리베이터
- 반려동물
- 옵션
- 정렬

---

# 9. 페이지 우선순위

Priority A
- 홈
- 검색
- 상세
- 지도

Priority B
- 관심매물
- AI 추천
- 지역정보
- 뉴스

Priority C
- 관리자
- 통계
- 설정

---

# 10. Claude Code 구현 체크리스트

- App Router 기준 라우팅
- Dynamic Route 사용
- Layout 분리
- Metadata API 사용
- SEO 메타 자동 생성
- Error / Loading 페이지 구현
- 404 페이지 제공
- Server Component 우선
