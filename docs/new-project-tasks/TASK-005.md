# TASK-005 — Property Search System Specification

## 목적
사용자가 원하는 매물을 빠르고 정확하게 찾을 수 있는 고성능 검색 시스템을 구현한다.

---

# 1. 검색 방식

- 통합 검색
- 지도 검색
- AI 추천 검색
- 상세 조건 검색
- 키워드 검색

---

# 2. 검색 조건

## 거래

- 매매
- 전세
- 월세

## 유형

- 아파트
- 주택
- 오피스텔
- 상가
- 사무실
- 토지
- 공장
- 창고
- 분양
- 경매

## 가격

최소

최대

---

면적

평형

㎡

---

층

저층

중층

고층

---

옵션

주차

엘리베이터

반려동물

테라스

신축

즉시입주

---

# 3. 정렬

최신순

가격순

조회순

추천순

거리순

---

# 4. 지도검색

Kakao Maps

Marker Cluster

Draw Polygon

현재 위치

반경 검색

---

# 5. AI 검색

예시

"강남 10억 이하 아파트"

"주차 가능한 상가"

"신축 오피스텔"

---

# 6. 최근 검색

10개 저장

자동완성

---

# 7. 인기 검색

실시간 키워드

Top20

---

# 8. 관심매물

로그인 사용자 저장

동기화

---

# 9. Elasticsearch

검색 Index

Property

Region

Keyword

AutoComplete

---

# 10. API

GET /properties

GET /properties/search

GET /properties/map

GET /properties/recommend

---

# 11. 성능

검색 1초 이하

Debounce

Infinite Scroll

Virtual List

Cache

---

# 12. Mobile

Bottom Filter

Swipe

Sticky Search

---

# 13. Claude Code 구현

SearchBar.tsx

FilterPanel.tsx

MapView.tsx

PropertyList.tsx

PropertyCard.tsx

AISearch.tsx

RecentSearch.tsx

PopularKeyword.tsx

모든 기능은 독립 Component로 구현한다.
