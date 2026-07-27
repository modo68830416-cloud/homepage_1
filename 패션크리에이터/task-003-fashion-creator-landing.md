# TASK-003 — Fashion Creator Landing Experience

> 선행: Task-001, Task-002 완료

## 목적
사용자가 URL에 접속한 첫 10초 안에 Fashion Creator의 핵심 가치(입어보고→만들고→공유하고→판매)를 이해하도록 랜딩 페이지를 완성한다.

## Claude Code 실행

```text
task-003-fashion-creator-landing.md를 읽고 구현해줘.
Task-001, Task-002 구조를 유지하고 랜딩 경험만 고도화해줘.
모든 화면은 반응형으로 구현하고 lint/typecheck/build를 통과시켜줘.
```

## 구현 범위

### Hero
- 시네마틱 Hero
- 슬로건: Try. Create. Share. Sell.
- AI 모델 + 인기 상품 레이어
- CTA:
  - AI 모델 시작
  - 인기 아이템 보기

### Section 1
왜 Fashion Creator인가

- AI 모델
- 내 사진 아바타
- 가상 피팅
- 콘텐츠 제작
- 판매 수익

### Section 2
오늘의 트렌드

- 인기 상품(목업)
- 급상승
- 베스트셀러
- Creator Pick
- 모든 데이터는 DEMO 표시

### Section 3
AI Creator Flow

1. 모델 선택
2. 상품 선택
3. 영상 생성
4. 구매 링크 생성
5. SNS 공유
6. 판매 발생

### Section 4
Creator Success

카드:
- 조회수
- 판매
- 수익(데모)
- 인기 콘텐츠

### Section 5
Marketplace Preview

- 브랜드 캠페인
- 크리에이터 모집
- 콘텐츠 판매
- 협업

### Footer

- About
- Pricing
- Marketplace
- Contact
- Copyright

## 필수 UX

- 모든 CTA 클릭 가능
- 각 CTA는 적절한 플레이스홀더 라우트 이동
- 스크롤 Reveal
- 모바일 최적화
- 접근성 준수

## 성능

- Lighthouse 80+
- next/image 사용
- lazy loading

## 완료 조건

- 랜딩 페이지 완성
- 반응형
- Hero 고급 비주얼
- CTA 정상
- lint/typecheck/build 통과

## Task-004 준비

다음 Task에서는 실시간 Fashion Trend Radar와 인기 상품 분석 화면을 구현한다.
