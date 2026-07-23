import type { Metadata } from "next";
import { getAllBanners } from "@/db/queries";
import { BannerManager } from "@/components/admin/BannerManager";

export const metadata: Metadata = {
  title: "배너관리 — 관리자",
};

export default async function AdminBannersPage() {
  const initialRows = await getAllBanners();
  return <BannerManager initialRows={initialRows} />;
}
