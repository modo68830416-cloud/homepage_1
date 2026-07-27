# TASK-010 실행 안내

TASK-010은 Fashion Creator 1차 프로토타입의 마지막 핵심 단계입니다.

## 구현 순서

1. `task-010A-Creator-Marketplace.md`
2. `task-010B-Creator-Profiles-Licensing.md`
3. `task-010C-Brand-Campaigns-Requests.md`
4. `task-010D-Workflow-Review-Escrow.md`
5. `task-010E-Phase1-Launch-QA-Deployment.md`

## Claude Code 입력문

```text
task-010-fashion-creator-marketplace 폴더 안의 모든 md 파일을 읽고
README.md에 적힌 순서대로 구현해줘.

Task-001~009에서 만든 구조와 디자인 시스템을 보존하면서 확장해줘.

실제 결제, 에스크로, 계약, 전자서명, 세금, 정산 API는 연결하지 말고
실제 서비스로 확장 가능한 DEMO Provider 구조로 구현해줘.

모든 금액은 대한민국 원화로 표시하고
모든 거래·예산·성과·수익 데이터에는 DEMO 또는 예시 표시를 명확히 해줘.

마지막 문서에서는 Task-001~010 전체를 통합 점검하고
Vercel 배포가 가능한 상태까지 만들어줘.

각 문서 완료 후 lint, typecheck, build를 실행하고 오류를 모두 수정해줘.
```
