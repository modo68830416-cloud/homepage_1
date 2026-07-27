# TASK-006 — AI Virtual Styling Studio

> 선행: TASK-001 ~ TASK-005 완료

## 목표
Fashion Creator의 핵심인 AI Virtual Styling Studio를 구현한다.

사용자는 Task-005에서 선택한 기본 AI 모델 또는 자신의 아바타를 불러와
상의, 하의, 아우터, 신발, 가방, 액세서리를 자유롭게 코디하고,
다음 Task에서 이미지·영상 생성으로 이어질 수 있는 Look을 저장한다.

---

## Claude Code 실행

```text
task-006-fashion-creator-studio.md를 읽고 구현해줘.

Task-001~005 구조를 유지하면서 Studio만 확장해줘.
실제 AI 가상피팅 API 대신 DEMO 모드로 구현하되
실제 서비스와 동일한 UX를 제공해줘.

lint, typecheck, build를 모두 통과시켜줘.
```

---

# 핵심 UX

홈페이지에서 가장 오래 머무는 화면이므로
Adobe, Figma, Canva처럼 작업 공간 느낌을 만든다.

좌측
- 카테고리
- 상품 검색
- 인기상품
- 최근 본 상품

가운데
- 선택한 AI 모델 또는 내 아바타
- 가상 코디 미리보기
- 확대/축소
- 전신 보기

우측
- 현재 착용 상품
- 총 금액
- Trend Score
- Look 저장
- 콘텐츠 만들기

---

# 구현 범위

## Studio Layout

- /studio
- 3패널 구조
- 반응형
- 모바일은 탭 구조

## 상품 카테고리

- 상의
- 하의
- 원피스
- 아우터
- 신발
- 가방
- 액세서리

## 상품 카드

표시
- 이미지
- 브랜드
- 가격
- Trend Score
- DEMO

CTA
- 입혀보기
- 상세보기

## 착용 상태

선택 시

- 현재 착용 리스트 업데이트
- 총 가격 계산
- Look 자동 갱신

## Look Panel

표시

- Look 이름
- 착용 상품
- 예상 콘텐츠 스타일
- 총 금액
- 저장

## AI 추천

버튼

"AI가 코디 추천"

DEMO 동작

- 현재 상품 기반 추천
- 계절 추천
- 색상 추천
- 인기상품 추천

## 상태관리

SelectedModel

SelectedProducts

SavedLook

StudioSession

전역 Store 사용

## 데이터 구조

Look

- id
- name
- modelId
- products[]
- totalPrice
- createdAt
- isDemo

## 저장

localStorage DEMO

Look 저장

Look 불러오기

삭제

## CTA

- 콘텐츠 만들기
→ Task-007

- 구매 링크 준비
→ Task-008

## 성능

- next/image
- lazy loading
- virtualization 준비

## 접근성

- 키보드 탐색
- focus-visible
- 모바일 터치 44px 이상

## 완료조건

- Studio 완성
- 모델 불러오기
- 상품 선택
- Look 저장
- 총금액 계산
- AI 추천 데모
- lint/typecheck/build 통과

## Task-007 준비

다음 Task에서는
선택한 Look을 기반으로

- 이미지 생성
- 쇼츠 생성
- 릴스
- 유튜브
- 블로그 콘텐츠
- 썸네일
- 자동 제목
- 자동 설명

생성 화면을 구현한다.

## Claude Code 완료 보고

1. Studio 구현
2. Look 저장
3. 상품 선택 구조
4. 상태관리
5. 생성/수정 파일
6. lint
7. typecheck
8. build
9. 확인 URL
10. Task-007 TODO
