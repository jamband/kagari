import { rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await rm("db/query.log", { recursive: true, force: true });
