import "../../../db/refresh.js";

import { describe, expect, test } from "vitest";
import { app } from "../../../app.js";
import db from "../../../db/client.js";
import notes from "../../../db/schema/notes.js";
import type { InvalidResponseBody } from "../../../types/response.js";
import type { NotesMaskedFields } from "../note.js";

describe("GET /notes/:id", () => {
  test("404", async () => {
    const res = await app.request("/notes/1");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual<InvalidResponseBody>({
      message: "not found",
    });
  });

  test("200", async () => {
    await db.insert(notes).values({ title: "t1", content: "c1" });

    const res = await app.request("/notes/1");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual<NotesMaskedFields>({
      id: 1,
      title: "t1",
      content: "c1",
      pin: false,
    });
  });
});
