import { execSync } from "node:child_process";

execSync("drizzle-kit migrate");
execSync("drizzle-kit push");
