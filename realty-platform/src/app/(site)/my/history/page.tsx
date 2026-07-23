import type { Metadata } from "next";
import { getAllProperties } from "@/db/queries";
import { HistoryView } from "@/components/property/HistoryView";

export const metadata: Metadata = {
  title: "최근본매물",
  description: "최근에 확인한 매물을 모아보세요.",
};

export default async function HistoryPage() {
  const properties = await getAllProperties();
  return <HistoryView properties={properties} />;
}
