import type { Metadata } from "next";
import { settlementStatements } from "@/data/creator-business";
import { SettlementListView } from "@/components/creator/settlement-list-view";
import { PayoutInfoForm } from "@/components/creator/payout-info-form";

export const metadata: Metadata = {
  title: "Settlements",
  description: "정산 명세서와 계좌·사업자 정보를 확인하세요.",
};

export default function CreatorSettlementsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Settlements</h1>
      <SettlementListView statements={settlementStatements} />
      <div className="mt-10">
        <PayoutInfoForm />
      </div>
    </div>
  );
}
