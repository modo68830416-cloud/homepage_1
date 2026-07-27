# TASK-002 — Fashion Creator Premium Interaction & Cinematic UI System

> 프로젝트: Fashion Creator  
> 선행 작업: TASK-001 완료 필수  
> 목표 배포일: 2026-07-29 수요일 18:00 KST  
> 실행 환경: Claude Code + GitHub Codespaces  
> 작업 우선순위: 최상  
> 상태: Ready

---

## 0. Claude Code 실행 지시

이 파일을 프로젝트 루트에 저장한 뒤 Claude Code에게 다음과 같이 지시한다.

```text
task-002-fashion-creator-premium-interaction.md를 읽고 요구사항을 순서대로 구현해줘.

반드시 task-001에서 만든 프로젝트 구조와 디자인 토큰을 먼저 분석하고,
기존 기능과 라우트를 삭제하거나 임의로 단순화하지 말아줘.

이번 Task의 목표는 화려함만 추가하는 것이 아니라,
Fashion Creator를 2026년형 프리미엄 AI 패션 플랫폼처럼 보이게 만드는 것이다.

중간 확인 질문을 반복하지 말고 합리적인 기본값을 선택해서 끝까지 구현해줘.
모든 인터랙션은 모바일, 접근성, 성능을 함께 고려해줘.

완료 후 lint, typecheck, build를 실행하고 모든 오류를 수정해줘.
마지막에는 구현 요약, 변경 파일, 확인 방법, 성능 영향, 남은 TODO를 정리해줘.
```

---

# 1. Task 목적

TASK-001에서 구축한 프로젝트 기반과 디자인 시스템 위에 Fashion Creator만의 고급 인터랙션 시스템을 구현한다.

이번 Task의 목표는 단순히 애니메이션을 많이 넣는 것이 아니다.

사용자가 홈페이지에 들어온 순간 다음을 느끼게 해야 한다.

```text
"이 서비스는 일반 쇼핑몰과 다르다."
"AI 패션 모델과 콘텐츠 제작 기능이 실제로 살아 움직이는 것 같다."
"스크롤을 내리는 것만으로 서비스 흐름이 이해된다."
```

TASK-002는 이후 TASK-003 랜딩 페이지, TASK-004 트렌드 레이더, TASK-005 AI 모델·아바타 시스템에서 반복 사용할 인터랙션 기반을 만드는 작업이다.

---

# 2. 완료 결과

Task-002 완료 시 다음 결과가 나와야 한다.

1. 공통 모션 컴포넌트가 재사용 가능한 구조로 구현된다.
2. Hero와 주요 카드가 마우스 및 스크롤에 자연스럽게 반응한다.
3. 섹션 전환이 시네마틱하게 느껴진다.
4. 상품·모델·크리에이터 카드의 시각적 깊이가 강화된다.
5. 모바일에서는 과도한 효과가 자동 축소된다.
6. `prefers-reduced-motion` 사용자는 정적 경험을 제공받는다.
7. 모든 인터랙션이 콘텐츠 가독성을 해치지 않는다.
8. lint, typecheck, production build가 통과한다.

---

# 3. 핵심 디자인 철학

## 3.1 Fashion Editorial + AI Technology

패션 매거진의 대담한 편집 디자인과 AI 기술 플랫폼의 정교한 인터랙션을 결합한다.

참고 감성:

- 럭셔리 패션 캠페인
- 고급 패션 매거진
- 미래형 AI 인터페이스
- 시네마틱 런웨이
- 인터랙티브 제품 프레젠테이션

특정 사이트를 그대로 복제하지 않는다.

## 3.2 Show, Don't Explain

기능을 긴 설명으로 소개하기보다 움직이는 UI를 통해 이해하게 한다.

예:

```text
AI 모델 카드가 선택됨
→ 주변 상품 카드가 모델 쪽으로 이동
→ 코디가 완성됨
→ 영상 프레임이 생성됨
→ 구매 링크 패널이 나타남
```

## 3.3 Controlled Spectacle

화려하지만 통제되어야 한다.

- 주요 섹션마다 대표 효과는 1~2개만 사용
- 모든 요소가 동시에 움직이지 않음
- 텍스트 가독성 우선
- 핵심 CTA는 가장 명확하게 보임
- 효과보다 사용 흐름이 우선

---

# 4. 기술 요구사항

권장 라이브러리:

- Motion for React 또는 Framer Motion
- React hooks
- CSS transforms
- CSS custom properties
- Intersection Observer
- requestAnimationFrame이 필요한 경우 최소한으로 사용
- Lucide React

추가 라이브러리를 도입하기 전에 기존 패키지를 확인한다.

다음과 같은 무거운 라이브러리는 특별한 이유가 없으면 도입하지 않는다.

- 전체 페이지용 WebGL 프레임워크
- 3D 엔진
- 무거운 스크롤 플러그인
- 대규모 파티클 시스템

TASK-002에서는 CSS와 Motion 중심으로 충분한 시각 효과를 구현한다.

---

# 5. 모션 토큰

디자인 토큰과 별도로 모션 토큰을 작성한다.

권장 파일:

```text
src/lib/motion.ts
또는
src/styles/motion-tokens.ts
```

## Duration

```ts
export const duration = {
  instant: 0.12,
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
  cinematic: 1.1,
};
```

## Easing

```ts
export const easing = {
  standard: [0.22, 1, 0.36, 1],
  emphasized: [0.16, 1, 0.3, 1],
  soft: [0.33, 1, 0.68, 1],
  exit: [0.4, 0, 1, 1],
};
```

## Spring

```ts
export const spring = {
  soft: {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  },
  responsive: {
    type: "spring",
    stiffness: 220,
    damping: 24,
    mass: 0.6,
  },
  magnetic: {
    type: "spring",
    stiffness: 300,
    damping: 22,
    mass: 0.5,
  },
};
```

Motion 라이브러리의 타입에 맞게 구현한다.

---

# 6. 공통 모션 컴포넌트

다음 컴포넌트를 재사용 가능하게 구현한다.

```text
src/components/motion/
├── fade-in.tsx
├── reveal.tsx
├── stagger.tsx
├── parallax.tsx
├── magnetic.tsx
├── tilt-card.tsx
├── marquee.tsx
├── text-reveal.tsx
├── floating-orb.tsx
├── spotlight.tsx
├── scroll-progress.tsx
└── reduced-motion-provider.tsx
```

프로젝트 구조에 맞춰 이름과 경로는 조정할 수 있다.

---

## 6.1 FadeIn

기능:

- viewport 진입 시 opacity와 y 이동
- 한 번만 실행 여부
- delay
- direction
- amount

예시 API:

```tsx
<FadeIn delay={0.1} direction="up">
  <SectionTitle />
</FadeIn>
```

---

## 6.2 Reveal

기능:

- overflow hidden 컨테이너 안에서 콘텐츠 reveal
- 이미지, 카드, 텍스트에 사용
- clip-path 또는 transform 방식
- reduced motion에서는 즉시 표시

---

## 6.3 Stagger

기능:

- 자식 요소 순차 진입
- 상품 카드, 모델 카드, 기능 단계에 사용
- 자식 개수가 많을 때 delay가 과도하게 누적되지 않도록 제한

---

## 6.4 Parallax

기능:

- 스크롤 위치에 따라 y 또는 scale 변화
- 데스크톱 우선
- 모바일과 reduced motion에서 비활성화
- 최대 이동량 제한

금지:

- 텍스트 본문에 강한 parallax 적용
- 레이아웃을 밀어내는 방식
- scroll event마다 React state 갱신

---

## 6.5 Magnetic

기능:

- 마우스가 버튼 주변에 접근하면 버튼 또는 내부 아이콘이 미세하게 이동
- primary CTA에 제한적으로 적용
- 모바일에서는 일반 버튼
- 키보드 focus 상태 유지

---

## 6.6 TiltCard

기능:

- pointer 위치에 따라 rotateX, rotateY
- 내부 하이라이트가 포인터를 따라 이동
- 상품 카드 또는 모델 카드에 사용
- 최대 회전 4~7도
- pointer leave 시 원위치
- 터치 기기 비활성화

---

## 6.7 Marquee

기능:

- 패션 카테고리 또는 플랫폼 기능 키워드가 흐르는 스트립
- 한 페이지에 최대 1~2개
- hover 시 일시 정지 가능
- reduced motion에서는 정적 줄바꿈 리스트

예시:

```text
AI MODELS — VIRTUAL FITTING — SHORTS — SHOPPABLE VIDEO —
CREATOR MARKETPLACE — TREND RADAR — AFFILIATE LINKS
```

---

## 6.8 TextReveal

지원 방식:

- line reveal
- word reveal
- character reveal

사용 원칙:

- Hero 핵심 문구에만 character 또는 word reveal
- 일반 본문은 line reveal
- 스크린리더에는 문장이 한 번만 읽히도록 처리

---

## 6.9 FloatingOrb

기능:

- CSS gradient 기반 오로라·빛 구체
- pointer에 미세 반응
- blur와 opacity 애니메이션
- decorative 요소로 접근성 트리 제외
- 고성능 모드에서는 정적 배경

---

## 6.10 Spotlight

기능:

- 카드 또는 섹션 위에서 포인터를 따라가는 radial gradient
- 카드마다 event listener를 과도하게 등록하지 않도록 구현
- 모바일에서 정적 하이라이트로 대체

---

## 6.11 ScrollProgress

기능:

- 페이지 상단에 얇은 진행 바
- 브랜드 accent gradient 사용
- 접근성을 방해하지 않음
- z-index 체계 준수

---

# 7. 전역 인터랙션 시스템

## 7.1 Pointer Glow

데스크톱에서만 화면 배경에 매우 은은한 포인터 광원을 적용한다.

요구사항:

- 큰 blur
- 낮은 opacity
- 텍스트 대비에 영향 없음
- pointer가 없는 기기에서는 렌더링하지 않음
- requestAnimationFrame 또는 MotionValue 사용
- React state로 매 프레임 업데이트 금지

---

## 7.2 Dynamic Header

스크롤 상태에 따라 헤더가 변화한다.

초기:

- 투명
- 넓은 padding
- 로고와 메뉴가 여유롭게 배치

스크롤 후:

- 반투명 glass
- 높이 축소
- border 표시
- backdrop blur
- CTA 강조

모바일 메뉴 열림 시:

- body scroll lock
- 키보드 focus trap
- ESC 닫기
- 메뉴 항목 stagger reveal

---

## 7.3 Section Atmosphere

각 주요 섹션은 색과 광원 분위기를 조금씩 다르게 한다.

예시:

| 섹션 | 분위기 |
|---|---|
| Hero | Lime + Violet Aurora |
| Trend | Pink + Orange Signal |
| AI Models | Blue + Silver |
| Creation Flow | Violet + Lime |
| LOOK Commerce | Warm White + Green |
| Marketplace | Deep Purple + Gold |

섹션마다 배경 전체를 완전히 바꾸지 않고, 동일한 브랜드 안에서 광원과 accent만 변화시킨다.

---

# 8. Hero 인터랙션 고도화

TASK-001 Hero를 다음과 같이 고도화한다.

## 8.1 텍스트

```text
Try. Create.
Share. Sell.
```

구현:

- 문장별 또는 단어별 reveal
- `Create`와 `Sell`에 accent 변화
- 스크롤 시작 시 Hero 텍스트가 미세 축소
- 너무 빠르거나 요란한 글자 분해 효과 금지

## 8.2 모델 비주얼

- 모델 이미지 또는 실루엣 레이어
- 배경에서 천천히 떠오르는 효과
- 마우스 이동에 1~2도 수준 반응
- 화면 밖으로 잘리지 않도록 안전 영역 확보
- 모바일에서는 중앙 정렬 및 단순화

## 8.3 상품 카드

Hero 주변에 3개 내외 상품 카드 배치.

각 카드:

- 카테고리
- 제품명
- 가격
- 트렌드 배지
- 작은 이미지
- depth shadow
- 서로 다른 floating 속도

카드 클릭 시 `/trends` 또는 `/studio`로 이동한다.

## 8.4 AI Status Panel

예시:

```text
AI Styling
Model selected
4 products matched
Video format: 9:16
Shop link ready
```

단계가 순차적으로 활성화되는 데모 애니메이션을 구현한다.

사용자가 실제 처리 중이라고 오해하지 않도록 `Interactive Demo` 표시를 추가한다.

## 8.5 Scroll Cue

- 하단에 얇은 라인 또는 마우스 아이콘
- 반복 애니메이션은 작고 부드럽게
- 클릭 시 다음 섹션으로 smooth scroll
- reduced motion에서는 즉시 이동

---

# 9. 상품 카드 인터랙션

ProductCard를 다음 상태로 구현한다.

## 기본

- 이미지
- 브랜드
- 상품명
- 가격
- 할인 가격
- 트렌드 점수
- DEMO 표시
- 액션 버튼

## Hover

- 이미지 scale 1.03 이내
- 카드 y -6px 이내
- spotlight 표시
- 보조 정보 reveal
- CTA가 아래에서 나타남
- 이미지가 카드 경계를 벗어나지 않음

## 액션

- `Try on Model`
- `Create Content`
- `View Product`

초기 프로토타입에서는 라우트 이동 또는 데모 토스트로 연결한다.

클릭 가능한 전체 카드 안에 중첩된 버튼이 잘못 들어가지 않도록 HTML 구조를 설계한다.

---

# 10. AI 모델 카드 인터랙션

ModelCard 요구사항:

- 모델 이미지
- 모델명
- 스타일
- 체형
- 선택 상태
- `Use This Model`

선택 시:

- 테두리 accent 활성화
- 카드 주변 glow
- 작은 check 표시
- 다른 카드와 시각적 구분
- 선택 결과를 데모 상태로 유지

Hover 시:

- 정면 이미지가 약간 회전하거나 다른 각도처럼 느껴지는 CSS 효과
- 실제 다른 이미지가 있다면 crossfade
- 이미지가 없으면 과도한 가짜 3D 효과 금지

---

# 11. Creation Flow 인터랙션

다음 4단계를 스크롤 기반으로 표현한다.

```text
01 Pick a Model
02 Style the Look
03 Generate the Video
04 Share & Earn
```

데스크톱:

- 왼쪽 단계 텍스트 sticky
- 오른쪽 데모 프레임 변화
- 현재 단계 강조
- 부드러운 배경 accent 변화

모바일:

- 일반 세로 카드
- sticky 제거
- 각 카드 진입 reveal
- 가로 스크롤 강제 금지

데모 프레임:

1. 모델 선택
2. 상품 카드가 모델 주변에 배치
3. 9:16 영상 프레임 생성
4. 구매 링크·QR·수익 패널 등장

---

# 12. LOOK Commerce Preview 인터랙션

LOOK 페이지 미리보기 섹션을 실제 제품 데모처럼 구성한다.

구성:

- 세로형 영상 썸네일
- 재생 버튼
- 착용 상품 리스트
- 전체 코디 가격
- 자동 생성 구매 링크
- QR 코드 placeholder
- 클릭·구매·수익 demo metrics

인터랙션:

- 상품 리스트 hover 시 영상 위 상품 위치 indicator 표시
- `Copy Link` 클릭 시 클립보드 복사 데모
- 복사 완료 토스트
- `Shop Full Look` 클릭 시 `/look/demo-look`
- 수익 지표는 반드시 DEMO 표시

---

# 13. Marketplace Preview 인터랙션

CreatorCard:

- 프로필
- 전문 분야
- 대표 콘텐츠
- 조회·판매 성과
- 인증 배지
- 팔로우 버튼

CampaignCard:

- 브랜드
- 상품 카테고리
- 콘텐츠 형식
- 제작 예산 예시
- 마감 상태
- 지원 CTA

화폐 표시는 대한민국 원화 형식을 사용한다.

예시:

```text
제작 예산 300,000원
성과 보너스 최대 500,000원
```

데이터는 `DEMO`로 표시한다.

---

# 14. 고급 시각 효과

## 14.1 Grain Overlay

- 매우 미세한 noise
- opacity 0.02~0.05
- pointer-events none
- 전체 화면 고정
- 텍스트 가독성에 영향 없음

## 14.2 Grid Overlay

- AI 시스템 섹션에만 부분 적용
- 얇은 라인
- radial mask로 중앙만 표시
- 모든 섹션에 반복 적용 금지

## 14.3 Edge Glow

- 주요 패널 상단 또는 가장자리에 얇은 gradient line
- border를 대체하기보다 보조로 사용

## 14.4 Image Mask Reveal

- Hero 또는 대표 이미지 1~2개에만 적용
- clip-path 또는 scale reveal
- 모바일에서 단순 fade로 대체

---

# 15. Cursor System

사용자 경험을 해치지 않는 범위에서 선택적으로 구현한다.

기본 커서를 완전히 숨기는 방식은 금지한다.

권장:

- 클릭 가능한 패션 카드 위에서 작은 `VIEW`
- 영상 위에서 `PLAY`
- 드래그 가능한 carousel에서 `DRAG`

조건:

- 데스크톱 fine pointer만
- 접근성 설정 지원
- 일반 링크와 폼 요소에서는 기본 커서 유지
- 구현 복잡도가 높거나 성능 저하가 있으면 생략 가능

필수 기능은 아니다.

---

# 16. Toast 시스템

다음 데모 액션을 위해 공통 Toast를 구현한다.

- 링크 복사 완료
- 모델 선택 완료
- 상품이 코디에 추가됨
- 데모 기능 안내
- 준비 중 기능 안내

Toast 요구사항:

- 자동 닫힘
- 키보드 접근 가능
- 과도한 중복 방지
- 모바일 하단 안전 영역 고려

기존 UI 라이브러리가 있다면 재사용한다.

---

# 17. Skeleton 및 Loading

프리미엄 Skeleton 컴포넌트를 구현한다.

종류:

- product-card-skeleton
- model-card-skeleton
- creator-card-skeleton
- video-frame-skeleton

효과:

- 단순한 회색 pulse 대신 브랜드 gradient shimmer
- opacity와 속도를 낮게 유지
- reduced motion에서 정적 skeleton

실제 데이터 로딩이 없어도 `/trends`, `/models`, `/marketplace`의 초기 데모에 짧게 사용할 수 있다. 단, 사용자를 불필요하게 기다리게 하지 않는다.

---

# 18. 반응형 모션 전략

## Desktop

- parallax 허용
- tilt card 허용
- pointer spotlight 허용
- sticky section 허용
- floating layer 허용

## Tablet

- tilt 강도 축소
- floating layer 수 감소
- sticky section 조건부 유지
- pointer 효과 최소화

## Mobile

- parallax 비활성화 또는 최소화
- tilt 비활성화
- pointer 효과 비활성화
- 배경 orb 수 감소
- reveal 중심
- CSS blur 강도 감소
- 60fps 유지 우선

---

# 19. Reduced Motion

다음 미디어 쿼리를 반드시 지원한다.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
  }
}
```

단, 모든 애니메이션을 CSS에서 무조건 제거하면 UI가 깨질 수 있으므로 컴포넌트 레벨에서도 처리한다.

Reduced motion 상태:

- stagger 없음
- parallax 없음
- floating 없음
- marquee 정지
- 즉시 표시 또는 짧은 fade
- 기능은 동일하게 작동

---

# 20. 성능 기준

## 목표

- Lighthouse Performance 80 이상 유지
- CLS 0.1 이하
- 애니메이션 중 프레임 드롭 최소화
- 모바일에서 초기 렌더링 지연 금지

## 필수 원칙

- transform과 opacity 중심
- layout 속성 애니메이션 최소화
- blur가 큰 요소 수 제한
- fixed backdrop-filter 요소 수 제한
- 모든 scroll 이벤트 passive 또는 MotionValue 사용
- 매 프레임 React state 업데이트 금지
- 이미지 크기 지정
- offscreen 애니메이션 일시 중지 고려

---

# 21. 접근성 기준

- 애니메이션 없이도 정보 이해 가능
- focus-visible 상태가 hover보다 명확
- 버튼 hover 효과가 focus에서도 제공
- 메뉴 focus trap
- ESC 동작
- aria-label
- Toast live region
- decorative orb와 grain은 aria-hidden
- 텍스트 reveal로 중복 읽기 방지
- 색상만으로 선택 상태를 표현하지 않음

---

# 22. 파일 구조 권장안

```text
src/
├── components/
│   ├── motion/
│   │   ├── fade-in.tsx
│   │   ├── reveal.tsx
│   │   ├── stagger.tsx
│   │   ├── parallax.tsx
│   │   ├── magnetic.tsx
│   │   ├── tilt-card.tsx
│   │   ├── marquee.tsx
│   │   ├── text-reveal.tsx
│   │   ├── floating-orb.tsx
│   │   ├── spotlight.tsx
│   │   └── scroll-progress.tsx
│   ├── feedback/
│   │   ├── toast.tsx
│   │   └── skeletons.tsx
│   └── home/
│       ├── interactive-hero.tsx
│       ├── creation-flow.tsx
│       ├── look-preview.tsx
│       └── marketplace-preview.tsx
├── hooks/
│   ├── use-pointer-position.ts
│   ├── use-media-query.ts
│   ├── use-reduced-motion.ts
│   └── use-copy-to-clipboard.ts
└── lib/
    └── motion.ts
```

기존 구조와 충돌하면 현재 프로젝트 구조에 맞게 조정한다.

---

# 23. 구현 순서

1. TASK-001 결과 분석
2. 모션 토큰 작성
3. reduced motion hook/provider 구현
4. 공통 reveal·stagger·parallax 구현
5. magnetic button·tilt card 구현
6. scroll progress·dynamic header 구현
7. Hero 인터랙션 고도화
8. ProductCard·ModelCard 고도화
9. Creation Flow 구현
10. LOOK Preview 인터랙션 구현
11. Marketplace Preview 인터랙션 구현
12. Toast·Skeleton 구현
13. 모바일·접근성 점검
14. 성능 점검
15. lint·typecheck·build

---

# 24. 검증 명령

```bash
npm run lint
npm run typecheck
npm run build
```

가능하면 다음도 실행한다.

```bash
npm run dev
```

브라우저에서 확인:

```text
/
 /trends
 /models
 /studio
 /marketplace
 /look/demo-look
```

---

# 25. 완료 조건

## 공통 시스템

- [ ] 공통 모션 토큰이 존재한다.
- [ ] Reveal, Stagger, Parallax 컴포넌트가 재사용 가능하다.
- [ ] Magnetic CTA가 구현된다.
- [ ] TiltCard가 구현된다.
- [ ] Reduced motion이 지원된다.
- [ ] 모바일에서 무거운 효과가 축소된다.

## Hero

- [ ] 핵심 문구 reveal이 자연스럽다.
- [ ] 모델과 상품 레이어가 시각적 깊이를 만든다.
- [ ] AI Status Panel 데모가 작동한다.
- [ ] CTA가 명확하고 클릭 가능하다.
- [ ] 모바일에서 Hero가 잘리지 않는다.

## 카드

- [ ] 상품 카드 hover가 고급스럽다.
- [ ] 모델 선택 상태가 명확하다.
- [ ] 키보드 focus 상태가 있다.
- [ ] 중첩 링크·버튼 오류가 없다.

## 흐름

- [ ] Creation Flow가 4단계를 명확히 보여준다.
- [ ] LOOK Preview에서 링크 복사 데모가 작동한다.
- [ ] Marketplace 카드 인터랙션이 작동한다.
- [ ] DEMO 데이터 표시가 명확하다.

## 품질

- [ ] 가로 스크롤이 발생하지 않는다.
- [ ] TypeScript 오류가 없다.
- [ ] lint가 통과한다.
- [ ] production build가 통과한다.
- [ ] 접근성 기본 기준을 충족한다.
- [ ] 모바일에서 과도한 프레임 저하가 없다.

---

# 26. 금지 사항

- 기존 TASK-001 구조 삭제
- 모든 컴포넌트를 클라이언트 컴포넌트로 변경
- 과도한 `"use client"` 사용
- 애니메이션을 위한 setInterval 남용
- 무한 반복 애니메이션 다수 사용
- 전체 화면 커서를 강제로 숨김
- 모바일에서 데스크톱 효과 그대로 실행
- 실제 처리처럼 보이는 허위 AI 진행 상태
- DEMO 수치를 실제 데이터처럼 표시
- 디자인 효과 때문에 CTA가 보이지 않게 구성
- 외부 이미지 URL에 의존해 빌드가 깨지게 구성

---

# 27. Task-003 연계 준비

TASK-003에서는 실제 랜딩 페이지의 콘텐츠와 섹션을 완성한다.

TASK-002 완료 시 다음 확장 포인트를 준비해야 한다.

- Hero 콘텐츠 쉽게 교체 가능
- 섹션 순서 변경 가능
- 카드 데이터 분리
- 각 섹션의 motion preset 재사용
- 영상 또는 이미지 asset 교체 가능
- 랜딩 페이지 분석 이벤트 연결 가능
- CTA 목적지 설정을 데이터로 관리 가능

TASK-003에서 집중할 내용:

```text
- 완성형 랜딩 페이지
- 핵심 서비스 스토리텔링
- 실사용자 관점의 카피라이팅
- 인기 패션 상품 섹션
- AI 모델 데모
- 콘텐츠 생성 데모
- 구매 링크와 수익 구조 설명
- 구독 전환 CTA
```

---

# 28. Claude Code 완료 보고 형식

```text
TASK-002 완료

1. 구현한 인터랙션 시스템
2. 생성/수정 파일 목록
3. Hero 변경 내용
4. 카드 인터랙션 변경 내용
5. Creation Flow 구현 내용
6. LOOK Preview 및 Marketplace 구현 내용
7. 모바일 최적화 내용
8. 접근성 및 reduced motion 대응
9. 성능 영향 및 최적화
10. lint 결과
11. typecheck 결과
12. build 결과
13. 로컬 확인 URL
14. TASK-003에서 이어갈 TODO
```

---

# 29. 최종 목표 문장

TASK-002의 최종 목표는 사용자가 Fashion Creator에 접속했을 때 단순한 정적 웹사이트가 아니라 다음과 같은 경험을 받도록 만드는 것이다.

```text
패션 상품이 살아 움직이고,
AI 모델과 콘텐츠가 연결되며,
스크롤을 내리는 것만으로
입어보기 → 만들기 → 공유하기 → 판매하기의 흐름이 이해되는
2026년형 프리미엄 AI 패션 플랫폼.
```
