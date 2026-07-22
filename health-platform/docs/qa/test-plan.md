# QA 테스트 계획

- 작업 ID: TASK-010 §4

## 1. 테스트 유형별 범위

| 유형 | 도구(권장) | 이번 범위 상태 |
|---|---|---|
| Unit | Vitest/Jest | 미구성 — [결정 필요] 도입 시점 |
| Integration | Vitest + Testing Library | 미구성 |
| E2E | Playwright | 미구성 — [[../accessibility/a11y-testing]]의 `pa11y-ci`가 URL 목록을 공유할 수 있음 |
| Visual Regression | Chromatic/Playwright 스크린샷 | 미구성 |
| Accessibility | `pa11y-ci` (WCAG2AA) | 구성됨 (`.pa11yci.json`) |
| Performance | Lighthouse CI | 구성됨 (`lighthouserc.json`) |
| Security | 수동 헤더 점검 + 의존성 스캔(`npm audit`) | 부분 구성 |
| Payment Sandbox | `MockPaymentAdapter` | 항상 성공하는 스텁 — 실 PG 샌드박스 연동 필요 |
| Search relevance | 수동 시나리오(§2) | 문서화됨 |
| Content safety | [[../health-safety/health-safety-checklist]] | 문서화됨 |
| Mobile device test | 수동(반응형 브레이크포인트) | 문서화됨 |

## 2. 검색 관련성 수동 시나리오

| 입력 | 기대 결과 |
|---|---|
| `두통` | headache-overview 콘텐츠가 최상단 |
| `두퉁` (오타) | 동의어 사전으로 즉시 보정되어 `두통` 결과 노출 |
| `고혈얍` (사전에 없는 오타) | Levenshtein 보정으로 `고혈압` 결과 노출, `correctedFrom` 표시 |
| `잠이 안 올 때 어떻게 해야 하나요?` (`/ask`) | sleep-hygiene-guide가 최우선 매칭 (제목 가중치 + 본문 빈도 스코어링) |
| 존재하지 않는 임의 문자열 | 검색 결과 없음 화면 + 인기 검색어 추천 |

이 표는 `src/lib/search/engine.ts`의 `findBestArticleForQuestion` 스코어링 로직 변경 시 회귀 테스트로 사용한다 (개발 중 실제로 이 시나리오에서 오답을 발견하고 수정한 이력이 있음 — 제목 미가중 시 우연한 본문 일치로 오답이 나올 수 있다).

## 3. 모바일 디바이스 테스트 체크리스트

- [ ] 375px(iPhone SE급) 너비에서 홈 Hero 검색창이 첫 화면에 보임
- [ ] 하단 탭 바가 5개 항목을 겹침 없이 표시
- [ ] 전체화면 메뉴/검색 오버레이가 포커스 트랩과 함께 정상 동작
- [ ] 상품 상세의 Sticky 구매 바가 콘텐츠를 가리지 않음(`pb-28` 여백 확인)

## 4. 결제 샌드박스 테스트

- [ ] `MockPaymentAdapter.charge()`가 항상 `success: true`를 반환하는 것을 확인 (실패 케이스 시뮬레이션은 이번 범위 밖 — [결정 필요] 실패 시나리오 테스트 추가 시점)
- [ ] DIGITAL 상품 결제 후 `digitalEntitlements`가 주문에 발급됨
- [ ] SUBSCRIPTION 상품 결제 후 `subscriptions` 레코드가 생성되고 일시정지/해지가 `/account/orders`에서 동작

## 5. 실행 명령 요약

```bash
npm run build        # 타입체크 + 프로덕션 빌드
npm run start &       # 서버 기동 (백그라운드)
npm run test:a11y     # WCAG2AA 접근성 검사
npm run test:lighthouse  # 성능/SEO/접근성 종합 점수
```
