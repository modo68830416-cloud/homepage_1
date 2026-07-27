import { Briefcase, Clapperboard, Link2, Megaphone, Receipt, ShoppingBag, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ACTIONS = [
  { label: "새 쇼츠 만들기", href: "/create/new", icon: Clapperboard },
  { label: "저장한 Look 열기", href: "/studio", icon: ShoppingBag },
  { label: "인기 상품으로 만들기", href: "/trends", icon: TrendingUp },
  { label: "구매 링크 만들기", href: "/look/demo-look", icon: Link2 },
  { label: "캠페인 확인", href: "/marketplace/campaigns", icon: Megaphone },
  { label: "정산 내역 보기", href: "/creator/settlements", icon: Receipt },
  { label: "진행 중인 거래 보기", href: "/marketplace/orders/order-demo-01", icon: Briefcase },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {ACTIONS.map((action) => (
        <Button key={action.label} href={action.href} variant="secondary" className="justify-start text-xs">
          <action.icon className="h-3.5 w-3.5" aria-hidden="true" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
