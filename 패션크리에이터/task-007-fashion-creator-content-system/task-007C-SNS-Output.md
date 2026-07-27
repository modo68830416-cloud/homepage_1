# TASK-007C — YouTube, Blog & Social Output Package

> 선행: TASK-007A, TASK-007B 완료

---

# 1. 목표

생성된 패션 콘텐츠를 유튜브, 블로그, 인스타그램, 틱톡 등에 바로 활용할 수 있도록 채널별 텍스트와 메타데이터 패키지를 생성한다.

---

# 2. 채널

- YouTube
- YouTube Shorts
- Naver Blog
- Instagram
- TikTok
- Generic SNS

---

# 3. 자동 생성 항목

## YouTube

- 제목
- 설명
- 상품 목록
- 구매 링크 placeholder
- 해시태그
- 고정 댓글
- 광고/제휴 안내 문구

## Blog

- 제목
- 도입 문장
- 코디 설명
- 상품별 설명
- 구매 버튼 문구
- 마무리
- 태그

## Instagram

- 짧은 캡션
- 해시태그
- CTA
- 프로필 링크 안내

## TikTok

- 짧은 설명
- 해시태그
- CTA

---

# 4. DEMO Copy Generator

실제 LLM 대신 템플릿 기반 생성.

입력:

- Look 이름
- 상품명
- 스타일
- 타깃
- 계절
- 채널

출력은 deterministic하게 생성한다.

---

# 5. 편집 UI

각 출력 항목은 수정 가능해야 한다.

기능:

- inline edit
- 글자 수 표시
- 복사
- 초기화
- 다시 생성 DEMO

---

# 6. 구매 링크 자리

TASK-008에서 실제 LOOK 페이지 링크를 연결한다.

현재:

```text
https://fashioncreator.co.kr/look/demo-look
```

또는 환경변수 기반 base URL.

---

# 7. 제휴·광고 표시

템플릿에 선택 가능한 문구 포함.

예:

```text
이 콘텐츠에는 제휴 링크가 포함될 수 있으며,
구매 시 크리에이터에게 일정 수익이 발생할 수 있습니다.
```

사용자가 숨길 수 없도록 강제하지 않되, 제휴 링크 사용 시 필수 안내가 되도록 구조를 준비한다.

---

# 8. Export Package

다운로드 가능한 실제 zip 생성은 선택 사항.

최소 구현:

```text
콘텐츠 파일
thumbnail
youtube.txt
blog.md
instagram.txt
tiktok.txt
metadata.json
```

DEMO에서는 브라우저에서 텍스트 파일 다운로드 가능.

---

# 9. 출력 데이터 타입

```ts
type ChannelCopy = {
  channel: "youtube" | "shorts" | "blog" | "instagram" | "tiktok";
  title?: string;
  body: string;
  hashtags: string[];
  pinnedComment?: string;
  disclosure?: string;
};
```

---

# 10. 완료 조건

- [ ] 채널별 출력 생성
- [ ] 텍스트 편집 가능
- [ ] 복사 작동
- [ ] DEMO 구매 링크 포함
- [ ] 제휴 안내 문구 제공
- [ ] 텍스트 파일 다운로드
- [ ] 모바일 사용 가능
- [ ] lint/typecheck/build 통과
