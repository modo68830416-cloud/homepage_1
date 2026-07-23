import { getDb } from "../src/db";
import { banners, inquiries, properties } from "../src/db/schema";
import {
  banners as seedBanners,
  inquiries as seedInquiries,
  properties as seedProperties,
} from "../src/lib/properties/mock-data";

async function main() {
  const db = getDb();

  console.log(`Seeding ${seedProperties.length} properties...`);
  for (const property of seedProperties) {
    await db.insert(properties).values(property).onConflictDoNothing();
  }

  console.log(`Seeding ${seedInquiries.length} inquiries...`);
  for (const inquiry of seedInquiries) {
    await db
      .insert(inquiries)
      .values({ ...inquiry, createdAt: new Date(inquiry.createdAt) })
      .onConflictDoNothing();
  }

  console.log(`Seeding ${seedBanners.length} banners...`);
  for (const banner of seedBanners) {
    await db.insert(banners).values(banner).onConflictDoNothing();
  }

  console.log("Seed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
