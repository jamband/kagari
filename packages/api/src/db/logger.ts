import { createWriteStream } from "node:fs";
import type { Logger } from "drizzle-orm/logger";

/**
 * about sql execution duration at logger
 * @see {@link https://github.com/drizzle-team/drizzle-orm/issues/2605}
 */
export class DbLogger implements Logger {
  logQuery(query: string, params: Array<unknown>): void {
    const duration = "??"; // not implemented
    const timestamp = new Date().toLocaleString("sv-SE");

    createWriteStream("./db/query.log", { flags: "a" }).write(
      `${timestamp}|${duration}ms|${query}|${params.toString()}\n`,
    );
  }
}
