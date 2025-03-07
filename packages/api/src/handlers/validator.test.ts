import { Hono } from "hono";
import * as v from "valibot";
import { describe, expect, test } from "vitest";
import type {
  InvalidJsonResponseBody,
  InvalidResponseBody,
} from "../types/response.js";
import error from "./error.js";
import validator from "./validator.js";

describe("target: param", () => {
  const schema = v.object({
    id: v.pipe(
      v.string(),
      v.regex(/^[0-9]+$/),
      v.transform((input) => Number(input)),
    ),
  });

  const app = new Hono()
    .onError(error)
    .get("/foo/:id", validator("param", schema), (c) => {
      return c.json(c.req.valid("param"));
    });

  test("invalid", async () => {
    const res = await app.request("/foo/bar");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual<InvalidResponseBody>({
      message: "not found",
    });
  });

  test("valid", async () => {
    const res = await app.request("/foo/1");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: 1 });
  });
});

describe("target: json", () => {
  const schema = v.object({
    foo: v.pipe(v.string(), v.nonEmpty()),
  });

  const app = new Hono()
    .onError(error)
    .post("/foo", validator("json", schema), (c) => {
      return c.json(c.req.valid("json"));
    });

  test("invalid", async () => {
    const res = await app.request("/foo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ foo: "" }),
    });
    expect(res.status).toBe(422);
    expect(await res.json()).toEqual<InvalidJsonResponseBody<{ foo: string }>>({
      message: { foo: "this field is required" },
    });
  });

  test("valid", async () => {
    const res = await app.request("/foo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ foo: "bar" }),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ foo: "bar" });
  });
});
