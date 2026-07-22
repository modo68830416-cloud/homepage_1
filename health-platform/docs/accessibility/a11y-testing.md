# 접근성 테스트 계획

- 작업 ID: TASK-009
- 디자인 시스템 레벨 규칙: [[../design/accessibility-rules]] (TASK-003)

## 1. 자동화 테스트

- 도구: `pa11y-ci` (WCAG2AA), 설정 `.pa11yci.json`
- 대상 URL: 홈, 건강정보 허브, 콘텐츠 상세, 스토어 허브, 상품 상세, 검색 결과, AI 질문 페이지
- 실행: `npm run test:a11y` (CI에서는 `npm run build && npm run start &` 후 실행, [[../roadmap/master-roadmap|master-roadmap]] CI 워크플로 참고)
- 실패 기준: WCAG2AA 위반 1건 이상 시 빌드 실패

## 2. 수동 점검 체크리스트 (릴리스별 1회)

- [ ] 키보드만으로 헤더 메뉴 → 검색 → 콘텐츠 상세 → 관련 상품까지 전체 탐색 가능
- [ ] 포커스 표시가 모든 인터랙티브 요소에서 육안으로 보임
- [ ] 스크린리더(VoiceOver/NVDA)로 랜드마크(header/nav/main/footer) 인식 확인
- [ ] `prefers-reduced-motion` 활성화 시 Hero 3D/패럴랙스가 정적으로 대체됨
- [ ] 브라우저 200% 확대 시 가로 스크롤 없이 레이아웃 유지
- [ ] 응급 배너가 스크린리더에 `role="alert"`로 즉시 안내됨
- [ ] 폼 오류(체크아웃, 로그인)가 텍스트+색상으로 동시에 표시됨

## 3. 회귀 방지

`/design-lab/motion`(TASK-004)에서 모션 관련 접근성 동작(모션 감소 시 대체, 키보드 포커스 강조)을 매 릴리스 전 별도로 확인한다.

## 4. 미결정 항목

- [결정 필요] 실제 스크린리더 정기 수동 테스트 담당자/주기
