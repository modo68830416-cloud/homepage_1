import type { Metadata } from "next";
import { BannerManager } from "@/components/admin/BannerManager";

export const metadata: Metadata = {
  title: "배너관리 — 관리자",
};

export default function AdminBannersPage() {
  return <BannerManager />;
}
