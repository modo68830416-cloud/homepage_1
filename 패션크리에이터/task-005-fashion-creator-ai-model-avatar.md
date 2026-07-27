# TASK-005 — AI Model Library & One-Photo Avatar Builder

> 프로젝트: Fashion Creator  
> 선행 작업: TASK-001 ~ TASK-004 완료  
> 목표 배포일: 2026-07-29 수요일 18:00 KST  
> 실행 환경: Claude Code + GitHub Codespaces  
> 작업 우선순위: 최상  
> 상태: Ready

---

## 0. Claude Code 실행 지시

이 파일을 프로젝트 루트에 저장한 뒤 Claude Code에게 다음과 같이 지시한다.

```text
task-005-fashion-creator-ai-model-avatar.md를 읽고 요구사항을 순서대로 구현해줘.

반드시 task-001~004에서 만든 구조, 디자인 시스템, 모션 시스템, 라우트를 먼저 분석하고 보존해줘.
기존 기능을 삭제하거나 단순화하지 말고 확장하는 방식으로 구현해줘.

이번 Task는 실제 AI 생성 API를 연결하기 전 단계이므로,
MOCK/DEMO 모드에서도 실제 서비스처럼 자연스럽게 동작하는 사용자 흐름을 만들어줘.

정면 사진 1장만 업로드하는 방식으로 설계하고,
사용자에게 측면/후면 사진이나 복잡한 신체 치수를 요구하지 말아줘.

완료 후 lint, typecheck, build를 실행하고 모든 오류를 수정해줘.
마지막에는 구현 요약, 변경 파일, 확인 URL, 접근성/개인정보 대응, 남은 TODO를 정리해줘.
```

---

# 1. Task 목적

Fashion Creator의 핵심 진입 기능인 AI 모델 선택 및 개인 아바타 생성 경험을 구축한다.

사용자는 다음 두 방식 중 하나로 빠르게 시작할 수 있어야 한다.

1. 플랫폼이 제공하는 기본 AI 모델 선택
2. 자신의 정면 사진 한 장으로 개인 아바타 생성

모델 생성은 복잡한 3D 스캔이나 다중 사진 업로드가 아니라, 누구나 2~3분 안에 완료할 수 있는 간편한 경험이어야 한다.

---

# 2. 핵심 사용자 가치

사용자는 다음과 같이 느껴야 한다.

```text
"사진 여러 장을 준비하지 않아도 된다."
"내 사진 한 장으로 나와 비슷한 모델을 만들 수 있다."
"복잡한 신체 치수를 몰라도 쉽게 설정할 수 있다."
"바로 옷을 입혀보고 콘텐츠 제작으로 이동할 수 있다."
```

---

# 3. 이번 Task 완료 결과

TASK-005 완료 시 다음 결과가 나와야 한다.

1. `/models` 페이지가 완성된다.
2. 기본 AI 모델 라이브러리가 작동한다.
3. 모델 필터와 선택 상태가 작동한다.
4. 정면 사진 한 장 업로드 UI가 작동한다.
5. 이미지 파일 검증과 미리보기가 작동한다.
6. 간편 체형 설정 폼이 작동한다.
7. 아바타 생성 데모 진행 상태가 작동한다.
8. 생성된 아바타 결과 화면이 제공된다.
9. 모델 저장 및 선택 데모가 가능하다.
10. 선택된 모델이 `/studio`로 전달될 준비가 된다.
11. 개인정보·동의·삭제 안내가 구현된다.
12. lint, typecheck, production build가 통과한다.

---

# 4. 범위

## 포함

- 기본 AI 모델 라이브러리
- 모델 검색 및 필터
- 모델 선택
- 정면 사진 한 장 업로드
- 파일 형식·크기 검증
- 업로드 미리보기
- 사용자 동의 체크
- 키·몸무게 선택 입력
- 쉬운 체형 선택
- 자연어 체형 설명
- 아바타 생성 데모 상태
- 결과 확인
- 간단한 미세 조정
- 모델 저장 데모
- 선택 모델 상태 관리
- `/studio` 이동
- 개인정보 보호 문구
- DEMO 표시

## 제외

- 실제 얼굴 임베딩
- 실제 이미지 생성 API
- 실제 3D 아바타 생성
- 실제 체형 추정
- 실제 생체정보 저장
- 실제 사용자 인증
- 실제 장기 파일 저장
- 실제 클라우드 업로드

---

# 5. 핵심 설계 원칙

## 5.1 One Photo Only

사용자는 정면 사진 한 장만 업로드한다.

요구하지 않는 항목:

- 측면 사진
- 후면 사진
- 다중 각도 사진
- 회전 영상
- 전신 스캔
- 허벅지 둘레
- 팔뚝 둘레
- 허리둘레
- 골반둘레
- 종아리 둘레
- 다리 안쪽 길이
- 전문 치수 측정

## 5.2 Progressive Disclosure

처음에는 최소 선택만 보여준다.

```text
정면 사진
→ 키(선택)
→ 몸무게(선택)
→ 전체 체형
→ 다리 비율
→ 어깨/팔/복부/하체 선택
```

세부 설정은 `더 정교하게 조정하기`를 선택한 사용자에게만 노출한다.

## 5.3 No Body Shaming

모든 문구는 중립적이고 존중하는 표현을 사용한다.

권장:

- 마른 편
- 보통
- 볼륨 있는 편
- 체격이 있는 편
- 팔이 가는 편
- 팔이 볼륨 있는 편
- 복부가 평평한 편
- 복부에 볼륨이 있는 편

피해야 할 표현:

- 뚱뚱함
- 비정상 체형
- 결함
- 교정 필요
- 이상적인 몸매

## 5.4 Honest AI

정면 사진 한 장만으로 실제 신체 구조를 정확히 추정했다고 표현하지 않는다.

화면에 다음 취지의 문구를 명확하게 표시한다.

```text
정면 사진은 얼굴과 전체적인 분위기를 참고하기 위해 사용됩니다.
체형은 사용자가 선택한 간편 설정을 기준으로 생성됩니다.
현재 화면은 AI 아바타 생성 데모이며 실제 결과와 차이가 있을 수 있습니다.
```

---

# 6. 라우트 구조

```text
/models
/models/create
/models/create/photo
/models/create/body
/models/create/generating
/models/create/result
```

Next.js 구조에 따라 하나의 페이지 안에서 step state로 구현해도 된다.

권장:

- `/models`: 모델 라이브러리
- `/models/create`: 아바타 생성 wizard

URL query 또는 client state로 단계를 관리할 수 있다.

예:

```text
/models/create?step=photo
/models/create?step=body
/models/create?step=result
```

브라우저 뒤로가기가 자연스럽게 작동하도록 설계한다.

---

# 7. `/models` 페이지 구성

## 7.1 Hero

제목:

```text
Choose Your AI Model
or Create Your Own.
```

한국어 보조 문구:

```text
기본 AI 모델을 바로 선택하거나,
정면 사진 한 장으로 나만의 아바타를 만들어보세요.
```

CTA:

- `기본 모델 선택하기`
- `내 사진으로 아바타 만들기`

## 7.2 Featured Models

대표 AI 모델 4~6개.

카테고리 예시:

- Editorial
- Street
- Minimal
- Sport
- Classic
- Plus
- Senior
- Gender-neutral

## 7.3 Filter Bar

필터:

- 전체
- 여성형
- 남성형
- 중성적
- 슬림
- 보통
- 볼륨
- 스포티
- 시니어

검색:

- 모델 이름
- 스타일
- 분위기

## 7.4 Model Grid

각 카드:

- 이미지
- 모델명
- 스타일
- 체형 카테고리
- 연령대
- 추천 용도
- DEMO 배지
- `이 모델 선택`
- `미리보기`

## 7.5 My Models

저장한 모델이 없을 때:

```text
아직 저장한 모델이 없습니다.
기본 AI 모델을 선택하거나 내 아바타를 만들어보세요.
```

DEMO 모드에서는 샘플 저장 모델 1개를 선택적으로 보여줄 수 있다.

---

# 8. 기본 AI 모델 데이터 구조

```ts
export type AiModelPreset = {
  id: string;
  slug: string;
  name: string;
  image: string;
  genderPresentation: "feminine" | "masculine" | "androgynous";
  ageGroup: "teen" | "20s" | "30s" | "40s" | "50plus";
  bodyProfile: "slim" | "balanced" | "athletic" | "curvy" | "plus";
  styleTags: string[];
  recommendedFor: string[];
  isFeatured: boolean;
  isDemo: boolean;
};
```

샘플 데이터는 최소 8개 이상 제공한다.

다양성을 확보하되 특정 인종이나 체형을 고정관념적으로 묘사하지 않는다.

---

# 9. Model Card 인터랙션

기존 TASK-002 TiltCard와 Reveal을 재사용한다.

Hover:

- 이미지 1.02~1.04 scale
- 낮은 각도의 tilt
- 스타일 태그 reveal
- CTA reveal

선택 시:

- accent border
- check icon
- selected badge
- 하단 sticky selection bar

Selection bar 예시:

```text
선택한 모델: Nova
[코디 스튜디오로 이동]
```

모바일에서는 하단 safe-area를 고려한다.

---

# 10. 아바타 생성 Wizard

총 5단계로 구성한다.

```text
1. 사진
2. 기본 정보
3. 체형
4. 생성
5. 결과
```

상단에 진행 상태를 표시한다.

Progress UI:

- 현재 단계
- 완료 단계
- 남은 단계
- 각 단계 제목

모바일에서는 짧은 형태로 표시한다.

---

# 11. Step 1 — 정면 사진 한 장 업로드

## 업로드 영역

- drag & drop
- 파일 선택
- 카메라 촬영 지원 가능한 input 속성
- JPG, JPEG, PNG, WEBP
- 최대 10MB
- 최소 권장 해상도 안내
- 한 사람만 나온 사진 권장

## 안내 문구

```text
정면을 바라보는 선명한 사진 한 장이면 충분합니다.
모자, 선글라스, 강한 필터가 없는 사진을 권장합니다.
```

## 파일 검증

- 허용 형식
- 최대 크기
- 이미지 여부
- 파일명 안전 처리
- URL.createObjectURL 정리

## 미리보기

- 원형 또는 세로 프레임
- 다시 선택
- 제거
- 확대 미리보기

## 동의

필수 체크:

```text
본인 사진이거나 사용 권한이 있는 사진입니다.
```

추가 안내:

```text
DEMO 모드에서는 사진이 서버에 업로드되지 않으며 브라우저 미리보기에만 사용됩니다.
실제 서비스에서는 암호화·삭제 정책과 별도 동의 절차가 적용됩니다.
```

동의 전에는 다음 단계로 이동 불가.

---

# 12. Step 2 — 기본 정보

항목:

- 모델 표현 스타일
  - 여성형
  - 남성형
  - 중성적

- 키
  - 선택 입력
  - 숫자 또는 slider
  - 140~210cm 범위
  - 건너뛰기 가능

- 몸무게
  - 선택 입력
  - 35~180kg 범위
  - 건너뛰기 가능

- 연령대
  - 10대 후반
  - 20대
  - 30대
  - 40대
  - 50대 이상

키와 몸무게는 체형을 확정하는 절대 기준으로 사용하지 않는다.

---

# 13. Step 3 — 간편 체형 설정

## 13.1 전체 체형

- 마른 편
- 균형적인 편
- 탄탄한 편
- 볼륨 있는 편
- 체격이 있는 편

## 13.2 상하체 비율

- 상체가 긴 편
- 균형적인 편
- 다리가 긴 편

## 13.3 어깨

- 좁은 편
- 보통
- 넓은 편

## 13.4 팔

- 가는 편
- 보통
- 볼륨 있는 편

## 13.5 복부

- 평평한 편
- 약간 볼륨 있는 편
- 볼륨 있는 편

## 13.6 하체

- 가는 편
- 보통
- 볼륨 있는 편

각 항목은 큰 카드 또는 segmented control로 구현한다.

숫자 치수를 요구하지 않는다.

---

# 14. 자연어 체형 설명

선택형 입력 아래에 선택적으로 제공한다.

placeholder:

```text
예: 다리가 조금 짧고 어깨가 넓은 편이에요.
```

사용자가 입력하면 DEMO 분석 결과를 보여준다.

예:

```text
입력하신 설명을 다음과 같이 반영할 예정입니다.

- 다리 비율: 약간 짧은 편
- 어깨: 넓은 편
```

실제 자연어 AI 분석은 구현하지 않아도 된다.

간단한 keyword mapping 또는 샘플 응답으로 구현한다.

반드시 `DEMO 분석`으로 표시한다.

---

# 15. 실시간 Body Preview

정확한 3D 모델이 아닌 시각적 데모를 제공한다.

가능한 구현:

- 기본 실루엣 SVG
- CSS variable 기반 비율 변화
- 미리 준비된 체형 이미지 교체
- 선택 상태에 따른 설명 패널 변화

금지:

- 실제 정밀 체형 분석처럼 표현
- 사진 한 장으로 3D 스캔 완료라고 표현
- 과도하게 실제 신체를 평가하는 문구

Preview 방향:

- 정면
- 측면
- 후면

사용자가 측면·후면 사진을 올린 것이 아니라 AI 데모 모델의 각도라는 점을 표시한다.

---

# 16. Step 4 — 생성 진행 화면

실제 AI API 호출 전 DEMO 상태를 구현한다.

진행 단계 예시:

```text
사진 확인
얼굴 특징 준비
체형 설정 반영
스타일 모델 생성
미리보기 완성
```

진행 시간은 3~6초 수준의 짧은 데모.

요구사항:

- 실제 서버 작업처럼 과도하게 오래 기다리게 하지 않음
- 중간에 브라우저를 닫지 말라는 허위 안내 금지
- `AI Avatar Demo` 표시
- reduced motion 지원
- 취소 또는 이전 단계로 이동 가능
- 새로고침 시 안전하게 초기화

---

# 17. Step 5 — 결과 화면

구성:

- 생성된 아바타 대표 이미지
- 이름 입력
- 모델 설명
- 적용된 설정 요약
- 정면/측면/후면 데모 탭
- 미세 조정
- 저장
- 다시 만들기
- 코디 스튜디오 이동

## 미세 조정

slider:

- 전체 체형
- 다리 비율
- 어깨
- 팔
- 복부
- 하체

전문 수치 대신 다음 표현을 사용한다.

```text
가늘게 ↔ 볼륨 있게
짧게 ↔ 길게
좁게 ↔ 넓게
```

## 결과 안내

```text
이 아바타는 업로드한 정면 사진과 선택한 체형 정보를 바탕으로 만든 AI 데모 이미지입니다.
실제 신체 비율이나 의류 착용 결과와 차이가 있을 수 있습니다.
```

---

# 18. 모델 저장

실제 인증과 데이터베이스 전 단계에서는 다음 중 하나를 사용한다.

- localStorage
- zustand persist
- React context + localStorage

저장 항목:

```ts
export type SavedAvatar = {
  id: string;
  name: string;
  createdAt: string;
  source: "preset" | "photo";
  previewImage: string;
  genderPresentation: string;
  ageGroup: string;
  height?: number;
  weight?: number;
  bodySettings: BodySettings;
  isDemo: true;
};
```

사진 원본 전체를 localStorage에 base64로 장기 저장하지 않는다.

DEMO에서는 생성된 placeholder/avatar asset 경로와 설정값만 저장한다.

---

# 19. 선택 모델 상태

선택된 모델은 TASK-006 가상 코디 스튜디오에서 사용할 수 있도록 공통 상태로 관리한다.

권장:

```ts
type SelectedModelState = {
  selectedModelId: string | null;
  selectedModelType: "preset" | "avatar" | null;
  selectModel: (...) => void;
  clearSelection: () => void;
};
```

`/studio` 이동 시 다음 정보가 전달되어야 한다.

- model id
- model type
- preview image
- name
- body profile summary

URL query 또는 persisted store를 사용할 수 있다.

---

# 20. Empty, Error, Reset 상태

## 업로드 오류

예:

- 지원하지 않는 파일 형식
- 파일 크기 초과
- 이미지 읽기 실패

## 생성 오류 데모

`다시 시도` 버튼 제공.

## 모델 삭제

- 확인 dialog
- DEMO 데이터임을 안내
- 삭제 후 empty state

## 전체 초기화

아바타 생성 wizard에 `처음부터 다시` 제공.

---

# 21. 개인정보 및 안전

## 필수 UI

- 사진 사용 목적
- 본인 또는 허가받은 사진 확인
- DEMO 모드 저장 범위
- 삭제 방법
- 공개 기본값 비공개
- 상업적 사용 전 별도 동의 필요 안내

## 구현 원칙

- 업로드된 파일을 외부 서버로 전송하지 않음
- 콘솔에 파일 데이터 출력 금지
- 분석 도구에 이미지 URL 전송 금지
- object URL cleanup
- 사진 preview는 컴포넌트 unmount 시 정리
- 타인의 사진 무단 사용 금지 안내

## 향후 실제 서비스 준비

코드에 TODO 문서화:

```text
- signed upload URL
- encrypted private storage
- automatic deletion policy
- consent versioning
- audit log
- account deletion cascade
- biometric/privacy legal review
```

---

# 22. 컴포넌트 구조 권장

```text
src/
├── app/
│   └── (marketing)/
│       └── models/
│           ├── page.tsx
│           └── create/page.tsx
├── components/
│   └── models/
│       ├── models-hero.tsx
│       ├── model-filter.tsx
│       ├── model-grid.tsx
│       ├── model-card.tsx
│       ├── selected-model-bar.tsx
│       ├── avatar-wizard.tsx
│       ├── wizard-progress.tsx
│       ├── photo-upload-step.tsx
│       ├── basic-info-step.tsx
│       ├── body-profile-step.tsx
│       ├── avatar-generating-step.tsx
│       ├── avatar-result-step.tsx
│       ├── body-preview.tsx
│       ├── body-option-card.tsx
│       ├── avatar-privacy-notice.tsx
│       └── saved-models.tsx
├── data/
│   └── ai-models.ts
├── stores/
│   └── model-store.ts
├── lib/
│   ├── image-validation.ts
│   └── avatar-demo.ts
└── types/
    └── models.ts
```

현재 프로젝트 구조에 맞게 조정 가능.

---

# 23. 폼 검증

Zod를 사용해 폼 schema를 작성한다.

예시:

```ts
const avatarProfileSchema = z.object({
  genderPresentation: z.enum(["feminine", "masculine", "androgynous"]),
  ageGroup: z.string(),
  height: z.number().min(140).max(210).optional(),
  weight: z.number().min(35).max(180).optional(),
  bodyType: z.string(),
  proportion: z.string(),
  shoulder: z.string(),
  arms: z.string(),
  abdomen: z.string(),
  lowerBody: z.string(),
  description: z.string().max(300).optional(),
});
```

키와 몸무게는 선택 사항.

---

# 24. Demo Avatar 생성 로직

실제 AI API 대신 deterministic demo를 구현한다.

입력값을 기반으로 미리 준비된 아바타 asset을 선택한다.

예:

```text
genderPresentation + bodyType + style
→ matching demo avatar asset
```

같은 설정으로 다시 생성하면 동일하거나 일관된 결과를 보여준다.

랜덤 결과로 사용자를 혼란스럽게 하지 않는다.

---

# 25. 이미지 자산

초기 자산이 없으면 다음 방식 중 하나를 사용한다.

- 프로젝트 내 placeholder fashion model 이미지
- gradient silhouette
- neutral avatar illustration
- CSS/SVG 기반 모델 실루엣

외부 URL에 의존하지 않는다.

이미지는 향후 교체하기 쉽도록 data 파일에서 경로 관리.

---

# 26. 반응형

## Desktop

- 모델 라이브러리 3~4열
- wizard 좌측 입력, 우측 preview
- sticky preview 가능

## Tablet

- 2열 grid
- wizard preview 상단 또는 우측
- 적절한 스크롤

## Mobile

- 1열
- 큰 터치 카드
- progress compact
- preview와 입력 순차 배치
- bottom CTA safe-area
- 사진 미리보기 잘림 없음
- 가로 스크롤 없음

---

# 27. 접근성

- 파일 input label
- drag/drop 키보드 대체
- progress aria-current
- option card radio semantics
- 오류 aria-describedby
- 생성 진행 aria-live
- 결과 안내 읽기 가능
- focus management
- 단계 이동 후 heading focus
- 색상 외 선택 표시
- 44px 이상 터치 영역

---

# 28. 성능

- 모델 이미지는 `next/image`
- upload preview는 적절한 object URL
- blur 효과 수 제한
- wizard step lazy loading 가능
- 불필요한 re-render 방지
- 클라이언트 컴포넌트 범위 최소화
- localStorage 접근은 client에서만

---

# 29. 분석 이벤트 준비

실제 analytics는 연결하지 않아도 되지만 이벤트 이름을 정의한다.

```text
model_library_viewed
preset_model_selected
avatar_creation_started
avatar_photo_selected
avatar_body_profile_completed
avatar_demo_generated
avatar_saved
avatar_sent_to_studio
```

개인정보 또는 이미지 데이터는 이벤트 payload에 포함하지 않는다.

---

# 30. 구현 순서

1. 기존 모델 라우트 분석
2. 타입·데이터 구조 작성
3. 기본 모델 library 구현
4. 필터·검색 구현
5. 선택 모델 store 구현
6. wizard shell·progress 구현
7. 사진 업로드·검증 구현
8. 기본 정보 step 구현
9. 간편 체형 step 구현
10. demo body preview 구현
11. generating state 구현
12. result·미세 조정 구현
13. 저장·삭제 구현
14. `/studio` 연결
15. 모바일·접근성·개인정보 점검
16. lint·typecheck·build

---

# 31. 검증 명령

```bash
npm run lint
npm run typecheck
npm run build
```

브라우저 확인:

```text
/models
/models/create
/studio
```

확인 흐름:

```text
기본 모델 선택 → Studio 이동
내 아바타 만들기 → 사진 선택 → 체형 선택 → 생성 → 저장 → Studio 이동
```

---

# 32. 완료 조건

## 모델 라이브러리

- [ ] 최소 8개 기본 모델이 표시된다.
- [ ] 검색이 작동한다.
- [ ] 필터가 작동한다.
- [ ] 모델 선택 상태가 명확하다.
- [ ] Studio 이동이 작동한다.

## 사진 업로드

- [ ] 한 장만 업로드할 수 있다.
- [ ] 형식과 용량 검증이 된다.
- [ ] 미리보기·제거·재선택이 된다.
- [ ] 동의 전 다음 단계로 갈 수 없다.
- [ ] 서버 업로드가 발생하지 않는다.

## 체형 설정

- [ ] 복잡한 신체 치수를 요구하지 않는다.
- [ ] 간편 선택이 작동한다.
- [ ] 자연어 설명 demo가 작동한다.
- [ ] body preview가 선택 상태를 반영한다.

## 결과

- [ ] 생성 데모가 작동한다.
- [ ] 결과 아바타가 표시된다.
- [ ] 설정 요약이 보인다.
- [ ] 미세 조정이 가능하다.
- [ ] 모델 저장이 가능하다.
- [ ] Studio 이동이 가능하다.

## 품질

- [ ] DEMO 표시가 명확하다.
- [ ] 개인정보 안내가 존재한다.
- [ ] 모바일에서 잘린 요소가 없다.
- [ ] 키보드 탐색이 가능하다.
- [ ] TypeScript 오류가 없다.
- [ ] lint가 통과한다.
- [ ] production build가 통과한다.

---

# 33. 금지 사항

- 여러 장의 사진 업로드 요구
- 측면·후면 사진 요구
- 허벅지·팔뚝·허리 둘레 입력 요구
- 사진 한 장으로 실제 3D 스캔이 가능하다고 표현
- 사용자 외형에 대한 부정적 평가
- 사진을 console 또는 analytics로 전송
- base64 원본 사진을 장기 localStorage 저장
- Demo를 실제 AI 결과로 표시
- 기존 Task 구조 삭제
- 모든 페이지를 클라이언트 컴포넌트로 변경

---

# 34. TASK-006 연계 준비

TASK-006에서는 선택한 기본 모델 또는 저장한 아바타에 상품을 입히는 AI Virtual Styling Studio를 구현한다.

TASK-005 완료 시 다음 정보가 TASK-006에 전달될 수 있어야 한다.

```ts
{
  modelId,
  modelType,
  modelName,
  previewImage,
  bodyProfile,
  styleTags
}
```

TASK-006 핵심 기능:

- 선택 모델 중앙 preview
- 상의·하의·아우터·신발·가방·액세서리
- 인기 상품 불러오기
- 코디 조합
- 전체 가격
- Look 저장
- 콘텐츠 제작 이동

---

# 35. Claude Code 완료 보고 형식

```text
TASK-005 완료

1. 구현 요약
2. 모델 라이브러리 구현 내용
3. 아바타 Wizard 구현 내용
4. 사진 업로드 및 검증 방식
5. 체형 설정 방식
6. Demo 생성 로직
7. 모델 저장 및 Studio 연결
8. 개인정보·접근성 대응
9. 모바일 최적화
10. 생성/수정 파일 목록
11. lint 결과
12. typecheck 결과
13. build 결과
14. 로컬 확인 URL
15. TASK-006 TODO
```

---

# 36. 최종 목표 문장

TASK-005의 목표는 사용자가 복잡한 준비 없이 다음 경험을 완료하게 만드는 것이다.

```text
기본 AI 모델을 바로 선택하거나,
정면 사진 한 장과 몇 가지 쉬운 체형 선택만으로
나만의 패션 아바타를 만든 뒤
즉시 코디 스튜디오로 이동한다.
```
