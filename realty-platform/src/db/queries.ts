import { desc, eq, inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { banners, inquiries, properties } from "@/db/schema";
import type { Property } from "@/types/property";

function toProperty(row: typeof properties.$inferSelect): Property {
  return {
    id: row.id,
    title: row.title,
    dealType: row.dealType as Property["dealType"],
    propertyType: row.propertyType as Property["propertyType"],
    listingType: row.listingType as Property["listingType"],
    price: row.price,
    priceValue: row.priceValue,
    monthlyRent: row.monthlyRent ?? undefined,
    monthlyRentValue: row.monthlyRentValue ?? undefined,
    city: row.city,
    district: row.district,
    areaM2: row.areaM2,
    floor: row.floor,
    bedroomCount: row.bedroomCount,
    bathroomCount: row.bathroomCount,
    badges: row.badges as Property["badges"],
    gradient: row.gradient,
    address: row.address,
    propertyNumber: row.propertyNumber,
    maintenanceFee: row.maintenanceFee,
    direction: row.direction,
    builtYear: row.builtYear,
    moveInDate: row.moveInDate,
    images: row.images,
    description: row.description,
    options: row.options as Property["options"],
    nearby: row.nearby as Property["nearby"],
  };
}

export async function getAllProperties(): Promise<Property[]> {
  const rows = await getDb().select().from(properties).orderBy(desc(properties.createdAt));
  return rows.map(toProperty);
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  const rows = await getDb().select().from(properties).where(eq(properties.id, id)).limit(1);
  return rows[0] ? toProperty(rows[0]) : undefined;
}

export async function getPropertiesByIds(ids: string[]): Promise<Property[]> {
  if (ids.length === 0) return [];
  const rows = await getDb().select().from(properties).where(inArray(properties.id, ids));
  return rows.map(toProperty);
}

export async function getAdminProperties() {
  return getDb().select().from(properties).orderBy(desc(properties.createdAt));
}

export async function getAllInquiries() {
  return getDb().select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getAllBanners() {
  return getDb().select().from(banners).orderBy(desc(banners.createdAt));
}

export async function getActiveBanners() {
  return getDb().select().from(banners).where(eq(banners.active, true)).orderBy(desc(banners.createdAt));
}
