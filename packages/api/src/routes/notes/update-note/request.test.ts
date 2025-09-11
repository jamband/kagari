import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import type {
  InvalidJsonResponseBody,
  InvalidResponseBody,
} from "../../../types/response.js";
import type { UpdateNoteJsonRequest } from "./request.js";

describe("param", () => {
  test("id", async () => {
    const res = await app.request("/notes/foo", {
      method: "PUT",
      headers: { "content-type": "application/json" },
    });
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual<InvalidResponseBody>({
      message: "not found",
    });
  });
});

describe("json", () => {
  const request = (body: Partial<UpdateNoteJsonRequest>) => {
    return app.request("/notes/1", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  test("title: nonEmpty", async () => {
    const res = await request({ title: "" });
    expect(await res.json()).toMatchObject<
      InvalidJsonResponseBody<UpdateNoteJsonRequest>
    >({
      message: { title: "this field is required" },
    });
  });

  test("content: nonEmpty", async () => {
    const res = await request({ content: "" });
    expect(await res.json()).toMatchObject<
      InvalidJsonResponseBody<UpdateNoteJsonRequest>
    >({
      message: { content: "this field is required" },
    });
  });
});
