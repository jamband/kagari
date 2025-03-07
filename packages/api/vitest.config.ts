import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: loadEnv("testing", process.cwd(), ""),
    include: ["src/**/*.test.ts"],
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
});
