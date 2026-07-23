import type { Metadata } from "next";
import { PropertyManager } from "@/components/admin/PropertyManager";

export const metadata: Metadata = {
  title: "매물관리 — 관리자",
};

export default function AdminPropertiesPage() {
  return <PropertyManager />;
}
