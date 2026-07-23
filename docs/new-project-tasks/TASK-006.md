# TASK-006 — Property Detail Page Specification

## 목적
매물 상세 페이지를 사용자의 의사결정을 돕는 핵심 페이지로 구현한다.

---

# 1. 페이지 구성

1. 이미지 갤러리
2. 핵심 정보
3. 가격 정보
4. 상세 설명
5. 옵션 정보
6. 지도
7. 주변 시설
8. 상담 예약
9. 관심 등록
10. 추천 매물

---

# 2. 이미지 갤러리

- 대표 이미지
- 썸네일 목록
- 전체 화면 보기
- 확대(Zoom)
- Swipe 지원
- Lazy Loading

---

# 3. 핵심 정보

- 매물번호
- 거래유형
- 매물종류
- 주소
- 가격
- 관리비
- 면적
- 층수
- 방향
- 준공연도
- 입주 가능일

---

# 4. 가격 영역

- 매매가
- 전세가
- 월세
- 관리비
- 취득세 예상
- 대출 계산 버튼

---

# 5. 상세 설명

Markdown 지원

- 특징
- 장점
- 유의사항
- 리모델링 여부

---

# 6. 옵션

- 주차
- 엘리베이터
- 반려동물
- 에어컨
- 붙박이장
- 발코니
- CCTV
- 보안

---

# 7. 지도

Kakao Maps

- 위치
- 길찾기
- 거리 표시

---

# 8. 주변 시설

- 지하철
- 버스
- 학교
- 병원
- 마트
- 공원
- 편의점

---

# 9. 상담 기능

- 전화하기
- 카카오톡
- 상담예약
- 문의하기

---

# 10. 관심 기능

- 관심등록
- 공유하기
- 링크복사
- 최근 본 매물

---

# 11. 추천 매물

동일 지역

동일 가격

동일 평형

AI 추천

---

# 12. SEO

- JSON-LD
- Open Graph
- Canonical URL
- Dynamic Metadata

---

# 13. 성능

- Next/Image
- Lazy Load
- Dynamic Import
- Image Optimization

---

# 14. 모바일

- Sticky 상담 버튼
- Swipe Gallery
- Bottom CTA

---

# 15. Claude Code 구현 컴포넌트

PropertyGallery.tsx

PropertySummary.tsx

PriceCard.tsx

PropertyDescription.tsx

OptionList.tsx

MapSection.tsx

NearbySection.tsx

InquiryCard.tsx

FavoriteButton.tsx

RecommendationSection.tsx

모든 컴포넌트는 독립적으로 구현하며 재사용 가능한 구조를 유지한다.
