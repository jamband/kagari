import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, readFile, writeFile } from "node:fs/promises";

if (!existsSync("./.env")) {
  await cp(".env.example", ".env");
  await cp(".env.example", ".env.staging");

  const data = await readFile(".env.staging", {
    encoding: "utf-8",
  });

  await writeFile(
    ".env.staging",
    data
      .replace("development.db", "staging.db")
      .replace("LOG_LEVEL=debug", "LOG_LEVEL=error"),
  );

  execSync("drizzle-kit migrate");
}
