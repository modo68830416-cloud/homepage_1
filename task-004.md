# TASK-004 시네마틱 모션·3D·인터랙션 시스템 구축

- 프로젝트: 고도화 건강정보·멀티커머스 플랫폼
- 작업 ID: TASK-004
- 문서 버전: v1.0
- 작성일: 2026-07-23
- 실행 대상: Claude Code
- 선행 원칙: MERION/MOMO와 무관한 독립 프로젝트
- 상태: 실행 준비

---


## 1. 목표

화려한 비주얼의 핵심인 모션과 3D를 재사용 가능한 시스템으로 구축한다. 특정 페이지에 임시 애니메이션을 붙이지 않는다.

## 2. 적용 기술 후보

- CSS Transitions
- Web Animations API
- Motion 또는 GSAP
- React Three Fiber
- Drei
- Lottie 또는 Rive
- View Transitions API
- Canvas/WebGL
- WebGPU는 점진적 향상 방식으로만 검토

## 3. 필수 인터랙션

- 시네마틱 페이지 진입
- Hero 오브젝트 부유 및 반응
- 마우스·터치 기반 깊이감
- Scroll-driven reveal
- 텍스트 마스크 전환
- 섹션 간 색상 전환
- 카드 tilt
- 이미지 parallax
- 상품 이미지 spotlight
- 검색창 확장
- 메뉴 전환
- 페이지 전환
- 로딩 시퀀스
- 숫자 및 통계 애니메이션

## 4. 성능 원칙

- 본문과 결제 페이지에는 무거운 3D를 사용하지 않는다.
- 3D 자산은 지연 로딩한다.
- 모바일 저사양 기기에서는 정적 대체 이미지를 제공한다.
- FPS 저하 시 효과를 자동 축소한다.
- 사용자가 모션 감소를 요청하면 효과를 제거한다.
- LCP 요소에는 무거운 애니메이션을 직접 적용하지 않는다.

## 5. 산출물

- `docs/motion/motion-architecture.md`
- `docs/motion/interaction-catalog.md`
- `docs/motion/performance-budget.md`
- `src/components/motion/Reveal.tsx`
- `src/components/motion/Parallax.tsx`
- `src/components/motion/MagneticButton.tsx`
- `src/components/motion/PageTransition.tsx`
- `src/components/three/HeroScene.tsx`
- `src/hooks/useReducedMotion.ts`
- `src/hooks/useDeviceCapability.ts`

## 6. 완료 조건

- 모든 애니메이션이 토큰과 공통 컴포넌트를 사용한다.
- 저사양·모바일 대체 전략이 구현되어 있다.
- 키보드 사용자를 방해하지 않는다.
- 모션이 콘텐츠 읽기를 지연시키지 않는다.
- 3D가 실패해도 핵심 기능은 정상 작동한다.

## 7. Claude Code 실행 지시

샘플 데모 라우트 `/design-lab/motion`을 만들고 모든 인터랙션을 독립적으로 검수할 수 있게 한다.
