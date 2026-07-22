# 모션 토큰

- 작업 ID: TASK-003
- 상세 인터랙션 카탈로그와 구현 컴포넌트는 TASK-004 [[motion-architecture]], [[interaction-catalog]] 참조. 이 문서는 토큰 값만 정의한다.

## 1. Duration

| 토큰 | 값 | 용도 |
|---|---|---|
| `--motion-duration-instant` | 100ms | 호버, 포커스 |
| `--motion-duration-fast` | 180ms | 버튼/토글 |
| `--motion-duration-base` | 280ms | 카드 진입, 일반 전환 |
| `--motion-duration-slow` | 480ms | 섹션 reveal |
| `--motion-duration-cinematic` | 900ms | Hero 진입, 페이지 전환 |

## 2. Easing

| 토큰 | 값 | 용도 |
|---|---|---|
| `--motion-ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | 일반 UI 전환 |
| `--motion-ease-decelerate` | `cubic-bezier(0, 0, 0.2, 1)` | 진입 애니메이션 |
| `--motion-ease-accelerate` | `cubic-bezier(0.4, 0, 1, 1)` | 퇴장 애니메이션 |
| `--motion-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 마그네틱 버튼, 통통 튀는 강조 |

## 3. 거리/스케일

| 토큰 | 값 | 용도 |
|---|---|---|
| `--motion-translate-sm` | 8px | 텍스트/카드 미세 진입 |
| `--motion-translate-md` | 24px | 섹션 reveal |
| `--motion-translate-lg` | 64px | Hero 요소 진입 |
| `--motion-scale-hover` | 1.02 | 카드 hover |
| `--motion-scale-tilt-max` | 6deg | 카드 tilt 최대 각도 |

## 4. 효과 예산 → 모션 강도 매핑

| 효과 예산 | 허용 모션 |
|---|---|
| 0~15 | opacity/color 전환만 (결제, 관리자) |
| 30 | fade + 소량 slide (콘텐츠 본문) |
| 65~70 | scroll reveal, hover scale, parallax 약하게 |
| 80~100 | 3D, scroll-driven cinematic, magnetic button, spotlight |

## 5. 공통 규칙

- 모든 모션 토큰은 `prefers-reduced-motion: reduce` 시 duration을 `0.01ms`로 강제 override한다(모션 제거가 아니라 즉시 종료 상태로 스냅, 상태 손실 방지).
- 모션 토큰은 항상 `src/hooks/useReducedMotion.ts`(TASK-004)를 통해 조건부 적용해야 하며 CSS만으로 끝내지 않는다(JS 트리거 애니메이션 대응).
