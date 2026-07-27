# TASK-010D — Delivery Workflow, Review, Escrow Demo & Disputes

> 선행: TASK-010A ~ TASK-010C 완료

---

# 1. 목표

콘텐츠 제작 의뢰가 선정된 이후 작업 제출, 시안 검토, 수정, 승인, 에스크로 DEMO, 거래 완료와 분쟁 처리까지의 워크플로우를 구축한다.

---

# 2. 거래 상태

```ts
type MarketplaceOrderStatus =
  | "proposal"
  | "awaiting-payment"
  | "funded"
  | "in-progress"
  | "submitted"
  | "revision-requested"
  | "approved"
  | "completed"
  | "disputed"
  | "cancelled"
  | "refunded";
```

---

# 3. Order Workspace

라우트 예시:

```text
/creator/orders/[id]
/brand/orders/[id]
```

구성:

- 거래 요약
- 참여자
- 작업 조건
- 파일·시안 DEMO
- 메시지 타임라인 DEMO
- 마감일
- 수정 횟수
- 라이선스
- 금액
- 상태
- 다음 행동

---

# 4. 제출

크리에이터:

- 시안 미리보기
- 제출 메시지
- Clean Version
- Shoppable Version
- Thumbnail
- Channel Copy
- 구매 링크
- 제출

실제 대용량 파일 업로드는 제외.

---

# 5. 검토

브랜드:

- 승인
- 수정 요청
- 의견 작성
- 조건 위반 신고
- 사용권 확인

수정 요청 시:

- 요청 내용
- 우선순위
- 요청 날짜
- 남은 수정 횟수

---

# 6. 에스크로 DEMO

표시 흐름:

```text
브랜드 결제 예정
→ 플랫폼 보관 DEMO
→ 콘텐츠 승인
→ 크리에이터 수익 확정
→ 정산 예정
```

실제 결제나 자금 보관이 발생하지 않는다.

필수 안내:

```text
현재는 에스크로 흐름을 보여주는 DEMO이며 실제 결제·자금 보관 기능은 연결되지 않았습니다.
```

---

# 7. 거래 금액

표시:

- 기본 제작비
- 옵션 추가비
- 플랫폼 수수료 DEMO
- 성과 보너스
- 환불·조정
- 크리에이터 예상 수익
- 브랜드 총 비용

모든 금액 원화.

---

# 8. 거래 완료

승인 후:

- 콘텐츠 사용권 활성화 DEMO
- 원본 다운로드 CTA DEMO
- 구매 링크 활성화
- Creator Dashboard 수익 연결
- Marketplace 리뷰 요청

---

# 9. 리뷰

브랜드가 평가:

- 콘텐츠 품질
- 커뮤니케이션
- 납기
- 조건 준수
- 전체 평점
- 텍스트 후기

크리에이터가 평가:

- 요청 명확성
- 응답 속도
- 협업 경험

리뷰 조작 방지 구조 TODO.

---

# 10. 분쟁

사유:

- 납기 미준수
- 요청 조건 불일치
- 파일 문제
- 사용권 분쟁
- 무단 사용
- 취소·환불
- 부적절한 콘텐츠

DEMO 흐름:

```text
분쟁 접수
→ 자료 확인
→ 플랫폼 검토 중
→ 조정안
→ 종료
```

실제 법률 판단처럼 표현하지 않는다.

---

# 11. 감사 로그

저장 이벤트:

- 제안
- 결제 예정
- 조건 변경
- 제출
- 수정 요청
- 승인
- 사용권 활성화
- 분쟁
- 취소

DEMO local data로 구현 가능.

---

# 12. 완료 조건

- [ ] 거래 workspace
- [ ] 제출·검토
- [ ] 수정 요청
- [ ] 승인
- [ ] 에스크로 DEMO
- [ ] 리뷰
- [ ] 분쟁 DEMO
- [ ] Creator 수익 화면 연결
- [ ] 라이선스 활성화 DEMO
- [ ] lint, typecheck, build 통과
