# TASK-004 — Fashion Trend Radar & AI Trend Intelligence

> 선행: Task-001 ~ Task-003 완료

## 목표
Fashion Creator의 핵심 기능인 'Fashion Trend Radar'를 구축한다.
단순 상품 목록이 아니라 AI가 지금 인기 있는 상품과 앞으로 성장 가능성이 높은 상품을 분석하여 보여주는 경험을 만든다.

## Claude Code 실행

```text
task-004-fashion-trend-radar.md를 읽고 구현해줘.
Task-001~003 구조를 유지하고 Trend Radar 기능을 추가해줘.
실제 API 대신 MOCK DATA 모드로 구현하되 실제 서비스처럼 확장 가능한 구조로 작성해줘.
완료 후 lint, typecheck, build를 통과시켜줘.
```

# 구현 범위

## 1. Trend Radar Dashboard

구성
- 오늘 인기 상품
- 최근 7일 급상승
- Creator Pick
- AI 추천
- 곧 유행 예상
- 카테고리별 인기

모든 카드에는 DEMO 표시.

## 2. 상품 카드

표시 항목
- 브랜드
- 상품명
- 가격
- Trend Score(0~100)
- 상승률
- 카테고리
- AI 분석 요약

CTA
- AI 모델에게 입혀보기
- 콘텐츠 만들기
- 상세 보기

## 3. AI Trend Score

Mock 알고리즘

TrendScore =
- 검색 반응 25%
- 콘텐츠 반응 25%
- 판매 반응 35%
- 성장률 15%

UI에는 점수만 노출하고 계산식은 코드로 분리.

## 4. 필터

- 여성
- 남성
- 신발
- 가방
- 액세서리
- 스트리트
- 럭셔리
- 스포츠

## 5. 검색

실시간 검색
자동완성(Mock)

## 6. 시각화

- 인기 랭킹
- 상승 배지
- 색상으로 점수 표현
- Creator Pick 배지
- AI Prediction 배지

## 7. 페이지

/trends

섹션
- Hero
- Radar Summary
- Trending Grid
- AI Picks
- Category Ranking
- Creator Picks

## 8. 데이터 구조

TrendItem
- id
- slug
- brand
- name
- category
- image
- trendScore
- growthRate
- price
- tags
- isDemo

## 9. UX

사용자가 카드 클릭 →
상품 상세(플레이스홀더)

AI 모델 입혀보기 →
/studio

콘텐츠 만들기 →
/studio

## 10. 성능

- next/image
- lazy loading
- virtualization 준비
- 반응형

## 11. 완료조건

- Trend Radar 완성
- Mock 데이터 기반 동작
- 필터 정상
- 검색 정상
- CTA 정상
- lint/typecheck/build 통과

## 12. Task-005 준비

다음 Task에서는 AI Model Library와
정면 사진 1장 기반 Avatar 생성 화면을 구현한다.

