import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import type { InvalidResponseBody } from "../../../types/response.js";

describe("param", () => {
  test("id", async () => {
    const res = await app.request("/notes/foo");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual<InvalidResponseBody>({
      message: "not found",
    });
  });
});
