"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { banners, inquiries, properties } from "@/db/schema";
import type { InquiryStatus } from "@/types/property";

export async function submitInquiry(input: {
  name: string;
  phone: string;
  message: string;
  propertyTitle?: string;
}) {
  await getDb()
    .insert(inquiries)
    .values({ id: `inq-${Date.now()}`, ...input });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function updateInquiry(
  id: string,
  patch: { status?: InquiryStatus; assignee?: string; memo?: string },
) {
  await getDb().update(inquiries).set(patch).where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function deleteInquiry(id: string) {
  await getDb().delete(inquiries).where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

const PROPERTY_LIST_PATHS = ["/", "/search", "/map", "/compare", "/my/favorites", "/my/history"];

export async function updatePropertyStatus(id: string, status: "공개" | "비공개") {
  await getDb().update(properties).set({ status }).where(eq(properties.id, id));
  revalidatePath("/admin/properties");
  PROPERTY_LIST_PATHS.forEach((path) => revalidatePath(path));
}

export async function deleteProperty(id: string) {
  await getDb().delete(properties).where(eq(properties.id, id));
  revalidatePath("/admin/properties");
  PROPERTY_LIST_PATHS.forEach((path) => revalidatePath(path));
}

export async function addBanner(input: {
  title: string;
  subtitle: string;
  href: string;
  gradient: string;
}) {
  await getDb()
    .insert(banners)
    .values({ id: `ban-${Date.now()}`, active: false, ...input });
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function updateBanner(
  id: string,
  patch: Partial<{ title: string; subtitle: string; href: string; active: boolean }>,
) {
  await getDb().update(banners).set(patch).where(eq(banners.id, id));
  revalidatePath("/admin/banners");
  revalidatePath("/");
}

export async function deleteBanner(id: string) {
  await getDb().delete(banners).where(eq(banners.id, id));
  revalidatePath("/admin/banners");
  revalidatePath("/");
}
