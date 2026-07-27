# TASK-001 — Fashion Creator Project Foundation & Premium Design System

> 프로젝트: Fashion Creator  
> 목표 배포일: 2026-07-29 수요일 18:00 KST  
> 실행 환경: Claude Code + GitHub Codespaces  
> 1차 목표: 실제 사용자가 접속 가능한 URL에서 고급 디자인 프로토타입 확인  
> 작업 우선순위: 최상  
> 상태: Ready

---

## 0. Claude Code 실행 지시

이 문서를 프로젝트 루트에 저장한 뒤 Claude Code에게 다음과 같이 지시한다.

```text
task-001.md를 읽고 문서의 요구사항을 순서대로 구현해줘.
기존 코드가 있다면 먼저 분석하고 안전하게 통합해줘.
중간에 확인 질문을 반복하지 말고 합리적인 기본값을 선택해서 끝까지 진행해줘.
각 단계가 끝날 때 lint, typecheck, build를 실행하고 오류를 수정해줘.
완료 후 변경 파일 목록, 실행 방법, 확인 URL, 남은 TODO를 정리해줘.
```

Claude Code는 단순한 샘플 페이지가 아니라 이후 Task-002부터 Task-010까지 확장 가능한 실제 서비스 기반을 구축해야 한다.

---

# 1. Task 목적

Fashion Creator 플랫폼 전체의 기술적·시각적 기반을 구축한다.

이번 Task에서는 실제 AI 생성, 실제 결제, 실제 쇼핑 데이터 연동까지 구현하지 않는다. 대신 다음 Task에서 기능을 안정적으로 추가할 수 있도록 프로젝트 구조, 공통 레이아웃, 디자인 토큰, 애니메이션 원칙, 목업 데이터 구조와 핵심 라우트를 준비한다.

Task-001 완료 시 다음 결과가 나와야 한다.

1. Next.js 기반 프로젝트가 정상 실행된다.
2. PC와 모바일에서 깨지지 않는 반응형 레이아웃이 존재한다.
3. Fashion Creator 전용 프리미엄 디자인 시스템이 적용된다.
4. 홈 화면에서 서비스의 정체성을 즉시 이해할 수 있다.
5. 이후 기능을 연결할 주요 라우트가 준비된다.
6. lint, typecheck, production build가 모두 통과한다.
7. Vercel 배포가 가능한 상태가 된다.

---

# 2. 프로젝트 핵심 정의

Fashion Creator는 일반적인 패션 쇼핑몰이 아니다.

사용자가 AI 모델 또는 자신의 정면 사진 한 장으로 만든 아바타에게 최근 인기 패션 상품을 코디하고, 이미지·동영상·쇼츠를 제작한 뒤, 자동 생성된 구매 링크와 함께 유튜브·블로그·인스타그램 등에 배포하여 판매와 수익으로 연결하는 AI 패션 콘텐츠 커머스 플랫폼이다.

## 핵심 가치

```text
Try. Create. Share. Sell.
입어보고, 만들고, 공유하고, 판매한다.
```

## 핵심 서비스 흐름

```text
인기 패션 아이템 탐색
→ AI 모델 또는 내 아바타 선택
→ 의류·신발·가방·액세서리 코디
→ 이미지·영상·쇼츠 생성
→ LOOK 구매 페이지 및 추적 링크 자동 생성
→ 유튜브·블로그·SNS 배포
→ 상품 구매 및 판매 성과 발생
→ 크리에이터 수익 정산
```

---

# 3. 사용자 유형

## 3.1 일반 사용자

- 인기 상품 탐색
- 기본 AI 모델 선택
- 정면 사진 한 장으로 아바타 생성 진입
- 간편 체형 설정
- 가상 코디 체험
- 상품 구매
- 제한된 콘텐츠 생성 체험

## 3.2 구독 크리에이터·사업자

- 고화질 이미지·영상 제작
- 쇼츠·릴스·유튜브·블로그 콘텐츠 생성
- 자동 구매 링크 발급
- 콘텐츠 성과 추적
- 판매 수익 확인
- 마켓플레이스 등록
- 브랜드 캠페인 참여

## 3.3 브랜드·판매자

- 상품 등록
- 브랜드 전용 AI 모델
- 콘텐츠 제작 의뢰
- 크리에이터 캠페인
- 판매 및 콘텐츠 성과 분석

---

# 4. 이번 Task 범위

## 포함

- 프로젝트 초기화 또는 기존 프로젝트 정비
- TypeScript 엄격 설정
- Tailwind CSS 기반 디자인 토큰
- 공통 레이아웃
- 글로벌 내비게이션
- 모바일 내비게이션
- 공통 버튼·카드·배지·섹션 컴포넌트
- 배경 광원·그라디언트·글로우 효과
- 기본 모션 시스템
- 홈 화면 1차 비주얼
- 주요 기능 미리보기 섹션
- 목업 상품·모델·콘텐츠 데이터
- 핵심 페이지 라우트와 플레이스홀더
- SEO 메타데이터
- 접근성·성능 기본 설정
- 오류 페이지와 로딩 화면
- Vercel 배포 준비

## 제외

- 실제 AI 아바타 생성 API
- 실제 AI 가상 피팅
- 실제 영상 생성 API
- 실제 유튜브·블로그 자동 업로드
- 실제 결제
- 실제 제휴 상품 API
- 실제 정산
- 실제 사용자 인증

---

# 5. 권장 기술 스택

- Next.js 최신 안정 버전
- App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion 또는 Motion for React
- Lucide React
- clsx
- tailwind-merge
- class-variance-authority
- Zod
- ESLint
- Prettier

필요한 경우 shadcn/ui를 도입할 수 있지만, 기본 디자인을 그대로 사용하지 말고 Fashion Creator 디자인 토큰으로 재구성한다.

---

# 6. 프로젝트 구조

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── trends/page.tsx
│   │   ├── models/page.tsx
│   │   ├── studio/page.tsx
│   │   ├── marketplace/page.tsx
│   │   └── pricing/page.tsx
│   ├── creator/page.tsx
│   ├── look/[slug]/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── brand/
│   ├── layout/
│   ├── home/
│   ├── motion/
│   └── ui/
├── data/
├── lib/
├── styles/
└── types/

public/
├── images/
│   ├── fashion/
│   ├── models/
│   ├── products/
│   └── creators/
└── videos/
```

---

# 7. 라우트 정의

| 경로 | 목적 | 이번 Task 수준 |
|---|---|---|
| `/` | 프리미엄 랜딩 페이지 | 실제 구현 |
| `/trends` | 인기 패션 트렌드 | 고급 플레이스홀더 |
| `/models` | AI 모델·아바타 선택 | 고급 플레이스홀더 |
| `/studio` | 가상 코디·콘텐츠 제작 | 고급 플레이스홀더 |
| `/creator` | 크리에이터 대시보드 | 고급 플레이스홀더 |
| `/marketplace` | 크리에이터 마켓플레이스 | 고급 플레이스홀더 |
| `/pricing` | 구독 플랜 | 고급 플레이스홀더 |
| `/look/demo-look` | 구매 링크 LOOK 페이지 | 고급 플레이스홀더 |

---

# 8. 디자인 방향

## 목표

첫 화면에서 사용자가 다음을 즉시 느껴야 한다.

```text
"이건 일반 쇼핑몰이 아니라 AI 패션 제작 플랫폼이다."
"디자인이 고급스럽고 미래적이다."
"직접 모델에게 옷을 입혀보고 영상을 만들고 싶다."
```

## 비주얼 키워드

- Cinematic
- Editorial Fashion
- Luxury Technology
- Dark Premium
- High Contrast
- Aurora Gradient
- Liquid Glass
- Soft Glow
- Layered Depth
- Kinetic Typography
- Bold Editorial Layout
- 3D-like Product Cards
- Responsive Motion

## 금지 사항

- 일반적인 쇼핑몰 템플릿 형태
- 흰 배경에 상품 카드만 나열
- 기본 SaaS 템플릿 느낌
- 기본 shadcn/ui 외형 그대로 사용
- 과도한 글로우
- 성능을 해치는 무분별한 애니메이션
- 작은 글씨와 낮은 대비
- 실제 기능처럼 오해하게 만드는 허위 수치

---

# 9. 디자인 토큰

## 색상

```css
:root {
  --background: #070707;
  --background-elevated: #0f0f10;
  --surface: rgba(255, 255, 255, 0.06);
  --surface-strong: rgba(255, 255, 255, 0.10);
  --border: rgba(255, 255, 255, 0.14);
  --border-strong: rgba(255, 255, 255, 0.24);

  --foreground: #f7f7f4;
  --foreground-muted: rgba(247, 247, 244, 0.68);
  --foreground-subtle: rgba(247, 247, 244, 0.46);

  --accent-lime: #d9ff57;
  --accent-pink: #ff78c8;
  --accent-blue: #76a9ff;
  --accent-violet: #a98bff;
  --accent-orange: #ff8b5d;

  --success: #6ff0a5;
  --warning: #ffd66f;
  --danger: #ff7d87;
}
```

## 타이포그래피

```text
Display XL: clamp(4rem, 10vw, 9rem)
Display L:  clamp(3rem, 7vw, 6.5rem)
H1:         clamp(2.6rem, 5vw, 5rem)
H2:         clamp(2rem, 4vw, 3.8rem)
H3:         clamp(1.4rem, 2vw, 2.2rem)
Body L:     1.125rem
Body:       1rem
Small:      0.875rem
```

---

# 10. 공통 컴포넌트

## Button

변형:

- primary
- secondary
- ghost
- outline
- icon
- magnetic

상태:

- hover
- focus-visible
- active
- disabled
- loading

## GlassPanel

- 투명 배경
- backdrop blur
- 얇은 테두리
- 내부 하이라이트
- 선택적 글로우
- 모바일에서는 blur 강도 감소

## Card

변형:

- product
- model
- creator
- feature
- metric

## Badge

예시:

- TRENDING
- AI GENERATED
- BEST SELLER
- CREATOR PICK
- MOCK DATA

목업 데이터에는 반드시 `MOCK DATA` 또는 `DEMO` 표시를 추가한다.

---

# 11. 모션 시스템

## 기본 원칙

- 모션은 기능과 위계를 설명해야 한다.
- 초기 화면 진입 모션은 1.2초 이내
- 일반 hover는 120~250ms
- 섹션 reveal은 400~700ms
- `prefers-reduced-motion`을 존중한다.

## 구현 대상

- 헤더 스크롤 상태 변화
- Hero 텍스트 stagger
- 배경 floating orb
- 상품 카드 hover depth
- 이미지 parallax
- 버튼 magnetic 반응
- 섹션 reveal
- marquee 1개
- 모바일에서는 과도한 parallax 비활성화

---

# 12. 홈 화면 구성

## Header

좌측:

- Fashion Creator 로고

중앙:

- Trends
- AI Models
- Studio
- Marketplace
- Pricing

우측:

- 로그인
- `Create a Look`

모바일:

- 햄버거 메뉴
- 전체 화면 또는 하단 시트 메뉴
- 주요 CTA 유지

## Hero

핵심 문구:

```text
Try. Create.
Share. Sell.
```

보조 문구:

```text
AI 모델에게 패션을 입히고,
영상과 쇼츠를 만들어
구매와 수익으로 연결하세요.
```

CTA:

- `AI 모델로 시작하기`
- `인기 아이템 보기`

Hero 비주얼 요구사항:

- 대형 패션 모델 또는 패션 실루엣
- 상품 카드 2~4개가 부유하는 레이어
- AI 코디 상태를 보여주는 작은 UI 패널
- 배경 오로라
- 마우스 이동 반응
- 화면 하단 스크롤 유도
- 모바일에서는 레이어를 줄여 가독성 우선

## Trend Preview

- 최근 인기 상품 카드 6개
- 급상승 배지
- 트렌드 점수
- 가격
- 카테고리
- `Try on AI Model`
- `Create Content`
- 모든 수치는 `DEMO DATA` 표시

## AI Model Preview

- 기본 AI 모델 4~6개
- 성별·체형·스타일 다양성
- `Use This Model`
- `Create My Avatar`
- 정면 사진 한 장 업로드 안내

## Creation Flow

```text
01 Pick a Model
02 Style the Look
03 Generate the Video
04 Share & Earn
```

## LOOK Page Preview

- 영상 미리보기
- 착용 상품 목록
- 전체 코디 가격
- 구매 링크
- QR 코드 프리뷰
- `Open Demo Look`

## Marketplace Preview

- 인기 크리에이터 카드
- 브랜드 캠페인 카드
- 콘텐츠 판매 카드
- `Explore Marketplace`

## Final CTA

```text
Your next fashion business
starts with one look.
```

---

# 13. 목업 데이터 타입

```ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  image: string;
  trendScore: number;
  trendLabel: "best-seller" | "rising" | "creator-pick";
  isDemo: boolean;
};

export type FashionModel = {
  id: string;
  name: string;
  image: string;
  style: string;
  bodyType: string;
  genderPresentation: string;
  isFeatured: boolean;
};

export type Creator = {
  id: string;
  handle: string;
  displayName: string;
  avatar: string;
  specialty: string;
  totalViews: number;
  attributedSales: number;
  isVerified: boolean;
  isDemo: boolean;
};
```

---

# 14. SEO 및 메타데이터

```text
title: Fashion Creator — AI Fashion Content Commerce Platform
description: AI 모델과 아바타에게 패션을 코디하고, 영상과 쇼츠를 만들어 구매와 수익으로 연결하세요.
```

필수:

- Open Graph
- Twitter Card
- favicon placeholder
- robots 설정
- sitemap 준비
- 다국어 확장 가능 구조

---

# 15. 접근성

- 모든 이미지에 적절한 alt
- 키보드 탐색
- focus-visible
- 충분한 명도 대비
- decorative 요소 접근성 트리 제외
- 모션 감소 설정 지원
- 모바일 터치 영역 최소 44px
- 폼 입력 label 제공

---

# 16. 성능 기준

목표:

- Lighthouse Performance 80 이상
- Accessibility 90 이상
- Best Practices 90 이상
- SEO 90 이상

필수 최적화:

- `next/image`
- 이미지 크기 지정
- lazy loading
- 영상 자동 재생 시 muted, playsInline
- 모바일 대체 이미지
- 클라이언트 컴포넌트 최소화
- 불필요한 외부 스크립트 금지

---

# 17. 오류·로딩 상태

## loading.tsx

- Fashion Creator 로고
- 최소한의 패션 라인 애니메이션

## error.tsx

- 오류 메시지
- 다시 시도
- 홈으로 이동
- 기술 스택 정보 노출 금지

## not-found.tsx

- 브랜드 톤 유지
- `Back to Fashion Creator`

---

# 18. 반응형 기준

```text
Mobile:  360px 이상
Tablet:  768px 이상
Laptop:  1024px 이상
Desktop: 1280px 이상
Wide:    1536px 이상
```

모바일 필수 확인:

- Hero 텍스트 잘림 없음
- CTA 버튼 터치 가능
- 카드 1열 또는 가로 스크롤
- 내비게이션 작동
- 가로 스크롤 없음

---

# 19. 배포 준비

## Vercel

- production build 성공
- 환경변수 없이 목업 모드 실행
- 모든 라우트 직접 접근 가능
- 이미지 경로 오류 없음

권장 임시 URL:

```text
https://fashion-creator.vercel.app
```

최종 도메인 계획:

```text
https://fashioncreator.co.kr
https://fashioncreator.kr
```

---

# 20. 작업 순서

1. 기존 프로젝트 분석
2. 패키지와 설정 정리
3. 폴더·타입·목업 데이터 생성
4. 디자인 토큰과 공통 UI 구현
5. Header·Footer·공통 레이아웃 구현
6. 홈 섹션 구현
7. 주요 라우트 플레이스홀더 구현
8. 반응형·접근성·성능 점검
9. lint·typecheck·build 실행
10. 완료 보고

검증 명령:

```bash
npm run lint
npm run typecheck
npm run build
```

`typecheck`가 없다면 추가한다.

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

---

# 21. 완료 조건

## 기술

- [ ] 개발 서버가 실행된다.
- [ ] 모든 정의 라우트가 열린다.
- [ ] TypeScript 오류가 없다.
- [ ] lint가 통과한다.
- [ ] production build가 통과한다.
- [ ] Vercel 배포가 가능하다.

## 디자인

- [ ] 일반 쇼핑몰처럼 보이지 않는다.
- [ ] Dark Premium 브랜드가 느껴진다.
- [ ] Hero에서 서비스가 즉시 이해된다.
- [ ] 데스크톱과 모바일 모두 완성도가 있다.
- [ ] 인터랙션이 자연스럽다.
- [ ] 주요 CTA가 명확하다.

## UX

- [ ] Trends, Models, Studio, Marketplace로 이동 가능하다.
- [ ] 홈 화면에서 전체 서비스 흐름을 이해할 수 있다.
- [ ] 목업 데이터가 실제 데이터로 오해되지 않는다.
- [ ] 키보드 및 모바일 조작이 가능하다.

---

# 22. Task-002 연계 준비

Task-002에서는 아래 내용을 고도화한다.

- 프리미엄 인터랙션 컴포넌트
- 고급 카드 모션
- 스크롤 기반 시네마틱 전환
- 동적 커서와 마그네틱 CTA
- 대형 패션 비주얼 연출
- 섹션별 차별화된 배경
- 모바일 모션 최적화

Task-001에서는 Task-002가 쉽게 연결되도록 공통 모션 래퍼와 디자인 토큰을 반드시 분리한다.

---

# 23. 최종 Claude Code 완료 보고 형식

```text
TASK-001 완료

1. 구현 요약
2. 생성/수정 파일 목록
3. 실행 명령
4. 로컬 확인 URL
5. lint 결과
6. typecheck 결과
7. build 결과
8. 반응형 확인 결과
9. 배포 준비 상태
10. Task-002에서 이어갈 TODO
```
