# 릴리스 체크리스트

- 작업 ID: TASK-010

## Alpha

- [x] 홈/건강정보/스토어/검색/AI질문 핵심 흐름 렌더링 확인
- [x] `npm run build` 통과 (타입 체크 포함)
- [x] 판매유형 7종 상품 상세 페이지 각 1개 이상 확인
- [x] 응급 배너/신뢰 패널/면책 문구가 콘텐츠 상세에 노출됨
- [x] DRAFT 콘텐츠가 공개 라우트에서 404 처리됨 (승인 게이트 검증)
- [ ] 실사 기반 벤치마크 갱신 ([[../strategy/visual-benchmark-matrix]] 미결정 항목)

## Beta

- [x] 자체판매(DIRECT) 장바구니 → 결제(목업) → 주문완료 → 주문내역 전체 흐름 동작
- [x] 제휴판매(AFFILIATE) 외부 이동 확인(`/go/[trackingId]`) 및 클릭 로그 기록
- [x] 관리자 RBAC: 역할별 접근 가능 섹션이 `SECTION_PERMISSIONS`와 일치
- [x] 관리자 콘텐츠 상태 변경이 공개 사이트에 즉시 반영(`revalidatePath`)
- [ ] 실제 회원 인증(비관리자) 연동 — 이번 범위 밖
- [ ] 실제 PG 연동 — 이번 범위 밖
- [ ] Rate Limit 적용 — [[../security/security-headers]] §4 미결정

## Production

- [ ] 실제 데이터베이스 연동 (콘텐츠/상품/주문/감사로그)
- [ ] 백업·복구 리허설 1회 이상 수행
- [ ] 고객지원 채널(1:1 문의 실제 처리 프로세스) 확정
- [ ] Lighthouse CI 기준(`lighthouserc.json`) 3회 연속 통과
- [ ] `pa11y-ci` WCAG2AA 위반 0건
- [ ] 관리자 MFA 적용 여부 결정 및 필요 시 구현
- [ ] 실사 스크린샷 기반 접근성 수동 점검 완료 ([[../accessibility/a11y-testing]] §2)

## 공통 회귀 확인 (모든 릴리스)

- [ ] `npm run build` 성공
- [ ] `npm run test:a11y` 통과 (배포 서버 기동 후)
- [ ] 7개 판매유형 배지가 목록/상세/장바구니/주문내역에서 끊기지 않고 표시
- [ ] `prefers-reduced-motion` 활성화 시 Hero 3D가 정적 이미지로 대체됨
