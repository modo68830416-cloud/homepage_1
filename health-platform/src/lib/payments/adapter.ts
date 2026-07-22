/**
 * Payment adapter interface (TASK-007 §5 산출물). Real PG integration
 * (토스페이먼츠, 이니시스 등) is explicitly out of scope
 * (docs/strategy/scope-and-non-goals.md §2) — this defines the seam a real
 * adapter would plug into, backed for now by `MockPaymentAdapter`.
 */
export interface ChargeInput {
  amountKrw: number;
  orderId: string;
  description: string;
}

export interface ChargeResult {
  success: boolean;
  transactionId: string;
  failureReason?: string;
}

export interface PaymentAdapter {
  charge(input: ChargeInput): Promise<ChargeResult>;
}

export class MockPaymentAdapter implements PaymentAdapter {
  async charge(input: ChargeInput): Promise<ChargeResult> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      transactionId: `mock_${input.orderId}_${Date.now()}`,
    };
  }
}

export const paymentAdapter: PaymentAdapter = new MockPaymentAdapter();
