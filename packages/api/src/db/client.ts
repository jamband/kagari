import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { DATABASE_URL, LOG_LEVEL } from "../env.js";
import { DbLogger } from "./logger.js";
import notes from "./schema/notes.js";

const db = drizzle({
  connection: {
    url: DATABASE_URL,
  },
  schema: {
    notes,
  },
  logger: LOG_LEVEL === "debug" ? new DbLogger() : false,
});

db.run(sql.raw("PRAGMA foreign_keys=ON"));

export default db;
