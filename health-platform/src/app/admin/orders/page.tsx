import { requireSection } from "@/lib/admin/require-section";
import { OrdersListClient } from "./OrdersListClient";

export default async function AdminOrdersPage() {
  const access = await requireSection("orders");
  if (!access.allowed) return <p>접근 권한이 없습니다.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">주문 관리</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">현재 브라우저 세션에서 생성된 주문 (데모 저장소)</p>
      <OrdersListClient />
    </div>
  );
}
