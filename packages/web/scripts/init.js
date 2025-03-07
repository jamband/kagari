import { existsSync } from "node:fs";
import { cp } from "node:fs/promises";

if (!existsSync("./.env")) {
  await cp(".env.example", ".env");
}
