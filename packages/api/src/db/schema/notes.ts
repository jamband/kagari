import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const notes = sqliteTable("notes", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  pin: integer("pin", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("created_at", { mode: "number" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export default notes;
