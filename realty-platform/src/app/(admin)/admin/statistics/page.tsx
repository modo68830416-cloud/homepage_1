import type { Metadata } from "next";
import { StatisticsDashboard } from "@/components/admin/StatisticsDashboard";

export const metadata: Metadata = {
  title: "통계 — 관리자",
};

export default function AdminStatisticsPage() {
  return <StatisticsDashboard />;
}
