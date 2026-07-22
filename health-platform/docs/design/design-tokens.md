# 디자인 토큰 체계

- 작업 ID: TASK-003
- 구현: `src/styles/tokens.css` (Tailwind v4 `@theme` 기반 — CSS 자체가 설정 파일 역할을 하므로 별도 `tailwind.config.ts`가 필요 없다. 이는 [결정 필요] 항목이 아니라 Tailwind v4의 CSS-first 설정 방식에 따른 확정 사항이다.)

## 1. 색상 (Color)

### 브랜드 (Brand — Hero/캠페인 전용)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-brand-950` | `#0b0f2e` | 브랜드 배경 최심부 |
| `--color-brand-800` | `#1b1f5c` | 그라데이션 중간 |
| `--color-brand-600` | `#3d4bd6` | 그라데이션 상단, 브랜드 강조 |
| `--color-brand-400` | `#7c8cff` | 하이라이트, 보더 글로우 |
| `--color-accent-500` | `#ff5d73` | 브랜드 CTA, 강조 포인트 |
| `--color-accent-300` | `#ffb199` | 그라데이션 보조 |

### 정보 (Ink/Surface — 본문 전용, 높은 대비)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-ink-900` | `#111318` | 본문 제목 텍스트 |
| `--color-ink-700` | `#33363f` | 본문 텍스트 |
| `--color-ink-500` | `#5b5f6b` | 보조 텍스트, 캡션 |
| `--color-ink-300` | `#9ca0ac` | 비활성/플레이스홀더 |
| `--color-surface-0` | `#ffffff` | 기본 배경 |
| `--color-surface-50` | `#f6f7fb` | 카드/섹션 배경 |
| `--color-surface-100` | `#eceef5` | 구분 영역 배경 |
| `--color-border-200` | `#dfe2ea` | 기본 보더 |

### 상태 (Status)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-success-500` | `#1f9d55` | 성공/재고있음 |
| `--color-warning-500` | `#e0a015` | 경고/일부품절 |
| `--color-danger-500` | `#e0393f` | 오류/응급/품절 |
| `--color-info-500` | `#2f7ee0` | 안내/공지 |
| `--color-emergency-bg` | `#fdecec` | 응급 안내 배경(항상 최우선 시인성) |

### 판매유형 배지 색상 (TASK-007 enum과 1:1 매핑)

| 판매유형 | 토큰 | 값 |
|---|---|---|
| DIRECT | `--color-badge-direct` | `#2f7ee0` |
| AFFILIATE | `--color-badge-affiliate` | `#8a5cf6` |
| DROPSHIP | `--color-badge-dropship` | `#0ea5a5` |
| MARKETPLACE | `--color-badge-marketplace` | `#e0821f` |
| DIGITAL | `--color-badge-digital` | `#615fd1` |
| SUBSCRIPTION | `--color-badge-subscription` | `#c2429a` |
| BOOKING | `--color-badge-booking` | `#2f9e6e` |

## 2. 배경 / 표면 / 텍스트 / 경계선 (의미 토큰)

| 의미 토큰 | 매핑 |
|---|---|
| `--bg-page` | `--color-surface-0` (다크: `--color-brand-950`) |
| `--bg-surface` | `--color-surface-50` |
| `--text-primary` | `--color-ink-900` |
| `--text-secondary` | `--color-ink-500` |
| `--border-default` | `--color-border-200` |

## 3. 그림자 / 블러 (Shadow / Blur)

| 토큰 | 값 |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(17,19,24,0.06)` |
| `--shadow-md` | `0 8px 24px rgba(17,19,24,0.12)` |
| `--shadow-lg` | `0 24px 64px rgba(17,19,24,0.18)` |
| `--shadow-glow-brand` | `0 0 80px rgba(61,75,214,0.35)` |
| `--blur-glass` | `blur(16px)` |
| `--blur-ambient` | `blur(48px)` |

## 4. 간격 / 반경 (Spacing / Radius)

- 간격 스케일(4px 기준 배수): `--space-1`(4px) ~ `--space-16`(64px), 표준 8단계(4/8/12/16/24/32/48/64).
- 반경: `--radius-sm`(8px) · `--radius-md`(16px) · `--radius-lg`(24px) · `--radius-full`(9999px).

## 5. 레이어 (z-index)

| 토큰 | 값 | 용도 |
|---|---|---|
| `--z-base` | 0 | 기본 콘텐츠 |
| `--z-sticky` | 10 | 고정 CTA, 헤더 |
| `--z-overlay` | 30 | 모바일 메뉴/검색 오버레이 |
| `--z-modal` | 50 | 모달 |
| `--z-toast` | 70 | 토스트/알림 |

## 6. 브레이크포인트

| 토큰 | 값 |
|---|---|
| `--bp-sm` | 480px |
| `--bp-md` | 768px |
| `--bp-lg` | 1024px |
| `--bp-xl` | 1280px |
| `--bp-2xl` | 1536px |

## 7. 타이포그래피 / 모션 토큰

타이포그래피는 [[typography]], 모션은 [[motion-tokens]] 문서에서 상세 정의한다.

## 8. 테마 전략

- 기본은 라이트 테마(정보 영역의 가독성 우선). 다크 테마는 브랜드 영역(Hero, 캠페인)에 한해 부분 적용하며 `data-theme="dark"` 스코프 클래스로 제어한다.
- 전역 다크모드 토글은 1차 범위에 포함하지 않는다. → [결정 필요] 전체 다크모드 지원 여부
