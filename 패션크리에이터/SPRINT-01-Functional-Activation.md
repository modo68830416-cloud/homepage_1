# SPRINT-01 — Functional Activation & Interaction Wiring

> 프로젝트: Fashion Creator  
> 현재 상태: UI/외형 프레임 구현 완료  
> 목표: 기존 디자인을 유지하면서 모든 버튼, 링크, 폼, 메뉴, 탭, 모달, 필터, 저장 기능을 실제로 동작시키기  
> 실행 환경: Claude Code + GitHub Codespaces  
> 우선순위: 최상  
> 상태: Ready

---

## 0. Claude Code 실행 지시

```text
SPRINT-01-Functional-Activation.md를 읽고 현재 프로젝트 전체를 분석한 뒤 요구사항을 순서대로 구현해줘.

중요:
- 현재 디자인과 레이아웃은 유지해줘.
- 기존 화면을 삭제하거나 단순화하지 말아줘.
- 동작하지 않는 버튼, 링크, 메뉴, 폼, 탭, 모달, 필터, 저장 기능을 모두 찾아줘.
- AI API, 결제 API, 외부 쇼핑 API는 아직 연결하지 말고 DEMO 데이터와 상태관리로 구현해줘.
- 이미 구현된 기능은 중복 구현하지 말고 재사용해줘.
- 중간 확인 질문을 반복하지 말고 합리적인 기본값으로 끝까지 진행해줘.
- 각 단계 후 lint, typecheck, build를 실행하고 오류를 수정해줘.

완료 후 아래 형식으로 보고해줘.

1. 발견한 비활성 기능 목록
2. 수정한 기능
3. 연결한 페이지
4. 추가한 상태관리
5. 수정/생성 파일
6. lint 결과
7. typecheck 결과
8. build 결과
9. 남은 비활성 기능
10. 다음 Sprint 권장사항
```

---

# 1. Sprint 목표

Fashion Creator의 모든 화면은 이미 존재하지만, 일부 버튼과 UI 요소가 시각적으로만 존재하고 실제로 동작하지 않을 수 있다.

이번 Sprint에서는 프로젝트 전체를 점검하고 다음 요소를 실제로 사용할 수 있도록 연결한다.

```text
버튼
링크
메뉴
폼
탭
모달
드롭다운
필터
검색
저장
삭제
복사
페이지 이동
상태 변경
데모 데이터 갱신
```

---

# 2. 핵심 원칙

## 2.1 디자인 유지

이번 Sprint에서는 디자인을 새로 만드는 것이 목적이 아니다.

금지:

- 기존 레이아웃 전면 변경
- 카드 스타일 삭제
- 애니메이션 삭제
- 색상 시스템 변경
- 페이지 축소
- 기능 구현을 이유로 UI 단순화

허용:

- 클릭 상태
- hover/focus 상태
- loading 상태
- disabled 상태
- success/error toast
- modal/sheet
- empty state
- 실제 navigation 연결

## 2.2 DEMO 우선

아직 실제 외부 API를 연결하지 않는다.

다음은 DEMO 상태로 구현한다.

- AI 아바타 생성
- 가상 피팅
- 이미지 생성
- 영상 생성
- 구매 링크 생성
- 결제
- 정산
- 캠페인 지원
- 콘텐츠 라이선스
- 수익 분석

하지만 사용자는 실제 서비스처럼 자연스럽게 전체 흐름을 체험할 수 있어야 한다.

---

# 3. 전체 프로젝트 분석

Claude Code는 먼저 프로젝트 전체를 검색해서 다음 요소를 목록화한다.

## 찾아야 할 항목

- `button`
- `Link`
- `onClick`
- `href`
- `form`
- `input`
- `select`
- `tabs`
- `dialog`
- `modal`
- `sheet`
- `toast`
- `filter`
- `search`
- `save`
- `delete`
- `copy`
- `submit`
- `disabled`
- `TODO`
- `placeholder`
- `coming soon`

## 분석 형식

```text
페이지
컴포넌트
기능명
현재 상태
필요 작업
우선순위
```

예:

```text
/models
ModelCard
이 모델 선택
시각적 버튼만 존재
선택 상태 저장 + /studio 이동
P0
```

---

# 4. 우선순위

## P0 — 핵심 사용자 흐름

반드시 이번 Sprint에서 완료한다.

```text
홈
→ 트렌드
→ 모델 선택
→ Studio
→ Look 저장
→ 콘텐츠 생성
→ LOOK 페이지
→ Creator Dashboard
→ Marketplace
```

## P1 — 주요 인터랙션

- 검색
- 필터
- 탭
- 모달
- 복사
- 저장
- 삭제
- 수정
- 즐겨찾기
- DEMO 생성

## P2 — 보조 기능

- 정렬
- pagination
- tooltip
- skeleton
- secondary action
- 부가 설정

---

# 5. 공통 상태관리

현재 프로젝트에 Zustand, Context, Redux 또는 다른 상태관리 도구가 있으면 재사용한다.

없다면 Zustand 또는 React Context 중 하나를 사용한다.

권장 전역 상태:

```ts
type AppState = {
  selectedModelId: string | null;
  selectedModelType: "preset" | "avatar" | null;
  selectedProducts: string[];
  savedLooks: SavedLook[];
  contentProjects: ContentProject[];
  copiedLink: string | null;
  demoCart: CartItem[];
  creatorProfile: CreatorProfile;
};
```

---

# 6. 홈 페이지 기능 연결

## CTA

- `AI 모델로 시작하기` → `/models`
- `인기 아이템 보기` → `/trends`
- `Create a Look` → `/studio`
- `Explore Marketplace` → `/marketplace`
- `Open Demo Look` → `/look/demo-look`

## Navigation

모든 메뉴가 실제 라우트로 이동해야 한다.

모바일 메뉴:

- 열기
- 닫기
- ESC 닫기
- 메뉴 클릭 후 자동 닫기
- body scroll lock

---

# 7. Trends 페이지 기능 연결

## 검색

- 상품명
- 브랜드
- 카테고리
- 태그

## 필터

- 카테고리
- 스타일
- 트렌드 상태
- 가격대 DEMO
- 성별 표현

## 카드 CTA

- `AI 모델에게 입혀보기` → `/studio?product=[id]`
- `콘텐츠 만들기` → `/create/new?product=[id]`
- `상세 보기` → 상품 상세 DEMO modal 또는 route

## 상태

- 필터 결과 없음
- 검색 결과 없음
- 필터 초기화
- 정렬

---

# 8. Models 페이지 기능 연결

## 기본 모델

- 모델 선택
- 선택 상태 표시
- 하단 sticky bar
- `/studio` 이동

## 아바타

- 사진 선택
- 미리보기
- 삭제
- 동의
- 체형 선택
- DEMO 생성
- 결과 저장
- `/studio` 이동

## 저장

- localStorage 또는 전역 store
- 페이지 새로고침 후 유지

---

# 9. Studio 기능 연결

## 상품 선택

- 카테고리별 상품 표시
- 상품 카드 클릭
- 선택 상품 목록 갱신
- 동일 카테고리 상품 교체
- 제거
- 전체 초기화

## Look

- 총 가격 계산
- Look 이름 입력
- Look 저장
- 저장한 Look 불러오기
- 삭제
- 복제

## CTA

- `콘텐츠 만들기` → `/create/new`
- `구매 링크 준비` → `/look/[slug]`
- `AI 추천` → DEMO 추천 상품 자동 선택

---

# 10. Content Studio 기능 연결

## 설정

- 형식 선택
- 비율 선택
- 길이 선택
- 배경
- 카메라
- 동작
- 분위기

## 생성

- DEMO 생성 Job
- progress
- cancel
- retry
- completed

## 결과

- preview
- clean/shoppable version
- thumbnail 선택
- 텍스트 복사
- 다운로드 DEMO
- 프로젝트 저장

---

# 11. LOOK 페이지 기능 연결

## 구매

- 개별 상품 선택
- 전체 Look 장바구니
- 수량 변경
- 상품 제거
- 총 금액 계산
- `구매하기` → 결제 DEMO modal

## 링크

- 링크 복사
- QR DEMO
- 공유 버튼
- toast

## Creator

- 프로필 이동
- 콘텐츠 더 보기

---

# 12. Creator Dashboard 기능 연결

## 탭

- Overview
- Content
- Analytics
- Revenue
- Settlements
- Subscription

## 기능

- 기간 필터
- 콘텐츠 열기
- 링크 복사
- 수익 상세
- 정산 상세
- 크레딧 사용 내역
- 플랜 비교 modal

모든 수치는 DEMO 표시.

---

# 13. Marketplace 기능 연결

## 탐색

- 크리에이터 필터
- 콘텐츠 필터
- 캠페인 필터
- 검색
- 정렬

## CTA

- 프로필 보기
- 콘텐츠 보기
- 제작 문의
- 캠페인 지원
- 라이선스 선택
- 주문 제작

## 거래 DEMO

- 지원 제출
- 제작 의뢰 제출
- 상태 변경
- 승인
- 수정 요청
- 리뷰 DEMO

---

# 14. 공통 UI 상태

모든 주요 버튼은 다음 상태를 가진다.

```text
default
hover
focus-visible
active
disabled
loading
success
error
```

## Toast

- 저장 완료
- 링크 복사 완료
- 모델 선택 완료
- 상품 추가 완료
- 삭제 완료
- DEMO 기능 안내
- 오류 발생

---

# 15. 폼 검증

Zod 또는 기존 schema를 사용한다.

검증 대상:

- 이름
- 검색
- 이메일 DEMO
- Look 이름
- 캠페인 지원
- 제작 의뢰
- 라이선스 선택
- 구독 설정

오류는 필드 바로 아래 표시한다.

---

# 16. 데이터 영속성

DEMO 단계에서는 다음 데이터를 localStorage에 저장할 수 있다.

- 선택 모델
- 저장 Look
- 콘텐츠 프로젝트
- 장바구니
- 즐겨찾기
- 최근 본 상품
- Creator 설정

저장하지 않는 것:

- 원본 사진 base64
- 계좌번호
- 카드번호
- 개인정보
- 민감한 인증 정보

---

# 17. 페이지 이동 규칙

라우트 이동 시 다음 데이터를 잃지 않아야 한다.

```text
선택 모델
선택 상품
저장 Look
Content Project
Cart
Creator DEMO 설정
```

가능하면 query param보다 store를 우선 사용하고, 공유가 필요한 상태만 URL에 포함한다.

---

# 18. Loading, Empty, Error

각 페이지에 다음 상태를 준비한다.

## Loading

- skeleton
- spinner
- progress

## Empty

- 저장된 Look 없음
- 콘텐츠 없음
- 검색 결과 없음
- 캠페인 없음
- 장바구니 없음

## Error

- 다시 시도
- 이전 화면
- 홈으로 이동

---

# 19. 접근성

- 버튼은 실제 `button`
- 이동은 실제 `Link`
- click 가능한 div 금지
- form label
- dialog focus trap
- ESC 닫기
- keyboard navigation
- aria-live
- focus-visible
- touch target 44px 이상

---

# 20. 반응형

확인 해상도:

```text
360
390
768
1024
1440
```

모바일:

- bottom action bar
- sheet
- accordion
- responsive table
- 가로 스크롤 제거

---

# 21. 테스트

## 사용자 흐름 1

```text
홈
→ 인기 상품
→ 모델 선택
→ Studio
→ 상품 코디
→ Look 저장
```

## 사용자 흐름 2

```text
Look
→ Content Studio
→ 쇼츠 DEMO 생성
→ 구매 링크 복사
→ Creator Dashboard
```

## 사용자 흐름 3

```text
Marketplace
→ Creator Profile
→ Campaign
→ 지원 제출
→ 상태 확인
```

---

# 22. 검증 명령

```bash
npm run lint
npm run typecheck
npm run build
```

테스트가 있으면:

```bash
npm run test
```

---

# 23. 완료 조건

## 전체

- [ ] 모든 주요 CTA가 작동한다.
- [ ] 모든 navigation이 연결된다.
- [ ] 동작하지 않는 버튼이 남지 않는다.
- [ ] 모든 form이 제출 가능하다.
- [ ] 모든 modal/sheet가 열리고 닫힌다.
- [ ] 모든 filter/search가 작동한다.
- [ ] 모든 주요 DEMO 상태가 갱신된다.
- [ ] 페이지 이동 후 상태가 유지된다.
- [ ] 모바일에서 기능이 작동한다.
- [ ] lint/typecheck/build가 통과한다.

## 핵심 흐름

- [ ] 모델 선택 → Studio
- [ ] 상품 선택 → Look 저장
- [ ] Look → Content Studio
- [ ] Content → LOOK 페이지
- [ ] LOOK → Creator Dashboard
- [ ] Marketplace → Campaign/Request

---

# 24. 금지 사항

- 디자인 전면 변경
- 기존 페이지 삭제
- 버튼을 숨겨서 해결
- 기능을 `coming soon`으로 대체
- 모든 기능을 단순 alert로 처리
- 실제 AI/결제처럼 오해하게 만들기
- 모든 컴포넌트를 client component로 변경
- localStorage에 민감정보 저장

---

# 25. Sprint 완료 보고

```text
SPRINT-01 완료

1. 전체 분석 결과
2. 비활성 기능 목록
3. 활성화한 버튼·링크·폼
4. 상태관리 변경
5. 데이터 연결
6. 라우트 연결
7. 모바일 대응
8. 접근성 대응
9. 수정/생성 파일
10. lint 결과
11. typecheck 결과
12. build 결과
13. 남은 TODO
14. SPRINT-02 권장사항
```
