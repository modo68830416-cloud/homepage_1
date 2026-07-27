import { boolean, integer, jsonb, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

// One row per signed-in user (Clerk user id). Everything below is scoped to
// this id — a Guest Mode visitor never reaches these tables at all, they
// stay on the localStorage Repositories from Sprint-02.
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user id
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const savedAvatars = pgTable("saved_avatars", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  source: text("source").notNull(), // "preset" | "photo"
  previewImage: text("preview_image").notNull(),
  photoBlobPathname: text("photo_blob_pathname"), // private Blob path, photo bytes never touch this row
  genderPresentation: text("gender_presentation").notNull(),
  ageGroup: text("age_group").notNull(),
  height: integer("height"),
  weight: integer("weight"),
  bodySettings: jsonb("body_settings").notNull(),
});

export const selectedModel = pgTable("selected_model", {
  userId: text("user_id").primaryKey(),
  modelId: text("model_id").notNull(),
  modelType: text("model_type").notNull(), // "preset" | "avatar"
  modelName: text("model_name").notNull(),
  previewImage: text("preview_image").notNull(),
  bodyProfileSummary: text("body_profile_summary").notNull(),
  styleTags: jsonb("style_tags").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const savedLooks = pgTable("saved_looks", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  modelId: text("model_id"),
  modelName: text("model_name"),
  productIds: jsonb("product_ids").notNull(),
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contentProjects = pgTable("content_projects", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  sourceLookId: text("source_look_id").notNull(),
  format: text("format").notNull(),
  status: text("status").notNull(),
  thumbnailSeed: text("thumbnail_seed").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  settings: jsonb("settings").notNull(),
  output: jsonb("output").notNull(),
  channelCopies: jsonb("channel_copies").notNull(),
  isFavorite: boolean("is_favorite").notNull().default(false),
});

export const cartItems = pgTable(
  "cart_items",
  {
    userId: text("user_id").notNull(),
    productId: text("product_id").notNull(),
    quantity: integer("quantity").notNull(),
    addedAt: timestamp("added_at").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.productId] })],
);

export const favoriteProducts = pgTable(
  "favorite_products",
  {
    userId: text("user_id").notNull(),
    productId: text("product_id").notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.productId] })],
);

export const favoriteCreators = pgTable(
  "favorite_creators",
  {
    userId: text("user_id").notNull(),
    creatorId: text("creator_id").notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.creatorId] })],
);

export const creatorBrandKit = pgTable("creator_brand_kit", {
  userId: text("user_id").primaryKey(),
  brandName: text("brand_name").notNull(),
  color: text("color").notNull(),
  ctaCopy: text("cta_copy").notNull(),
  disclosure: text("disclosure").notNull(),
});

export const creatorExportSettings = pgTable("creator_export_settings", {
  userId: text("user_id").primaryKey(),
  aspectRatio: text("aspect_ratio").notNull(),
  channel: text("channel").notNull(),
  language: text("language").notNull(),
  watermark: boolean("watermark").notNull(),
  hashtags: boolean("hashtags").notNull(),
});

export const creatorSubscription = pgTable("creator_subscription", {
  userId: text("user_id").primaryKey(),
  planName: text("plan_name").notNull(),
  creditsRemaining: integer("credits_remaining").notNull(),
  paymentMethod: jsonb("payment_method"),
});
