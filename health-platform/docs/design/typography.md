# 타이포그래피

- 작업 ID: TASK-003

## 1. 폰트 패밀리

- **Display/Heading (한글+영문 Variable Font)**: `Pretendard Variable` (한글) 조합 `Inter Variable` (영문 폴백/숫자). 두 서체 모두 Variable Font로 굵기(weight)와 폭(width) 축을 스크롤/반응형에 활용 가능.
- **Body**: `Pretendard Variable` 본문 굵기 400~500 고정.
- **Data/Mono (가격, 수치, 코드)**: `IBM Plex Mono` 또는 `JetBrains Mono`.
- 웹폰트 로딩: `next/font`를 사용해 self-host, `font-display: swap` 적용, 브랜드 영역 폰트는 지연 로딩 가능하되 본문 폰트는 즉시 로딩(CLS 방지).

## 2. 스타일 분리

| 스타일 | 용도 | 굵기 | 자간 |
|---|---|---|---|
| Display | Hero 대형 타이틀 | 700~800 (Variable 축 활용) | -0.02em |
| Heading | 섹션/카드 제목 | 600~700 | -0.01em |
| Body | 본문 | 400~500 | 0 |
| Caption | 출처/메타 정보 | 400 | 0 |
| Data | 가격/통계/코드성 수치 | 500 (Mono) | 0 |

## 3. Fluid Type Scale

`clamp()` 기반으로 뷰포트에 따라 자동 축소되는 스케일을 사용한다 (최소값/최대값, 375px~1440px 기준 보간).

| 토큰 | clamp 범위 | 용도 |
|---|---|---|
| `--font-display-1` | `clamp(2.5rem, 6vw, 5.5rem)` | Hero 최상단 타이틀 |
| `--font-display-2` | `clamp(2rem, 4.5vw, 3.75rem)` | 캠페인 서브 타이틀 |
| `--font-heading-1` | `clamp(1.5rem, 2.4vw, 2.25rem)` | 섹션 제목 |
| `--font-heading-2` | `clamp(1.25rem, 1.8vw, 1.5rem)` | 카드/서브섹션 제목 |
| `--font-body-lg` | `clamp(1.0625rem, 1.1vw, 1.125rem)` | 콘텐츠 본문(가독성 우선, 축소 폭 최소화) |
| `--font-body-md` | `1rem` (고정) | 일반 UI 텍스트 |
| `--font-caption` | `0.8125rem` (고정) | 출처/메타/라벨 |
| `--font-data` | `clamp(1rem, 1.4vw, 1.25rem)` | 가격/통계 |

본문(`--font-body-lg`)은 화면이 작아져도 최소 1.0625rem(17px) 이하로 축소하지 않는다 — 가독성 우선 원칙([[brand-principles]] §2-2).

## 4. 제목/본문 구성 원칙

- 제목(Display/Heading): 브랜드 영역에서는 굵고 큰 대비로 임팩트를 주되, 정보 영역 제목은 Heading 스타일까지만 사용하고 Display는 사용하지 않는다.
- 본문(Body): 중립적 굵기(400~500), 장식적 효과(그라데이션 텍스트, 마스크 등) 금지.

## 5. 줄 길이·줄바꿈 규칙

- 본문 한 줄 길이: 45~75자(한글 기준 약 34~45자) 권장, CSS `max-width: 68ch` 적용.
- 줄간격(line-height): 본문 1.7~1.85, 제목 1.15~1.3, 캡션 1.5.
- 한글 줄바꿈: `word-break: keep-all`을 본문에 기본 적용해 단어 중간 줄바꿈을 방지한다.
- 숫자·단위(예: "10mg", "3회/일")는 줄바꿈되지 않도록 `white-space: nowrap`을 데이터 스타일에 적용한다.

## 6. 접근성 연결

- 사용자 200% 확대 시에도 레이아웃 파손 없이 텍스트가 재배치되어야 한다 (rem 기반 단위 사용, 고정 px 폰트 금지) — [[accessibility-rules]] 참조.
