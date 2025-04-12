import type { Context } from "hono";
import { env as honoEnv } from "hono/adapter";

const env = honoEnv<{
  APP_URL: string;
  LOG_LEVEL: "debug" | "info" | "notice" | "error";
  WEB_URL: string;
  DATABASE_URL: string;
  NOTE_RECORD_LIMIT: number;
}>({} as Context);

export default env;
