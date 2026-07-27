"use client";

import { useSyncExternalStore } from "react";
import {
  campaignApplicationRepository,
  customRequestRepository,
  marketplaceOrderRepository,
} from "@/repositories/marketplace-repository";
import type { CampaignApplication, CustomProductionRequest, MarketplaceOrder, OrderAuditEvent, OrderReview } from "@/types/marketplace";

export function useCampaignApplications() {
  const applications = useSyncExternalStore(
    campaignApplicationRepository.subscribe.bind(campaignApplicationRepository),
    campaignApplicationRepository.getAll.bind(campaignApplicationRepository),
    campaignApplicationRepository.getServerSnapshot.bind(campaignApplicationRepository),
  );

  function submitApplication(application: CampaignApplication) {
    campaignApplicationRepository.add(application, "end");
  }

  return { applications, submitApplication };
}

export function useCustomRequests() {
  const requests = useSyncExternalStore(
    customRequestRepository.subscribe.bind(customRequestRepository),
    customRequestRepository.getAll.bind(customRequestRepository),
    customRequestRepository.getServerSnapshot.bind(customRequestRepository),
  );

  function submitRequest(request: CustomProductionRequest) {
    customRequestRepository.add(request, "end");
  }

  return { requests, submitRequest };
}

function appendAudit(order: MarketplaceOrder, event: Omit<OrderAuditEvent, "id">): MarketplaceOrder {
  return {
    ...order,
    auditLog: [...order.auditLog, { ...event, id: `audit-${Date.now()}` }],
  };
}

export function useMarketplaceOrders() {
  const orders = useSyncExternalStore(
    marketplaceOrderRepository.subscribe.bind(marketplaceOrderRepository),
    marketplaceOrderRepository.getAll.bind(marketplaceOrderRepository),
    marketplaceOrderRepository.getServerSnapshot.bind(marketplaceOrderRepository),
  );

  function updateOrder(id: string, updater: (order: MarketplaceOrder) => MarketplaceOrder) {
    marketplaceOrderRepository.update(id, updater);
  }

  function submitWork(id: string) {
    updateOrder(id, (order) =>
      appendAudit({ ...order, status: "submitted" }, { type: "submitted", message: "크리에이터가 작업물을 제출했습니다.", occurredAt: new Date().toISOString() }),
    );
  }

  function requestRevision(id: string, note: string) {
    updateOrder(id, (order) =>
      appendAudit(
        { ...order, status: "revision-requested", revisionsUsed: order.revisionsUsed + 1 },
        { type: "revision-requested", message: `수정 요청: ${note}`, occurredAt: new Date().toISOString() },
      ),
    );
  }

  function approveOrder(id: string) {
    updateOrder(id, (order) =>
      appendAudit({ ...order, status: "approved" }, { type: "approved", message: "브랜드가 콘텐츠를 승인했습니다.", occurredAt: new Date().toISOString() }),
    );
  }

  function completeOrder(id: string) {
    updateOrder(id, (order) =>
      appendAudit(
        { ...order, status: "completed" },
        { type: "completed", message: "사용권이 활성화되고 거래가 완료되었습니다 (DEMO).", occurredAt: new Date().toISOString() },
      ),
    );
  }

  function fileDispute(id: string, reason: MarketplaceOrder["disputeReason"]) {
    updateOrder(id, (order) =>
      appendAudit(
        { ...order, status: "disputed", disputeReason: reason, disputeStage: "filed" },
        { type: "disputed", message: "분쟁이 접수되었습니다.", occurredAt: new Date().toISOString() },
      ),
    );
  }

  function advanceDispute(id: string) {
    const stages: NonNullable<MarketplaceOrder["disputeStage"]>[] = [
      "filed",
      "evidence-review",
      "platform-review",
      "resolution",
      "closed",
    ];
    updateOrder(id, (order) => {
      const currentIndex = stages.indexOf(order.disputeStage ?? "filed");
      const next = stages[Math.min(currentIndex + 1, stages.length - 1)];
      return appendAudit(
        { ...order, disputeStage: next, status: next === "closed" ? "completed" : order.status },
        { type: "dispute-update", message: `분쟁 단계: ${next}`, occurredAt: new Date().toISOString() },
      );
    });
  }

  function submitReview(id: string, review: OrderReview) {
    updateOrder(id, (order) => ({ ...order, review }));
  }

  return {
    orders,
    submitWork,
    requestRevision,
    approveOrder,
    completeOrder,
    fileDispute,
    advanceDispute,
    submitReview,
  };
}
