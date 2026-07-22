# 장바구니 정책

- 작업 ID: TASK-007
- 완료조건: "한 장바구니에 넣을 수 없는 판매 유형 정책이 정의되어 있다"

## 1. 장바구니 진입 가능 판매유형

`CART_ELIGIBLE_SALE_TYPES` (`src/lib/products/types.ts`): `DIRECT`, `DROPSHIP`, `MARKETPLACE`, `DIGITAL`, `SUBSCRIPTION`.

## 2. 장바구니에 들어가지 않는 판매유형

- **AFFILIATE**: 외부몰 결제이므로 내부 장바구니에 담기지 않는다. 상품 상세에서 바로 `/go/[trackingId]`로 이동한다.
- **BOOKING**: 예약은 담아뒀다가 나중에 결제하는 개념이 아니라 즉시 일정 확정 흐름이므로 장바구니를 거치지 않고 바로 예약 확정 화면으로 이동한다.

## 3. 혼합 불가 규칙

- `DIGITAL`, `SUBSCRIPTION`은 `SINGLE_ITEM_ONLY_SALE_TYPES`로 지정되어, 장바구니에 담으면 기존에 담겨 있던 다른 상품을 모두 비우고 해당 1개 상품만 담긴다. 결제 주기·라이선스가 다른 상품과 배송/결제 흐름이 근본적으로 다르기 때문이다.
- `DIRECT` / `DROPSHIP` / `MARKETPLACE`는 서로 혼합 가능하다. 단, 배송 정책이 달라 `combinedShippingAllowed: false`인 항목은 주문 요약에서 별도 배송으로 표시된다(§4).

## 4. 배송 묶음 규칙

- 장바구니 내 상품 중 `shippingPolicy.combinedShippingAllowed`가 `false`인 상품은 다른 상품과 배송비가 합산되지 않고 각각 별도 배송비가 부과된다.
- 체크아웃 화면은 배송 그룹별로 상품을 묶어 표시한다.

## 5. 구현

`src/lib/commerce/cart.tsx`의 `addToCart()`가 위 규칙을 강제한다: CART_ELIGIBLE이 아니면 담기 자체를 거부하고, SINGLE_ITEM_ONLY 상품을 담을 때는 기존 카트를 비운다.
