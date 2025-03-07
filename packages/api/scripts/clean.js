import { rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await rm("node_modules", { recursive: true, force: true });
await rm("db/development.db", { recursive: true, force: true });
await rm("db/query.log", { recursive: true, force: true });
await rm(".env", { recursive: true, force: true });
await rm(".env.staging", { recursive: true, force: true });
