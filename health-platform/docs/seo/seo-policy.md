# SEO 정책

- 작업 ID: TASK-009
- 구현: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo/structured-data.ts`, 각 페이지의 `generateMetadata`

## 1. Sitemap 분리 원칙

`sitemap.ts` 하나의 파일에서 생성하지만 논리적으로는 4개 그룹으로 분리한다: 정적 페이지, 건강정보 카테고리, 콘텐츠 상세(`getPublishedArticles()`만 포함), 상품(`status === "PUBLISHED"`만 포함). 트래픽 규모가 커지면 `generateSitemaps`로 실제 파일을 분리한다. → [결정 필요] 분리 임계치

## 2. robots 정책

`/admin`, `/search`, `/ask`, `/account`, `/shop/cart`, `/shop/checkout`, `/go/*`는 색인하지 않는다(`src/app/robots.ts`). 검색 결과 페이지(`/search`)를 색인 차단하는 이유: 파라미터 조합에 따라 사실상 무한한 저품질 페이지가 생성되기 때문이다(TASK-009 §4 완료조건).

## 3. 품절·삭제 상품 정책

- `status !== "PUBLISHED"`인 상품은 sitemap에서 제외한다.
- 페이지 자체는 `notFound()`로 404를 반환한다(콘텐츠와 동일한 원칙, [[../admin/content-workflow]] 참조) — 삭제된 URL을 검색엔진이 계속 색인하지 않도록 한다.
- 품절(재고 0)이지만 `PUBLISHED` 상태인 상품은 페이지는 유지하고 구조화 데이터의 `availability`만 `OutOfStock`으로 표시한다(`buildProductJsonLd`).

## 4. 구조화 데이터

- 콘텐츠: `MedicalWebPage` 스키마 — `author`, `reviewedBy`, `datePublished`, `dateModified`를 포함해 검수 정보를 검색엔진에 신호로 전달한다.
- 상품: `Product` 스키마 — `offers.availability`, `price`, `priceCurrency` 포함.

## 5. Canonical과 중복 콘텐츠

- 동적 라우트(`generateStaticParams` 기반)는 각 slug당 정확히 하나의 URL만 존재하므로 canonical 충돌이 구조적으로 발생하지 않는다.
- 콘텐츠 slug 변경 시 301 리다이렉트가 필요하다(`docs/ia/url-policy.md` §4) — 이번 범위는 리다이렉트 규칙 테이블을 아직 구현하지 않았다. → [결정 필요]

## 6. Open Graph / 메타데이터

- 각 콘텐츠/상품 페이지의 `generateMetadata`가 `title`/`description`을 채운다. OG 이미지 생성(`opengraph-image.tsx` 컨벤션)은 이번 범위에 포함하지 않았다. → [결정 필요] 브랜드 확정 후 OG 이미지 템플릿 제작

## 7. 내부 링크

콘텐츠 ↔ 상품 양방향 링크(`RelatedContent`, `RelatedProducts`)가 크롤러에게도 동일하게 노출되는 일반 `<a>`/`next/link` 링크이므로 별도 조치 없이 내부 링크 그래프에 기여한다.
