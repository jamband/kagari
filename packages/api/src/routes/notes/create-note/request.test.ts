import "../../../db/refresh.js";

import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import db from "../../../db/client.js";
import notes from "../../../db/schema/notes.js";
import type { InvalidJsonResponseBody } from "../../../types/response.js";
import type { CreateNoteJsonRequest } from "./request.js";

describe("json", () => {
  const request = (body: Partial<CreateNoteJsonRequest>) => {
    return app.request("/notes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  test("title: nonEmpty", async () => {
    const res = await request({ title: "" });
    expect(await res.json()).toMatchObject<
      InvalidJsonResponseBody<CreateNoteJsonRequest>
    >({
      message: { title: "this field is required" },
    });
  });

  test("title: canCreateNote", async () => {
    await db.insert(notes).values([
      { title: "t1", content: "c1" },
      { title: "t2", content: "c2" },
      { title: "t3", content: "c3" },
      { title: "t4", content: "c4" },
    ]);

    const res = await request({ title: "foo" });
    expect(await res.json()).toMatchObject<
      InvalidJsonResponseBody<CreateNoteJsonRequest>
    >({
      message: { title: "you cannot create any more notes" },
    });
  });

  test("content: nonEmpty", async () => {
    const res = await request({ content: "" });
    expect(await res.json()).toMatchObject<
      InvalidJsonResponseBody<CreateNoteJsonRequest>
    >({
      message: { content: "this field is required" },
    });
  });
});
