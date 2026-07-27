# TASK-010B — Creator Profiles, Content Detail & Licensing

> 선행: TASK-010A 완료

---

# 1. 목표

크리에이터의 공개 프로필과 콘텐츠 상세 페이지를 구현하고, 콘텐츠 사용권 범위를 명확하게 선택할 수 있게 한다.

---

# 2. Creator Profile

라우트:

```text
/marketplace/creators/[handle]
```

표시:

- 프로필
- 소개
- 전문 분야
- 지원 콘텐츠 형식
- 대표 콘텐츠
- 완료 프로젝트
- 브랜드 후기 DEMO
- 판매 성과 DEMO
- 작업 가능 여부
- 제작 의뢰 CTA
- 팔로우 DEMO

탭:

- Portfolio
- Shoppable Looks
- Marketplace Assets
- Campaign History
- Reviews

---

# 3. Content Detail

라우트:

```text
/marketplace/content/[slug]
```

구성:

- 콘텐츠 미디어
- 제목
- 설명
- 크리에이터
- 착용 상품
- 구매 가능한 Look 연결
- 라이선스 선택
- 가격 요약
- 사용 범위
- 구매 또는 문의 CTA
- 비슷한 콘텐츠

---

# 4. 라이선스 유형

## Personal

- 개인 참고
- 비상업적 사용
- 재판매 불가

## Social Commercial

- 브랜드 SNS
- 온라인 게시
- 편집 제한
- 기간 제한

## Advertising

- 온라인 광고
- 상품 상세 페이지
- 캠페인 활용
- 기간·채널 지정

## Exclusive

- 특정 기간 독점
- 사용 국가
- 사용 채널
- 경쟁 브랜드 제한 DEMO

---

# 5. 라이선스 옵션

선택 항목:

- 사용 목적
- 사용 채널
- 사용 기간
- 사용 국가
- 편집 가능 여부
- 독점 여부
- 원본 파일 포함
- 크리에이터 표시 여부

가격은 옵션에 따라 DEMO 계산.

예:

```ts
type ContentLicenseSelection = {
  licenseType: "personal" | "social-commercial" | "advertising" | "exclusive";
  channels: string[];
  durationMonths: number;
  territories: string[];
  editable: boolean;
  exclusive: boolean;
  sourceFileIncluded: boolean;
};
```

---

# 6. 가격 계산 DEMO

예시 규칙:

- Personal: 20,000원
- Social Commercial: 100,000원
- Advertising: 300,000원
- Exclusive: 1,000,000원부터
- 원본 파일: +50,000원
- 편집 권한: +30%
- 독점: +100%

실제 정책처럼 표현하지 않고 `예시 라이선스 가격` 표시.

---

# 7. 권리 안내

필수 표시:

- AI 생성 콘텐츠 여부
- 사용된 AI 모델 또는 아바타
- 상품 및 브랜드 정보
- 사용자 사진 기반 아바타 상업 이용 동의 여부
- 사용권 범위
- 금지된 사용
- 재판매 가능 여부
- 사용 기간 만료일

사용자 사진 기반 아바타 콘텐츠는 상업 이용 동의가 없으면 판매 CTA를 비활성화한다.

---

# 8. 라이선스 요약

구매 전 사용자에게 다음을 보여준다.

```text
사용 목적: 브랜드 SNS
사용 기간: 6개월
사용 국가: 대한민국
편집 가능: 아니오
독점 사용: 아니오
예시 가격: 120,000원
```

---

# 9. 완료 조건

- [ ] 크리에이터 공개 프로필
- [ ] Portfolio·Look·리뷰 탭
- [ ] 콘텐츠 상세
- [ ] 라이선스 선택
- [ ] DEMO 가격 계산
- [ ] 사용권 요약
- [ ] 상업 이용 동의 검증 DEMO
- [ ] 착용 상품 구매 연결
- [ ] lint, typecheck, build 통과
