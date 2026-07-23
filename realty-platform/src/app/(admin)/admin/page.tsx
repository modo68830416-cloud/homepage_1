import type { Metadata } from "next";
import { Dashboard } from "@/components/admin/Dashboard";

export const metadata: Metadata = {
  title: "관리자 대시보드",
};

export default function AdminDashboardPage() {
  return <Dashboard />;
}
