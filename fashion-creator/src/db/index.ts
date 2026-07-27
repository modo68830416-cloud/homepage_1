import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

// Lazy init: `neon()` throws if DATABASE_URL is unset, and Next.js
// evaluates top-level module code at build time — a bare module-level
// `neon(process.env.DATABASE_URL!)` would crash `next build` before env
// vars are configured. Never wrap this in a Proxy (breaks auth adapters
// that introspect the client) — a plain lazy singleton is enough.
function createDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!_db) _db = createDb();
  return _db;
}
