import type { Metadata } from "next";
import { revenueTransactions } from "@/data/creator-business";
import { RevenueSummary } from "@/components/creator/revenue-summary";
import { TransactionTable } from "@/components/creator/transaction-table";

export const metadata: Metadata = {
  title: "Revenue",
  description: "상품 판매, 콘텐츠 판매, 캠페인 수익을 구분해 확인하세요.",
};

export default function CreatorRevenuePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Revenue</h1>
      <RevenueSummary transactions={revenueTransactions} />
      <div className="mt-10">
        <TransactionTable transactions={revenueTransactions} />
      </div>
    </div>
  );
}
