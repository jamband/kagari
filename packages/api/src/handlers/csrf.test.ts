import { Hono } from "hono";
import { describe, expect, test } from "vitest";
import { WEB_URL } from "../env.js";
import type { InvalidResponseBody } from "../types/response.js";
import csrf from "./csrf.js";
import error from "./error.js";

describe("csrf", () => {
  const app = new Hono()
    .onError(error)
    .use(csrf)
    .post("/foo", async (c) => {
      return c.json({ message: "created" }, 201);
    });

  test("invalid", async () => {
    const res = await app.request("/foo", {
      method: "POST",
    });
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual<InvalidResponseBody>({
      message: "forbidden",
    });
  });

  test("valid", async () => {
    const res = await app.request("/foo", {
      method: "POST",
      headers: { origin: WEB_URL },
    });
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({
      message: "created",
    });
  });
});
