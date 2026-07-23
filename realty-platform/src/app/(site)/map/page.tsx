import type { Metadata } from "next";
import { getAllProperties } from "@/db/queries";
import { MapSearchView } from "@/components/property/MapSearchView";

export const metadata: Metadata = {
  title: "지도검색",
  description: "지도에서 지역을 선택해 매물을 찾아보세요.",
};

export default async function MapPage() {
  const properties = await getAllProperties();
  return <MapSearchView properties={properties} />;
}
