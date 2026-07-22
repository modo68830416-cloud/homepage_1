# 모션 아키텍처

- 작업 ID: TASK-004
- 토큰: [[motion-tokens]] (TASK-003)

## 1. 기술 스택 결정

| 계층 | 선택 기술 | 이유 |
|---|---|---|
| 범용 UI 모션 | `motion` (Framer Motion 후속 패키지) | React 19 호환, 선언적 API, `useReducedMotion` 내장, 제스처/스크롤 트리거 지원 |
| 3D 오브젝트 | `@react-three/fiber` + `@react-three/drei` + `three` | React 컴포넌트 모델로 3D 씬 선언, Drei 헬퍼로 개발 속도 확보 |
| 미세 전환 | CSS Transitions / Web Animations API | 토큰 기반 색상·투명도 전환처럼 JS 오버헤드가 불필요한 경우 |
| 페이지 전환 | View Transitions API (지원 브라우저) + `motion` 폴백 | 점진적 향상, 미지원 브라우저는 `motion`의 `AnimatePresence`로 대체 |
| 로티/일러스트 모션 | Lottie (`lottie-react`, 필요 시 도입) | 로딩 시퀀스 등 벡터 애니메이션 |
| WebGPU | 미도입, 향후 점진적 향상 후보로만 검토 | 브라우저 지원 성숙도 부족 |

GSAP는 이번 범위에서 채택하지 않는다 — `motion`만으로 스크롤 트리거·타임라인 요구를 충분히 커버할 수 있어 번들 중복을 피한다. → [결정 필요] 복잡한 타임라인 연출이 늘어나면 GSAP 재검토.

## 2. 레이어 구조

```
src/hooks/
  useReducedMotion.ts     — 사용자 모션 감소 선호 감지
  useDeviceCapability.ts  — 저사양/모바일 판정 → 3D on/off 결정

src/components/motion/
  Reveal.tsx              — scroll-driven reveal (fade/slide)
  Parallax.tsx            — 마우스/스크롤 기반 시차 이동
  MagneticButton.tsx       — 커서 근접 반응형 버튼
  PageTransition.tsx       — 라우트 전환 래퍼

src/components/three/
  HeroScene.tsx            — Hero용 3D 오브젝트 캔버스 (지연 로딩)
```

모든 페이지는 이 공통 컴포넌트만 조합해서 사용한다. 페이지 전용 임시 애니메이션 코드를 개별 페이지 파일에 작성하지 않는다([[component-principles]] §7 원칙과 동일).

## 3. 데이터 흐름

1. `useDeviceCapability`가 기기 성능(대략적 휴리스틱: `navigator.hardwareConcurrency`, `deviceMemory`, 모바일 여부, WebGL 지원 여부)을 판정한다.
2. `useReducedMotion`이 OS 레벨 `prefers-reduced-motion`을 감지한다.
3. 3D/무거운 모션 컴포넌트는 위 두 훅의 결과에 따라 "정적 대체" 또는 "축소된 모션" 또는 "전체 모션" 중 하나를 렌더링한다.
4. 모든 모션 컴포넌트는 실패(에러 바운더리)해도 children(핵심 콘텐츠)은 항상 렌더링된다.

## 4. FPS 저하 대응

`HeroScene`은 `requestAnimationFrame` 델타를 측정해 연속 저프레임(예: 24fps 미만이 2초 이상 지속)이 감지되면 픽셀비를 낮추고, 그래도 회복되지 않으면 정적 이미지로 자동 전환한다(§4 [[performance-budget]] 참조).

## 5. 데모 라우트

`/design-lab/motion`에서 모든 인터랙션을 독립적으로 검수할 수 있다(TASK-004 §7 실행 지시).
