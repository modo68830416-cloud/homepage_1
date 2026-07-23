import type { Metadata } from "next";
import { HistoryView } from "@/components/property/HistoryView";

export const metadata: Metadata = {
  title: "최근본매물",
  description: "최근에 확인한 매물을 모아보세요.",
};

export default function HistoryPage() {
  return <HistoryView />;
}
