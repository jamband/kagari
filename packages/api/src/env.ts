import type { Context } from "hono";
import { env } from "hono/adapter";

const variables = env<{
  APP_URL: string;
  LOG_LEVEL: "debug" | "info" | "notice" | "error";
  WEB_URL: string;
  DATABASE_URL: string;
  NOTE_RECORD_LIMIT: number;
}>({} as Context);

export const { APP_URL } = variables;
export const { WEB_URL } = variables;
export const { LOG_LEVEL } = variables;
export const { DATABASE_URL } = variables;
export const { NOTE_RECORD_LIMIT } = variables;
