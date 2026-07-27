# TASK-007A — AI Content Studio Core

> 프로젝트: Fashion Creator
> 선행: TASK-001 ~ TASK-006 완료
> 상태: Ready
> 목적: 선택한 Look을 기반으로 콘텐츠 생성 설정 화면과 공통 생성 워크플로우를 구축한다.

---

## Claude Code 실행 지시

```text
Task-007 폴더의 문서를 아래 순서로 읽고 구현해줘.

1. task-007A-AI-Content-Studio.md
2. task-007B-Video-Generation.md
3. task-007C-SNS-Output.md
4. task-007D-Content-History.md

Task-001~006에서 만든 구조와 디자인 시스템을 유지하고 확장해줘.
실제 AI API는 아직 연결하지 말고 DEMO Provider 구조로 구현해줘.
중간 확인 질문 없이 합리적인 기본값으로 끝까지 진행해줘.
각 문서 완료 후 lint, typecheck, build를 실행하고 오류를 수정해줘.
```

---

# 1. 목표

TASK-006에서 저장한 Look을 불러와 이미지, 쇼츠, 릴스, 유튜브 영상, 블로그 콘텐츠를 생성하기 위한 AI Content Studio의 공통 기반을 구축한다.

핵심 흐름:

```text
Look 선택
→ 콘텐츠 형식 선택
→ 비율·배경·카메라·모션 설정
→ 생성 요청
→ 진행 상태
→ 결과 미리보기
→ 채널별 출력
→ 구매 링크 연결 준비
```

---

# 2. 라우트

```text
/create
/create/new
/create/[projectId]
```

권장:

- `/create`: 콘텐츠 프로젝트 목록
- `/create/new`: 새 콘텐츠 생성
- `/create/[projectId]`: 생성 결과 및 편집

---

# 3. Studio 레이아웃

데스크톱:

```text
좌측: 설정 패널
중앙: 콘텐츠 프리뷰
우측: Look·상품·출력 요약
```

모바일:

- 상단 프리뷰
- 하단 단계형 설정
- sticky CTA
- 가로 스크롤 금지

---

# 4. 입력 데이터

TASK-006 Look 구조를 사용한다.

```ts
type ContentSourceLook = {
  id: string;
  name: string;
  modelId: string;
  modelType: "preset" | "avatar";
  modelPreviewImage: string;
  products: LookProduct[];
  totalPrice: number;
  styleTags: string[];
  isDemo: boolean;
};
```

Look이 없으면:

- 저장된 Look 선택
- 데모 Look 사용
- `/studio`로 돌아가기

---

# 5. 콘텐츠 형식

```ts
type ContentFormat =
  | "image"
  | "shorts"
  | "reels"
  | "tiktok"
  | "youtube"
  | "blog";
```

카드 표시:

- AI Fashion Image
- YouTube Shorts
- Instagram Reels
- TikTok
- YouTube Video
- Blog Package

---

# 6. 공통 설정

## 비율

- 9:16
- 16:9
- 1:1
- 4:5

## 길이

- 이미지
- 5초
- 10초
- 15초
- 30초
- 60초

## 배경

- 런웨이
- 서울 거리
- 뉴욕 거리
- 파리
- 스튜디오
- 카페
- 해변
- 미래도시
- 미니멀 공간

## 카메라

- 정면
- 전신
- 클로즈업
- 측면
- 회전
- 줌인
- 줌아웃
- 트래킹

## 모델 동작

- 워킹
- 포즈
- 회전
- 앉기
- 계단
- 슬로모션
- 자연스러운 움직임

## 분위기

- Luxury
- Editorial
- Street
- Minimal
- Sport
- Romantic
- Futuristic

---

# 7. Prompt Builder

사용자가 자연어로 추가 요청을 입력할 수 있게 한다.

예:

```text
서울 야경을 배경으로 고급스럽고 차분한 워킹 쇼츠를 만들어줘.
```

시스템은 입력값을 구조화된 설정으로 변환하는 DEMO 요약을 보여준다.

```text
배경: 서울 야경
스타일: Luxury
카메라: Tracking
형식: 9:16
길이: 15초
```

실제 LLM 호출은 하지 않는다.

---

# 8. 생성 Provider 구조

```ts
interface ContentGenerationProvider {
  createJob(input: GenerationInput): Promise<GenerationJob>;
  getJob(id: string): Promise<GenerationJob>;
  cancelJob(id: string): Promise<void>;
}
```

초기 구현:

```text
DemoContentGenerationProvider
```

향후:

- Image Provider
- Video Provider
- Copy Provider
- Thumbnail Provider

Provider를 교체할 수 있도록 UI와 분리한다.

---

# 9. 생성 Job 데이터

```ts
type GenerationJobStatus =
  | "draft"
  | "queued"
  | "preparing"
  | "generating"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

type GenerationJob = {
  id: string;
  projectId: string;
  status: GenerationJobStatus;
  progress: number;
  currentStep: string;
  createdAt: string;
  completedAt?: string;
  error?: string;
  output?: GeneratedContent;
  isDemo: boolean;
};
```

---

# 10. 진행 UI

단계:

```text
Look 분석
스타일 설정
장면 구성
콘텐츠 생성
출력 최적화
완료
```

요구사항:

- DEMO 표시
- 5~8초 내 완료
- 취소 가능
- 실패 데모 재시도
- reduced motion 지원
- 허위 서버 대기 안내 금지

---

# 11. 프리뷰

프리뷰 프레임은 선택 비율에 맞게 변경된다.

- 9:16 세로
- 16:9 가로
- 1:1 정사각
- 4:5 피드

프리뷰 표시:

- 선택 모델
- Look 상품
- 배경
- 오버레이
- DEMO 영상 또는 이미지

---

# 12. 컴포넌트 권장 구조

```text
src/components/content-studio/
├── content-studio-shell.tsx
├── look-source-panel.tsx
├── format-selector.tsx
├── aspect-ratio-selector.tsx
├── duration-selector.tsx
├── scene-selector.tsx
├── camera-selector.tsx
├── motion-selector.tsx
├── style-selector.tsx
├── prompt-input.tsx
├── prompt-summary.tsx
├── generation-preview.tsx
├── generation-progress.tsx
├── generation-error.tsx
└── output-summary.tsx
```

---

# 13. 상태관리

```ts
type ContentStudioState = {
  sourceLookId: string | null;
  format: ContentFormat;
  aspectRatio: string;
  duration: number | null;
  background: string;
  camera: string;
  motion: string;
  style: string;
  prompt: string;
  activeJobId: string | null;
};
```

localStorage 또는 zustand persist 사용 가능.

---

# 14. 접근성

- 모든 선택 항목 radio semantics
- 진행 상태 aria-live
- 오류 aria-describedby
- 키보드 탐색
- 모바일 터치 44px 이상
- 프리뷰 alt 또는 설명
- 색상 외 선택 표시

---

# 15. 완료 조건

- [ ] `/create/new` 동작
- [ ] Look 선택 가능
- [ ] 콘텐츠 형식 선택 가능
- [ ] 비율·길이·배경·카메라·모션 선택 가능
- [ ] Prompt DEMO 요약 작동
- [ ] 생성 Job DEMO 작동
- [ ] 완료 결과 표시
- [ ] lint/typecheck/build 통과
