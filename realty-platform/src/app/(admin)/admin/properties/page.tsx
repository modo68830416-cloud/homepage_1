import type { Metadata } from "next";
import { getAdminProperties } from "@/db/queries";
import { PropertyManager } from "@/components/admin/PropertyManager";

export const metadata: Metadata = {
  title: "매물관리 — 관리자",
};

export default async function AdminPropertiesPage() {
  const initialRows = await getAdminProperties();
  return <PropertyManager initialRows={initialRows} />;
}
