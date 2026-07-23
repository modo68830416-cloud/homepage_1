import type { Metadata } from "next";
import { getAllProperties } from "@/db/queries";
import { CompareView } from "@/components/property/CompareView";

export const metadata: Metadata = {
  title: "매물 비교하기",
  description: "관심 매물을 나란히 비교해보세요.",
};

export default async function ComparePage() {
  const properties = await getAllProperties();
  return <CompareView properties={properties} />;
}
