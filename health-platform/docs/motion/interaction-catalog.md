# 인터랙션 카탈로그

- 작업 ID: TASK-004
- 각 항목: 트리거 · 구현 컴포넌트/기술 · 효과 예산 등급 · 저사양 대체

| # | 인터랙션 | 트리거 | 구현 | 효과 예산 | 저사양/모션감소 대체 |
|---|---|---|---|---|---|
| 1 | 시네마틱 페이지 진입 | 라우트 최초 로드 | `PageTransition` + `motion` | 100 | fade만 적용 |
| 2 | Hero 오브젝트 부유·반응 | 상시 + 커서 이동 | `HeroScene`(R3F) | 100 | 정적 이미지 |
| 3 | 마우스·터치 기반 깊이감 | pointermove | `Parallax` (레이어별 translate) | 70~100 | 비활성화 |
| 4 | Scroll-driven reveal | IntersectionObserver | `Reveal` | 30~70 | 즉시 표시(트랜지션 없음) |
| 5 | 텍스트 마스크 전환 | 섹션 진입 | `motion` clip-path 애니메이션 | 80~100 | 즉시 표시 |
| 6 | 섹션 간 색상 전환 | 스크롤 진행률 | CSS `scroll-timeline` 폴백 `motion` `useScroll` | 70~100 | 정적 배경 |
| 7 | 카드 tilt | pointermove(hover) | `motion` `useMotionValue` + perspective transform | 65 | 비활성화(hover만 scale) |
| 8 | 이미지 parallax | 스크롤 | `Parallax` | 65~80 | 비활성화 |
| 9 | 상품 이미지 spotlight | pointermove | radial-gradient mask 추종 | 80 | 정적 하이라이트 |
| 10 | 검색창 확장 | 클릭/포커스 | `motion` layout animation | 전 페이지 공통(작음) | duration만 축소 |
| 11 | 메뉴 전환 | 클릭 | `motion` `AnimatePresence` | 전 페이지 공통 | duration만 축소 |
| 12 | 페이지 전환 | 라우트 변경 | View Transitions API + `motion` 폴백 | 전 페이지 공통 | crossfade만 |
| 13 | 로딩 시퀀스 | 데이터 페칭 중 | Skeleton + 선택적 Lottie | 페이지별 상이 | Skeleton만 |
| 14 | 숫자·통계 애니메이션 | 스크롤 진입 | `motion` `useSpring`으로 숫자 카운트업 | 70~100 | 최종값 즉시 표시 |

## 공통 규칙

- 모든 인터랙션은 `useReducedMotion()` 훅의 반환값이 `true`이면 "저사양/모션감소 대체" 열의 동작으로 강제 전환된다.
- 결제/장바구니/본문(효과 예산 30 이하) 페이지에서는 1, 2, 3, 5, 6, 8, 9번 인터랙션을 사용하지 않는다([[motion-tokens]] §4 매핑 참조).
- 카드 tilt(#7)와 spotlight(#9)는 키보드 포커스 시에도 동일한 강조 상태(호버와 시각적으로 동일)를 제공해 마우스 전용 경험이 되지 않게 한다.
