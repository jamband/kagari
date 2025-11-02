import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/libsql/migrator";
import { beforeAll, beforeEach, vi } from "vitest";
import db from "./client.js";

/**
 * the following code only works with the @libsql/client driver
 *
 * you can also reset it using drizzle seeds
 * @see {@link https://orm.drizzle.team/docs/seed-overview#reset-database}
 */
beforeAll(async () => {
  vi.resetModules();
  await migrate(db, { migrationsFolder: "./db/migrations" });
});

beforeEach(async () => {
  await db.run(sql.raw("PRAGMA foreign_keys=OFF"));
  for (const [_, { dbName }] of Object.entries(db._.schema || {})) {
    await db.run(sql.raw(`DELETE FROM ${dbName}`));
  }
  await db.run(sql.raw("PRAGMA foreign_keys=ON"));
});
