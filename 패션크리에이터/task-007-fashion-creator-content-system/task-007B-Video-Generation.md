# TASK-007B — AI Image & Video Generation Experience

> 선행: TASK-007A 완료

---

# 1. 목표

콘텐츠 형식별 생성 경험과 결과 미리보기를 구현한다.

---

# 2. 출력 유형

## Image

- Hero Image
- Product Editorial
- Blog Image
- Thumbnail Base
- Social Feed

## Video

- Shorts
- Reels
- TikTok
- YouTube 16:9
- Product Promo

---

# 3. 영상 Scene 구조

```ts
type VideoScene = {
  id: string;
  order: number;
  title: string;
  duration: number;
  shotType: string;
  modelAction: string;
  cameraMotion: string;
  background: string;
  overlayText?: string;
};
```

기본 3 Scene:

1. Hook
2. Look Showcase
3. CTA / Shop the Look

---

# 4. Storyboard Editor

구성:

- Scene 카드
- 순서 변경
- Scene 추가
- Scene 삭제
- 길이 조절
- 배경 변경
- 카메라 변경
- 텍스트 오버레이

초기에는 drag-and-drop 없이 위/아래 버튼으로도 동작 가능.

---

# 5. 영상 출력 규격

## Shorts / Reels / TikTok

```text
1080 × 1920
9:16
15초 기본
```

## YouTube

```text
1920 × 1080
16:9
30초 기본
```

## Feed

```text
1080 × 1350
4:5
```

DEMO 결과는 실제 렌더링 파일이 아닌 placeholder media로 제공해도 된다.

---

# 6. 영상 플레이어

필수:

- play / pause
- mute
- timeline
- duration
- fullscreen 가능하면 지원
- poster
- playsInline

자동 재생 시:

- muted
- 사용자가 motion 감소 설정 시 정적 poster

---

# 7. 결과 버전

사용자는 두 버전을 확인할 수 있다.

## Clean Version

- 상품 태그 없음
- 콘텐츠 중심

## Shoppable Version

- 상품 코드
- 구매 링크 CTA
- QR placeholder
- Fashion Creator 워터마크
- DEMO 표시

---

# 8. Thumbnail

자동 썸네일 DEMO 3안 제공.

- 모델 중심
- 상품 중심
- 텍스트 중심

사용자는 하나를 선택한다.

---

# 9. 생성 실패 상태

- generation failed
- media unavailable
- invalid look
- unsupported format

각 상태:

- 재시도
- 설정 수정
- Studio로 돌아가기

---

# 10. Content Output 타입

```ts
type GeneratedContent = {
  id: string;
  projectId: string;
  type: "image" | "video";
  format: ContentFormat;
  aspectRatio: string;
  duration?: number;
  mediaUrl: string;
  posterUrl?: string;
  thumbnailOptions: string[];
  cleanVersionUrl?: string;
  shoppableVersionUrl?: string;
  scenes: VideoScene[];
  isDemo: boolean;
};
```

---

# 11. 완료 조건

- [ ] Storyboard 표시
- [ ] Scene 편집 가능
- [ ] 영상/이미지 프리뷰 작동
- [ ] Clean/Shoppable 버전 전환
- [ ] Thumbnail 선택
- [ ] 오류·재시도 상태
- [ ] 모바일 반응형
- [ ] lint/typecheck/build 통과
