import { boolean, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const properties = pgTable("properties", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  dealType: text("deal_type").notNull(),
  propertyType: text("property_type").notNull(),
  listingType: text("listing_type").notNull().default("일반"),
  price: text("price").notNull(),
  priceValue: integer("price_value").notNull(),
  monthlyRent: text("monthly_rent"),
  monthlyRentValue: integer("monthly_rent_value"),
  city: text("city").notNull(),
  district: text("district").notNull(),
  areaM2: integer("area_m2").notNull(),
  floor: text("floor").notNull(),
  bedroomCount: integer("bedroom_count").notNull().default(0),
  bathroomCount: integer("bathroom_count").notNull().default(0),
  badges: jsonb("badges").$type<string[]>().notNull().default([]),
  gradient: text("gradient").notNull(),
  address: text("address").notNull(),
  propertyNumber: text("property_number").notNull(),
  maintenanceFee: text("maintenance_fee").notNull(),
  direction: text("direction").notNull(),
  builtYear: integer("built_year").notNull(),
  moveInDate: text("move_in_date").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  description: jsonb("description")
    .$type<{ features: string[]; pros: string[]; cautions: string[]; renovated: boolean }>()
    .notNull(),
  options: jsonb("options").$type<string[]>().notNull().default([]),
  nearby: jsonb("nearby")
    .$type<{ category: string; name: string; distanceM: number }[]>()
    .notNull()
    .default([]),
  status: text("status").notNull().default("공개"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  propertyTitle: text("property_title"),
  status: text("status").notNull().default("접수"),
  assignee: text("assignee").default(""),
  memo: text("memo").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const banners = pgTable("banners", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  href: text("href").notNull(),
  active: boolean("active").notNull().default(true),
  gradient: text("gradient").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type PropertyRow = typeof properties.$inferSelect;
export type InquiryRow = typeof inquiries.$inferSelect;
export type BannerRow = typeof banners.$inferSelect;
