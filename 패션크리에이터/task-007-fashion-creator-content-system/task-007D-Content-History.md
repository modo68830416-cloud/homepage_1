# TASK-007D — Content Projects, History & Recovery

> 선행: TASK-007A ~ TASK-007C 완료

---

# 1. 목표

사용자가 만든 콘텐츠 프로젝트와 생성 결과를 다시 확인하고 복제·삭제·재사용할 수 있도록 콘텐츠 히스토리를 구축한다.

---

# 2. `/create` 페이지

섹션:

- Recent Projects
- Drafts
- Generating
- Completed
- Failed
- Favorites

---

# 3. Project Card

표시:

- thumbnail
- title
- source Look
- format
- aspect ratio
- status
- createdAt
- updatedAt
- DEMO

액션:

- 열기
- 복제
- 이름 변경
- 다시 생성
- 삭제

---

# 4. 데이터 구조

```ts
type ContentProject = {
  id: string;
  title: string;
  sourceLookId: string;
  format: ContentFormat;
  status: GenerationJobStatus;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  settings: ContentStudioState;
  output?: GeneratedContent;
  channelCopies?: ChannelCopy[];
  isFavorite: boolean;
  isDemo: boolean;
};
```

---

# 5. 저장

초기:

- localStorage 또는 zustand persist
- 최대 프로젝트 수 제한 가능
- 원본 영상 blob 장기 저장 금지
- asset 경로와 설정값 중심

---

# 6. Draft Recovery

작성 중 이탈 시 draft 저장.

재접속:

```text
작성 중인 콘텐츠가 있습니다.
이어서 작업할까요?
```

기능:

- 이어서 작업
- 새로 시작
- draft 삭제

---

# 7. 필터와 검색

- 상태
- 콘텐츠 형식
- 날짜
- 즐겨찾기
- 이름 검색

---

# 8. Empty State

```text
아직 만든 콘텐츠가 없습니다.
저장한 Look으로 첫 쇼츠를 만들어보세요.
```

CTA:

- 콘텐츠 만들기
- Studio 열기

---

# 9. 삭제

- 확인 dialog
- undo toast 가능
- localStorage 정리
- 선택적 soft delete demo

---

# 10. 분석 이벤트 이름

```text
content_project_created
content_project_opened
content_project_duplicated
content_project_deleted
content_exported
content_draft_recovered
```

개인정보·이미지 데이터 전송 금지.

---

# 11. 완료 조건

- [ ] `/create` 프로젝트 목록
- [ ] 상태 필터
- [ ] 검색
- [ ] 프로젝트 열기
- [ ] 복제
- [ ] 삭제
- [ ] draft recovery
- [ ] 빈 상태
- [ ] 모바일 반응형
- [ ] lint/typecheck/build 통과

---

# 12. TASK-008 연결

TASK-008에서는 완료된 콘텐츠에 다음 기능을 연결한다.

```text
LOOK 구매 페이지
자동 구매 링크
상품별 링크
전체 코디 장바구니
QR 코드
추적 코드
클릭·전환 DEMO 분석
```
