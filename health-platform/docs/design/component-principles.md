# 컴포넌트 원칙

- 작업 ID: TASK-003

## 1. 공통 규칙

- 모든 컴포넌트는 Semantic 토큰만 참조한다(하드코딩 색상/간격 금지, [[color-system]] §1).
- 모든 인터랙티브 컴포넌트는 키보드 포커스 스타일(`--border-focus`, 2px 이상 아웃라인)을 기본 제공한다.
- 컴포넌트는 영역(브랜드/정보/커머스)에 따라 "variant" prop으로 시각 강도를 조절하되 구조는 동일하게 유지한다.

## 2. 카드 시스템

- **목록형 카드(ListCard)**: 콘텐츠 목록·상품 목록에서 사용. 이미지+제목+메타 정보의 균일한 그리드.
- **무대형 프레젠테이션(StageDisplay)**: 상품 상세 Hero, 콘텐츠 상세 대표 이미지에서 사용. 카드 테두리 없이 배경과 자연스럽게 녹아드는 단일 오브젝트 중심 레이아웃.
- 두 시스템은 서로 대체하지 않는다: 목록에는 ListCard, 상세에는 StageDisplay ([[visual-benchmark-matrix]] §3 원칙 9 참조).

## 3. 신뢰 컴포넌트 (정보 영역 전용)

- `TrustPanel`: 출처, 검수자, 작성일/수정일을 항상 같은 위치(본문 상단)에 고정 노출.
- `EmergencyBanner`: 응급 신호 콘텐츠에서 페이지 최상단, 다른 어떤 요소보다 시각적 우선순위가 높음(z-index, 색상 대비 모두 최상).
- `DisclaimerNote`: 의료 자문이 아님을 명시하는 면책 문구, 콘텐츠 하단 및 AI 응답 하단에 상시 노출.

## 4. 커머스 컴포넌트

- `SaleTypeBadge`: 7종 판매유형 배지, 아이콘+텍스트 조합 ([[color-system]] §4).
- `ProductStage`: 무대형 상품 프레젠테이션, 갤러리+스펙+CTA.
- `StickyBuyBar`: 모바일 상품 상세 하단 고정 구매 바.
- `ExternalRedirectNotice`: 제휴상품 외부 이동 전 확인 컴포넌트.

## 5. 내비게이션 컴포넌트

- `MegaMenu`(데스크톱), `MobileMenuOverlay`(모바일) — [[navigation-model]], [[mobile-navigation]] 문서의 구조를 그대로 구현.
- `SearchExpandable`: 헤더 검색창, 클릭 시 오버레이로 확장.

## 6. 상태 컴포넌트

- 모든 데이터 로딩 영역은 `Skeleton` 컴포넌트를 사용하고 레이아웃 시프트(CLS)를 방지하기 위해 실제 콘텐츠와 동일한 크기를 갖는다.
- 오류 상태는 `ErrorState`(재시도 버튼 포함)를 공통으로 사용한다.

## 7. 컴포넌트 명명 규칙

- 도메인 프리픽스 없이 역할 중심 이름 사용 (`ProductStage`, `TrustPanel` 등). 페이지 전용 일회성 컴포넌트는 만들지 않고 항상 재사용 가능한 형태로 설계한다(TASK-004 목표와 연결).
