import type { Metadata } from "next";
import { marketplaceOrders } from "@/data/marketplace";
import { OrderDetailClient } from "@/components/marketplace/order-detail-client";

export const metadata: Metadata = {
  title: "Order Workspace",
  description: "제작 의뢰 거래의 진행 상태, 에스크로, 검토, 정산 흐름을 확인하세요.",
};

export function generateStaticParams() {
  return marketplaceOrders.map((order) => ({ id: order.id }));
}

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const { id } = await params;
  return <OrderDetailClient orderId={id} />;
}
