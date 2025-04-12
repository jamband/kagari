import { Hono } from "hono";
import { describe, expect, test } from "vitest";
import env from "../env.js";
import csrf from "./csrf.js";

describe("403", () => {
  const app = new Hono().use(csrf).post("/foo", async (c) => {
    return c.json({ message: "created" }, 201);
  });

  test("without some headers", async () => {
    const res = await app.request("/foo", {
      method: "POST",
    });
    expect(res.status).toBe(403);
  });

  test("with content-type: application/x-www-form-urlencoded", async () => {
    const res = await app.request("/foo", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    expect(res.status).toBe(403);
  });

  test("with cross origin and content-type: application/x-www-form-urlencoded", async () => {
    const res = await app.request(
      `${env.WEB_URL.replace(":3000", ":8000")}/foo`,
      {
        method: "POST",
        headers: {
          origin: env.WEB_URL.replace(":3000", ":8000"),
          "content-type": "application/x-www-form-urlencoded",
        },
      },
    );
    expect(res.status).toBe(403);
  });
});

describe("201", () => {
  const app = new Hono().use(csrf).post("/foo", async (c) => {
    return c.json({ message: "created" }, 201);
  });

  test("with content-type: application/json", async () => {
    const res = await app.request("/foo", {
      method: "POST",
      headers: { "content-type": "application/json" },
    });
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ message: "created" });
  });

  test("with origin: WEB_URL", async () => {
    const res = await app.request("/foo", {
      method: "POST",
      headers: { origin: env.WEB_URL },
    });
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ message: "created" });
  });

  test("with same origin and content-type: application/x-www-form-urlencoded", async () => {
    const res = await app.request(`${env.WEB_URL}/foo`, {
      method: "POST",
      headers: {
        origin: env.WEB_URL,
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ message: "created" });
  });
});
