import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  migrations: { table: "__migrations" },
  out: "./db/migrations",
  dbCredentials: { url: process.env.DATABASE_URL || "" },
  schema: "./src/db/schema",
});
