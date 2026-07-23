import type { Metadata } from "next";
import { getAllProperties } from "@/db/queries";
import { FavoritesView } from "@/components/property/FavoritesView";

export const metadata: Metadata = {
  title: "관심매물",
  description: "내가 등록한 관심매물을 모아보세요.",
};

export default async function FavoritesPage() {
  const properties = await getAllProperties();
  return <FavoritesView properties={properties} />;
}
