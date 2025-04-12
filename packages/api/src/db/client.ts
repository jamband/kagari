import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import env from "../env.js";
import { DbLogger } from "./logger.js";
import notes from "./schema/notes.js";

const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
  },
  schema: {
    notes,
  },
  logger: env.LOG_LEVEL === "debug" ? new DbLogger() : false,
});

db.run(sql.raw("PRAGMA foreign_keys=ON"));

export default db;
