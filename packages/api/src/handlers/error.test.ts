import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { expect, test } from "vitest";
import type { InvalidResponseBody } from "../types/response.js";
import error from "./error.js";

test("HTTPException 400", async () => {
  const res = await new Hono()
    .onError(error)
    .get("/", () => {
      throw new HTTPException(400, { message: "error" });
    })
    .request("/");

  expect(res.status).toBe(400);
  expect(await res.json()).toEqual<InvalidResponseBody>({
    message: "error",
  });
});

test("HTTPException 403", async () => {
  const res = await new Hono()
    .onError(error)
    .get("/", () => {
      throw new HTTPException(403);
    })
    .request("/");

  expect(res.status).toBe(403);
  expect(await res.json()).toEqual<InvalidResponseBody>({
    message: "forbidden",
  });
});

test("HTTPException 404", async () => {
  const res = await new Hono()
    .onError(error)
    .get("/", () => {
      throw new HTTPException(404);
    })
    .request("/");

  expect(res.status).toBe(404);
  expect(await res.json()).toEqual<InvalidResponseBody>({
    message: "not found",
  });
});

test("HTTPException 422", async () => {
  const res = await new Hono()
    .onError(error)
    .get("/", () => {
      throw new HTTPException(422, { cause: "error" });
    })
    .request("/");

  expect(res.status).toBe(422);
  expect(await res.json()).toEqual<InvalidResponseBody>({
    message: "error",
  });
});

test("other", async () => {
  const res = await new Hono()
    .onError(error)
    .get("/", () => {
      throw new Error("error");
    })
    .request("/");

  expect(res.status).toBe(500);
  expect(await res.json()).toEqual<InvalidResponseBody>({
    message: "error",
  });
});
