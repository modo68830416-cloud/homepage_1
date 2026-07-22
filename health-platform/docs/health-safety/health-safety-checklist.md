# 건강정보 안전 체크리스트

- 작업 ID: TASK-009 §6
- 관련 컴포넌트: `EmergencyBanner`, `TrustPanel`, `DisclaimerNote` ([[../design/component-principles]])
- 관련 AI 정책: [[../search/ai-safety-guardrails]]

## 1. 콘텐츠 발행 전 체크리스트

- [ ] 검수자(`reviewer`)가 실명/자격으로 표기되어 있다 (익명 "검수 대기중" 상태는 `DRAFT`로만 존재해야 한다).
- [ ] 응급 관련 콘텐츠는 `isEmergencyRelevant: true` + `emergencyNote`가 채워져 있다.
- [ ] 출처(`sources`)가 최소 1개 이상 존재한다.
- [ ] 과장 표현("기적의", "100% 효과" 등)이 본문에 없다.
- [ ] 광고/제휴 상품이 본문 내용과 실제로 관련이 있다.

## 2. 게이트 메커니즘 (구현됨)

`status`가 정확히 `PUBLISHED`인 콘텐츠만 공개 노출된다 ([[../admin/content-workflow]]). 관리자 승인 없이는 어떤 콘텐츠도 공개 사이트에 나타나지 않는다.

## 3. 사용자 신고

`/support/report` 링크가 모든 콘텐츠 상세 하단에 존재한다(`(site)/health/articles/[slug]/page.tsx`). 신고 접수 후 처리 워크플로(신고 → 검토 → 콘텐츠 상태 변경)는 관리자 콘텐츠 상태 변경 기능을 그대로 활용할 수 있다.

## 4. 오래된 콘텐츠 재검수

- 이번 범위에는 자동 알림이 구현되어 있지 않다. `updatedAt` 기준 12개월 이상 경과한 콘텐츠는 재검수 대상으로 관리자 대시보드에 표시하는 기능이 필요하다. → [결정 필요] 재검수 주기(6개월/12개월) 및 담당자

## 5. AI 응답 안전

[[../search/ai-safety-guardrails]] 문서의 8섹션 구조와 응급 신호 우선순위 규칙을 그대로 따른다. `/ask` 화면은 응급 신호가 있을 경우 관련 상품 섹션보다 먼저 `EmergencyBanner`를 렌더링한다(`src/app/(site)/ask/AskClient.tsx`).
