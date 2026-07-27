
# SPRINT-03 — AI Gateway & External Provider Architecture

> 프로젝트: Fashion Creator
> 선행: Sprint-01, Sprint-02 완료
> 목표: 실제 AI 서비스를 언제든 연결할 수 있는 Provider 기반 AI Gateway를 구축한다.

## Claude Code 실행

```text
SPRINT-03-AI-Gateway.md를 읽고 현재 프로젝트를 분석한 뒤 구현해줘.

중요 원칙
- 기존 UI와 UX는 유지
- 실제 AI API는 아직 호출하지 말고 Provider 인터페이스를 먼저 구현
- 모든 AI 기능은 Gateway를 통해서만 접근
- 향후 OpenAI, Gemini, Flux, Kling, Runway, Fal, Replicate 등으로 쉽게 교체 가능하게 설계
- lint, typecheck, build를 단계별 실행
```

---

# 1. AI 아키텍처

모든 AI 요청은 다음 흐름을 따른다.

User Action
→ AI Gateway
→ Provider Adapter
→ AI Service
→ Result Mapper
→ UI

직접 Provider를 호출하는 UI 코드는 금지한다.

---

# 2. Provider 인터페이스

공통 인터페이스

- Avatar Provider
- Try-On Provider
- Image Provider
- Video Provider
- Prompt Provider
- Trend Provider
- Recommendation Provider

Provider 교체 시 UI 수정이 없어야 한다.

---

# 3. Gateway 계층

권장 구조

src/
ai/
gateway/
providers/
prompts/
mappers/
types/

Gateway는 요청 검증, Provider 선택, 응답 표준화 담당.

---

# 4. Job 시스템

AI 작업은 Job으로 관리

- queued
- processing
- completed
- failed
- cancelled

진행률(progress)과 예상시간 DEMO 제공.

---

# 5. Prompt Builder

사용자 입력

- 모델
- 상품
- 스타일
- 배경
- 카메라
- 길이
- 플랫폼

↓

표준 Prompt 생성

Prompt Template을 별도 관리.

---

# 6. AI 결과 표준화

모든 Provider 결과를 동일한 구조로 변환.

예)

jobId
status
previewUrl
downloadUrl
thumbnail
logs
provider
createdAt

---

# 7. Demo Provider

실제 API 대신

- DemoImageProvider
- DemoVideoProvider
- DemoAvatarProvider

구현.

환경변수로 Provider 변경 가능.

---

# 8. 설정

NEXT_PUBLIC_AI_PROVIDER=demo

향후

openai
gemini
fal
replicate
runway
kling

등으로 변경 가능.

---

# 9. 로그

AI 요청

응답

실패

재시도

취소

을 중앙 로그로 관리.

---

# 10. 완료 조건

- AI Gateway 구축
- Provider Interface 구축
- Demo Provider 연결
- Prompt Builder 구현
- Job Queue 구현
- 상태 표시
- lint/typecheck/build 통과

---

# 완료 보고

1. AI Gateway 구조
2. Provider 목록
3. Prompt Builder
4. Job Queue
5. 수정 파일
6. 테스트
7. lint
8. typecheck
9. build
10. Sprint-04 제안
