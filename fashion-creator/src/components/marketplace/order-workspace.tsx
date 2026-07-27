"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Compass, MessageSquare, ShieldAlert, ShieldCheck } from "lucide-react";
import type { DisputeReason, MarketplaceOrder } from "@/types/marketplace";
import { DISPUTE_REASON_LABEL, LICENSE_LABEL, ORDER_STATUS_LABEL } from "@/types/marketplace";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DemoActionButton } from "@/components/ui/DemoActionButton";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useMarketplaceOrders } from "@/lib/marketplace-store";
import { useToast } from "@/components/feedback/toast";
import { formatKRW } from "@/lib/utils";

const ESCROW_STEPS = ["브랜드 결제 예정", "플랫폼 보관 (DEMO)", "콘텐츠 승인", "크리에이터 수익 확정", "정산 예정"];
const ESCROW_STATUS_INDEX: Record<string, number> = {
  proposal: 0,
  "awaiting-payment": 0,
  funded: 1,
  "in-progress": 1,
  submitted: 2,
  "revision-requested": 2,
  approved: 3,
  completed: 4,
  disputed: 1,
  cancelled: 0,
  refunded: 0,
};

const DISPUTE_STAGE_LABEL: Record<string, string> = {
  filed: "분쟁 접수",
  "evidence-review": "자료 확인",
  "platform-review": "플랫폼 검토 중",
  resolution: "조정안 제시",
  closed: "종료",
};

export function OrderWorkspace({ order }: { order: MarketplaceOrder }) {
  const router = useRouter();
  const { submitWork, requestRevision, approveOrder, completeOrder, fileDispute, advanceDispute, submitReview } =
    useMarketplaceOrders();
  const { showToast } = useToast();
  const [revisionNote, setRevisionNote] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [disputeReason, setDisputeReason] = useState<DisputeReason>("missed-deadline");

  const platformFee = Math.round(order.baseFee * (order.platformFeeRate / 100));
  const creatorEarning = order.baseFee + order.optionFee - platformFee;
  const escrowIndex = ESCROW_STATUS_INDEX[order.status] ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">{order.title}</h1>
          <p className="text-xs text-foreground-subtle">
            {order.creatorHandle} ↔ {order.brandName}
          </p>
        </div>
        <Badge tone={order.status === "completed" ? "bestSeller" : order.status === "disputed" ? "mock" : "ai"}>
          {ORDER_STATUS_LABEL[order.status]}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <GlassPanel className="rounded-xl p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">에스크로 DEMO</p>
            <div className="mb-2 flex items-center gap-2 rounded-lg border border-border bg-surface p-3 text-xs text-foreground-subtle">
              <ShieldAlert className="h-4 w-4 shrink-0 text-accent-orange" aria-hidden="true" />
              현재는 에스크로 흐름을 보여주는 DEMO이며 실제 결제·자금 보관 기능은 연결되지 않았습니다.
            </div>
            <div className="flex flex-col gap-2">
              {ESCROW_STEPS.map((step, index) => (
                <div key={step} className="flex items-center gap-3 text-sm">
                  {index <= escrowIndex ? (
                    <Check className="h-4 w-4 shrink-0 text-accent-lime" aria-hidden="true" />
                  ) : (
                    <span className="h-4 w-4 shrink-0 rounded-full border border-border" aria-hidden="true" />
                  )}
                  <span className={index <= escrowIndex ? "text-foreground" : "text-foreground-subtle"}>{step}</span>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="rounded-xl p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              메시지 타임라인 (DEMO)
            </p>
            <ul className="flex flex-col gap-3">
              {order.auditLog.map((event) => (
                <li key={event.id} className="border-l-2 border-border pl-3 text-xs">
                  <p className="text-foreground">{event.message}</p>
                  <p className="text-foreground-subtle">{new Date(event.occurredAt).toLocaleString("ko-KR")}</p>
                </li>
              ))}
            </ul>
          </GlassPanel>

          <GlassPanel className="rounded-xl p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">다음 행동</p>
            <div className="flex flex-wrap gap-2">
              {order.status === "in-progress" && (
                <Button
                  variant="primary"
                  className="text-xs"
                  onClick={() => {
                    submitWork(order.id);
                    showToast("작업물을 제출했습니다");
                  }}
                >
                  시안 제출 (Clean + Shoppable + Thumbnail)
                </Button>
              )}
              {order.status === "submitted" && (
                <>
                  <Button
                    variant="primary"
                    className="text-xs"
                    onClick={() => {
                      approveOrder(order.id);
                      showToast("콘텐츠를 승인했습니다");
                    }}
                  >
                    승인
                  </Button>
                  <div className="flex items-center gap-2">
                    <input
                      value={revisionNote}
                      onChange={(event) => setRevisionNote(event.target.value)}
                      placeholder="수정 요청 내용"
                      className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground focus:border-accent-lime focus:outline-none"
                    />
                    <Button
                      variant="secondary"
                      className="text-xs"
                      disabled={order.revisionsUsed >= order.revisionLimit}
                      onClick={() => {
                        requestRevision(order.id, revisionNote || "세부 사항 조정 요청");
                        setRevisionNote("");
                        showToast("수정을 요청했습니다");
                      }}
                    >
                      수정 요청 ({order.revisionLimit - order.revisionsUsed}회 남음)
                    </Button>
                  </div>
                </>
              )}
              {order.status === "revision-requested" && (
                <Button
                  variant="primary"
                  className="text-xs"
                  onClick={() => {
                    submitWork(order.id);
                    showToast("수정된 작업물을 다시 제출했습니다");
                  }}
                >
                  수정본 제출
                </Button>
              )}
              {order.status === "approved" && (
                <Button
                  variant="primary"
                  className="text-xs"
                  onClick={() => {
                    completeOrder(order.id);
                    showToast("거래가 완료되고 사용권이 활성화되었습니다 (DEMO)");
                  }}
                >
                  거래 완료 처리
                </Button>
              )}
              {order.status === "completed" && (
                <>
                  <DemoActionButton variant="secondary" className="text-xs" message="원본 다운로드는 준비 중입니다">
                    원본 다운로드
                  </DemoActionButton>
                  <Button href="/look/demo-look" variant="outline" className="text-xs">
                    구매 링크 열기
                  </Button>
                  <Button href="/creator/revenue" variant="outline" className="text-xs">
                    Creator Dashboard 수익 보기
                  </Button>
                </>
              )}
              {order.status !== "completed" && order.status !== "disputed" && order.status !== "cancelled" && (
                <div className="flex items-center gap-2">
                  <select
                    value={disputeReason}
                    onChange={(event) => setDisputeReason(event.target.value as DisputeReason)}
                    className="rounded-lg border border-border bg-surface px-2 py-1.5 text-xs text-foreground"
                  >
                    {(Object.keys(DISPUTE_REASON_LABEL) as DisputeReason[]).map((reason) => (
                      <option key={reason} value={reason}>
                        {DISPUTE_REASON_LABEL[reason]}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="ghost"
                    className="text-xs text-danger"
                    onClick={() => {
                      fileDispute(order.id, disputeReason);
                      showToast("분쟁이 접수되었습니다", "info");
                    }}
                  >
                    조건 위반 신고
                  </Button>
                </div>
              )}
            </div>
          </GlassPanel>

          {order.status === "disputed" && (
            <GlassPanel className="rounded-xl p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">분쟁 처리 (DEMO)</p>
              <p className="mb-3 text-xs text-foreground-subtle">
                사유: {order.disputeReason ? DISPUTE_REASON_LABEL[order.disputeReason] : "-"} — 실제 법률 판단이 아닌 DEMO 조정 흐름입니다.
              </p>
              <div className="mb-3 flex flex-wrap gap-2">
                {(["filed", "evidence-review", "platform-review", "resolution", "closed"] as const).map((stage) => (
                  <span
                    key={stage}
                    className={`rounded-full border px-2.5 py-1 text-[11px] ${
                      order.disputeStage === stage
                        ? "border-accent-lime bg-accent-lime/10 text-accent-lime"
                        : "border-border text-foreground-subtle"
                    }`}
                  >
                    {DISPUTE_STAGE_LABEL[stage]}
                  </span>
                ))}
              </div>
              <Button
                variant="secondary"
                className="text-xs"
                disabled={order.disputeStage === "closed"}
                onClick={() => advanceDispute(order.id)}
              >
                다음 단계로 진행
              </Button>
            </GlassPanel>
          )}

          {order.status === "completed" && (
            <GlassPanel className="rounded-xl p-5">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                리뷰
              </p>
              {order.review ? (
                <p className="text-sm text-foreground-muted">
                  전체 평점 {order.review.overall}/5 · {order.review.comment}
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={reviewComment}
                    onChange={(event) => setReviewComment(event.target.value)}
                    placeholder="콘텐츠 품질, 커뮤니케이션, 납기에 대한 후기를 남겨주세요."
                    rows={2}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-accent-lime focus:outline-none"
                  />
                  <Button
                    variant="secondary"
                    className="self-start text-xs"
                    onClick={() => {
                      submitReview(order.id, {
                        quality: 5,
                        communication: 5,
                        delivery: 5,
                        compliance: 5,
                        overall: 5,
                        comment: reviewComment || "만족스러운 협업이었습니다.",
                      });
                      showToast("리뷰를 등록했습니다");
                    }}
                  >
                    리뷰 등록
                  </Button>
                </div>
              )}
            </GlassPanel>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <GlassPanel className="rounded-xl p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">거래 금액</p>
            <dl className="flex flex-col divide-y divide-border text-sm">
              <div className="flex items-center justify-between py-1.5">
                <dt className="text-foreground-subtle">기본 제작비</dt>
                <dd className="text-foreground">{formatKRW(order.baseFee)}</dd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <dt className="text-foreground-subtle">옵션 추가비</dt>
                <dd className="text-foreground">{formatKRW(order.optionFee)}</dd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <dt className="text-foreground-subtle">플랫폼 수수료 ({order.platformFeeRate}%)</dt>
                <dd className="text-foreground">-{formatKRW(platformFee)}</dd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <dt className="text-foreground-subtle">성과 보너스 최대</dt>
                <dd className="text-foreground">{formatKRW(order.bonusMax)}</dd>
              </div>
              <div className="flex items-center justify-between py-2 font-semibold">
                <dt className="text-foreground">크리에이터 예상 수익</dt>
                <dd className="text-accent-lime">{formatKRW(creatorEarning)}</dd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <dt className="text-foreground-subtle">브랜드 총 비용</dt>
                <dd className="text-foreground">{formatKRW(order.baseFee + order.optionFee)}</dd>
              </div>
            </dl>
          </GlassPanel>

          <GlassPanel className="rounded-xl p-5 text-xs text-foreground-subtle">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground-subtle">작업 조건</p>
            <p>마감일: {new Date(order.dueAt).toLocaleDateString("ko-KR")}</p>
            <p>수정 횟수: {order.revisionsUsed} / {order.revisionLimit}회 사용</p>
            <p>라이선스: {LICENSE_LABEL[order.license]}</p>
          </GlassPanel>

          <Button variant="ghost" className="self-start text-xs" onClick={() => router.push("/marketplace")}>
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            마켓플레이스로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}
