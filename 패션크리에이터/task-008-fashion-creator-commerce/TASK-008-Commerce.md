# TASK-008 — Shoppable Commerce Engine

> 선행: TASK-001~007 완료

## 목표
생성된 콘텐츠를 실제 판매로 연결하는 Commerce Engine을 구현한다.

핵심 흐름

Look 생성
→ Shoppable LOOK Page 생성
→ 상품 링크 연결
→ QR 생성(데모)
→ 클릭 추적 구조
→ 장바구니
→ 판매 분석 준비

## Claude Code 실행

```text
Task-008 폴더의 모든 md를 순서대로 읽고 구현해줘.
실제 결제와 제휴 API는 연결하지 말고 확장 가능한 DEMO 구조로 구현해줘.
lint, typecheck, build를 모두 통과시켜줘.
```

## 구현

- /look/[slug]
- LOOK Hero
- 착용 상품 리스트
- 전체 코디 구매
- 개별 상품 구매
- QR Placeholder
- Copy Link
- CTA
- 관련 상품
- Creator 정보
- DEMO 판매지표

## 데이터

Look
- id
- slug
- creator
- products[]
- totalPrice
- shoppableUrl
- qrUrl
- isDemo

## 완료조건

- LOOK Page
- 상품 링크
- Copy
- QR
- 전체구매
- lint/typecheck/build
